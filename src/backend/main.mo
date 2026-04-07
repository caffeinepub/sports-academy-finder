import Map "mo:core/Map";
import Nat64 "mo:core/Nat64";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Migration "migration";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Use data migration for persistent data
(with migration = Migration.run)
actor {
  type PlaceId = Nat64;
  type EnrollmentId = Nat64;

  type GeoLocation = {
    lat : Float;
    long : Float;
  };

  type Place = {
    id : PlaceId;
    name : Text;
    description : Text;
    sport : Text;
    location : GeoLocation;
  };

  module Place {
    public func compare(p1 : Place, p2 : Place) : Order.Order {
      Text.compare(p1.name, p2.name);
    };
  };

  type Enrollment = {
    id : EnrollmentId;
    academyName : Text;
    sport : Text;
    fullName : Text;
    age : Nat;
    phone : Text;
    address : Text;
    submittedAt : Int;
  };

  module Enrollment {
    public func compareBySubmittedAt(e1 : Enrollment, e2 : Enrollment) : Order.Order {
      Int.compare(e2.submittedAt, e1.submittedAt);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextPlaceId : PlaceId = 0;
  var nextEnrollmentId : EnrollmentId = 0;
  var initialized : Bool = false;
  let places = Map.empty<PlaceId, Place>();
  let enrollments = Map.empty<EnrollmentId, Enrollment>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public shared func initializePlaces() : async () {
    if (initialized) { return };
    initialized := true;

    for (sport in [ "Basketball", "Soccer", "Tennis", "Swimming", "Volleyball" ].values()) {
      let locations = [
        ("Ramapuram", 13.0304, 80.1769),
        ("Anna Nagar", 13.0850, 80.2101),
        ("Kolathur", 13.1143, 80.2254),
        ("Mylapore", 13.0368, 80.2676),
        ("Santhome", 13.0336, 80.2785),
      ];

      for ((area, lat, long) in locations.values()) {
        let name = area # " " # sport # " Academy";
        let description = sport # " facility located in " # area # " area of Chennai.";

        let place : Place = {
          id = nextPlaceId;
          name;
          description;
          sport;
          location = { lat; long };
        };

        places.add(nextPlaceId, place);
        nextPlaceId += 1;
      };
    };
  };

  public query func getAllPlaces() : async [Place] {
    places.values().toArray().sort();
  };

  public query func getPlacesBySport(sport : Text) : async [Place] {
    places.values().toArray().filter(func(p) { p.sport == sport }).sort();
  };

  public query func getPlaceById(id : PlaceId) : async ?Place {
    places.get(id);
  };

  // Anyone can submit an enrollment — no auth required
  public shared func submitEnrollment(
    academyName : Text,
    sport : Text,
    fullName : Text,
    age : Nat,
    phone : Text,
    address : Text
  ) : async EnrollmentId {
    let id = nextEnrollmentId;
    nextEnrollmentId += 1;

    let enrollment : Enrollment = {
      id;
      academyName;
      sport;
      fullName;
      age;
      phone;
      address;
      submittedAt = Time.now();
    };

    enrollments.add(id, enrollment);
    id;
  };

  public query ({ caller }) func getAllEnrollments() : async [Enrollment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view enrollments");
    };
    enrollments.values().toArray().sort(Enrollment.compareBySubmittedAt);
  };

  public query ({ caller }) func getEnrollmentsByAcademy(academyName : Text) : async [Enrollment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view enrollments");
    };
    enrollments.values().toArray().filter(
      func(e) { Text.equal(e.academyName, academyName) }
    ).sort(Enrollment.compareBySubmittedAt);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};

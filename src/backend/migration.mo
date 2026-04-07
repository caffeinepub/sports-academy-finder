import Map "mo:core/Map";
import Nat64 "mo:core/Nat64";
import Principal "mo:core/Principal";

module {
  type Place = {
    id : Nat64;
    name : Text;
    description : Text;
    sport : Text;
    location : {
      lat : Float;
      long : Float;
    };
  };

  type Enrollment = {
    id : Nat64;
    academyName : Text;
    sport : Text;
    fullName : Text;
    age : Nat;
    phone : Text;
    address : Text;
    submittedAt : Int;
  };

  type UserProfile = {
    name : Text;
  };

  type OldActor = {
    places : Map.Map<Nat64, Place>;
    nextPlaceId : Nat64;
    initialized : Bool;
  };

  type NewActor = {
    places : Map.Map<Nat64, Place>;
    nextPlaceId : Nat64;
    enrollments : Map.Map<Nat64, Enrollment>;
    nextEnrollmentId : Nat64;
    initialized : Bool;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      userProfiles = Map.empty<Principal, UserProfile>();
      enrollments = Map.empty<Nat64, Enrollment>();
      nextEnrollmentId = 0;
    };
  };
};

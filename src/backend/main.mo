import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Nat64 "mo:core/Nat64";
import Order "mo:core/Order";
import Text "mo:core/Text";



actor {
  type PlaceId = Nat64;

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

  var nextPlaceId : PlaceId = 0;
  let places = Map.empty<PlaceId, Place>();

  public shared ({ caller }) func initializePlaces() : async () {
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
        let description = sport # " facility located in " # area # " area of Chennai. ";

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

  public query ({ caller }) func getAllPlaces() : async [Place] {
    places.values().toArray().sort();
  };

  public query ({ caller }) func getPlacesBySport(sport : Text) : async [Place] {
    places.values().toArray().filter(func(p) { p.sport == sport }).sort();
  };

  public query ({ caller }) func getPlaceById(id : PlaceId) : async ?Place {
    places.get(id);
  };
};

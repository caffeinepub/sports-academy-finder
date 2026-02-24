import Map "mo:core/Map";
import Order "mo:core/Order";
import Array "mo:core/Array";
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
    location : GeoLocation;
  };

  module Place {
    public func compare(place1 : Place, place2 : Place) : Order.Order {
      Text.compare(place1.name, place2.name);
    };
  };

  let places = Map.empty<PlaceId, Place>();

  public shared ({ caller }) func initializePlaces() : async () {
    places.add(
      0 : PlaceId,
      {
        id = 0 : PlaceId;
        name = "Karate Club";
        description = "Martial arts school in the city center";
        location = {
          lat = 40.7128;
          long = -74.0060;
        };
      },
    );
  };

  public query func getAllPlaces() : async [Place] {
    places.values().toArray().sort();
  };
};

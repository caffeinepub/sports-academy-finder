import Map "mo:core/Map";
import Nat64 "mo:core/Nat64";

module {
  type PlaceId = Nat64;

  type GeoLocation = {
    lat : Float;
    long : Float;
  };

  type OldPlace = {
    id : PlaceId;
    name : Text;
    description : Text;
    location : GeoLocation;
  };

  type OldActor = {
    places : Map.Map<PlaceId, OldPlace>;
  };

  type NewPlace = {
    id : PlaceId;
    name : Text;
    description : Text;
    sport : Text;
    location : GeoLocation;
  };

  type NewActor = {
    nextPlaceId : PlaceId;
    places : Map.Map<PlaceId, NewPlace>;
  };

  public func run(old : OldActor) : NewActor {
    let newPlaces = old.places.map<PlaceId, OldPlace, NewPlace>(
      func(_id, oldPlace) {
        { oldPlace with sport = "" };
      }
    );
    {
      nextPlaceId = 0;
      places = newPlaces;
    };
  };
};

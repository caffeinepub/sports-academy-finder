// Realistic sport+location photo thumbnails

// Cricket
import cricketAnnaNagar from "../../public/assets/generated/cricket-annanagar.dim_600x400.jpg";
import cricketKolathur from "../../public/assets/generated/cricket-kolathur.dim_600x400.jpg";
import cricketMylapore from "../../public/assets/generated/cricket-mylapore.dim_600x400.jpg";
import cricketRamapuram from "../../public/assets/generated/cricket-ramapuram.dim_600x400.jpg";
import cricketSanthome from "../../public/assets/generated/cricket-santhome.dim_600x400.jpg";

// Football
import footballAnnaNagar from "../../public/assets/generated/football-annanagar.dim_600x400.jpg";
import footballKolathur from "../../public/assets/generated/football-kolathur.dim_600x400.jpg";
import footballMylapore from "../../public/assets/generated/football-mylapore.dim_600x400.jpg";
import footballRamapuram from "../../public/assets/generated/football-ramapuram.dim_600x400.jpg";
import footballSanthome from "../../public/assets/generated/football-santhome.dim_600x400.jpg";

// Basketball
import basketballAnnaNagar from "../../public/assets/generated/basketball-annanagar-new.dim_600x400.jpg";
import basketballKolathur from "../../public/assets/generated/basketball-kolathur-new.dim_600x400.jpg";
import basketballMylapore from "../../public/assets/generated/basketball-mylapore-new.dim_600x400.jpg";
import basketballRamapuram from "../../public/assets/generated/basketball-ramapuram-new.dim_600x400.jpg";
import basketballSanthome from "../../public/assets/generated/basketball-santhome-new.dim_600x400.jpg";

// Tennis
import tennisAnnaNagar from "../../public/assets/generated/tennis-annanagar-new.dim_600x400.jpg";
import tennisKolathur from "../../public/assets/generated/tennis-kolathur-new.dim_600x400.jpg";
import tennisMylapore from "../../public/assets/generated/tennis-mylapore-new.dim_600x400.jpg";
import tennisRamapuram from "../../public/assets/generated/tennis-ramapuram-new.dim_600x400.jpg";
import tennisSanthome from "../../public/assets/generated/tennis-santhome-new.dim_600x400.jpg";

// Swimming
import swimmingAnnaNagar from "../../public/assets/generated/swimming-annanagar-new.dim_600x400.jpg";
import swimmingKolathur from "../../public/assets/generated/swimming-kolathur-new.dim_600x400.jpg";
import swimmingMylapore from "../../public/assets/generated/swimming-mylapore-new.dim_600x400.jpg";
import swimmingRamapuram from "../../public/assets/generated/swimming-ramapuram-new.dim_600x400.jpg";
import swimmingSanthome from "../../public/assets/generated/swimming-santhome-new.dim_600x400.jpg";

interface SportIllustrationProps {
  sport: string;
  location?: string;
  className?: string;
}

// Map: sport -> location -> image src
const sportLocationImages: Record<string, Record<string, string>> = {
  Cricket: {
    Ramapuram: cricketRamapuram,
    "Anna Nagar": cricketAnnaNagar,
    Kolathur: cricketKolathur,
    Mylapore: cricketMylapore,
    Santhome: cricketSanthome,
  },
  Football: {
    Ramapuram: footballRamapuram,
    "Anna Nagar": footballAnnaNagar,
    Kolathur: footballKolathur,
    Mylapore: footballMylapore,
    Santhome: footballSanthome,
  },
  Basketball: {
    Ramapuram: basketballRamapuram,
    "Anna Nagar": basketballAnnaNagar,
    Kolathur: basketballKolathur,
    Mylapore: basketballMylapore,
    Santhome: basketballSanthome,
  },
  Tennis: {
    Ramapuram: tennisRamapuram,
    "Anna Nagar": tennisAnnaNagar,
    Kolathur: tennisKolathur,
    Mylapore: tennisMylapore,
    Santhome: tennisSanthome,
  },
  Swimming: {
    Ramapuram: swimmingRamapuram,
    "Anna Nagar": swimmingAnnaNagar,
    Kolathur: swimmingKolathur,
    Mylapore: swimmingMylapore,
    Santhome: swimmingSanthome,
  },
};

export function SportIllustration({
  sport,
  location,
  className,
}: SportIllustrationProps) {
  const locationMap = sportLocationImages[sport];
  const src =
    (location && locationMap?.[location]) ??
    locationMap?.[Object.keys(locationMap ?? {})[0]];

  if (!src) {
    return (
      <div
        className={className}
        style={{
          background: "#374151",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "white", fontWeight: "bold" }}>{sport}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${sport}${location ? ` - ${location}` : ""} academy`}
      className={className}
      style={{ objectFit: "cover" }}
    />
  );
}

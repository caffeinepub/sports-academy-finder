// Realistic sport+location photo thumbnails

import soccerAnnaNagar from "../../public/assets/generated/football-annanagar.dim_600x400.jpg";
import soccerKolathur from "../../public/assets/generated/football-kolathur.dim_600x400.jpg";
import soccerMylapore from "../../public/assets/generated/football-mylapore.dim_600x400.jpg";
import soccerRamapuram from "../../public/assets/generated/football-ramapuram.dim_600x400.jpg";
import soccerSanthome from "../../public/assets/generated/football-santhome.dim_600x400.jpg";

import basketballAnnaNagar from "../../public/assets/generated/basketball-annanagar-new.dim_600x400.jpg";
import basketballKolathur from "../../public/assets/generated/basketball-kolathur-new.dim_600x400.jpg";
import basketballMylapore from "../../public/assets/generated/basketball-mylapore-new.dim_600x400.jpg";
import basketballRamapuram from "../../public/assets/generated/basketball-ramapuram-new.dim_600x400.jpg";
import basketballSanthome from "../../public/assets/generated/basketball-santhome-new.dim_600x400.jpg";

import tennisAnnaNagar from "../../public/assets/generated/tennis-annanagar-new.dim_600x400.jpg";
import tennisKolathur from "../../public/assets/generated/tennis-kolathur-new.dim_600x400.jpg";
import tennisMylapore from "../../public/assets/generated/tennis-mylapore-new.dim_600x400.jpg";
import tennisRamapuram from "../../public/assets/generated/tennis-ramapuram-new.dim_600x400.jpg";
import tennisSanthome from "../../public/assets/generated/tennis-santhome-new.dim_600x400.jpg";

import swimmingAnnaNagar from "../../public/assets/generated/swimming-annanagar-new.dim_600x400.jpg";
import swimmingKolathur from "../../public/assets/generated/swimming-kolathur-new.dim_600x400.jpg";
import swimmingMylapore from "../../public/assets/generated/swimming-mylapore-new.dim_600x400.jpg";
import swimmingRamapuram from "../../public/assets/generated/swimming-ramapuram-new.dim_600x400.jpg";
import swimmingSanthome from "../../public/assets/generated/swimming-santhome-new.dim_600x400.jpg";

import volleyballAnnaNagar from "../../public/assets/generated/volleyball-annanagar-new.dim_600x400.jpg";
import volleyballKolathur from "../../public/assets/generated/volleyball-kolathur-new.dim_600x400.jpg";
import volleyballMylapore from "../../public/assets/generated/volleyball-mylapore-new.dim_600x400.jpg";
import volleyballRamapuram from "../../public/assets/generated/volleyball-ramapuram-new.dim_600x400.jpg";
import volleyballSanthome from "../../public/assets/generated/volleyball-santhome-new.dim_600x400.jpg";

interface SportIllustrationProps {
  sport: string;
  location?: string;
  className?: string;
}

// Map: sport -> location -> image src
const sportLocationImages: Record<string, Record<string, string>> = {
  Soccer: {
    Ramapuram: soccerRamapuram,
    "Anna Nagar": soccerAnnaNagar,
    Kolathur: soccerKolathur,
    Mylapore: soccerMylapore,
    Santhome: soccerSanthome,
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
  Volleyball: {
    Ramapuram: volleyballRamapuram,
    "Anna Nagar": volleyballAnnaNagar,
    Kolathur: volleyballKolathur,
    Mylapore: volleyballMylapore,
    Santhome: volleyballSanthome,
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

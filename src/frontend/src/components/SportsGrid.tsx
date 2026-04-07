import basketballImg from "../assets/generated/basketball-academy.dim_600x400.jpg";
import soccerImg from "../assets/generated/soccer-academy.dim_600x400.jpg";
import swimmingImg from "../assets/generated/swimming-academy.dim_600x400.jpg";
import tennisImg from "../assets/generated/tennis-academy.dim_600x400.jpg";
import volleyballImg from "../assets/generated/volleyball-academy.dim_600x400.jpg";
import { SportCard } from "./SportCard";

const sports = [
  {
    name: "Basketball",
    description:
      "Fast-paced team sport focusing on agility, coordination, and teamwork",
    imageSrc: basketballImg,
  },
  {
    name: "Soccer",
    description:
      "The world's most popular sport, building endurance and strategic thinking",
    imageSrc: soccerImg,
  },
  {
    name: "Tennis",
    description:
      "Individual or doubles sport developing precision, speed, and mental focus",
    imageSrc: tennisImg,
  },
  {
    name: "Swimming",
    description:
      "Full-body workout improving cardiovascular health and muscle strength",
    imageSrc: swimmingImg,
  },
  {
    name: "Volleyball",
    description:
      "Dynamic team sport enhancing reflexes, jumping ability, and communication",
    imageSrc: volleyballImg,
  },
];

interface SportsGridProps {
  onSelectSport: (sport: string) => void;
  selectedSport: string | null;
}

export function SportsGrid({ onSelectSport, selectedSport }: SportsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sports.map((sport) => (
        <SportCard
          key={sport.name}
          name={sport.name}
          description={sport.description}
          imageSrc={sport.imageSrc}
          onClick={() => onSelectSport(sport.name)}
          isSelected={selectedSport === sport.name}
        />
      ))}
    </div>
  );
}

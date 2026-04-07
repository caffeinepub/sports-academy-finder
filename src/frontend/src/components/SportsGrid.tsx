import { SportCard } from "./SportCard";

const sports = [
  {
    name: "Basketball",
    description:
      "Fast-paced team sport focusing on agility, coordination, and teamwork",
    imageFilename: "basketball-academy.dim_600x400.jpg",
  },
  {
    name: "Soccer",
    description:
      "The world's most popular sport, building endurance and strategic thinking",
    imageFilename: "soccer-academy.dim_600x400.jpg",
  },
  {
    name: "Tennis",
    description:
      "Individual or doubles sport developing precision, speed, and mental focus",
    imageFilename: "tennis-academy.dim_600x400.jpg",
  },
  {
    name: "Swimming",
    description:
      "Full-body workout improving cardiovascular health and muscle strength",
    imageFilename: "swimming-academy.dim_600x400.jpg",
  },
  {
    name: "Volleyball",
    description:
      "Dynamic team sport enhancing reflexes, jumping ability, and communication",
    imageFilename: "volleyball-academy.dim_600x400.jpg",
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
          imageFilename={sport.imageFilename}
          onClick={() => onSelectSport(sport.name)}
          isSelected={selectedSport === sport.name}
        />
      ))}
    </div>
  );
}

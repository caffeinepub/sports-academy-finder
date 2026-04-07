import { SportCard } from "./SportCard";

const sports = [
  {
    name: "Basketball",
    description:
      "Fast-paced team sport focusing on agility, coordination, and teamwork",
    imageFilename: "basketball.dim_800x600.png",
  },
  {
    name: "Soccer",
    description:
      "The world's most popular sport, building endurance and strategic thinking",
    imageFilename: "soccer.dim_800x600.png",
  },
  {
    name: "Tennis",
    description:
      "Individual or doubles sport developing precision, speed, and mental focus",
    imageFilename: "tennis.dim_800x600.png",
  },
  {
    name: "Swimming",
    description:
      "Full-body workout improving cardiovascular health and muscle strength",
    imageFilename: "swimming.dim_800x600.png",
  },
  {
    name: "Volleyball",
    description:
      "Dynamic team sport enhancing reflexes, jumping ability, and communication",
    imageFilename: "volleyball.dim_800x600.png",
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

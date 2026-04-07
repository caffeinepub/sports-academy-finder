import { SportCard } from "./SportCard";

const sports = [
  {
    name: "Basketball",
    description:
      "Fast-paced team sport focusing on agility, coordination, and teamwork",
  },
  {
    name: "Soccer",
    description:
      "The world's most popular sport, building endurance and strategic thinking",
  },
  {
    name: "Tennis",
    description:
      "Individual or doubles sport developing precision, speed, and mental focus",
  },
  {
    name: "Swimming",
    description:
      "Full-body workout improving cardiovascular health and muscle strength",
  },
  {
    name: "Volleyball",
    description:
      "Dynamic team sport enhancing reflexes, jumping ability, and communication",
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
          onClick={() => onSelectSport(sport.name)}
          isSelected={selectedSport === sport.name}
        />
      ))}
    </div>
  );
}

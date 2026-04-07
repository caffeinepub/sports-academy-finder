import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Trophy } from "lucide-react";
import { useGetAllPlaces, useGetPlacesBySport } from "../hooks/useQueries";
import { AcademyCard } from "./AcademyCard";

const academyImages = [
  "academy-1.dim_600x400.png",
  "academy-2.dim_600x400.png",
  "academy-3.dim_600x400.png",
];

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton
            className="aspect-[3/2] w-full"
            data-ocid="academies.loading_state"
          />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

interface FilteredAcademiesProps {
  sport: string;
}

function FilteredAcademies({ sport }: FilteredAcademiesProps) {
  const { data: places, isLoading, error } = useGetPlacesBySport(sport);

  if (isLoading) return <LoadingGrid />;

  if (error) {
    return (
      <Alert variant="destructive" data-ocid="academies.error_state">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load academies. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!places || places.length === 0) {
    return (
      <Alert data-ocid="academies.empty_state">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Academies Found</AlertTitle>
        <AlertDescription>
          No academies found for {sport}. Please check back later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      data-ocid="academies.list"
    >
      {places.map((place, index) => (
        <AcademyCard
          key={place.id.toString()}
          place={place}
          imageFilename={academyImages[index % academyImages.length]}
          data-ocid={`academies.item.${index + 1}`}
        />
      ))}
    </div>
  );
}

function AllAcademies() {
  const { data: places, isLoading, error } = useGetAllPlaces();

  if (isLoading) return <LoadingGrid />;

  if (error) {
    return (
      <Alert variant="destructive" data-ocid="academies.error_state">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load academies. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!places || places.length === 0) {
    return (
      <Alert data-ocid="academies.empty_state">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Academies Found</AlertTitle>
        <AlertDescription>
          There are currently no academies available. Please check back later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      data-ocid="academies.list"
    >
      {places.map((place, index) => (
        <AcademyCard
          key={place.id.toString()}
          place={place}
          imageFilename={academyImages[index % academyImages.length]}
          data-ocid={`academies.item.${index + 1}`}
        />
      ))}
    </div>
  );
}

interface AcademiesListProps {
  selectedSport: string | null;
}

export function AcademiesList({ selectedSport }: AcademiesListProps) {
  return (
    <>
      {selectedSport && (
        <div
          className="flex items-center gap-3 mb-8 justify-center"
          data-ocid="academies.filter.panel"
        >
          <Trophy className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold text-primary">
            {selectedSport} Academies in Chennai
          </span>
          <span className="text-sm text-muted-foreground">(5 locations)</span>
        </div>
      )}
      {selectedSport ? (
        <FilteredAcademies sport={selectedSport} />
      ) : (
        <AllAcademies />
      )}
    </>
  );
}

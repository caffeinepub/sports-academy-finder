import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Trophy } from "lucide-react";
import { useGetAllPlaces, useGetPlacesBySport } from "../hooks/useQueries";
import { AcademyCard } from "./AcademyCard";
import type { AcademyContactInfo } from "./AcademyCard";

// Contact details per location per sport
const academyContactMap: Record<string, Record<string, AcademyContactInfo>> = {
  Basketball: {
    Ramapuram: {
      phone: "+91 98400 11201",
      email: "basketball@ramapuram-sports.in",
      enrollmentUrl: "",
    },
    "Anna Nagar": {
      phone: "+91 98400 11202",
      email: "basketball@annanagar-sports.in",
      enrollmentUrl: "",
    },
    Kolathur: {
      phone: "+91 98400 11203",
      email: "basketball@kolathur-sports.in",
      enrollmentUrl: "",
    },
    Mylapore: {
      phone: "+91 98400 11204",
      email: "basketball@mylapore-sports.in",
      enrollmentUrl: "",
    },
    Santhome: {
      phone: "+91 98400 11205",
      email: "basketball@santhome-sports.in",
      enrollmentUrl: "",
    },
  },
  Soccer: {
    Ramapuram: {
      phone: "+91 98400 22201",
      email: "soccer@ramapuram-sports.in",
      enrollmentUrl: "",
    },
    "Anna Nagar": {
      phone: "+91 98400 22202",
      email: "soccer@annanagar-sports.in",
      enrollmentUrl: "",
    },
    Kolathur: {
      phone: "+91 98400 22203",
      email: "soccer@kolathur-sports.in",
      enrollmentUrl: "",
    },
    Mylapore: {
      phone: "+91 98400 22204",
      email: "soccer@mylapore-sports.in",
      enrollmentUrl: "",
    },
    Santhome: {
      phone: "+91 98400 22205",
      email: "soccer@santhome-sports.in",
      enrollmentUrl: "",
    },
  },
  Tennis: {
    Ramapuram: {
      phone: "+91 98400 33201",
      email: "tennis@ramapuram-sports.in",
      enrollmentUrl: "",
    },
    "Anna Nagar": {
      phone: "+91 98400 33202",
      email: "tennis@annanagar-sports.in",
      enrollmentUrl: "",
    },
    Kolathur: {
      phone: "+91 98400 33203",
      email: "tennis@kolathur-sports.in",
      enrollmentUrl: "",
    },
    Mylapore: {
      phone: "+91 98400 33204",
      email: "tennis@mylapore-sports.in",
      enrollmentUrl: "",
    },
    Santhome: {
      phone: "+91 98400 33205",
      email: "tennis@santhome-sports.in",
      enrollmentUrl: "",
    },
  },
  Swimming: {
    Ramapuram: {
      phone: "+91 98400 44201",
      email: "swimming@ramapuram-sports.in",
      enrollmentUrl: "",
    },
    "Anna Nagar": {
      phone: "+91 98400 44202",
      email: "swimming@annanagar-sports.in",
      enrollmentUrl: "",
    },
    Kolathur: {
      phone: "+91 98400 44203",
      email: "swimming@kolathur-sports.in",
      enrollmentUrl: "",
    },
    Mylapore: {
      phone: "+91 98400 44204",
      email: "swimming@mylapore-sports.in",
      enrollmentUrl: "",
    },
    Santhome: {
      phone: "+91 98400 44205",
      email: "swimming@santhome-sports.in",
      enrollmentUrl: "",
    },
  },
  Volleyball: {
    Ramapuram: {
      phone: "+91 98400 55201",
      email: "volleyball@ramapuram-sports.in",
      enrollmentUrl: "",
    },
    "Anna Nagar": {
      phone: "+91 98400 55202",
      email: "volleyball@annanagar-sports.in",
      enrollmentUrl: "",
    },
    Kolathur: {
      phone: "+91 98400 55203",
      email: "volleyball@kolathur-sports.in",
      enrollmentUrl: "",
    },
    Mylapore: {
      phone: "+91 98400 55204",
      email: "volleyball@mylapore-sports.in",
      enrollmentUrl: "",
    },
    Santhome: {
      phone: "+91 98400 55205",
      email: "volleyball@santhome-sports.in",
      enrollmentUrl: "",
    },
  },
};

const fallbackContact: AcademyContactInfo = {
  phone: "+91 98400 00000",
  email: "info@sports-hub.in",
  enrollmentUrl: "",
};

const KNOWN_AREAS = [
  "Anna Nagar",
  "Ramapuram",
  "Kolathur",
  "Mylapore",
  "Santhome",
];

function getAreaKey(placeName: string): string {
  for (const area of KNOWN_AREAS) {
    if (placeName.startsWith(area)) return area;
  }
  return placeName.split(" ")[0];
}

function getContactForPlace(sport: string, name: string): AcademyContactInfo {
  const areaKey = getAreaKey(name);
  return academyContactMap[sport]?.[areaKey] ?? fallbackContact;
}

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
          contact={getContactForPlace(place.sport, place.name)}
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
          contact={getContactForPlace(place.sport, place.name)}
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

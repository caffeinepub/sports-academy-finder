import { AcademyCard } from './AcademyCard';
import { useGetAllPlaces } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const academyImages = [
  'academy-1.dim_600x400.png',
  'academy-2.dim_600x400.png',
  'academy-3.dim_600x400.png',
];

export function AcademiesList() {
  const { data: places, isLoading, error } = useGetAllPlaces();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[3/2] w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
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
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Academies Found</AlertTitle>
        <AlertDescription>
          There are currently no academies available. Please check back later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place, index) => (
        <AcademyCard
          key={place.id.toString()}
          place={place}
          imageFilename={academyImages[index % academyImages.length]}
        />
      ))}
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { Place } from '../backend';

interface AcademyCardProps {
  place: Place;
  imageFilename: string;
}

export function AcademyCard({ place, imageFilename }: AcademyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        {!imageLoaded && !imageError && (
          <Skeleton className="absolute inset-0" />
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground text-sm">Image unavailable</span>
          </div>
        ) : (
          <img
            src={`/assets/generated/${imageFilename}`}
            alt={`${place.name} academy`}
            className={`w-full h-full object-cover ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{place.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm">{place.description}</p>
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-muted-foreground">
            <div>Latitude: {place.location.lat.toFixed(4)}°</div>
            <div>Longitude: {place.location.long.toFixed(4)}°</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

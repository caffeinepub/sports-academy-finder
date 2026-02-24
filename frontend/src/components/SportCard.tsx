import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SportCardProps {
  name: string;
  description: string;
  imageFilename: string;
}

export function SportCard({ name, description, imageFilename }: SportCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
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
            alt={`${name} sport`}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}

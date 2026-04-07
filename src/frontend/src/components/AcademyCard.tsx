import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";
import { useState } from "react";
import type { Place } from "../backend";

interface AcademyCardProps {
  place: Place;
  imageFilename: string;
  "data-ocid"?: string;
}

// Derive area name from place name (e.g. "Ramapuram Basketball Academy" -> "Ramapuram, Chennai")
function extractArea(name: string): string {
  const parts = name.split(" ");
  // The first word is the area name
  if (parts.length > 0) {
    return `${parts[0]}, Chennai`;
  }
  return "Chennai";
}

export function AcademyCard({
  place,
  imageFilename,
  "data-ocid": dataOcid,
}: AcademyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const area = extractArea(place.name);

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300"
      data-ocid={dataOcid}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        {!imageLoaded && !imageError && (
          <Skeleton className="absolute inset-0" />
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground text-sm">
              Image unavailable
            </span>
          </div>
        ) : (
          <img
            src={`/assets/generated/${imageFilename}`}
            alt={`${place.name} academy`}
            className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        {place.sport && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary/90 text-primary-foreground text-xs font-semibold shadow">
              {place.sport}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{place.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm">{place.description}</p>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="text-muted-foreground font-medium">{area}</span>
        </div>
      </CardContent>
    </Card>
  );
}

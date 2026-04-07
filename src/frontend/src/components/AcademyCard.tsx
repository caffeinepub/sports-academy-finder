import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import type { Place } from "../backend";
import { EnrollmentFormDialog } from "./EnrollmentFormDialog";

export interface AcademyContactInfo {
  phone: string;
  email: string;
  enrollmentUrl: string;
}

interface AcademyCardProps {
  place: Place;
  imageFilename: string;
  contact: AcademyContactInfo;
  "data-ocid"?: string;
}

function extractArea(name: string): string {
  const parts = name.split(" ");
  if (parts.length > 0) {
    return `${parts[0]}, Chennai`;
  }
  return "Chennai";
}

export function AcademyCard({
  place,
  imageFilename,
  contact,
  "data-ocid": dataOcid,
}: AcademyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const area = extractArea(place.name);

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
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
      <CardHeader className="pb-2">
        <CardTitle className="text-lg leading-snug">{place.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex-1 flex flex-col">
        <p className="text-muted-foreground text-sm">{place.description}</p>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="text-muted-foreground font-medium">{area}</span>
        </div>

        {/* Contact Details */}
        <div className="border-t pt-3 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Contact
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary flex-shrink-0" />
            <a
              href={`tel:${contact.phone}`}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {contact.phone}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-primary flex-shrink-0" />
            <a
              href={`mailto:${contact.email}`}
              className="text-foreground hover:text-primary transition-colors font-medium truncate"
            >
              {contact.email}
            </a>
          </div>
        </div>

        {/* Enrollment Dialog */}
        <div className="mt-auto pt-2">
          <EnrollmentFormDialog
            academyName={place.name}
            sport={place.sport}
            trigger={
              <Button
                className="w-full"
                size="sm"
                data-ocid="academy.enroll_button"
              >
                Enroll Now
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

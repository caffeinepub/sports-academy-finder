import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Place } from "../backend";
import { EnrollmentFormDialog } from "./EnrollmentFormDialog";
import { SportIllustration } from "./SportIllustration";

export interface AcademyContactInfo {
  phone: string;
  email: string;
  enrollmentUrl: string;
}

interface AcademyCardProps {
  place: Place;
  contact: AcademyContactInfo;
  "data-ocid"?: string;
}

const KNOWN_AREAS = [
  "Anna Nagar",
  "Ramapuram",
  "Kolathur",
  "Mylapore",
  "Santhome",
];

function extractArea(name: string): string {
  for (const area of KNOWN_AREAS) {
    if (name.startsWith(area)) return area;
  }
  return "";
}

export function AcademyCard({
  place,
  contact,
  "data-ocid": dataOcid,
}: AcademyCardProps) {
  const area = extractArea(place.name);
  const locationLabel = area ? `${area}, Chennai` : "Chennai";

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
      data-ocid={dataOcid}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <SportIllustration
          sport={place.sport}
          location={area}
          className="absolute inset-0 w-full h-full hover:scale-105 transition-transform duration-300"
        />
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
          <span className="text-muted-foreground font-medium">
            {locationLabel}
          </span>
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

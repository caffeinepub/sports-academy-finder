import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

interface SportCardProps {
  name: string;
  description: string;
  imageFilename: string;
  onClick: () => void;
  isSelected: boolean;
}

export function SportCard({
  name,
  description,
  imageFilename,
  onClick,
  isSelected,
}: SportCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <button
      type="button"
      className={`overflow-hidden group transition-all duration-300 cursor-pointer hover:-translate-y-1 w-full text-left rounded-xl border bg-card text-card-foreground shadow-sm ${
        isSelected
          ? "ring-2 ring-primary shadow-xl shadow-primary/20 -translate-y-1"
          : "hover:shadow-lg"
      }`}
      onClick={onClick}
      aria-pressed={isSelected}
      data-ocid={`sport.${name.toLowerCase()}.card`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted rounded-t-xl">
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
            alt={`${name} sport`}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/10 flex items-end justify-end p-3">
            <CheckCircle className="h-6 w-6 text-primary drop-shadow" />
          </div>
        )}
      </div>
      <div
        className={`p-6 transition-colors duration-200 ${
          isSelected ? "bg-primary/5" : ""
        }`}
      >
        <h3
          className={`text-xl font-bold mb-2 ${
            isSelected ? "text-primary" : ""
          }`}
        >
          {name}
        </h3>
        <p className="text-muted-foreground text-sm">{description}</p>
        {isSelected && (
          <p className="text-primary text-xs font-semibold mt-3 uppercase tracking-wider">
            Viewing Academies ↓
          </p>
        )}
      </div>
    </button>
  );
}

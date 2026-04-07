import { useEffect, useRef, useState } from "react";
import { AcademiesList } from "./components/AcademiesList";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SportsGrid } from "./components/SportsGrid";
import { useGetAllPlaces, useInitializePlaces } from "./hooks/useQueries";

function App() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const academiesRef = useRef<HTMLElement>(null);
  const { data: places } = useGetAllPlaces();
  const { mutate: initializePlaces } = useInitializePlaces();

  // Seed the backend data once on load if places are empty
  useEffect(() => {
    if (places !== undefined && places.length === 0) {
      initializePlaces();
    }
  }, [places, initializePlaces]);

  const handleSelectSport = (sport: string) => {
    setSelectedSport((prev) => {
      const next = prev === sport ? null : sport;
      // Scroll to academies section after state update
      if (next !== null) {
        setTimeout(() => {
          academiesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 50);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Discover Your Sport
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore a variety of sports and find the perfect academy near
                you to start your athletic journey
              </p>
              {!selectedSport && (
                <p className="text-sm text-primary mt-3 font-medium animate-pulse">
                  ↓ Click a sport card to explore academies in Chennai
                </p>
              )}
            </div>
            <SportsGrid
              onSelectSport={handleSelectSport}
              selectedSport={selectedSport}
            />
          </div>
        </section>

        <section
          ref={academiesRef}
          className="py-16 px-4 bg-muted/10 scroll-mt-4"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {selectedSport ? (
                  <>
                    <span className="text-primary">{selectedSport}</span>
                    {" Academies"}
                  </>
                ) : (
                  "Nearby Academies"
                )}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {selectedSport
                  ? `Top ${selectedSport} academies across 5 key Chennai locations — Ramapuram, Anna Nagar, Kolathur, Mylapore & Santhome`
                  : "Find top-rated sports academies in your area with expert coaching and world-class facilities"}
              </p>
              {selectedSport && (
                <button
                  type="button"
                  onClick={() => setSelectedSport(null)}
                  className="mt-4 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                  data-ocid="academies.filter.toggle"
                >
                  ✕ Clear filter — show all academies
                </button>
              )}
            </div>
            <AcademiesList selectedSport={selectedSport} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

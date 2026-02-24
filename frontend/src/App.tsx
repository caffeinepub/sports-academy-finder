import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SportsGrid } from './components/SportsGrid';
import { AcademiesList } from './components/AcademiesList';

function App() {
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
                Explore a variety of sports and find the perfect academy near you to start your athletic journey
              </p>
            </div>
            <SportsGrid />
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/10">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nearby Academies
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find top-rated sports academies in your area with expert coaching and world-class facilities
              </p>
            </div>
            <AcademiesList />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl">SPORTS MANAGEMENT HUB</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#sports" className="text-sm font-medium hover:text-primary transition-colors">
            Sports
          </a>
          <a href="#academies" className="text-sm font-medium hover:text-primary transition-colors">
            Academies
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </a>
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <a href="#sports" className="text-lg font-medium hover:text-primary transition-colors">
                Sports
              </a>
              <a href="#academies" className="text-lg font-medium hover:text-primary transition-colors">
                Academies
              </a>
              <a href="#about" className="text-lg font-medium hover:text-primary transition-colors">
                About
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

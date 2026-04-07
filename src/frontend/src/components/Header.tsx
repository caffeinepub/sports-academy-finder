import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogIn, LogOut, Menu, ShieldCheck } from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface HeaderProps {
  isAdmin: boolean;
  showAdminPanel: boolean;
  onAdminPanel: () => void;
}

export function Header({ isAdmin, showAdminPanel, onAdminPanel }: HeaderProps) {
  const { login, clear, identity, isLoggingIn } = useInternetIdentity();
  const isLoggedIn = !!identity;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline">
            SPORTS MANAGEMENT HUB
          </span>
          <span className="font-bold text-base sm:hidden">SMH</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#sports"
            className="text-sm font-medium hover:text-primary transition-colors"
            data-ocid="header.link"
          >
            Sports
          </a>
          <a
            href="#academies"
            className="text-sm font-medium hover:text-primary transition-colors"
            data-ocid="header.link"
          >
            Academies
          </a>
          <a
            href="#about"
            className="text-sm font-medium hover:text-primary transition-colors"
            data-ocid="header.link"
          >
            About
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isLoggedIn && isAdmin && (
            <Button
              variant={showAdminPanel ? "default" : "outline"}
              size="sm"
              onClick={onAdminPanel}
              className="hidden md:flex items-center gap-1.5"
              data-ocid="header.admin_panel.button"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin Panel
            </Button>
          )}

          {isLoggedIn ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => clear()}
              className="hidden md:flex items-center gap-1.5 text-muted-foreground hover:text-destructive"
              data-ocid="header.logout.button"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => login()}
              disabled={isLoggingIn}
              className="hidden md:flex items-center gap-1.5"
              data-ocid="header.login.button"
            >
              <LogIn className="h-4 w-4" />
              {isLoggingIn ? "Connecting..." : "Login"}
            </Button>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                data-ocid="header.mobile_menu.button"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <a
                  href="#sports"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  data-ocid="header.mobile.link"
                >
                  Sports
                </a>
                <a
                  href="#academies"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  data-ocid="header.mobile.link"
                >
                  Academies
                </a>
                <a
                  href="#about"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  data-ocid="header.mobile.link"
                >
                  About
                </a>

                <div className="border-t pt-4 flex flex-col gap-3">
                  {isLoggedIn && isAdmin && (
                    <Button
                      variant={showAdminPanel ? "default" : "outline"}
                      onClick={onAdminPanel}
                      className="justify-start gap-2"
                      data-ocid="header.mobile.admin_panel.button"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Admin Panel
                    </Button>
                  )}
                  {isLoggedIn ? (
                    <Button
                      variant="ghost"
                      onClick={() => clear()}
                      className="justify-start gap-2 text-muted-foreground"
                      data-ocid="header.mobile.logout.button"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => login()}
                      disabled={isLoggingIn}
                      className="justify-start gap-2"
                      data-ocid="header.mobile.login.button"
                    >
                      <LogIn className="h-4 w-4" />
                      {isLoggingIn ? "Connecting..." : "Login"}
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

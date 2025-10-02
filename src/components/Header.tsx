import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsMenuOpen(false);
    }
  };

  // Helper function to determine if a nav link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b bg-card" role="banner">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" aria-hidden="true" />
            <h1 className="text-2xl font-bold text-foreground">
              <Link to="/" className="hover:text-primary transition-colors" aria-label="EduMasters Home">
                EduMasters
              </Link>
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6 items-center" role="navigation" aria-label="Main navigation">
            <Link 
              to="/" 
              className={`transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1 ${
                isActive("/") ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/universities" 
              className={`transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1 ${
                isActive("/universities") ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Universities
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1 ${
                isActive("/about") ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1 ${
                isActive("/contact") ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Contact Us
            </Link>
          </nav>
          <div className="hidden md:flex">
            {/* Conditionally render Back to Home button only if not on home page */}
            {!isActive("/") && (
              <Button asChild>
                <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-primary">Back to Home</Link>
              </Button>
            )}
          </div>
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onKeyDown={handleKeyPress}
            >
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden mt-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1 ${
                  isActive("/") ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                }`} 
                onClick={() => setIsMenuOpen(false)}
                onKeyDown={handleKeyPress}
              >
                Home
              </Link>
              <Link 
                to="/universities" 
                className={`transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1 ${
                  isActive("/universities") ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                }`} 
                onClick={() => setIsMenuOpen(false)}
                onKeyDown={handleKeyPress}
              >
                Universities
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1 ${
                  isActive("/about") ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                }`} 
                onClick={() => setIsMenuOpen(false)}
                onKeyDown={handleKeyPress}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1 ${
                  isActive("/contact") ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                }`} 
                onClick={() => setIsMenuOpen(false)}
                onKeyDown={handleKeyPress}
              >
                Contact Us
              </Link>
              {/* Conditionally render Back to Home button only if not on home page */}
              {!isActive("/") && (
                <Button asChild>
                  <Link 
                    to="/" 
                    onClick={() => setIsMenuOpen(false)}
                    onKeyDown={handleKeyPress}
                    className="focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    Back to Home
                  </Link>
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

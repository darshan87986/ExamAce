import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsMenuOpen(false);
    }
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
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1">Home</Link>
            <Link to="/universities" className="text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1">Universities</Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1">About Us</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1">Contact Us</Link>
          </nav>
          <div className="hidden md:flex">
            <Button asChild>
              <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-primary">Back to Home</Link>
            </Button>
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
                className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1" 
                onClick={() => setIsMenuOpen(false)}
                onKeyDown={handleKeyPress}
              >
                Home
              </Link>
              <Link 
                to="/universities" 
                className="text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1" 
                onClick={() => setIsMenuOpen(false)}
                onKeyDown={handleKeyPress}
              >
                Universities
              </Link>
              <Link 
                to="/about" 
                className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1" 
                onClick={() => setIsMenuOpen(false)}
                onKeyDown={handleKeyPress}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 py-1" 
                onClick={() => setIsMenuOpen(false)}
                onKeyDown={handleKeyPress}
              >
                Contact Us
              </Link>
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

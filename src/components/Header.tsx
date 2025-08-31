import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">EduMasters</h1>
          </div>
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/universities" className="text-primary font-medium">Universities</Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
          </nav>
          <div className="hidden md:flex">
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/universities" className="text-primary font-medium" onClick={() => setIsMenuOpen(false)}>Universities</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
              <Button asChild>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Back to Home</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

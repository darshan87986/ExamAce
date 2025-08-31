import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">ExamAce Vault</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/universities" className="text-primary font-medium">Universities</Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
          </nav>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
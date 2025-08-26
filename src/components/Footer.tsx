import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary border-t py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
              <span className="font-bold text-primary-foreground">ExamAce Vault</span>
            </div>
            <p className="text-white/80 text-sm">
              Your trusted platform for academic resources and exam preparation materials.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li><Link to="/resources" className="hover:text-white transition-colors">All Resources</Link></li>
              <li><Link to="/subjects" className="hover:text-white transition-colors">Browse by Subject</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">Advanced Search</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Connect</h4>
            <p className="text-white/80 mb-4 text-sm">
              Stay updated with the latest resources and exam tips.
            </p>
            <Button className="w-full text-sm bg-white text-primary hover:bg-white/90">Subscribe to Updates</Button>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p className="text-sm">&copy; 2025 EduMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
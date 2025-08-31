import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { SubscriptionPopup } from "./SubscriptionPopup";

const Footer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <footer className="bg-primary border-t py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo + description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
              <span className="font-bold text-primary-foreground">
                ExamAce Vault
              </span>
            </div>
            <p className="text-white/80 text-sm">
              Your trusted platform for academic resources and exam preparation
              materials.
            </p>
          </div>

          {/* Support links */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-conditions"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">
              Connect
            </h4>
            <p className="text-white/80 mb-4 text-sm">
              Stay updated with the latest resources and exam tips.
            </p>
            <Button
              className="w-full text-sm bg-white text-primary hover:bg-white/90 transition-all duration-300"
              onClick={() => setIsPopupOpen(true)}
            >
              Subscribe to Updates
            </Button>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p className="text-sm">
            &copy; 2025 ExamAce Vault. All rights reserved.
          </p>
        </div>
      </div>

      {/* Subscription popup */}
      {isPopupOpen && (
        <SubscriptionPopup onClose={() => setIsPopupOpen(false)} />
      )}
    </footer>
  );
};

export default Footer;

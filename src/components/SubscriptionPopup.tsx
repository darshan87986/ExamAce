import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionPopup = ({ isOpen, onClose }: SubscriptionPopupProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Debug effect to log prop changes
  useEffect(() => {
    console.log('SubscriptionPopup props changed - isOpen:', isOpen);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with email:', email); // Debug log
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Attempting to insert email into database...'); // Debug log
      const { error } = await supabase.from("subscribers").insert({ email: email.trim() });

      if (error) {
        console.error('Database error:', error); // Debug log
        if (error.code === '23505') { 
             toast({
                title: "Already Subscribed",
                description: "This email address is already subscribed.",
                variant: "destructive",
            });
        } else {
            throw error;
        }
      } else {
         console.log('Successfully inserted email'); // Debug log
         toast({
            title: "Success!",
            description: "You have successfully subscribed to our updates.",
        });
        setEmail("");
        onClose();
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug render
  console.log('SubscriptionPopup rendering - isOpen:', isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe to Updates</DialogTitle>
          <DialogDescription>
            Enter your email address to receive the latest resources and exam tips.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
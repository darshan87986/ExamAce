import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ChevronRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface University {
  id: string;
  name: string;
  code: string;
  location?: string;
}

interface Degree {
  id: string;
  name: string;
  code: string;
  description?: string;
}

const Degrees = () => {
  const navigate = useNavigate();
  const { universityId } = useParams();
  const [university, setUniversity] = useState<University | null>(null);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (universityId) {
      fetchUniversity();
      fetchDegrees();
    }
  }, [universityId]);

  const fetchUniversity = async () => {
    try {
      console.log("Fetching university with ID:", universityId);
      const { data, error } = await supabase
        .from("universities")
        .select("*")
        .eq("id", universityId)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      setUniversity(data);
      console.log("University data:", data);
    } catch (error) {
      console.error("Error fetching university:", error);
    }
  };

  const fetchDegrees = async () => {
    console.log("Fetching degrees for university ID:", universityId);
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("degrees" as any)
        .select("*")
        .eq("university_id", universityId)
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      console.log("Degrees data:", data);
      setDegrees((data as any) || []);
    } catch (error) {
      console.error("Error fetching degrees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDegreeSelect = (degree: Degree) => {
    navigate(`/universities/${universityId}/degrees/${degree.id}`);
  };

  // Redirects the user back to the universities page
  const handleBackToUniversities = () => {
    navigate(-1);
  };

  const FooterComponent = () => (
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

      {/* Breadcrumb Navigation */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to="/universities" className="text-muted-foreground hover:text-primary">Universities</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary font-medium">{university?.name}</span>
          </div>
        </div>
      </section>

      {/* Degrees View */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* <div className="flex items-center gap-4 mb-8">
            <Button
              // Button to navigate back to the universities page
              variant="ghost"
              onClick={handleBackToUniversities}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Universities
            </Button>
          </div> */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {university?.name} - Available Degree Programs
            </h1>
            <p className="text-lg text-muted-foreground">
              Select a degree program to browse available semesters and subjects
            </p>
          </div>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {degrees.map((degree) => (
                <Card
                  key={degree.id}
                  className="group cursor-pointer bg-gradient-to-br from-white to-gray-50/50 hover:from-white hover:to-secondary/5 hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-lg hover:shadow-secondary/10"
                  onClick={() => handleDegreeSelect(degree)}
                >
                  <CardHeader className="text-center">
                    <GraduationCap className="h-16 w-16 text-secondary-foreground mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-xl font-bold group-hover:text-secondary-foreground transition-colors">{degree.code}</CardTitle>
                    <CardDescription className="text-sm font-medium">{degree.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button className="w-full bg-primary from-secondary-foreground to-secondary/90 hover:from-secondary/90 hover:to-secondary shadow-lg hover:shadow-xl transition-all duration-300">
                      Browse {degree.code} Semesters
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {!loading && degrees.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No degree programs available for {university?.name}</p>
            </div>
          )}
        </div>
      </section>
      <FooterComponent />
    </div>
  );
};

export default Degrees;
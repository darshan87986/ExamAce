import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, ChevronRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CommentSection } from "@/components/CommentSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";



interface University {
  id: string;
  name: string;
  code: string;
}

interface Degree {
  id: string;
  name: string;
  code: string;
  universities: University;
}

interface Semester {
  id: string;
  degree_id: string;
  semester_number: number;
  name: string;
}

const Semesters = () => {
  const navigate = useNavigate();
  const { universityId, degreeId } = useParams();
  const [degree, setDegree] = useState<Degree | null>(null);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (degreeId) {
      fetchDegree();
      fetchSemesters();
    }
  }, [degreeId]);

  const fetchDegree = async () => {
    try {
      const { data, error } = await supabase
        .from("degrees")
        .select("*, universities(*)")
        .eq("id", degreeId)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      setDegree(data);
    } catch (error) {
      console.error("Error fetching degree:", error);
    }
  };

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("semesters" as any)
        .select("*")
        .eq("degree_id", degreeId)
        .eq("is_active", true)
        .order("semester_number");

      if (error) throw error;
      setSemesters((data as any) || []);
    } catch (error) {
      console.error("Error fetching semesters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSemesterSelect = (semester: Semester) => {
    navigate(`/universities/${universityId}/degrees/${degreeId}/semesters/${semester.id}`);
  };

  const handleBackToDegrees = () => {
    navigate(-1);
  };

  const FooterComponent = () => (
    <footer className="bg-primary border-t py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
              <span className="font-bold text-primary-foreground">EduMasters</span>
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
      <Header />

      {/* Breadcrumb Navigation */}
      <section className="py-6 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to="/universities" className="text-muted-foreground hover:text-primary">Universities</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to={`/universities/${universityId}`} className="text-muted-foreground hover:text-primary">{degree?.universities?.name}</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary font-medium">{degree?.name}</span>
          </div>
        </div>
      </section>

      {/* Semesters View */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={handleBackToDegrees}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Degrees
            </Button>
          </div> */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {degree?.name} - Available Semesters
            </h1>
            <p className="text-lg text-muted-foreground">
              Select a semester to browse available subjects and resources
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
              {semesters.map((semester) => (
                <Card
                  key={semester.id}
                  className="group cursor-pointer bg-gradient-to-br from-white to-gray-50/50 hover:from-white hover:to-accent/5 hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-lg hover:shadow-accent/10"
                  onClick={() => handleSemesterSelect(semester)}
                >
                  <CardHeader className="text-center">
                    <Badge variant="secondary" className="mx-auto mb-4 text-lg font-bold group-hover:scale-110 transition-transform">
                      Semester {semester.semester_number}
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button className="w-full bg-primary from-accent-foreground to-accent/90 hover:from-accent/90 hover:to-accent shadow-lg hover:shadow-xl transition-all duration-300">
                      Browse {semester.name} Subjects
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {!loading && semesters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No semesters available for {degree?.name}</p>
            </div>
          )}
        </div>
      </section>

      {degree && (
  <section className="py-16 bg-muted/30">
    <CommentSection 
      degreeId={degree.id} 
      degreeName={degree.name} 
    />
  </section>
)}


      <Footer />
    </div>
  );
};

export default Semesters;

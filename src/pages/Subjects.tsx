import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ChevronRight, ArrowLeft, BookOpen } from "lucide-react";
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
  degrees: Degree;
}

interface Subject {
  id: string;
  semester_id: string;
  name: string;
  code: string;
  description?: string;
}

const Subjects = () => {
  const navigate = useNavigate();
  const { universityId, degreeId, semesterId } = useParams();
  const [semester, setSemester] = useState<Semester | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (semesterId) {
      fetchSemester();
      fetchSubjects();
    }
  }, [semesterId]);

  const fetchSemester = async () => {
    try {
      const { data, error } = await supabase
        .from("semesters")
        .select("*, degrees(*, universities(*))")
        .eq("id", semesterId)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      setSemester(data);
    } catch (error) {
      console.error("Error fetching semester:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("subjects" as any)
        .select("*")
        .eq("semester_id", semesterId)
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      setSubjects((data as any) || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectSelect = (subject: Subject) => {
    navigate(`/subjects/${subject.id}/resources`);
  };

  // Redirects the user back to the semesters page
  const handleBackToSemesters = () => {
    navigate(`/universities/${universityId}/degrees/${degreeId}`);
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
            <Link to={`/universities/${universityId}`} className="text-muted-foreground hover:text-primary">{semester?.degrees?.universities?.name}</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to={`/universities/${universityId}/degrees/${degreeId}`} className="text-muted-foreground hover:text-primary">{semester?.degrees?.name}</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary font-medium">{semester?.name}</span>
          </div>
        </div>
      </section>

      {/* Subjects View */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* <div className="flex items-center gap-4 mb-8">
            <Button
              // Button to navigate back to the semesters page
              variant="ghost"
              onClick={handleBackToSemesters}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Semesters
            </Button>
          </div> */}
          
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              {semester?.degrees?.code} - {semester?.name} - Choose Subject
            </h3>
            <p className="text-muted-foreground">
              Select a subject to view available question papers, solved papers, and notes
            </p>
          </div>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-16 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <Card 
                  key={subject.id} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                  // onClick={() => handleSubjectSelect(subject)}
                >
                  <CardHeader className="text-center">
                    <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription className="text-sm">{subject.code}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm mb-4">
                      {subject.description || `Study materials for ${subject.name}`}
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => handleSubjectSelect(subject)}
                    >
                      Access {subject.name} Resources
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {!loading && subjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No subjects available for {semester?.name}</p>
            </div>
          )}
        </div>
      </section>
      {semester?.degrees && (
  <section className="py-16 bg-muted/30">
    <CommentSection 
      degreeId={semester.degrees.id} 
      degreeName={semester.degrees.name} 
    />
  </section>
)}

      <Footer />
    </div>
  );
};

export default Subjects;
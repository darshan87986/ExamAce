import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, ArrowLeft, Download } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CommentSection } from "@/components/CommentSection";


interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  semesters?: {
    id: string;
    name: string;
    degrees?: {
      id: string;
      name: string;
      code: string;
      universities?: {
        id: string;
        name: string;
        code: string;
      };
    };
  };
}

interface Resource {
  id: string;
  title: string;
  description?: string;
  resource_type: string;
  file_path: string;
  course: string;
  year: string;
  download_count: number;
}

const SubjectResources = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    console.log("History length:", window.history.length);
    console.log("Current state:", window.history.state);
  }, []);
  
  useEffect(() => {
    if (subjectId) {
      fetchSubject();
      fetchResources();
    }
  }, [subjectId]);

  // Filter resources by type
  useEffect(() => {
    if (selectedType === "all") {
      setFilteredResources(resources);
    } else {
      setFilteredResources(
        resources.filter((r) => r.resource_type === selectedType)
      );
    }
  }, [selectedType, resources]);

  const fetchSubject = async () => {
    try {
      const { data, error } = await supabase
        .from("subjects")
        .select(`
          *,
          semesters (
            id,
            name,
            degrees (
              id,
              name,
              code,
              universities (
                id,
                name,
                code
              )
            )
          )
        `)
        .eq("id", subjectId)
        .single();

      if (error) throw error;
      setSubject(data);
    } catch (error) {
      console.error("Error fetching subject:", error);
    }
  };

  const fetchResources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("Exam-prep")
        .select("*")
        .eq("subject_id", subjectId);

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (id: string, filePath: string, title: string) => {
    try {
      const { data, error } = await supabase
        .from("Exam-prep")
        .select("file_path")
        .eq("id", id)
        .single();

      if (error) throw error;

      const url = data.file_path;

      // Open file in a new tab to trigger download
      window.open(url, '_blank');
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleBackToSubjects = () => {
    if (subject?.semesters) {
      const universityId = subject.semesters.degrees?.universities?.id;
      const degreeId = subject.semesters.degrees?.id;
      const semesterId = subject.semesters.id;
      navigate(`/universities/${universityId}/degrees/${degreeId}/semesters/${semesterId}`);
    } else {
      // Fallback navigation
      navigate(-1);
    }
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

      {/* Resources Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={handleBackToSubjects}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Subjects
            </Button>
          </div> */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              {subject?.semesters?.degrees?.code} - {subject?.semesters?.name} - {subject?.name}
            </h3>
            <p className="text-muted-foreground">
              Browse and download resources for {subject?.name}
            </p>
          </div>
          <div className="flex justify-center space-x-2 mb-8">
            {[
              { key: "all", label: "All Resources" },
              { key: "question_paper", label: "Question Papers" },
              { key: "solved_paper", label: "Solved Papers" },
              { key: "notes", label: "Study Notes" }
            ].map((type) => (
              <Button
                key={type.key}
                variant={selectedType === type.key ? "default" : "outline"}
                onClick={() => setSelectedType(type.key)}
                className="rounded-full"
              >
                {type.label}
              </Button>
            ))}
          </div>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.course} • {resource.year}</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {resource.resource_type.replace("_", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {resource.description || "Comprehensive study material for exam preparation"}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        <Download className="h-4 w-4 inline mr-1" />
                        {resource.download_count} downloads
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleDownload(resource.id, resource.file_path, resource.title)}
                      >
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {!loading && filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No {selectedType === "all" ? "resources" : selectedType.replace("_", " ")} found for {subject?.name}
              </p>
            </div>
          )}
        </div>
      </section>

      {subject?.semesters?.degrees && (
  <section className="py-16 bg-muted/30">
    <CommentSection 
      degreeId={subject.semesters.degrees.id} 
      degreeName={subject.semesters.degrees.name} 
    />
  </section>
)}


      <FooterComponent />
    </div>
  );
};

export default SubjectResources;
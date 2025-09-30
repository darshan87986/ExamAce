import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Download } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CommentSection } from "@/components/CommentSection";
import Footer from "@/components/Footer";

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

interface SolvedQP {
  id: string;
  title: string;
  description?: string;
  year: string;
  content_markdown: string;
}

const SubjectResources = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [solvedQps, setSolvedQps] = useState<SolvedQP[]>([]);
  const [filteredResources, setFilteredResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    if (subjectId) {
      fetchSubject();
      fetchResources();
    }
  }, [subjectId]);

  useEffect(() => {
    let all = [
      ...resources.map((r) => ({ ...r, kind: "resource" })),
      ...solvedQps.map((q) => ({ ...q, kind: "solved_qp", resource_type: "solved_paper" })),
    ];

    if (selectedType === "all") {
      setFilteredResources(all);
    } else {
      setFilteredResources(all.filter((r) => r.resource_type === selectedType));
    }
  }, [selectedType, resources, solvedQps]);

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
      setResources(
        (data || []).map((r: any) => ({
          ...r,
          id: String(r.id),
          year: String(r.year),
        }))
      );

      const { data: solvedData, error: solvedError } = await (supabase as any)
        .from("solved-papers")
        .select("id, title, description, year, content, subject_id") // use 'content'
        .eq("subject_id", subjectId);

      if (solvedError) throw solvedError;
      setSolvedQps(
        (solvedData || []).map((qp) => ({
          ...qp,
          content_markdown: qp.content, // map 'content' to 'content_markdown'
        }))
      );
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (filePath: string) => {
    window.open(filePath, "_blank");
  };

  const handleSolvedClick = (qp: SolvedQP) => {
    navigate(`/solved/${qp.id}`, { state: { qp } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">EduMasters</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <Link to="/universities" className="text-primary font-medium">Universities</Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link>
          </nav>
          <Button asChild><Link to="/">Back to Home</Link></Button>
        </div>
      </header>

      {/* Resources Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              {subject?.semesters?.degrees?.code} - {subject?.semesters?.name} - {subject?.name}
            </h3>
            <p className="text-muted-foreground">
              Browse resources for {subject?.name}
            </p>
          </div>

          {/* Filters */}
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

          {/* Cards */}
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
              {filteredResources.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.year || item.course}</CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {item.resource_type?.replace("_", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description || "Comprehensive material for exam preparation"}
                    </p>
                    {item.kind === "resource" ? (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          <Download className="h-4 w-4 inline mr-1" />
                          {item.download_count} downloads
                        </span>
                        <Button size="sm" onClick={() => handleDownload(item.file_path)}>
                          Download
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" onClick={() => handleSolvedClick(item)}>
                        View Article
                      </Button>
                    )}
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

      <Footer />
    </div>
  );
};

export default SubjectResources;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin, ChevronRight, ArrowLeft, BookOpen, Download } from "lucide-react";
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

interface Semester {
  id: string;
  degree_id: string;
  semester_number: number;
  name: string;
}

interface Subject {
  id: string;
  semester_id: string;
  name: string;
  code: string;
  description?: string;
}

const Universities = () => {
  const navigate = useNavigate();
  const { universityId, degreeId, semesterId } = useParams();
  const [universities, setUniversities] = useState<University[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null); 
  const [currentView, setCurrentView] = useState<"home" | "universities" | "degrees" | "semesters" | "subjects" | "resources">("universities");
  const [selectedType, setSelectedType] = useState("all");
  const [resources, setResources] = useState<any[]>([]);
  const [filteredResources, setFilteredResources] = useState<any[]>([]);

  useEffect(() => {
    if (currentView === "universities") {
      fetchUniversities();
    } else if (currentView === "degrees" && universityId) {
      fetchUniversityById(universityId);
      fetchDegrees();
    } else if (currentView === "semesters" && degreeId) {
      fetchDegreeById(degreeId);
      fetchSemesters();
    } else if (currentView === "subjects" && semesterId) {
      fetchSemesterById(semesterId);
      fetchSubjects();
    }
  }, [currentView, universityId, degreeId, semesterId]);

  // Fetch resources for selected subject
  useEffect(() => {
    if (currentView === "resources" && selectedSubject) {
      setLoading(true);
      supabase
        .from("resources")
        .select("*")
        .eq("subject_id", selectedSubject.id)
        .then(({ data, error }) => {
          setResources(data || []);
          setLoading(false);
        });
    }
  }, [currentView, selectedSubject]);

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

  const fetchUniversityById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("universities")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      setSelectedUniversity(data);
    } catch (error) {
      console.error("Error fetching university:", error);
    }
  };

  const fetchDegreeById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("degrees")
        .select("*, universities(*)")
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      setSelectedDegree(data);
      setSelectedUniversity(data.universities);
    } catch (error) {
      console.error("Error fetching degree:", error);
    }
  };

  const fetchSemesterById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("semesters")
        .select("*, degrees(*, universities(*))")
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      setSelectedSemester(data);
      setSelectedDegree(data.degrees);
      setSelectedUniversity(data.degrees.universities);
    } catch (error) {
      console.error("Error fetching semester:", error);
    }
  };

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("universities" as any)
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      setUniversities((data as any) || []);
    } catch (error) {
      console.error("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDegrees = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("degrees" as any)
        .select("*")
        .eq("is_active", true);
      
      if (universityId) {
        query = query.eq("university_id", universityId);
      }
      
      const { data, error } = await query.order("name");

      if (error) throw error;
      setDegrees((data as any) || []);
    } catch (error) {
      console.error("Error fetching degrees:", error);
    } finally {
      setLoading(false);
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

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university);
    setCurrentView("degrees");
    navigate(`/universities/${university.id}`);
  };

  const handleDegreeSelect = (degree: Degree) => {
    setSelectedDegree(degree);
    setCurrentView("semesters");
    navigate(`/universities/${universityId}/degrees/${degree.id}`);
  };

  const handleSemesterSelect = (semester: Semester) => {
    setSelectedSemester(semester);
    setCurrentView("subjects");
    navigate(`/universities/${universityId}/degrees/${degreeId}/semesters/${semester.id}`);
  };

  const handleBackToSemesters = () => {
    setSelectedSubject(null);
    setCurrentView("semesters");
    navigate(`/universities/${universityId}/degrees/${degreeId}/semesters`);
  };

  // FIX: Implement subject selection logic
  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentView("resources");
    navigate(
      `/universities/${universityId}/degrees/${degreeId}/semesters/${semesterId}/subjects/${subject.id}`
    );
  };

  const handleDownload = async (id: string, filePath: string, title: string) => {
    try {
      const { data, error } = await supabase
        .from("resources")
        .select("file_path")
        .eq("id", id)
        .single();

      if (error) throw error;

      const url = data.file_path;

      // Trigger file download
      const a = document.createElement("a");
      a.href = url;
      a.download = title;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

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
            {currentView === "universities" && (
              <span className="text-primary font-medium">Universities</span>
            )}
            {currentView === "degrees" && (
              <>
                <Link to="/universities" className="text-muted-foreground hover:text-primary">Universities</Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-primary font-medium">{selectedUniversity?.name}</span>
              </>
            )}
            {currentView === "semesters" && (
              <>
                <Link to="/universities" className="text-muted-foreground hover:text-primary">Universities</Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Link to={`/universities/${universityId}`} className="text-muted-foreground hover:text-primary">{selectedUniversity?.name}</Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-primary font-medium">{selectedDegree?.name}</span>
              </>
            )}
            {currentView === "subjects" && (
              <>
                <Link to="/universities" className="text-muted-foreground hover:text-primary">Universities</Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Link to={`/universities/${universityId}`} className="text-muted-foreground hover:text-primary">{selectedUniversity?.name}</Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Link to={`/universities/${universityId}/degrees/${degreeId}`} className="text-muted-foreground hover:text-primary">{selectedDegree?.name}</Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-primary font-medium">{selectedSemester?.name}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Universities View */}
      {currentView === "universities" && (
        <>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Choose Your University</h1>
                <p className="text-lg text-muted-foreground">
                  Select your university to browse available degree programs and resources
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
                  {universities.map((university) => (
                    <Card 
                      key={university.id} 
                      className="group cursor-pointer bg-gradient-to-br from-white to-gray-50/50 hover:from-white hover:to-primary/5 hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 shadow-lg hover:shadow-primary/10"
                      onClick={() => handleUniversitySelect(university)}
                    >
                      <CardHeader className="text-center">
                        <MapPin className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{university.code}</CardTitle>
                        <CardDescription className="text-sm font-medium">{university.name}</CardDescription>
                        {university.location && (
                          <Badge variant="outline" className="mx-auto w-fit mt-2 border-primary/30 text-primary">
                            {university.location}
                          </Badge>
                        )}
                      </CardHeader>
                      <CardContent className="text-center">
                        <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300">
                          Browse {university.code} Degrees
                          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>
          {/* Footer */}
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
        </>
      )}

      {/* Degrees View */}
      {currentView === "degrees" && (
        <>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {selectedUniversity?.name} - Available Degree Programs
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
            </div>
          </section>
          {/* Footer */}
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
        </>
      )}

      {/* Semesters View */}
      {currentView === "semesters" && (
        <>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {selectedDegree?.name} - Available Semesters
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
            </div>
          </section>
          {/* Footer */}
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
        </>
      )}

      {/* Subjects View */}
      {currentView === "subjects" && selectedSemester && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                onClick={handleBackToSemesters}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Semesters
              </Button>
            </div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                {selectedDegree?.code} - {selectedSemester.name} - Choose Subject
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
                    onClick={() => handleSubjectSelect(subject)}
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
                <p className="text-muted-foreground text-lg">No subjects available for {selectedSemester.name}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Resources Section */}
      {currentView === "resources" && selectedSubject && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="ghost"
                onClick={() => {
                  setCurrentView("subjects");
                  setSelectedType("all");
                }}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Subjects
              </Button>
            </div>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                {selectedDegree?.code} - {selectedSemester?.name} - {selectedSubject.name}
              </h3>
              <p className="text-muted-foreground">
                Browse and download resources for {selectedSubject.name}
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
                  No {selectedType === "all" ? "resources" : selectedType.replace("_", " ")} found for {selectedSubject.name}
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};


export default Universities;

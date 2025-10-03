import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface University {
  id: string;
  name: string;
  code: string;
  location?: string;
}

const Universities = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Universities component mounted/updated. Fetching universities.");
    fetchUniversities();
  }, []);

  useEffect(() => {
    const filtered = universities.filter(university => 
      university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      university.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUniversities(filtered);
  }, [searchQuery, universities]);

  const fetchUniversities = async () => {
    console.log("Fetching universities...");
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("universities" as any)
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      setUniversities((data as any) || []);
      console.log("Universities fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleUniversitySelect = (university: University) => {
    console.log("Navigating to degrees for university ID:", university.id);
    navigate(`/universities/${university.id}`);
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
            <span className="text-primary font-medium">Universities</span>
          </div>
        </div>
      </section>

      {/* Universities View */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Choose Your University</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Select your university to browse available degree programs and resources
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-12">
              <input
                type="text"
                placeholder="Search by university name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-base md:text-lg rounded-2xl border-2 border-muted bg-white/80 backdrop-blur-sm shadow-lg focus:shadow-xl transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
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
              {filteredUniversities.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">No universities found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search query or browse all universities
                  </p>
                </div>
              ) : (
                filteredUniversities.map((university) => (
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
                ))
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Universities;
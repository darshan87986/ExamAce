import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

interface SolvedQP {
  id: string;
  title: string;
  description?: string | null;
  year: string;
  content: string; // HTML from Supabase
}

const SolvedArticle = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [qp, setQp] = useState<SolvedQP | null>(location.state?.qp || null);
  const [loading, setLoading] = useState(!qp);

  useEffect(() => {
    if (!qp && id) {
      fetchSolvedQP(id);
    }
  }, [id, qp]);

  const fetchSolvedQP = async (qpId: string) => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("solved-papers")
        .select("id, title, description, year, content")
        .eq("id", qpId)
        .single();

      if (error || !data) {
        console.error("Supabase error:", error);
        setQp(null);
        return;
      }

      setQp({
        id: data.id,
        title: data.title,
        description: data.description,
        year: String(data.year),
        content: data.content, // ✅ HTML string
      });
    } catch (err) {
      console.error("Error fetching solved QP:", err);
      setQp(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading article...</p>
      </div>
    );
  }

  if (!qp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Solved Question Paper not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">EduMasters</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      {/* Article */}
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Local CSS override to force bullets + spacing regardless of global resets */}
        <style>{`
          /* Scope styles to this component only */
          .em-article ul { 
            list-style: disc !important; 
            margin-left: 1.25rem !important; 
            padding-left: 0.25rem !important;
          }
          .em-article ol { 
            list-style: decimal !important; 
            margin-left: 1.25rem !important; 
            padding-left: 0.25rem !important;
          }
          .em-article li { 
            margin: 0.25rem 0; 
          }
          .em-article p { 
            margin: 0.35rem 0; 
          }
          /* Create a ~two-line gap after common Q&A groupings */
          .em-article p + ul,
          .em-article p + p,
          .em-article ul + p,
          .em-article ul + ul {
            margin-top: 0.5rem;
            margin-bottom: 2rem !important; /* ~ two lines */
          }
          /* Also add gap after <hr> blocks if you use them */
          .em-article hr {
            margin: 1rem 0 2rem 0 !important;
            border: 0;
            border-top: 1px solid rgba(0,0,0,0.1);
          }
        `}</style>

        {/* NOTE: intentionally NOT using `prose` here to avoid typography resets */}
        <article className="max-w-4xl mx-auto text-foreground">
          <h1 className="mb-2 text-3xl font-bold">{qp.title}</h1>
          {qp.year && <p className="text-muted-foreground mb-6">Year: {qp.year}</p>}
          {qp.description && (
            <p className="mb-6 text-muted-foreground">{qp.description}</p>
          )}

          {/* ✅ Render your stored HTML and apply the scoped overrides */}
          <div
            className="em-article"
            dangerouslySetInnerHTML={{ __html: qp.content }}
          />
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default SolvedArticle;

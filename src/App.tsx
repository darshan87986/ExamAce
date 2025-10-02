import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy-loaded pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Universities = lazy(() => import("./pages/Universities"));
const Degrees = lazy(() => import("./pages/Degrees"));
const Semesters = lazy(() => import("./pages/Semesters"));
const Subjects = lazy(() => import("./pages/Subjects"));
const SubjectResources = lazy(() => import("./pages/SubjectResources"));
const SolvedArticle = lazy(() => import("./pages/SolvedArticle"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const NotFound = lazy(() => import("./pages/NotFound"));

// React Query client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="flex h-screen w-screen items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              }
            >
              <Routes>
                {/* Main Pages */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />

                {/* University Hierarchy */}
                <Route path="/universities" element={<Universities />} />
                <Route path="/universities/:universityId" element={<Degrees />} />
                <Route
                  path="/universities/:universityId/degrees/:degreeId"
                  element={<Semesters />}
                />
                <Route
                  path="/universities/:universityId/degrees/:degreeId/semesters/:semesterId"
                  element={<Subjects />}
                />
                <Route
                  path="/subjects/:subjectId/resources"
                  element={<SubjectResources />}
                />

                {/* Solved Articles */}
                <Route path="/solved-article/:id" element={<SolvedArticle />} />

                {/* Catch-all for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

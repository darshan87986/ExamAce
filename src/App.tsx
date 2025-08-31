import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Universities from "./pages/Universities";
import NotFound from "./pages/NotFound";
import Degrees from './pages/Degrees';
import Semesters from './pages/Semesters';
import Subjects from './pages/Subjects';
import SubjectResources from './pages/SubjectResources';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />

          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:universityId" element={<Degrees />} />
          <Route path="/universities/:universityId/degrees/:degreeId" element={<Semesters />} />
          <Route path="/universities/:universityId/degrees/:degreeId/semesters/:semesterId" element={<Subjects />} />
          <Route path="/subjects/:subjectId/resources" element={<SubjectResources />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { Loader2 } from "lucide-react";
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Universities = lazy(() => import("./pages/Universities"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Degrees = lazy(() => import('./pages/Degrees'));
const Semesters = lazy(() => import('./pages/Semesters'));
const Subjects = lazy(() => import('./pages/Subjects'));
const SubjectResources = lazy(() => import('./pages/SubjectResources'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={
          <div className="flex h-screen w-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }>
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
        </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ChevronDown, ChevronUp, CheckCircle, Copyright, Users, UserCheck, AlertTriangle, Target, Link2, Edit3, Mail, BookOpen, FileText, ShieldAlert, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

const TermsConditions = () => {
  useEffect(() => {
    document.title = "Terms & Conditions - EduMasters";
  }, []);

  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({
    0: true // First section expanded by default
  });

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const termsSections = [
    {
      title: "1. Acceptance of Terms",
      icon: <CheckCircle className="h-5 w-5 text-primary mr-2" />,
      content: "Welcome to EduMasters. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our services."
    },
    {
      title: "2. Educational Use Only",
      icon: <BookOpen className="h-5 w-5 text-primary mr-2" />,
      content: "The materials provided on this website are for educational purposes only. They are intended to assist students in their studies and exam preparation."
    },
    {
      title: "3. Intellectual Property",
      icon: <Copyright className="h-5 w-5 text-primary mr-2" />,
      content: (
        <>
          <p className="mb-3">The content, organization, graphics, design, and other matters related to our site are protected under applicable copyrights and other proprietary laws.</p>
          <p>Previous year question papers and other educational materials are provided for reference purposes only. We claim no copyright over third-party educational materials.</p>
        </>
      )
    },
    {
      title: "4. User Responsibilities",
      icon: <UserCheck className="h-5 w-5 text-primary mr-2" />,
      content: (
        <>
          <p className="mb-3">As a user of this website, you agree to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use the materials for personal, non-commercial educational purposes only</li>
            <li>Not redistribute, sell, or commercially exploit any content without permission</li>
            <li>Not use the website in any way that could damage, disable, or impair the service</li>
          </ul>
        </>
      )
    },
    {
      title: "5. No Account Required",
      icon: <Users className="h-5 w-5 text-primary mr-2" />,
      content: "Our service is designed to be accessible without requiring user registration. However, for personalized updates, you may optionally provide your email address."
    },
    {
      title: "6. Disclaimer of Warranties",
      icon: <ShieldAlert className="h-5 w-5 text-primary mr-2" />,
      content: (
        <>
          <p className="mb-3">The materials on EduMasters are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          <p>We do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on our website or otherwise relating to such materials or on any sites linked to this site.</p>
        </>
      )
    },
    {
      title: "7. Limitations of Liability",
      icon: <Scale className="h-5 w-5 text-primary mr-2" />,
      content: "In no event shall EduMasters or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website."
    },
    {
      title: "8. Accuracy of Materials",
      icon: <Target className="h-5 w-5 text-primary mr-2" />,
      content: "The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current."
    },
    {
      title: "9. Links to Other Websites",
      icon: <Link2 className="h-5 w-5 text-primary mr-2" />,
      content: "Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of these sites and accept no responsibility for them or for any loss or damage that may arise from your use of them."
    },
    {
      title: "10. Modifications to Terms",
      icon: <Edit3 className="h-5 w-5 text-primary mr-2" />,
      content: "We may revise these Terms and Conditions at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms."
    },
    {
      title: "11. Contact Us",
      icon: <Mail className="h-5 w-5 text-primary mr-2" />,
      content: (
        <>
          <p className="mb-3">If you have any questions about these Terms and Conditions, please contact us at:</p>
          <p>Email: <a href="mailto:legal@examacevault.com" className="text-primary hover:underline">legal@examacevault.com</a></p>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground ml-4">EduMasters</h1>
          </div>
          <Badge variant="secondary" className="text-sm font-semibold">
            Educational Resource Platform
          </Badge>
        </div>
        
        <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg py-8">
            <CardTitle className="text-3xl font-bold">Terms and Conditions</CardTitle>
            <div className="flex items-center justify-center mt-4">
              <FileText className="h-5 w-5 mr-2" />
              <p className="text-primary-foreground/90">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground mb-2">
              Please read these terms carefully before using our services.
            </p>
            <div className="flex justify-center mt-4">
              <Badge variant="outline" className="text-xs font-medium bg-background/80">
                Effective Date: {new Date().toLocaleDateString()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {termsSections.map((section, index) => (
            <Card key={index} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center p-6 hover:bg-muted/50"
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center text-left">
                  {section.icon}
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                {expandedSections[index] ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
              
              {expandedSections[index] && (
                <CardContent className="px-6 pb-6 pt-2">
                  <div className="prose prose-slate max-w-none border-l-2 border-primary pl-4">
                    {section.content}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="font-medium">Important Legal Information</p>
            </div>
            <p className="text-sm text-muted-foreground">
              By using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default TermsConditions;
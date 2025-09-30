import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ChevronDown, ChevronUp, Shield, Mail, Lock, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - EduMasters";
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

  const policySections = [
    {
      title: "1. Introduction",
      icon: <Shield className="h-5 w-5 text-primary mr-2" />,
      content: "Welcome to EduMasters. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform. We are committed to protecting your privacy and providing a safe online experience for all users."
    },
    {
      title: "2. Information We Collect",
      icon: <Eye className="h-5 w-5 text-primary mr-2" />,
      content: (
        <>
          <p className="mb-3"><strong>Voluntarily Provided Information:</strong> When you optionally choose to provide your email address for updates, we collect and store that information.</p>
          <p><strong>Automatically Collected Information:</strong> We may automatically collect information about your device and usage of our website through cookies and similar technologies. This may include your IP address, browser type, operating system, access times, and pages viewed.</p>
        </>
      )
    },
    {
      title: "3. Use of Your Information",
      icon: <Lock className="h-5 w-5 text-primary mr-2" />,
      content: (
        <>
          <p className="mb-3">We may use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide, operate, and maintain our educational services</li>
            <li>Send you educational updates and resources (if you voluntarily provided your email)</li>
            <li>Improve our website and user experience</li>
            <li>Analyze how our services are used</li>
            <li>Monitor and prevent technical issues</li>
          </ul>
        </>
      )
    },
    {
      title: "4. Disclosure of Your Information",
      icon: <Shield className="h-5 w-5 text-primary mr-2" />,
      content: (
        <>
          <p className="mb-3">We do not sell, trade, or rent your personal information to others. We may share generic aggregated demographic information not linked to any personal information regarding visitors and users with our business partners and advertisers.</p>
          <p>We may disclose your information where required to do so by law or if we believe that such action is necessary to comply with the law and the reasonable requests of law enforcement.</p>
        </>
      )
    },
    {
      title: "5. Data Security",
      icon: <Lock className="h-5 w-5 text-primary mr-2" />,
      content: "We implement appropriate security measures to protect your personal information. However, please remember that no method of transmission over the Internet or electronic storage is 100% secure."
    },
    {
      title: "6. Third-Party Links",
      icon: <Eye className="h-5 w-5 text-primary mr-2" />,
      content: "Our website may contain links to third-party websites. We have no control over the content or privacy practices of these sites and encourage you to review their privacy policies."
    },
    {
      title: "7. Your Rights",
      icon: <Shield className="h-5 w-5 text-primary mr-2" />,
      content: "You may opt-out of receiving any future communications from us at any time. You can do this by clicking the unsubscribe link in any email we send you or by contacting us directly."
    },
    {
      title: "8. Changes to This Privacy Policy",
      icon: <Calendar className="h-5 w-5 text-primary mr-2" />,
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date."
    },
    {
      title: "9. Contact Us",
      icon: <Mail className="h-5 w-5 text-primary mr-2" />,
      content: (
        <>
          <p className="mb-3">If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>Email: <a href="mailto:edumasters41@gmail.com" className="text-primary hover:underline">edumasters41@gmail.com</a></p>
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
            Privacy-First Educational Platform
          </Badge>
        </div>
        
        <Card className="mb-8 border-2 shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg py-8">
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <div className="flex items-center justify-center mt-4">
              <Calendar className="h-5 w-5 mr-2" />
              <p className="text-primary-foreground/90">Last Updated: {new Date().toLocaleDateString()}</p>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground mb-6">
              Your privacy is important to us. This policy explains what information we collect, how we use it, and your rights.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {policySections.map((section, index) => (
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
            <p className="font-medium mb-2">We value your privacy and are committed to protecting your personal information.</p>
            <p className="text-sm text-muted-foreground">
              If you have any concerns or questions, don't hesitate to contact our privacy team.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
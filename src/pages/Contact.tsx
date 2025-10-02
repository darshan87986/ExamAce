
// Contact.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  FileQuestion,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import emailjs from 'emailjs-com';
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const HERO_IMG = "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=1";
const TEAM_IMG = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2";
const SUPPORT_IMG = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3";

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const Contact = () => {
  const prefersReduced = useReducedMotion();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const rafRef = useRef(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    if (prefersReduced) return;

    const onScroll = () => {
      lastScroll.current = window.scrollY || window.pageYOffset;
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(update);
    };

    const update = () => {
      const y = lastScroll.current;
      const doc = document.documentElement;
      const total = (doc.scrollHeight - doc.clientHeight) || 1;
      setScrollProgress(Math.round((y / total) * 100));

      if (leftRef.current) leftRef.current.style.transform = `translateY(${Math.round(y * 0.06)}px) rotate(${Math.max(-4, -4 + y * 0.0004)}deg)`;
      if (rightRef.current) rightRef.current.style.transform = `translateY(${Math.round(y * -0.04)}px) rotate(${Math.min(4, 4 - y * 0.0003)}deg)`;

      rafRef.current = null;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [prefersReduced]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // EmailJS configuration - you need to replace these with your own values
    const serviceID = 'service_089mpwi'; // Replace with your EmailJS service ID
    const templateID = 'template_elwou6y'; // Replace with your EmailJS template ID
    const userID = 'LUbD7nonOuVA7idkg'; // Replace with your EmailJS user ID
    
    // Send email using EmailJS
    emailjs.send(serviceID, templateID, {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "edumasters41@gmail.com"
    }, userID)
    .then((result) => {
      console.log(result.text);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, (error) => {
      console.log(error.text);
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly at edumasters41@gmail.com",
        variant: "destructive"
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-slate-900">
      {/* progress bar */}
      <div className="fixed left-0 top-0 z-50 w-full h-1 pointer-events-none" aria-hidden="false">
        <div
          className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 transition-all duration-150"
          role="progressbar"
          aria-label="Scroll progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={scrollProgress}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="border-b bg-white/60 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold">EduMasters</h1>
            </div>
            <nav className="hidden md:flex space-x-6 text-sm">
              <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
              <Link to="/universities" className="text-gray-600 hover:text-indigo-600 transition-colors">Universities</Link>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">About Us</Link>
              <Link to="/contact" className="text-indigo-600 font-medium">Contact Us</Link>
            </nav>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10 opacity-20">
          <img src={HERO_IMG} alt="support hero" className="w-full h-full object-cover filter blur-sm scale-105" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-4"
          >
            Get in  <span className="text-blue-600">Touch</span>
          </motion.h1>

          <motion.p
            initial={prefersReduced ? {} : { opacity: 0 }}
            whileInView={prefersReduced ? {} : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Have questions, suggestions, or need help? We're here to assist you on your academic journey. Reach out and we'll respond as soon as possible.
          </motion.p>
        </div>

        {/* floating images */}
        <img ref={leftRef} src={TEAM_IMG} alt="EduMasters team working together" loading="lazy" className="hidden md:block absolute left-8 top-16 w-48 h-48 object-cover rounded-lg shadow-2xl transform -rotate-6 will-change-transform" style={{ transition: "transform 120ms linear" }} />
        <img ref={rightRef} src={SUPPORT_IMG} alt="Student support illustration" loading="lazy" className="hidden md:block absolute right-8 bottom-12 w-56 h-40 object-cover rounded-lg shadow-2xl transform rotate-3 will-change-transform" style={{ transition: "transform 120ms linear" }} />
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
              <motion.div variants={fadeUp} className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Send us a Message</h2>
                <p className="text-lg text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Form */}
                <motion.div variants={fadeUp}>
                  <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl text-center">Contact Form</CardTitle>
                      <p className="text-center text-sm text-muted-foreground">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <motion.div whileFocus={{ scale: 1.01 }} className="grid grid-cols-1 gap-4">
                          <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required className="h-12" aria-required="true" aria-invalid={false} />
                        </motion.div>

                        <motion.div whileFocus={{ scale: 1.01 }} className="grid grid-cols-1 gap-4">
                          <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required className="h-12" aria-required="true" aria-invalid={false} />
                        </motion.div>

                        <motion.div whileFocus={{ scale: 1.01 }} className="grid grid-cols-1 gap-4">
                          <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                          <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this message about?" required className="h-12" aria-required="true" aria-invalid={false} />
                        </motion.div>

                        <motion.div whileFocus={{ scale: 1.01 }} className="grid grid-cols-1 gap-4">
                          <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                          <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us how we can help you..." required rows={6} className="resize-none" aria-required="true" aria-invalid={false} />
                        </motion.div>

                        <div>
                          <Button 
                            type="submit" 
                            size="lg" 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="h-5 w-5 mr-2" />
                                Send Message
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Info Cards */}
                <motion.div variants={fadeUp} className="space-y-6">
                  <motion.div variants={fadeUp}>
                    <Card className="border-0 shadow-lg bg-white">
                      <CardHeader>
                        <div className="flex items-center space-x-3 mb-4">
                          <Clock className="h-8 w-8 text-indigo-600" />
                          <CardTitle className="text-xl">Response Time</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">General Inquiries:</span>
                            <span className="font-medium">Within 24 hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Technical Support:</span>
                            <span className="font-medium">Within 12 hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Urgent Issues:</span>
                            <span className="font-medium">Within 6 hours</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Card className="border-0 shadow-lg bg-white">
                      <CardHeader>
                        <div className="flex items-center space-x-3 mb-4">
                          <FileQuestion className="h-8 w-8 text-purple-600" />
                          <CardTitle className="text-xl">Common Topics</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Resource requests and suggestions</li>
                          <li>• Technical issues and bug reports</li>
                          <li>• Account and access problems</li>
                          <li>• Partnership and collaboration</li>
                          <li>• Content contribution guidelines</li>
                          <li>• General feedback and improvements</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 text-center shadow-md">
                      <h3 className="text-xl font-bold mb-2">Prefer Direct Contact?</h3>
                      <p className="text-muted-foreground mb-4">You can also reach us directly at our support email for immediate assistance.</p>
                      <Button asChild variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                        <a href="mailto:edumasters41@gmail.com">
                          <Mail className="h-4 w-4 mr-2" />
                          Email Support
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
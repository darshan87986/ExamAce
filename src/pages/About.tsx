// About.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Award, BookOpen, Target, Heart, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

/* Unsplash images (kept same sources) */
const BOOK_IMG = "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=1";
const DESK_IMG = "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=2";
const STACK_IMG = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=3";
const PAPER_IMG = "https://images.unsplash.com/photo-1632258947617-57a2be7c7ca9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";
const LAPTOP_IMG = "https://images.unsplash.com/photo-1632152053988-e94d3d77829b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";

/* animation variants */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

 function About() {
  const prefersReduced = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  // refs for GSAP animations
  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);
  const heroRef = useRef(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    if (prefersReduced) return;

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Update scroll progress
    lenisRef.current.on('scroll', ({ progress }: { progress: number }) => {
      setScrollProgress(progress * 100);
    });

    return () => {
      lenisRef.current?.destroy();
    };
  }, [prefersReduced]);

  // Initialize GSAP with ScrollTrigger
  useEffect(() => {
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.out" });

    // Hero section animations
    gsap.timeline()
      .fromTo(heroRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }
      )
      .fromTo(".hero-title", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.5"
      )
      .fromTo(".hero-subtitle", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(".hero-buttons", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

    // Parallax images
    gsap.to(leftImgRef.current, {
      y: -100,
      rotation: -6,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(rightImgRef.current, {
      y: 100,
      rotation: 6,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Section animations
    sectionRefs.current.forEach((section) => {
      if (!section) return;
      
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [prefersReduced]);

  const quotes = [
    {
      text: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela"
    },
    {
      text: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King"
    },
    {
      text: "Education is not the filling of a pail, but the lighting of a fire.",
      author: "William Butler Yeats"
    },
    {
      text: "The mind is not a vessel to be filled but a fire to be kindled.",
      author: "Plutarch"
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-slate-900">
      {/* scroll progress bar */}
      <div className="fixed left-0 top-0 z-50 w-full h-1 pointer-events-none">
        <div
          className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 transition-width duration-150"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden
        />
      </div>

      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-20" aria-label="About hero" ref={heroRef}>
        <div className="absolute inset-0 -z-10 opacity-18">
          <img src={DESK_IMG} alt="study desk" className="w-full h-full object-cover filter blur-sm scale-105" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6 hero-title"
          >
            About{" "}
           <span className="text-blue-600">
            EduMasters
           </span>
           </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed hero-subtitle"
          >
            Empowering students worldwide with curated question papers, solved answers, and concise notes — all community-driven to make studying faster and fairer.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center gap-4 hero-buttons"
          >
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Link to="/">Explore Resources</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>

        {/* parallax floating visuals */}
        <img
          ref={leftImgRef}
          src={BOOK_IMG}
          alt="stack of books"
          className="hidden md:block absolute left-8 top-14 w-48 h-48 object-cover rounded-lg shadow-2xl transform -rotate-6 will-change-transform"
        />
        <img
          ref={rightImgRef}
          src={STACK_IMG}
          alt="pile of books"
          className="hidden md:block absolute right-8 bottom-10 w-56 h-44 object-cover rounded-lg shadow-2xl transform rotate-3 will-change-transform"
        />
      </section>

      {/* subtle wave divider */}
      <div className="pointer-events-none">
        <svg viewBox="0 0 1440 80" className="w-full -mt-8" preserveAspectRatio="none">
          <path d="M0,40 C200,100 400,0 720,40 C1040,80 1240,20 1440,40 L1440 80 L0 80 Z"
            fill="rgba(99,102,241,0.06)" />
        </svg>
      </div>

      {/* Mission Section */}
      <motion.section
        className="py-16"
        ref={el => sectionRefs.current[0] = el}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div>
              <div className="inline-flex items-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Target className="h-4 w-4 mr-2" />
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Making Quality Education Accessible to Everyone</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At EduMasters, we believe every student should have free access to accurate exam resources.
                We curate, verify and present previous year question papers and model answers so students can prepare efficiently.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We break geographic and financial barriers — provide searchable resources by university, course and semester, and encourage community moderation.
              </p>
            </motion.div>

            <motion.div className="relative">
              <div
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 text-center shadow-xl transform transition-transform duration-500 hover:-translate-y-2"
              >
                <BookOpen className="h-24 w-24 text-indigo-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">10,000+</h3>
                <p className="text-gray-600">Students Helped Worldwide</p>
              </div>

              {/* small floating paper card with slight parallax + hover tilt */}
              <motion.div
                className="absolute -left-6 -top-6 w-36 h-28 bg-white rounded-xl shadow-lg border border-gray-100 p-3"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img src={PAPER_IMG} alt="paper" className="w-full h-full object-cover rounded-md" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section (cards) */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-rose-50" ref={el => sectionRefs.current[1] = el}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at EduMasters
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-white transform hover:-translate-y-2">
                <CardHeader>
                  <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We ensure quality resources are searchable and free — organized by university, course & semester.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-white transform hover:-translate-y-2">
                <CardHeader>
                  <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Community verification, ratings and comments keep resources accurate and trustworthy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="text-center group hover:shadow-xl transition-all duration-300 border-0 bg-white transform hover:-translate-y-2">
                <CardHeader>
                  <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Students contribute, edit and rate content — earn recognition and help others succeed.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16" ref={el => sectionRefs.current[2] = el}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-rose-50 text-rose-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Our Story
            </div>

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8"
            >
              Born from a Student's Struggle
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 mb-6 leading-relaxed"
            >
              EduMasters was founded by university students who faced the frustrating reality of scattered and paywalled resources.
              Locating accurate past papers, model answers and reliable notes often meant sifting through unorganized PDFs, inconsistent filenames,
              paywalls, or outdated content. We built this platform to make that search simple, fast and free.
            </motion.p>

            <motion.p
              className="text-lg text-gray-600 mb-8 leading-relaxed"
            >
              Common difficulties students face include: fragmented sources across multiple sites, missing answer keys, differing university
              syllabi & paper formats, paywalled archives, poor scan quality, and inconsistent naming — making revision slow and error-prone.
              EduMasters collects, standardizes and verifies these resources so students spend more time learning and less time searching.
            </motion.p>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 inline-block text-left shadow-md relative overflow-hidden">
              <Quote className="absolute top-4 right-4 h-12 w-12 text-indigo-200 opacity-50" />
              <motion.blockquote 
                className="text-xl italic text-slate-900 mb-4"
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                "{quotes[currentQuote].text}"
              </motion.blockquote>
              <motion.cite 
                className="text-muted-foreground block text-right"
                key={currentQuote + 'author'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                - {quotes[currentQuote].author}
              </motion.cite>
            </div>
          </div>
        </div>
      </section>

      {/* Resources / Visual showcase */}
      <section className="py-16 bg-gray-50" ref={el => sectionRefs.current[3] = el}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-400"
            >
              <img src={BOOK_IMG} alt="books" className="w-full h-80 object-cover" />
            </motion.div>

            <motion.div
            >
              <h3 className="text-2xl font-bold mb-3">Designs inspired by real study habits</h3>
              <p className="text-gray-600 mb-4">
                Clean, printable layouts for question papers, preview thumbnails and quick-download buttons help you find and use materials quickly.
              </p>

              <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                <motion.div
                  className="rounded-xl bg-white p-4 shadow-md border border-gray-100 hover:shadow-xl transition-shadow transform hover:-translate-y-1"
                >
                  {/* <div className="flex items-start gap-3">
                    <div className="w-20 h-14 flex-shrink-0 overflow-hidden rounded-md border">
                      <img src={LAPTOP_IMG} alt="paper preview" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold">BCA Sem 1 — 2023</h4>
                      <p className="text-sm text-gray-500">Solved with model answers • 12 pages</p>
                    </div>
                  </div> */}
                </motion.div>

                <motion.div
                  className="rounded-xl bg-white p-4 shadow-md border border-gray-100 hover:shadow-xl transition-shadow transform hover:-translate-y-1"
                >
                  {/* <div className="flex items-start gap-3">
                    <div className="w-20 h-14 flex-shrink-0 overflow-hidden rounded-md border">
                      <img src={STACK_IMG} alt="book preview" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold">DBMS — Important Qs</h4>
                      <p className="text-sm text-gray-500">High-yield questions & summaries • 8 pages</p>
                    </div>
                  </div> */}
                </motion.div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Link to="/">Explore Resources</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50" ref={el => sectionRefs.current[4] = el}>
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Join Our Growing Community
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Start your journey to academic excellence today. Access thousands of resources and join students who trust EduMasters for their exam preparation.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Link to="/">Explore Resources</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
     <Footer />
    </div>
  );
};

export default About;


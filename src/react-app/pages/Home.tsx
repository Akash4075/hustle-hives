import { useState, useEffect } from "react";
import { Button } from "@/react-app/components/ui/button";
import { Card } from "@/react-app/components/ui/card";
import { Input } from "@/react-app/components/ui/input";
import { Textarea } from "@/react-app/components/ui/textarea";
import { Label } from "@/react-app/components/ui/label";
import {
  Monitor,
  Smartphone,
  Cpu,
  Laptop,
  Phone,
  Mail,
  Star,
  Send,
  Zap,
  Clock,
  Shield,
  HeartHandshake,
  ChevronDown,
  Code2,
  CircuitBoard,
} from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  message: string;
  created_at: string;
}

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    message: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch {
      console.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ name: "", rating: 5, message: "" });
        fetchReviews();
      }
    } catch {
      console.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-slate-600/20 to-slate-600/20 rounded-full blur-3xl" />
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-slate-800/80 backdrop-blur-md border-b border-slate-600/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
              <CircuitBoard className="w-6 h-6 text-slate-900" />
            </div>
            <span className="font-bold text-xl text-white">HUSTLE HIVES</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">Services</a>
            <a href="#why-us" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">Why Us</a>
            <a href="#reviews" className="text-slate-300 hover:text-amber-400 transition-colors font-medium">Reviews</a>
            <a href="#contact">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold shadow-lg shadow-amber-500/30">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 px-6 pt-12 pb-24 md:pt-20 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm mb-6 font-medium">
                <Zap className="w-4 h-4" />
                Freelancing Services
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                <span className="text-white">HUSTLE</span>
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-clip-text text-transparent">HIVES</span>
              </h1>
              <p className="text-xl md:text-2xl text-cyan-400 font-semibold mb-4">
                Your Trusted Tech Partner
              </p>
              <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                Transform your ideas into reality with our expert software, hardware, and tech services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#contact">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold shadow-lg shadow-amber-500/30 text-lg px-8">
                    Get Started
                  </Button>
                </a>
                <a href="#services">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-500 text-slate-200 hover:bg-slate-700 hover:border-slate-400 text-lg px-8">
                    Explore Services
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Hero Visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Outer rings */}
                <div className="absolute inset-0 -m-8 rounded-full border-2 border-dashed border-amber-500/30 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-0 -m-16 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
                
                {/* Dotted circle */}
                <div className="absolute inset-0 -m-12">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-amber-500/60 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 15}deg) translateY(-140px) translateX(-50%)`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Main circle */}
                <div className="relative w-72 h-72 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-cyan-500 rounded-full opacity-20 blur-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full shadow-2xl border border-slate-500/50 flex items-center justify-center">
                    <div className="text-center">
                      {/* Honeycomb icon */}
                      <div className="mb-4 relative">
                        <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto">
                          <defs>
                            <linearGradient id="honeyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#f59e0b" />
                              <stop offset="100%" stopColor="#d97706" />
                            </linearGradient>
                          </defs>
                          {/* Hexagons */}
                          <path d="M40 10 L52 18 L52 34 L40 42 L28 34 L28 18 Z" fill="url(#honeyGrad)" />
                          <path d="M55 22 L67 30 L67 46 L55 54 L43 46 L43 30 Z" fill="url(#honeyGrad)" opacity="0.8" />
                          <path d="M25 22 L37 30 L37 46 L25 54 L13 46 L13 30 Z" fill="url(#honeyGrad)" opacity="0.8" />
                          <path d="M40 38 L52 46 L52 62 L40 70 L28 62 L28 46 Z" fill="url(#honeyGrad)" opacity="0.6" />
                          {/* Circuit lines */}
                          <line x1="40" y1="26" x2="40" y2="55" stroke="#475569" strokeWidth="2" />
                          <line x1="28" y1="40" x2="52" y2="40" stroke="#475569" strokeWidth="2" />
                          <circle cx="40" cy="40" r="4" fill="#475569" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-black text-white">
                        HUSTLE
                      </h2>
                      <h2 className="text-3xl font-black text-amber-400">
                        HIVES
                      </h2>
                    </div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/40 animate-bounce" style={{ animationDuration: '2s' }}>
                  Quick Delivery
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full text-sm font-bold text-slate-900 shadow-lg shadow-cyan-500/40 animate-bounce" style={{ animationDuration: '2.5s' }}>
                  Affordable Rates
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="hidden md:flex justify-center mt-16">
            <a href="#services" className="flex flex-col items-center text-slate-400 hover:text-amber-400 transition-colors">
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </a>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="relative z-10 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-6 font-medium">
              <Code2 className="w-4 h-4" />
              What We Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-amber-400">Services</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Comprehensive tech solutions tailored to bring your vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Software Projects */}
            <Card className="group relative p-8 bg-slate-700/50 backdrop-blur-sm border-slate-600 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  <Monitor className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Software Projects
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    Full Stack Website
                  </li>
                  <li className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-amber-500" />
                    Full Stack App
                  </li>
                  <li className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-amber-500" />
                    AI Implementations
                  </li>
                </ul>
              </div>
            </Card>

            {/* Hardware Projects */}
            <Card className="group relative p-8 bg-slate-700/50 backdrop-blur-sm border-slate-600 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                  <CircuitBoard className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Hardware Projects
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                    All Kinds of Hardware Projects
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                    Circuit Design
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                    Embedded Systems
                  </li>
                </ul>
              </div>
            </Card>

            {/* Laptop Services */}
            <Card className="group relative p-8 bg-slate-700/50 backdrop-blur-sm border-slate-600 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                  <Laptop className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Laptop Services
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Repairs & Maintenance
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Software Installation
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Hardware Upgrades
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="relative z-10 px-6 py-24 bg-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why <span className="text-amber-400">Choose Us</span>
            </h2>
            <p className="text-slate-300 text-lg">What sets Hustle Hives apart</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-slate-600 hover:border-amber-500/50 transition-colors">
              <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fast Turnaround</h3>
              <p className="text-slate-400 text-sm">Quick delivery without compromising quality</p>
            </div>
            <div className="text-center p-6 bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-slate-600 hover:border-green-500/50 transition-colors">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Quality Assured</h3>
              <p className="text-slate-400 text-sm">Thoroughly tested and reliable solutions</p>
            </div>
            <div className="text-center p-6 bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-slate-600 hover:border-cyan-500/50 transition-colors">
              <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">24/7 Support</h3>
              <p className="text-slate-400 text-sm">Always available when you need us</p>
            </div>
            <div className="text-center p-6 bg-slate-700/50 backdrop-blur-sm rounded-2xl border border-slate-600 hover:border-pink-500/50 transition-colors">
              <div className="w-16 h-16 bg-pink-500/20 border border-pink-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Client Focused</h3>
              <p className="text-slate-400 text-sm">Your satisfaction is our priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In <span className="text-cyan-400">Touch</span>
            </h2>
            <p className="text-slate-300 text-lg">Ready to start your project? Contact us today</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-2xl mx-auto">
            <a href="tel:7795428138" className="flex-1">
              <Card className="p-6 bg-slate-700/50 backdrop-blur-sm border-slate-600 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="text-xl font-bold text-white">7795428138</p>
                </div>
              </Card>
            </a>

            <a href="mailto:hustlehivesofficial@gmail.com" className="flex-1">
              <Card className="p-6 bg-slate-700/50 backdrop-blur-sm border-slate-600 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-lg font-bold text-white">hustlehivesofficial@gmail.com</p>
                </div>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="relative z-10 px-6 py-24 bg-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Client <span className="text-amber-400">Reviews</span>
            </h2>
            <p className="text-slate-300 text-lg">What our clients say about us</p>
          </div>

          {/* Reviews Display */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-slate-500" />
                </div>
                <p className="text-slate-300 text-lg">No reviews yet</p>
                <p className="text-slate-500">Be the first to share your experience!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <Card key={review.id} className="p-6 bg-slate-700/50 backdrop-blur-sm border-slate-600 hover:border-amber-500/30 transition-all duration-300">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4 italic leading-relaxed">"{review.message}"</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-sm text-slate-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Review Form */}
          <Card className="max-w-xl mx-auto p-8 bg-slate-700/50 backdrop-blur-sm border-slate-600">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Leave a Review
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-slate-300">Your Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  required
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-amber-500"
                />
              </div>

              <div>
                <Label className="text-slate-300">Rating</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="focus:outline-none transform hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-10 h-10 transition-colors ${
                          star <= formData.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-600 hover:text-amber-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-slate-300">Your Review</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Share your experience with Hustle Hives..."
                  rows={4}
                  required
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-amber-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold shadow-lg shadow-amber-500/30 text-lg py-6"
                disabled={submitting}
              >
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Review
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-slate-800 border-t border-slate-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <CircuitBoard className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">HUSTLE HIVES</h3>
                <p className="text-slate-400 text-sm">Your Trusted Tech Partner</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Hustle Hives. All rights reserved.
            </p>
            <a
              href="/admin"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Admin
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

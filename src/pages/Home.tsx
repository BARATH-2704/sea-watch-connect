import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { AuthModal } from "@/components/AuthModal";
import { HazardIcon } from "@/components/HazardIcon";
import { 
  MapPin, 
  Camera, 
  Send, 
  Shield, 
  Users, 
  Clock,
  ArrowRight,
  Eye,
  AlertTriangle
} from "lucide-react";
import coastalHero from "@/assets/coastal-hero.jpg";

export default function Home() {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; type?: 'signin' | 'signup' | 'admin' }>({
    isOpen: false
  });

  const handleAuthClick = (type: 'signin' | 'signup' | 'admin') => {
    setAuthModal({ isOpen: true, type });
  };

  const hazardTypes = [
    { id: "storm", name: "Storm Warning", description: "Severe weather conditions" },
    { id: "oil-spill", name: "Oil Spill", description: "Petroleum contamination" },
    { id: "marine-debris", name: "Marine Debris", description: "Floating waste materials" },
    { id: "harmful-algae", name: "Harmful Algae", description: "Toxic algal blooms" },
    { id: "injured-animal", name: "Injured Marine Life", description: "Wildlife in distress" },
    { id: "water-quality", name: "Water Quality Issues", description: "Pollution or contamination" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation onAuthClick={handleAuthClick} />
      
      {/* Hero Section */}
      <section className="relative pt-16 min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${coastalHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/80 via-ocean-mid/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="block mb-2">See Something,</span>
              <span className="block mb-2">Say Something.</span>
              <span className="bg-gradient-to-r from-ocean-foam to-white bg-clip-text text-transparent">
                Protect Our Coasts.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-ocean-foam mb-8 max-w-2xl mx-auto">
              Join thousands of coastal citizens reporting ocean hazards in real-time. 
              Your report could save lives and protect our marine environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="hero" 
                size="xl" 
                className="group"
                onClick={() => window.location.href = '/map'}
              >
                <Eye className="mr-2" size={20} />
                View Live Map
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              
              <Button 
                variant="floating" 
                size="xl"
                onClick={() => window.location.href = '/report'}
              >
                <AlertTriangle className="mr-2" size={20} />
                Report a Hazard
              </Button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Reporting coastal hazards has never been easier. Follow these simple steps to help protect our shores.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl">1. Tap a Hazard</CardTitle>
                <CardDescription>
                  Select the type of hazard you've observed from our comprehensive list
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl">2. Take a Photo</CardTitle>
                <CardDescription>
                  Capture visual evidence to help authorities assess the situation quickly
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-white" size={32} />
                </div>
                <CardTitle className="text-xl">3. Submit Report</CardTitle>
                <CardDescription>
                  We handle the rest - location, timestamp, and alert distribution automatically
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Hazard Types Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What Can You Report?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From oil spills to marine debris, every report helps create a safer coastal environment.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hazardTypes.map((hazard) => (
              <Card key={hazard.id} className="hover:shadow-ocean transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <HazardIcon type={hazard.id} />
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {hazard.name}
                      </CardTitle>
                      <CardDescription>
                        {hazard.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Community Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold">Trusted by Authorities</h3>
              <p className="text-muted-foreground">
                Reports are verified by coastal guard personnel and environmental agencies
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold">Community Driven</h3>
              <p className="text-muted-foreground">
                Join thousands of citizens actively protecting our coastal waters
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold">Real-Time Response</h3>
              <p className="text-muted-foreground">
                Immediate alerts help ensure rapid response to critical situations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Every report counts. Join our community of coastal guardians today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => handleAuthClick('signup')}
            >
              Join the Community
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => window.location.href = '/map'}
            >
              Explore the Map
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ocean-deep text-ocean-foam py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">🌊 Coastal Sentinel</h3>
              <p className="text-ocean-foam/80">
                Protecting our coasts through community-driven hazard reporting and real-time monitoring.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-ocean-foam/80">
                <li><a href="/map" className="hover:text-white transition-colors">Live Map</a></li>
                <li><a href="/report" className="hover:text-white transition-colors">Report Hazard</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <p className="text-ocean-foam/80">
                Emergency: Contact your local authorities<br/>
                Support: support@coastalsentinel.org
              </p>
            </div>
          </div>
          <div className="border-t border-ocean-foam/20 mt-8 pt-8 text-center text-ocean-foam/80">
            <p>&copy; 2024 Coastal Sentinel. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={authModal.isOpen} 
        onClose={() => setAuthModal({ isOpen: false })} 
        defaultTab={authModal.type}
      />
    </div>
  );
}
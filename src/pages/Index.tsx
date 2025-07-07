import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Upload, Circle, TrendingUp, Zap, Shield, Satellite } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import HyperRealisticSolarAnimation from '@/components/HyperRealisticSolarAnimation';
import ParticleField from '@/components/ParticleField';
import StrategySection from '@/components/StrategySection';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStrategy = () => {
    document.getElementById('strategy')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleField />
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <HyperRealisticSolarAnimation />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-5"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-8 bg-black/50 backdrop-blur-md rounded-3xl p-12 border border-white/30 shadow-2xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient drop-shadow-2xl filter brightness-110">
              CME-CausalFlow
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-xl font-semibold filter brightness-105">
              Revolutionary Causal AI Pipeline for Solar Storm Detection
            </p>
            <p className="text-lg text-gray-100 mb-12 max-w-2xl mx-auto drop-shadow-lg font-medium">
              Harness the power of ISRO's Aditya-L1 mission data to predict and classify Coronal Mass Ejection events 
              with unprecedented accuracy using advanced Neural ODEs and Causal Discovery
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={scrollToStrategy}
              className="sci-fi-button px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-orange-500/20 transition-all duration-300"
              size="lg"
            >
              <Circle className="mr-2 h-5 w-5" />
              Explore the System
            </Button>
            
            <Link to="/predict">
              <Button 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold rounded-xl glass-card border-white/60 hover:bg-white/25 text-white shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                size="lg"
              >
                <Upload className="mr-2 h-5 w-5" />
                Start Analysis
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm">
            <ArrowDown className="h-8 w-8 text-white drop-shadow-lg" />
          </div>
        </div>
      </section>

      {/* CME Explanation Section */}
      <section className="py-20 relative bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient drop-shadow-xl filter brightness-110">
              What are Coronal Mass Ejections?
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto drop-shadow-lg font-medium">
              Understanding the Solar Phenomena That Impact Our Planet
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-6 rounded-2xl border border-orange-500/30 bg-black/50 backdrop-blur-md shadow-xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-orange-400 text-center">What is a CME?</h3>
              <p className="text-gray-100 text-center text-sm">
                Massive bursts of solar wind and magnetic fields released from the Sun's corona into space. 
                These events can contain billions of tons of plasma traveling at millions of miles per hour.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl border border-red-500/30 bg-black/50 backdrop-blur-md shadow-xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-red-400 text-center">Earth Impact</h3>
              <p className="text-gray-100 text-center text-sm">
                When CMEs reach Earth, they can disrupt satellites, power grids, and communication systems. 
                They also create beautiful auroras but pose risks to astronauts and technology.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl border border-blue-500/30 bg-black/50 backdrop-blur-md shadow-xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center">
                <Satellite className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 text-center">Early Warning</h3>
              <p className="text-gray-100 text-center text-sm">
                Our AI system analyzes data from Aditya-L1 at the L1 Lagrange point, providing 
                12-60 minutes advance warning of incoming CME events to protect critical infrastructure.
              </p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-purple-500/30 bg-black/50 backdrop-blur-md shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 text-purple-400 text-center">CME Classification Types</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                  <span className="text-green-400 font-bold">✓</span>
                </div>
                <h4 className="font-semibold text-green-400 mb-2">No CME</h4>
                <p className="text-gray-300 text-xs">Normal solar wind conditions with no significant disturbances</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center">
                  <span className="text-yellow-400 font-bold">II</span>
                </div>
                <h4 className="font-semibold text-yellow-400 mb-2">Type II</h4>
                <p className="text-gray-300 text-xs">Shock-driven events with radio emissions from electron acceleration</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-500/20 border border-orange-500 flex items-center justify-center">
                  <span className="text-orange-400 font-bold">III</span>
                </div>
                <h4 className="font-semibold text-orange-400 mb-2">Type III</h4>
                <p className="text-gray-300 text-xs">Fast electron streams producing characteristic radio bursts</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center">
                  <span className="text-red-400 font-bold">IV</span>
                </div>
                <h4 className="font-semibold text-red-400 mb-2">Type IV</h4>
                <p className="text-gray-300 text-xs">Long-duration events with complex magnetic field structures</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section id="strategy" className="py-20 bg-gradient-to-b from-black/70 via-black/60 to-black/70 backdrop-blur-sm">
        <StrategySection />
      </section>

      {/* Mission Info Section */}
      <section className="py-20 relative bg-gradient-to-b from-black/60 via-black/50 to-black/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient drop-shadow-xl filter brightness-110">
              Aditya-L1 Mission Integration
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto drop-shadow-lg font-medium">
              Leveraging real-time .cdf data from ISRO's groundbreaking solar observatory
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl border border-white/30 bg-black/40 backdrop-blur-md shadow-xl">
                <h3 className="text-2xl font-semibold mb-4 text-primary drop-shadow-md filter brightness-110">SWIS-ASPEX Payload</h3>
                <p className="text-gray-100 mb-4 drop-shadow-sm font-medium">
                  Solar Wind Ion Spectrometer provides critical measurements in .cdf format from solar wind 
                  particles, enabling real-time detection and classification of CME events at the L1 Lagrange point.
                </p>
                <ul className="space-y-2 text-sm text-gray-200 font-medium">
                  <li>• Ion density and velocity measurements</li>
                  <li>• Thermal and suprathermal particle detection</li>
                  <li>• Magnetic field strength analysis</li>
                  <li>• Type II/III/IV CME classification</li>
                </ul>
              </div>
              
              <div className="glass-card p-6 rounded-2xl border border-white/30 bg-black/40 backdrop-blur-md shadow-xl">
                <h3 className="text-2xl font-semibold mb-4 text-accent drop-shadow-md filter brightness-110">L1 Lagrange Point</h3>
                <p className="text-gray-100 drop-shadow-sm font-medium">
                  Positioned 1.5 million km from Earth, providing continuous solar wind monitoring 
                  and early warning capabilities for space weather events with 12-second temporal resolution.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-8 rounded-2xl text-center border border-white/30 bg-black/40 backdrop-blur-md shadow-xl">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-solar-orange to-primary solar-glow shadow-2xl"></div>
                <h4 className="text-xl font-semibold mb-4 text-white drop-shadow-md filter brightness-110">Real-time .cdf Processing</h4>
                <p className="text-gray-100 drop-shadow-sm font-medium">
                  Our AI pipeline processes six .cdf data streams simultaneously to detect anomalous 
                  patterns and classify CME event types with Bayesian uncertainty quantification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

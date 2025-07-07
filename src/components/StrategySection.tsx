
import { ArrowRight, Database, Brain, Search, Target, CheckCircle, AlertTriangle } from 'lucide-react';

const StrategySection = () => {
  const pipelineSteps = [
    {
      title: "Data Input",
      description: "6 SWIS-ASPEX .cdf files from Aditya-L1",
      icon: Database,
      color: "text-primary",
      details: "TH1, TH2, BLK V02 format files"
    },
    {
      title: "Feature Extraction", 
      description: "Solar wind parameters extraction",
      icon: Search,
      color: "text-accent",
      details: "Density, velocity, magnetic field strength"
    },
    {
      title: "Causal Discovery",
      description: "Time-lagged causal relationships",
      icon: Brain,
      color: "text-primary", 
      details: "Dynamic causal graph construction"
    },
    {
      title: "Neural ODE Flow",
      description: "Continuous-time dynamics modeling",
      icon: Target,
      color: "text-accent",
      details: "Flow trajectory prediction"
    },
    {
      title: "Anomaly Detection",
      description: "Divergence pattern identification", 
      icon: AlertTriangle,
      color: "text-primary",
      details: "CME signature recognition"
    },
    {
      title: "CME Classification",
      description: "Type II/III/IV determination",
      icon: CheckCircle,
      color: "text-accent",
      details: "Bayesian uncertainty quantification"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
          AI Pipeline Architecture
        </h2>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
          Advanced causal discovery and neural differential equations for unprecedented CME detection accuracy
        </p>
      </div>

      {/* Corrected Pipeline Flow */}
      <div className="relative mb-16">
        <div className="grid md:grid-cols-6 gap-4">
          {pipelineSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col items-center">
                <div className="glass-card p-6 rounded-2xl text-center h-full transition-all duration-300 hover:scale-105 w-full">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ${step.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{step.description}</p>
                  <p className="text-xs text-muted-foreground/70">{step.details}</p>
                </div>
                
                {/* Corrected arrow direction - pointing RIGHT */}
                {index < pipelineSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform translate-x-full -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Methodology Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-6 text-primary">Causal Discovery Layer</h3>
          <p className="text-muted-foreground mb-6">
            Our system builds dynamic causal graphs using time-lagged solar parameters from .cdf files,
            revealing hidden relationships between density, speed, and particle flux measurements.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm">Time-lagged causality detection</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="text-sm">Dynamic graph construction</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm">Parameter interdependency mapping</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-6 text-accent">Neural ODE Flow Modeling</h3>
          <p className="text-muted-foreground mb-6">
            Continuous-time dynamics modeling captures the smooth evolution of solar wind parameters,
            enabling precise detection of flow disruptions characteristic of CME events.
          </p>
          <div className="bg-background/50 p-4 rounded-lg font-mono text-sm">
            <div className="text-primary">dx/dt = f(x, t; θ)</div>
            <div className="text-accent mt-2">∇ · v = δ(CME)</div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-6 text-primary">CME Type Classification</h3>
          <p className="text-muted-foreground mb-6">
            Advanced classification system identifies specific CME types based on spectral and temporal signatures
            from SWIS-ASPEX payload data.
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span>Type II (Shock-driven)</span>
              <span className="text-primary">Fast Radio Bursts</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Type III (Electron Streams)</span>
              <span className="text-accent">High Frequency</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Type IV (Plasma Emission)</span>
              <span className="text-primary">Continuum Band</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-6 text-accent">Bayesian Uncertainty</h3>
          <p className="text-muted-foreground mb-6">
            Probabilistic predictions with confidence intervals ensure reliable CME detection
            while quantifying model uncertainty for critical space weather decisions.
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">CME Probability</span>
              <span className="text-primary font-semibold">87.3%</span>
            </div>
            <div className="w-full bg-background/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{width: '87.3%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategySection;

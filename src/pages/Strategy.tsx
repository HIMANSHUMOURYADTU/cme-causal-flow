
import Navigation from '@/components/Navigation';
import ParticleField from '@/components/ParticleField';
import StrategySection from '@/components/StrategySection';
import { TrendingUp, CircleArrowDown, CircleArrowUp } from 'lucide-react';

const Strategy = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleField />
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            Model Architecture
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep dive into the revolutionary AI pipeline that powers CME-CausalFlow
          </p>
        </div>
      </section>

      {/* Main Strategy Section */}
      <StrategySection />

      {/* Technical Details Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gradient">Technical Implementation</h2>
            <p className="text-xl text-muted-foreground">
              Advanced mathematical frameworks driving our predictions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-center mb-6">
                  <TrendingUp className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold">Causal Graph Theory</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  We employ directed acyclic graphs (DAGs) to model causal relationships between 
                  solar wind parameters, using time-lagged correlations to infer causality.
                </p>
                <div className="bg-background/50 p-4 rounded-lg">
                  <code className="text-sm font-mono text-primary">
                    G = (V, E) where V = &#123;density, velocity, flux, temperature&#125;
                  </code>
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-center mb-6">
                  <CircleArrowUp className="w-8 h-8 text-accent mr-3" />
                  <h3 className="text-2xl font-semibold">Neural ODEs</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Continuous-time neural networks model the smooth evolution of solar wind dynamics, 
                  capturing the underlying physics of plasma flow.
                </p>
                <div className="bg-background/50 p-4 rounded-lg space-y-2">
                  <code className="block text-sm font-mono text-accent">
                    dx/dt = f_θ(x(t), t)
                  </code>
                  <code className="block text-sm font-mono text-primary">
                    x(t₁) = x(t₀) + ∫[t₀→t₁] f_θ(x(τ), τ) dτ
                  </code>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-center mb-6">
                  <CircleArrowDown className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-semibold">Divergence Detection</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Flow divergence analysis identifies anomalous patterns in the solar wind 
                  that precede CME arrival at L1.
                </p>
                <div className="bg-background/50 p-4 rounded-lg">
                  <code className="text-sm font-mono text-accent">
                    ∇ · v = ∂vₓ/∂x + ∂vᵧ/∂y + ∂vᵤ/∂z
                  </code>
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-center mb-6">
                  <TrendingUp className="w-8 h-8 text-accent mr-3" />
                  <h3 className="text-2xl font-semibold">Bayesian Inference</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Probabilistic predictions with uncertainty quantification provide robust 
                  CME detection with confidence intervals.
                </p>
                <div className="bg-background/50 p-4 rounded-lg">
                  <code className="text-sm font-mono text-primary">
                    P(CME|data) ∝ P(data|CME) × P(CME)
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Strategy;

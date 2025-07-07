import { useEffect, useRef } from 'react';

const RealisticSolarAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let animationId: number;
    let time = 0;
    
    // Solar flare and CME particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
      type: 'flare' | 'cme' | 'corona';
    }> = [];

    // CME event properties
    let cmeActive = false;
    let cmeIntensity = 0;
    let nextCMETime = Math.random() * 5000 + 3000;

    const createParticle = (x: number, y: number, type: 'flare' | 'cme' | 'corona' = 'corona') => {
      const angle = Math.random() * Math.PI * 2;
      const speed = type === 'cme' ? Math.random() * 8 + 4 : Math.random() * 3 + 1;
      
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: type === 'cme' ? Math.random() * 200 + 100 : Math.random() * 100 + 50,
        size: type === 'cme' ? Math.random() * 4 + 2 : Math.random() * 2 + 1,
        color: type === 'cme' ? 
          `hsl(${Math.random() * 60 + 300}, 80%, ${Math.random() * 30 + 60}%)` : 
          type === 'flare' ?
          `hsl(${Math.random() * 60 + 10}, 90%, ${Math.random() * 20 + 70}%)` :
          `hsl(${Math.random() * 30 + 20}, 70%, ${Math.random() * 20 + 60}%)`,
        type
      });
    };

    const animate = () => {
      time += 16;
      
      // Clear canvas with space background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.7, '#1a0f1a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const sunRadius = Math.min(canvas.width, canvas.height) * 0.15;

      // Trigger CME events
      if (time > nextCMETime && !cmeActive) {
        cmeActive = true;
        cmeIntensity = 1;
        nextCMETime = time + Math.random() * 10000 + 8000;
        
        // Create CME burst
        for (let i = 0; i < 50; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = sunRadius + Math.random() * 50;
          createParticle(
            centerX + Math.cos(angle) * distance,
            centerY + Math.sin(angle) * distance,
            'cme'
          );
        }
      }

      // Update CME intensity
      if (cmeActive) {
        cmeIntensity -= 0.01;
        if (cmeIntensity <= 0) {
          cmeActive = false;
          cmeIntensity = 0;
        }
      }

      // Draw solar corona (outer glow)
      const coronaGradient = ctx.createRadialGradient(
        centerX, centerY, sunRadius * 0.8,
        centerX, centerY, sunRadius * 2.5
      );
      coronaGradient.addColorStop(0, 'rgba(255, 200, 100, 0.3)');
      coronaGradient.addColorStop(0.3, 'rgba(255, 150, 50, 0.2)');
      coronaGradient.addColorStop(0.6, 'rgba(255, 100, 150, 0.1)');
      coronaGradient.addColorStop(1, 'rgba(100, 50, 200, 0.05)');
      
      ctx.fillStyle = coronaGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw magnetic field lines
      ctx.strokeStyle = 'rgba(150, 100, 255, 0.3)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.0005;
        const fieldRadius = sunRadius * 1.8;
        
        ctx.beginPath();
        for (let t = 0; t <= Math.PI * 2; t += 0.1) {
          const r = fieldRadius + Math.sin(t * 3 + angle) * 30;
          const x = centerX + Math.cos(t + angle) * r;
          const y = centerY + Math.sin(t + angle) * r;
          
          if (t === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw main sun body with realistic surface
      const sunGradient = ctx.createRadialGradient(
        centerX - sunRadius * 0.3, centerY - sunRadius * 0.3, 0,
        centerX, centerY, sunRadius
      );
      sunGradient.addColorStop(0, '#ffff80');
      sunGradient.addColorStop(0.3, '#ffdd33');
      sunGradient.addColorStop(0.7, '#ff8800');
      sunGradient.addColorStop(1, '#cc4400');
      
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Add solar surface texture
      ctx.globalAlpha = 0.6;
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * sunRadius * 0.8;
        const size = Math.random() * 15 + 5;
        
        ctx.fillStyle = `hsl(${Math.random() * 60 + 10}, 70%, ${Math.random() * 30 + 40}%)`;
        ctx.beginPath();
        ctx.arc(
          centerX + Math.cos(angle + time * 0.0001) * distance,
          centerY + Math.sin(angle + time * 0.0001) * distance,
          size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Generate corona particles
      if (Math.random() < 0.1) {
        const angle = Math.random() * Math.PI * 2;
        const distance = sunRadius + Math.random() * 20;
        createParticle(
          centerX + Math.cos(angle) * distance,
          centerY + Math.sin(angle) * distance,
          'corona'
        );
      }

      // Generate solar flares
      if (Math.random() < 0.05) {
        const angle = Math.random() * Math.PI * 2;
        const distance = sunRadius * 0.9;
        for (let i = 0; i < 10; i++) {
          createParticle(
            centerX + Math.cos(angle) * distance,
            centerY + Math.sin(angle) * distance,
            'flare'
          );
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        
        // Apply gravity and solar wind effects
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (particle.type === 'cme') {
          // CME particles accelerate away from sun
          particle.vx *= 1.02;
          particle.vy *= 1.02;
        } else {
          // Other particles have slight orbital motion
          const force = 0.1;
          particle.vx += (-dy / distance) * force;
          particle.vy += (dx / distance) * force;
        }
        
        // Remove dead particles
        if (particle.life > particle.maxLife || distance > canvas.width) {
          particles.splice(i, 1);
          continue;
        }
        
        // Draw particle with fade effect
        const alpha = Math.max(0, 1 - particle.life / particle.maxLife);
        ctx.globalAlpha = alpha;
        
        if (particle.type === 'cme') {
          // CME particles glow more intensely
          const glowGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          glowGradient.addColorStop(0, particle.color);
          glowGradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.globalAlpha = 1;

      // Add CME shockwave effect
      if (cmeActive && cmeIntensity > 0.5) {
        ctx.strokeStyle = `rgba(255, 100, 200, ${cmeIntensity * 0.5})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, sunRadius * (2 - cmeIntensity), 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.strokeStyle = `rgba(150, 50, 255, ${cmeIntensity * 0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, sunRadius * (2.5 - cmeIntensity * 0.5), 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};

export default RealisticSolarAnimation;

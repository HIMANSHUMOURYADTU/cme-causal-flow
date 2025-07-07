
import { useEffect, useRef } from 'react';

const SolarAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let animationId: number;
    let time = 0;

    // Solar particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;
    }> = [];

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      const size = Math.random() * 3 + 1;
      const life = Math.random() * 100 + 50;
      
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        life,
        maxLife: life,
        color: Math.random() > 0.5 ? '#00bfff' : '#ff6600'
      });
    };

    const drawSun = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.15;

      // Solar corona
      const coronaGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 2);
      coronaGradient.addColorStop(0, 'rgba(255, 165, 0, 0.3)');
      coronaGradient.addColorStop(0.5, 'rgba(255, 100, 0, 0.1)');
      coronaGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
      
      ctx.fillStyle = coronaGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Main sun body
      const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      sunGradient.addColorStop(0, '#ffff99');
      sunGradient.addColorStop(0.5, '#ff9900');
      sunGradient.addColorStop(1, '#ff6600');
      
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Solar flares
      for (let i = 0; i < 8; i++) {
        const angle = (time * 0.01 + i * Math.PI / 4) % (Math.PI * 2);
        const flareLength = radius * (1.2 + Math.sin(time * 0.02 + i) * 0.3);
        const flareX = centerX + Math.cos(angle) * flareLength;
        const flareY = centerY + Math.sin(angle) * flareLength;
        
        const flareGradient = ctx.createLinearGradient(centerX, centerY, flareX, flareY);
        flareGradient.addColorStop(0, 'rgba(255, 165, 0, 0.8)');
        flareGradient.addColorStop(1, 'rgba(255, 165, 0, 0)');
        
        ctx.strokeStyle = flareGradient;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.lineTo(flareX, flareY);
        ctx.stroke();
      }

      // Create particles from sun
      if (Math.random() < 0.3) {
        const angle = Math.random() * Math.PI * 2;
        const distance = radius + Math.random() * 20;
        createParticle(
          centerX + Math.cos(angle) * distance,
          centerY + Math.sin(angle) * distance
        );
      }
    };

    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        if (particle.life <= 0) {
          particles.splice(i, 1);
        }
      }
    };

    const drawParticles = () => {
      particles.forEach(particle => {
        const alpha = particle.life / particle.maxLife;
        ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawSun();
      updateParticles();
      drawParticles();
      
      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

export default SolarAnimation;

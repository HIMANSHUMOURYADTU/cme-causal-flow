
import { useEffect, useRef } from 'react';

const HyperRealisticSolarAnimation = () => {
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
    
    // Enhanced particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      temperature: number;
      density: number;
      magneticField: number;
      color: string;
      type: 'plasma' | 'proton' | 'electron' | 'cme' | 'flare' | 'corona';
      energy: number;
    }> = [];

    // Solar phenomena tracking
    let solarActivity = {
      flareIntensity: 0,
      cmeActive: false,
      cmeIntensity: 0,
      coronalHoles: [],
      magneticReconnection: false,
      nextCMETime: Math.random() * 8000 + 5000,
      nextFlareTime: Math.random() * 3000 + 2000
    };

    const createRealisticParticle = (
      x: number, 
      y: number, 
      type: 'plasma' | 'proton' | 'electron' | 'cme' | 'flare' | 'corona' = 'plasma'
    ) => {
      const angle = Math.random() * Math.PI * 2;
      const baseSpeed = type === 'cme' ? 12 : type === 'electron' ? 8 : 4;
      const speed = baseSpeed + Math.random() * baseSpeed * 0.5;
      
      // Realistic solar wind properties
      const temperature = type === 'corona' ? 
        Math.random() * 2000000 + 1000000 : // Corona: 1-3 million K
        Math.random() * 100000 + 50000;     // Solar wind: 50-150k K
      
      const density = type === 'cme' ?
        Math.random() * 50 + 20 :  // CME: 20-70 particles/cm³
        Math.random() * 10 + 5;    // Normal solar wind: 5-15 particles/cm³
        
      const magneticField = Math.random() * 20 + 5; // 5-25 nT

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: type === 'cme' ? Math.random() * 300 + 200 : Math.random() * 150 + 100,
        size: type === 'cme' ? Math.random() * 6 + 3 : Math.random() * 3 + 1,
        temperature,
        density,
        magneticField,
        color: getRealisticColor(type, temperature),
        type,
        energy: speed * density * 0.1
      });
    };

    const getRealisticColor = (type: string, temperature: number) => {
      switch (type) {
        case 'cme':
          // CME particles - hot plasma, purplish-white
          return `hsl(${280 + Math.random() * 40}, 70%, ${60 + Math.random() * 30}%)`;
        case 'flare':
          // Solar flares - extremely hot, white-yellow
          return `hsl(${45 + Math.random() * 30}, 90%, ${80 + Math.random() * 15}%)`;
        case 'corona':
          // Corona - very hot, greenish-white (like actual corona images)
          return `hsl(${120 + Math.random() * 60}, 60%, ${70 + Math.random() * 20}%)`;
        case 'proton':
          // Protons - reddish
          return `hsl(${0 + Math.random() * 30}, 80%, ${60 + Math.random() * 25}%)`;
        case 'electron':
          // Electrons - bluish
          return `hsl(${200 + Math.random() * 60}, 80%, ${60 + Math.random() * 25}%)`;
        default:
          // General plasma - temperature-based color
          const tempHue = Math.max(0, Math.min(60, (temperature - 50000) / 20000 * 60));
          return `hsl(${tempHue}, 75%, ${65 + Math.random() * 20}%)`;
      }
    };

    const drawHyperRealisticSun = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const sunRadius = Math.min(canvas.width, canvas.height) * 0.12;

      // Deep space background gradient
      const spaceGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(canvas.width, canvas.height)
      );
      spaceGradient.addColorStop(0, '#0a0a0f');
      spaceGradient.addColorStop(0.3, '#1a0f2e');
      spaceGradient.addColorStop(0.6, '#0f0a1a');
      spaceGradient.addColorStop(1, '#000000');
      ctx.fillStyle = spaceGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw coronal streamers (magnetic field lines)
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + time * 0.0003;
        const streamerLength = sunRadius * (2.5 + Math.sin(time * 0.001 + i) * 0.5);
        
        const gradient = ctx.createLinearGradient(
          centerX + Math.cos(angle) * sunRadius,
          centerY + Math.sin(angle) * sunRadius,
          centerX + Math.cos(angle) * streamerLength,
          centerY + Math.sin(angle) * streamerLength
        );
        gradient.addColorStop(0, 'rgba(255, 200, 150, 0.6)');
        gradient.addColorStop(0.5, 'rgba(150, 255, 200, 0.3)');
        gradient.addColorStop(1, 'rgba(100, 150, 255, 0.1)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 + Math.sin(time * 0.002 + i) * 1;
        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(angle) * sunRadius,
          centerY + Math.sin(angle) * sunRadius
        );
        
        // Create curved magnetic field lines
        for (let t = 0; t <= 1; t += 0.1) {
          const currentRadius = sunRadius + (streamerLength - sunRadius) * t;
          const wobble = Math.sin(t * Math.PI * 3 + time * 0.001) * 20 * t;
          const x = centerX + Math.cos(angle + wobble * 0.01) * currentRadius;
          const y = centerY + Math.sin(angle + wobble * 0.01) * currentRadius;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Enhanced corona with multiple layers
      for (let layer = 0; layer < 4; layer++) {
        const coronaGradient = ctx.createRadialGradient(
          centerX, centerY, sunRadius * (0.8 + layer * 0.2),
          centerX, centerY, sunRadius * (2 + layer * 0.5)
        );
        
        const opacity = 0.3 - layer * 0.06;
        coronaGradient.addColorStop(0, `rgba(255, 220, 100, ${opacity})`);
        coronaGradient.addColorStop(0.3, `rgba(255, 180, 120, ${opacity * 0.7})`);
        coronaGradient.addColorStop(0.6, `rgba(200, 255, 150, ${opacity * 0.4})`);
        coronaGradient.addColorStop(1, `rgba(150, 200, 255, 0)`);
        
        ctx.fillStyle = coronaGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, sunRadius * (2 + layer * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      // Photosphere with granulation
      const photosphereGradient = ctx.createRadialGradient(
        centerX - sunRadius * 0.2, centerY - sunRadius * 0.2, 0,
        centerX, centerY, sunRadius
      );
      photosphereGradient.addColorStop(0, '#ffff99');
      photosphereGradient.addColorStop(0.3, '#ffdd55');
      photosphereGradient.addColorStop(0.7, '#ff9933');
      photosphereGradient.addColorStop(1, '#cc4400');
      
      ctx.fillStyle = photosphereGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Solar granulation (convection cells)
      ctx.globalAlpha = 0.8;
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * sunRadius * 0.85;
        const size = Math.random() * 8 + 3;
        const granuleTime = time * 0.0005 + i;
        
        const x = centerX + Math.cos(angle + granuleTime * 0.1) * distance;
        const y = centerY + Math.sin(angle + granuleTime * 0.1) * distance;
        
        const granuleGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        granuleGradient.addColorStop(0, `hsl(${45 + Math.random() * 15}, 90%, ${85 + Math.random() * 10}%)`);
        granuleGradient.addColorStop(1, `hsl(${25 + Math.random() * 20}, 80%, ${45 + Math.random() * 15}%)`);
        
        ctx.fillStyle = granuleGradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Solar flares and prominences
      if (Math.random() < 0.02 || solarActivity.flareIntensity > 0) {
        solarActivity.flareIntensity = Math.max(0, solarActivity.flareIntensity - 0.02);
        if (solarActivity.flareIntensity === 0) solarActivity.flareIntensity = 1;
        
        const flareAngle = Math.random() * Math.PI * 2;
        const flareLength = sunRadius * (1.5 + solarActivity.flareIntensity * 0.8);
        
        // Create multiple flare particles
        for (let i = 0; i < 15; i++) {
          const spreadAngle = flareAngle + (Math.random() - 0.5) * 0.5;
          const distance = sunRadius + Math.random() * 30;
          createRealisticParticle(
            centerX + Math.cos(spreadAngle) * distance,
            centerY + Math.sin(spreadAngle) * distance,
            'flare'
          );
        }
      }

      // Continuous corona particle generation
      if (Math.random() < 0.15) {
        const angle = Math.random() * Math.PI * 2;
        const distance = sunRadius + Math.random() * 40;
        createRealisticParticle(
          centerX + Math.cos(angle) * distance,
          centerY + Math.sin(angle) * distance,
          Math.random() > 0.7 ? 'proton' : Math.random() > 0.4 ? 'electron' : 'corona'
        );
      }
    };

    const handleSolarEvents = () => {
      time += 16;
      
      // CME events
      if (time > solarActivity.nextCMETime && !solarActivity.cmeActive) {
        console.log('CME event triggered!');
        solarActivity.cmeActive = true;
        solarActivity.cmeIntensity = 1;
        solarActivity.nextCMETime = time + Math.random() * 15000 + 10000;
        
        // Create massive CME burst
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const sunRadius = Math.min(canvas.width, canvas.height) * 0.12;
        
        for (let i = 0; i < 80; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = sunRadius + Math.random() * 60;
          createRealisticParticle(
            centerX + Math.cos(angle) * distance,
            centerY + Math.sin(angle) * distance,
            'cme'
          );
        }
      }

      // Update CME intensity
      if (solarActivity.cmeActive) {
        solarActivity.cmeIntensity -= 0.008;
        if (solarActivity.cmeIntensity <= 0) {
          solarActivity.cmeActive = false;
          solarActivity.cmeIntensity = 0;
        }
      }
    };

    const updateParticles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        // Apply solar wind acceleration
        if (particle.type === 'cme') {
          particle.vx *= 1.03;
          particle.vy *= 1.03;
        } else if (particle.type === 'flare') {
          particle.vx *= 1.02;
          particle.vy *= 1.02;
        } else {
          // Regular solar wind acceleration
          particle.vx *= 1.005;
          particle.vy *= 1.005;
        }
        
        // Apply magnetic field effects (slight orbital motion)
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (particle.type !== 'cme' && particle.type !== 'flare') {
          const magneticForce = particle.magneticField * 0.001;
          particle.vx += (-dy / distance) * magneticForce;
          particle.vy += (dx / distance) * magneticForce;
        }
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;
        
        // Remove particles that are too old or too far
        if (particle.life > particle.maxLife || distance > canvas.width * 1.5) {
          particles.splice(i, 1);
          continue;
        }
      }
    };

    const drawParticles = () => {
      particles.forEach(particle => {
        const alpha = Math.max(0, 1 - particle.life / particle.maxLife);
        
        // Enhanced particle rendering based on type
        if (particle.type === 'cme') {
          // CME particles with strong electromagnetic glow
          const glowGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 4
          );
          glowGradient.addColorStop(0, particle.color);
          glowGradient.addColorStop(0.3, particle.color.replace(/[\d.]+\)/, `${alpha * 0.6})`));
          glowGradient.addColorStop(1, 'transparent');
          
          ctx.globalAlpha = alpha;
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Magnetic field visualization
          ctx.strokeStyle = particle.color.replace(/[\d.]+\)/, `${alpha * 0.3})`);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.stroke();
        } else if (particle.type === 'flare') {
          // Solar flare particles with intense brightness
          const flareGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          flareGradient.addColorStop(0, 'rgba(255, 255, 255, ' + alpha + ')');
          flareGradient.addColorStop(0.5, particle.color.replace(/[\d.]+\)/, `${alpha * 0.8})`));
          flareGradient.addColorStop(1, 'transparent');
          
          ctx.globalAlpha = alpha;
          ctx.fillStyle = flareGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Draw main particle
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add particle trails for high-energy particles
        if (particle.energy > 50) {
          ctx.globalAlpha = alpha * 0.3;
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x - particle.vx * 2, particle.y - particle.vy * 2);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }
      });
      
      ctx.globalAlpha = 1;
    };

    const drawCMEShockwave = () => {
      if (solarActivity.cmeActive && solarActivity.cmeIntensity > 0.3) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const sunRadius = Math.min(canvas.width, canvas.height) * 0.12;
        
        // Primary shockwave
        ctx.strokeStyle = `rgba(255, 100, 200, ${solarActivity.cmeIntensity * 0.6})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(centerX, centerY, sunRadius * (3 - solarActivity.cmeIntensity), 0, Math.PI * 2);
        ctx.stroke();
        
        // Secondary shockwave
        ctx.strokeStyle = `rgba(150, 50, 255, ${solarActivity.cmeIntensity * 0.4})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, sunRadius * (4 - solarActivity.cmeIntensity * 0.7), 0, Math.PI * 2);
        ctx.stroke();
        
        // Plasma wake
        ctx.strokeStyle = `rgba(100, 200, 255, ${solarActivity.cmeIntensity * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, sunRadius * (5 - solarActivity.cmeIntensity * 0.5), 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const animate = () => {
      handleSolarEvents();
      drawHyperRealisticSun();
      updateParticles();
      drawParticles();
      drawCMEShockwave();
      
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

export default HyperRealisticSolarAnimation;

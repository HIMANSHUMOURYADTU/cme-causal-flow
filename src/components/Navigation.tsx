import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TrendingUp, Upload, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-card' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent"></div>
            <span className="text-xl font-bold text-gradient">CME-CausalFlow</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/' ? 'bg-primary/20 text-primary' : 'hover:bg-white/10'
              }`}
            >
              <Circle className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/strategy" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/strategy' ? 'bg-primary/20 text-primary' : 'hover:bg-white/10'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Strategy</span>
            </Link>
            
            <Link 
              to="/predict" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/predict' ? 'bg-primary/20 text-primary' : 'hover:bg-white/10'
              }`}
            >
              <Upload className="h-4 w-4" />
              <span>Predict</span>
            </Link>
          </div>
          
          <Link to="/predict">
            <Button className="sci-fi-button rounded-lg">
              <Upload className="h-4 w-4 mr-2" />
              Analyze Data
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

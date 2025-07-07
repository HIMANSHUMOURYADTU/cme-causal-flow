
import { useState } from 'react';
import { CheckCircle, XCircle, TrendingUp, AlertTriangle, BarChart3, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

interface CMEResult {
  detected: boolean;
  type: 'No CME' | 'Type II' | 'Type III' | 'Type IV';
  probability: number;
  confidence: number;
  timestamp: string;
  characteristics: {
    shockSpeed?: number;
    electronDensity?: number;
    magneticField?: number;
    plasmaBeta?: number;
  };
  timeSeriesData?: {
    timestamps: string[];
    magneticField: number[];
    electronDensity: number[];
    velocity: number[];
    temperature: number[];
  };
}

interface AnalysisResultsProps {
  result: CMEResult | null;
}

const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!result) return null;

  const getTypeDescription = (type: string) => {
    switch (type) {
      case 'Type II':
        return 'Shock-driven CME with fast radio burst signatures';
      case 'Type III':
        return 'Electron stream bursts indicating solar particle acceleration';
      case 'Type IV':
        return 'Continuum plasma emission from trapped electrons';
      default:
        return 'No significant CME activity detected';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Type II':
        return 'text-red-400';
      case 'Type III':
        return 'text-orange-400';
      case 'Type IV':
        return 'text-yellow-400';
      default:
        return 'text-green-400';
    }
  };

  // Prepare chart data
  const prepareChartData = () => {
    if (!result.timeSeriesData) return [];
    
    return result.timeSeriesData.timestamps.map((timestamp, index) => ({
      time: new Date(timestamp).toLocaleTimeString(),
      magneticField: result.timeSeriesData!.magneticField[index],
      electronDensity: result.timeSeriesData!.electronDensity[index],
      velocity: result.timeSeriesData!.velocity[index],
      temperature: result.timeSeriesData!.temperature[index] / 1000, // Convert to thousands
    }));
  };

  const chartData = prepareChartData();

  const chartConfig = {
    magneticField: {
      label: "Magnetic Field",
      color: "hsl(var(--chart-1))",
    },
    electronDensity: {
      label: "Electron Density",
      color: "hsl(var(--chart-2))",
    },
    velocity: {
      label: "Velocity",
      color: "hsl(var(--chart-3))",
    },
    temperature: {
      label: "Temperature",
      color: "hsl(var(--chart-4))",
    },
  };

  return (
    <div className="space-y-8">
      {/* Main Result Card */}
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center justify-center">
            {result.detected ? (
              <>
                <AlertTriangle className="mr-3 h-8 w-8 text-red-400" />
                <span className="text-red-400">CME EVENT DETECTED</span>
              </>
            ) : (
              <>
                <CheckCircle className="mr-3 h-8 w-8 text-green-400" />
                <span className="text-green-400">NO CME DETECTED</span>
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Classification</h3>
              <p className={`text-2xl font-bold ${getTypeColor(result.type)}`}>
                {result.type}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {getTypeDescription(result.type)}
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Probability</h3>
              <p className="text-2xl font-bold text-primary">
                {(result.probability * 100).toFixed(1)}%
              </p>
              <div className="w-full bg-background/50 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" 
                  style={{width: `${result.probability * 100}%`}}
                ></div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Confidence</h3>
              <p className="text-2xl font-bold text-accent">
                {(result.confidence * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Model certainty level
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <div className="glass-card border-accent/20">
        <CardHeader>
          <div className="flex space-x-4">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('overview')}
              className="sci-fi-button"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === 'parameters' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('parameters')}
              className="sci-fi-button"
            >
              <Activity className="mr-2 h-4 w-4" />
              Solar Parameters
            </Button>
            <Button
              variant={activeTab === 'charts' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('charts')}
              className="sci-fi-button"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Time Series Data
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">Analysis Summary</h3>
                  <p className="text-muted-foreground">
                    The CME-CausalFlow pipeline processed 6 SWIS-ASPEX .cdf files to analyze solar wind 
                    parameters and detect potential Coronal Mass Ejection events.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Processing Time:</span>
                      <span className="text-primary">4.2 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Points Analyzed:</span>
                      <span className="text-primary">~24,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Temporal Resolution:</span>
                      <span className="text-primary">12 seconds</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-accent">Detection Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Causal Graph Density</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-background/50 rounded-full">
                          <div className="w-3/4 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm">0.73</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Flow Divergence</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-background/50 rounded-full">
                          <div className="w-1/2 h-2 bg-accent rounded-full"></div>
                        </div>
                        <span className="text-sm">0.51</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bayesian Score</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-background/50 rounded-full">
                          <div className="w-5/6 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm">0.84</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'parameters' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Solar Wind Parameters</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(result.characteristics).map(([key, value]) => {
                  if (value === undefined) return null;
                  
                  const formatKey = (key: string) => {
                    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  };
                  
                  const getUnit = (key: string) => {
                    switch (key) {
                      case 'shockSpeed': return 'km/s';
                      case 'electronDensity': return 'cm⁻³';
                      case 'magneticField': return 'nT';
                      case 'plasmaBeta': return '';
                      default: return '';
                    }
                  };
                  
                  return (
                    <div key={key} className="glass-card p-4 rounded-lg">
                      <h4 className="font-semibold text-accent">{formatKey(key)}</h4>
                      <p className="text-2xl font-bold text-primary">
                        {typeof value === 'number' ? value.toFixed(2) : value} {getUnit(key)}
                      </p>
                      <div className="w-full bg-background/50 rounded-full h-1 mt-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-1 rounded-full" 
                          style={{width: `${Math.min((typeof value === 'number' ? value : 0) / 100, 1) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {activeTab === 'charts' && (
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-primary mb-4">Solar Wind Time Series Analysis</h3>
              
              {/* Magnetic Field & Electron Density Chart */}
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-semibold text-accent mb-4">Magnetic Field & Electron Density</h4>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="magneticField" 
                        stroke="var(--color-magneticField)" 
                        strokeWidth={2}
                        name="Magnetic Field (nT)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="electronDensity" 
                        stroke="var(--color-electronDensity)" 
                        strokeWidth={2}
                        name="Electron Density (cm⁻³)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              {/* Solar Wind Velocity Chart */}
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-semibold text-accent mb-4">Solar Wind Velocity</h4>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="velocity" 
                        stroke="var(--color-velocity)" 
                        fill="var(--color-velocity)" 
                        fillOpacity={0.3}
                        name="Velocity (km/s)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              {/* Temperature Distribution */}
              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-semibold text-accent mb-4">Plasma Temperature (×1000 K)</h4>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData.slice(0, 20)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="temperature" 
                        fill="var(--color-temperature)" 
                        name="Temperature (×1000 K)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="glass-card p-6 rounded-lg">
                <h4 className="font-semibold text-accent mb-3">Data Interpretation</h4>
                <p className="text-muted-foreground">
                  {result.detected 
                    ? `The time series data shows characteristic signatures of ${result.type} CME activity, including significant variations in magnetic field strength and electron density that correlate with the detected solar wind disturbances.`
                    : "The time series analysis reveals stable solar wind conditions with normal parameter variations, consistent with the absence of significant CME activity during this observation period."
                  }
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default AnalysisResults;

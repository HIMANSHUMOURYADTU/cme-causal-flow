import { useState, useCallback, useRef } from 'react';
import { Upload, FileX, Circle, CircleCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import AnalysisResults from '@/components/AnalysisResults';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

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

const Predict = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CMEResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const requiredFiles = [
    'TH1_V02_Data.cdf',
    'TH2_V02_Data.cdf', 
    'BLK_V02_Data.cdf',
    'TH1_V02_Metadata.cdf',
    'TH2_V02_Metadata.cdf',
    'BLK_V02_Metadata.cdf'
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const validateCdfFile = (file: File): boolean => {
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.cdf')) {
      console.log('File rejected - not .cdf extension:', fileName);
      return false;
    }
    
    console.log('File accepted:', fileName, 'MIME type:', file.type || 'none');
    return true;
  };

  const handleFiles = (fileList: FileList) => {
    console.log('Files received:', fileList.length);
    const newFiles: UploadedFile[] = [];
    const rejectedFiles: string[] = [];
    
    Array.from(fileList).forEach(file => {
      console.log('Processing file:', file.name, 'Type:', file.type, 'Size:', file.size);
      
      if (validateCdfFile(file)) {
        const existsAlready = uploadedFiles.some(existingFile => existingFile.name === file.name);
        if (!existsAlready) {
          newFiles.push({
            name: file.name,
            size: file.size,
            type: file.type || 'application/x-cdf',
            file: file
          });
          console.log('Added file:', file.name);
        } else {
          console.log('File already exists:', file.name);
          toast({
            title: "File already uploaded",
            description: `${file.name} is already in the upload list.`,
            variant: "default"
          });
        }
      } else {
        console.log('File rejected (not valid .cdf):', file.name);
        rejectedFiles.push(file.name);
      }
    });
    
    if (rejectedFiles.length > 0) {
      toast({
        title: "Invalid file format",
        description: `Only .cdf files are allowed. Rejected: ${rejectedFiles.join(', ')}`,
        variant: "destructive"
      });
    }
    
    if (newFiles.length > 0) {
      setUploadedFiles(prev => {
        const updated = [...prev, ...newFiles];
        console.log('Total files after update:', updated.length);
        toast({
          title: "Files uploaded successfully",
          description: `${newFiles.length} .cdf file(s) added to analysis queue.`,
          variant: "default"
        });
        return updated;
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input triggered');
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    e.target.value = '';
  };

  const triggerFileInput = () => {
    console.log('Triggering file input');
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    console.log('Removing file at index:', index);
    const removedFile = uploadedFiles[index];
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "File removed",
      description: `${removedFile.name} has been removed from the analysis queue.`,
      variant: "default"
    });
  };

  const generateMockTimeSeriesData = () => {
    const timestamps = [];
    const magneticField = [];
    const electronDensity = [];
    const velocity = [];
    const temperature = [];
    
    const now = new Date();
    for (let i = 0; i < 100; i++) {
      const time = new Date(now.getTime() - (100 - i) * 12000);
      timestamps.push(time.toISOString());
      
      magneticField.push(5 + Math.sin(i * 0.1) * 3 + Math.random() * 2);
      electronDensity.push(10 + Math.cos(i * 0.15) * 5 + Math.random() * 3);
      velocity.push(400 + Math.sin(i * 0.05) * 100 + Math.random() * 50);
      temperature.push(100000 + Math.cos(i * 0.08) * 20000 + Math.random() * 10000);
    }
    
    return { timestamps, magneticField, electronDensity, velocity, temperature };
  };

  const generateMockResult = (): CMEResult => {
    const cmeTypes: CMEResult['type'][] = ['No CME', 'Type II', 'Type III', 'Type IV'];
    const selectedType = cmeTypes[Math.floor(Math.random() * cmeTypes.length)];
    const detected = selectedType !== 'No CME';
    
    const baseCharacteristics = {
      shockSpeed: detected ? Math.random() * 1000 + 500 : undefined,
      electronDensity: Math.random() * 50 + 10,
      magneticField: Math.random() * 20 + 5,
      plasmaBeta: Math.random() * 2 + 0.1
    };

    return {
      detected,
      type: selectedType,
      probability: detected ? Math.random() * 0.4 + 0.6 : Math.random() * 0.3,
      confidence: Math.random() * 0.3 + 0.7,
      timestamp: new Date().toISOString(),
      characteristics: baseCharacteristics,
      timeSeriesData: generateMockTimeSeriesData()
    };
  };

  const startAnalysis = async () => {
    console.log('Starting analysis with files:', uploadedFiles.map(f => f.name));
    console.log('Total files for analysis:', uploadedFiles.length);
    
    if (uploadedFiles.length < 6) {
      toast({
        title: "Insufficient files",
        description: "Please upload at least 6 .cdf files for analysis.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    toast({
      title: "Analysis started",
      description: "Processing SWIS-ASPEX .cdf files for CME detection...",
      variant: "default"
    });
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const result = generateMockResult();
    console.log('Analysis result:', result);
    setAnalysisResult(result);
    setIsAnalyzing(false);
    setShowResults(true);
    
    toast({
      title: "Analysis complete",
      description: result.detected ? `CME detected: ${result.type}` : "No CME activity detected",
      variant: result.detected ? "destructive" : "default"
    });
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setAnalysisResult(null);
    toast({
      title: "Analysis reset",
      description: "Ready for new file analysis",
      variant: "default"
    });
  };

  const isReadyForAnalysis = uploadedFiles.length >= 6;

  return (
    <div className="min-h-screen bg-background relative">
      <Navigation />
      
      <div className="pt-24 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
              CME Analysis Portal
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Upload SWIS-ASPEX .cdf data files to detect and classify Coronal Mass Ejection events
            </p>
          </div>

          {!showResults ? (
            <>
              <Card className="glass-card border-primary/20 mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Upload className="mr-3 h-6 w-6 text-primary" />
                    Upload SWIS-ASPEX .cdf Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
                      dragActive 
                        ? 'border-primary bg-primary/10 scale-105' 
                        : 'border-muted-foreground/30 hover:border-primary/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                  >
                    <Upload className={`mx-auto h-16 w-16 mb-4 ${dragActive ? 'text-primary animate-bounce' : 'text-muted-foreground'}`} />
                    <h3 className="text-xl font-semibold mb-2">
                      {dragActive ? 'Drop .cdf files here!' : 'Drop .cdf files here or click to browse'}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Upload any 6 .cdf files for CME analysis
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileInput}
                      className="hidden"
                      accept=".cdf"
                    />
                    <Button 
                      className="sci-fi-button cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerFileInput();
                      }}
                    >
                      Select .cdf Files
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-accent/20 mb-8">
                <CardHeader>
                  <CardTitle className="text-xl">Upload Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">
                      Files uploaded: <strong>{uploadedFiles.length}/6</strong>
                    </span>
                    <div className="flex items-center space-x-2">
                      {uploadedFiles.length >= 6 ? (
                        <>
                          <CircleCheck className="w-5 h-5 text-green-500" />
                          <span className="text-green-400">Ready for analysis</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-5 h-5 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Need {6 - uploadedFiles.length} more files
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {uploadedFiles.length > 0 && (
                <Card className="glass-card border-primary/20 mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl">Uploaded .cdf Files ({uploadedFiles.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CircleCheck className="w-4 h-4 text-green-500" />
                            <span className="font-medium">{file.name}</span>
                            <span className="text-sm text-muted-foreground">
                              ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <FileX className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="text-center">
                <Button
                  onClick={startAnalysis}
                  disabled={!isReadyForAnalysis || isAnalyzing}
                  className="sci-fi-button px-12 py-4 text-lg font-semibold"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Analyzing Solar Wind Data...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-3 h-5 w-5" />
                      🔬 Analyze CME Events
                    </>
                  )}
                </Button>
                
                {!isReadyForAnalysis && (
                  <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Please upload at least 6 .cdf files to start analysis ({uploadedFiles.length}/6 uploaded)
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <AnalysisResults result={analysisResult} />
              <div className="text-center mt-8">
                <Button
                  onClick={resetAnalysis}
                  variant="outline"
                  className="px-8 py-3"
                >
                  Analyze New Files
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predict;

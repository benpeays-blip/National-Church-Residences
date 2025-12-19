import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Mic, 
  MicOff, 
  Upload, 
  FileAudio, 
  Play, 
  Pause,
  Square,
  Clock,
  User,
  Target,
  MessageSquare,
  ListChecks,
  FileText,
  Sparkles,
  Loader2,
  CheckCircle2,
  Calendar,
  Download,
  Trash2,
  Send
} from "lucide-react";

interface MeetingNote {
  id: string;
  title: string;
  recordedAt: string;
  duration: number;
  transcription: string;
  purpose: string;
  topicsDiscussed: string[];
  keyLearnings: string[];
  actionItems: string[];
  donorName?: string;
  donorId?: string;
  status: 'processing' | 'completed' | 'failed';
}

interface TranscriptionResult {
  transcription: string;
  purpose: string;
  topicsDiscussed: string[];
  keyLearnings: string[];
  actionItems: string[];
}

export default function AIVoiceNotes() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("type");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [donorName, setDonorName] = useState("");
  const [manualTranscript, setManualTranscript] = useState("");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: notes, isLoading } = useQuery<MeetingNote[]>({
    queryKey: ["/api/meeting-notes"],
  });

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to record audio.",
        variant: "destructive",
      });
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
      setIsPaused(!isPaused);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const clearRecording = () => {
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setRecordingTime(0);
    setResult(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an audio file smaller than 25MB.",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
      setAudioBlob(file);
      setAudioUrl(URL.createObjectURL(file));
    }
  };

  const processAudio = async () => {
    // Can process with either audio or manual transcript
    if (!audioBlob && !manualTranscript.trim()) {
      toast({
        title: "No Content",
        description: "Please record audio, upload a file, or type your notes.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    try {
      const formData = new FormData();
      // If we have audio, include it (but transcript is required for processing)
      if (audioBlob) {
        formData.append('audio', audioBlob, 'recording.webm');
      } else {
        // Create empty audio placeholder for API compatibility
        formData.append('audio', new Blob([''], { type: 'audio/webm' }), 'placeholder.webm');
      }
      formData.append('title', meetingTitle || 'Voice Note');
      formData.append('donorName', donorName);
      formData.append('manualTranscript', manualTranscript);

      const response = await fetch('/api/meeting-notes/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Processing failed');
      }

      setResult(data);
      setProcessingProgress(100);

      queryClient.invalidateQueries({ queryKey: ['/api/meeting-notes'] });

      toast({
        title: "Notes Processed",
        description: "Your notes have been analyzed and insights extracted.",
      });

    } catch (error: any) {
      toast({
        title: "Processing Failed",
        description: error.message || "Failed to process notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const hasContentToProcess = (audioBlob || manualTranscript.trim()) && !result;

  return (
    <div className="space-y-6 min-h-[calc(100vh-120px)] pb-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Voice-to-CRM</h1>
        <p className="text-sm text-muted-foreground">
          Record voice notes that automatically transcribe, extract insights, and sync to your CRM
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Recording/Upload */}
        <Card className="min-h-[600px]">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E8A54B]/10 flex items-center justify-center">
                <Mic className="w-4 h-4 text-[#E8A54B]" />
              </div>
              Record Voice Note
            </CardTitle>
            <CardDescription>
              Record live or upload an audio file
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Meeting Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Note Title</label>
                <Input 
                  placeholder="e.g., Post-Meeting Notes with Margaret Chen"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  data-testid="input-note-title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Donor/Contact Name (Optional)</label>
                <Input 
                  placeholder="e.g., Margaret Chen"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  data-testid="input-donor-name"
                />
              </div>
            </div>

            {/* Type/Upload Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 gap-1 bg-transparent p-0 mb-4">
                <TabsTrigger 
                  value="type" 
                  className="group relative gap-2 bg-[#E8A54B] text-white data-[state=active]:bg-[#E8A54B] data-[state=active]:text-white data-[state=active]:shadow-none"
                  data-testid="tab-type"
                >
                  <Mic className="w-4 h-4" />
                  Dictate / Type
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#E8A54B] opacity-0 group-data-[state=active]:opacity-100" />
                </TabsTrigger>
                <TabsTrigger 
                  value="upload" 
                  className="group relative gap-2 bg-[#92A05A] text-white data-[state=active]:bg-[#92A05A] data-[state=active]:text-white data-[state=active]:shadow-none"
                  data-testid="tab-upload"
                >
                  <Upload className="w-4 h-4" />
                  Upload
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#92A05A] opacity-0 group-data-[state=active]:opacity-100" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="type" className="mt-6 space-y-4">
                {/* Dictate/Type Notes Interface */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#E8A54B]/10 border border-[#E8A54B]/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E8A54B]/20 flex items-center justify-center shrink-0">
                        <Mic className="w-4 h-4 text-[#E8A54B]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Voice Dictation Available</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Click the text area below, then tap the microphone icon on your keyboard to speak. Your device will transcribe your voice into text automatically.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Textarea
                    placeholder="Type your notes here, or tap the microphone on your keyboard to dictate...

Example:
Met with Margaret Chen today to discuss the capital campaign. She mentioned being impressed with our scholarship program outcomes and is interested in potentially increasing her annual gift. We discussed naming opportunities for the new science building.

Follow-up: Send the campaign brochure by Friday and schedule a campus tour for January."
                    value={manualTranscript}
                    onChange={(e) => setManualTranscript(e.target.value)}
                    className="min-h-[250px] resize-none"
                    data-testid="input-manual-transcript"
                  />
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{manualTranscript.length} characters</span>
                    {manualTranscript.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setManualTranscript("")}
                        data-testid="button-clear-notes"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upload" className="mt-6 space-y-4">
                {/* Upload Interface */}
                <div 
                  className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="upload-dropzone"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={handleFileUpload}
                    data-testid="input-file-upload"
                  />
                  <div className="w-16 h-16 rounded-full bg-[#92A05A]/10 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-[#92A05A]" />
                  </div>
                  <h3 className="font-semibold mb-2">Upload Audio File</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop or click to select
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports MP3, WAV, M4A, WEBM (max 25MB)
                  </p>
                </div>

                {uploadedFile && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <FileAudio className="w-8 h-8 text-[#92A05A]" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => setUploadedFile(null)}
                      data-testid="button-remove-file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Process Button */}
            {hasContentToProcess && (
              <div className="space-y-4">
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Processing notes...</span>
                      <span>{processingProgress}%</span>
                    </div>
                    <Progress value={processingProgress} className="h-2" />
                  </div>
                )}

                <Button 
                  className="w-full bg-[#4FA6A6] hover:bg-[#4FA6A6]/90"
                  size="lg"
                  onClick={processAudio}
                  disabled={isProcessing}
                  data-testid="button-process-audio"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Extract Insights
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column - Results */}
        <Card className="flex flex-col min-h-[600px]">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#4FA6A6]/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#4FA6A6]" />
              </div>
              Extracted Insights
            </CardTitle>
            <CardDescription>
              AI-extracted information from your voice note
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex-1 flex flex-col">
            {result ? (
              <div className="space-y-6">
                {/* Purpose */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#4FA6A6]/10 flex items-center justify-center">
                      <Target className="w-4 h-4 text-[#4FA6A6]" />
                    </div>
                    <h4 className="font-semibold">Purpose</h4>
                  </div>
                  <p className="text-sm pl-10">{result.purpose}</p>
                </div>

                {/* Topics Discussed */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#92A05A]/10 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-[#92A05A]" />
                    </div>
                    <h4 className="font-semibold">Topics Discussed</h4>
                  </div>
                  <ul className="space-y-1 pl-10">
                    {result.topicsDiscussed.map((topic, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-[#92A05A]">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Learnings */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#E8A54B]/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#E8A54B]" />
                    </div>
                    <h4 className="font-semibold">Key Learnings</h4>
                  </div>
                  <ul className="space-y-1 pl-10">
                    {result.keyLearnings.map((learning, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-[#E8A54B]">•</span>
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Items */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#7BC4DC]/10 flex items-center justify-center">
                      <ListChecks className="w-4 h-4 text-[#7BC4DC]" />
                    </div>
                    <h4 className="font-semibold">Action Items</h4>
                  </div>
                  <ul className="space-y-2 pl-10">
                    {result.actionItems.map((item, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#7BC4DC] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Full Transcription */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <h4 className="font-semibold">Full Transcription</h4>
                  </div>
                  <div className="pl-10">
                    <Textarea 
                      value={result.transcription}
                      readOnly
                      className="min-h-[150px] text-sm"
                      data-testid="transcription-text"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <Button size="sm" className="bg-[#4FA6A6] hover:bg-[#4FA6A6]/90" data-testid="button-save-to-crm">
                    <Send className="w-4 h-4 mr-2" />
                    Save to CRM
                  </Button>
                  <Button size="sm" variant="outline" data-testid="button-download-notes">
                    <Download className="w-4 h-4 mr-2" />
                    Download Notes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Ready to Record</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Record or upload audio to get AI-powered transcription and insights
                  </p>
                </div>

                <div className="border-t pt-6 mt-auto">
                  <h4 className="font-semibold mb-6 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E8A54B]" />
                    Tips for Better Results
                  </h4>
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#4FA6A6]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3 h-3 text-[#4FA6A6]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Mention the person's name</p>
                        <p className="text-xs text-muted-foreground">"I just met with Margaret Chen..."</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#92A05A]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Target className="w-3 h-3 text-[#92A05A]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">State the meeting purpose</p>
                        <p className="text-xs text-muted-foreground">"We discussed the capital campaign..."</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#7BC4DC]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <MessageSquare className="w-3 h-3 text-[#7BC4DC]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Share key discussion points</p>
                        <p className="text-xs text-muted-foreground">"They expressed interest in scholarship funding..."</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#E8A54B]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <ListChecks className="w-3 h-3 text-[#E8A54B]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Note follow-up actions</p>
                        <p className="text-xs text-muted-foreground">"I need to send them the brochure by Friday..."</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#E86B5A]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar className="w-3 h-3 text-[#E86B5A]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Include dates and amounts</p>
                        <p className="text-xs text-muted-foreground">"They mentioned a potential $50,000 gift in Q1..."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Voice Notes */}
      <Card className="min-h-[400px]">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#7BC4DC]/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#7BC4DC]" />
            </div>
            Recent Voice Notes
          </CardTitle>
          <CardDescription>
            Your transcribed voice notes and extracted insights
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : notes && notes.length > 0 ? (
            <div className="space-y-4">
              {notes.map((note) => (
                <div 
                  key={note.id} 
                  className="p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                  data-testid={`note-${note.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{note.title}</h4>
                        <Badge 
                          variant={note.status === 'completed' ? 'default' : 'secondary'}
                          className={note.status === 'completed' ? 'bg-[#92A05A]' : ''}
                        >
                          {note.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(note.recordedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {Math.round(note.duration / 60)} min
                        </span>
                        {note.donorName && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {note.donorName}
                          </span>
                        )}
                      </div>
                      {note.purpose && (
                        <p className="text-sm line-clamp-2">{note.purpose}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {note.actionItems && note.actionItems.length > 0 && (
                        <Badge variant="outline" className="text-[#7BC4DC] border-[#7BC4DC]">
                          {note.actionItems.length} Actions
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileAudio className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No Voice Notes Yet</h3>
              <p className="text-sm text-muted-foreground">
                Record or upload your first voice note to get started
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

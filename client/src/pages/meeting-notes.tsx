import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { api, ApiError } from "@/lib/api";
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

export default function MeetingNotes() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("record");
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
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: notes, isLoading } = useQuery<MeetingNote[]>({
    queryKey: ["meeting-notes"],
    queryFn: () => api.meetingNotes.getAll(),
  });

  const transcribeMutation = useMutation({
    mutationFn: async (audioFile: File) => {
      return api.meetingNotes.transcribe(audioFile);
    },
    onSuccess: (data) => {
      setResult(data);
      setIsProcessing(false);
      setProcessingProgress(100);
      queryClient.invalidateQueries({ queryKey: ["meeting-notes"] });
      toast({
        title: "Transcription Complete",
        description: "Your meeting notes have been processed successfully.",
      });
    },
    onError: (error) => {
      setIsProcessing(false);
      setProcessingProgress(0);

      const errorMessage = error instanceof ApiError
        ? error.message
        : "There was an error processing your audio. Please try again.";

      toast({
        title: "Transcription Failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      toast({
        title: "Recording Started",
        description: "Speak clearly into your microphone.",
      });
    } catch (error) {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to record audio.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
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

  const clearRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setResult(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("audio/")) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an audio file (MP3, WAV, M4A, etc.)",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
      setResult(null);
      toast({
        title: "File Uploaded",
        description: `${file.name} ready for transcription.`,
      });
    }
  };

  const processAudio = async () => {
    const audioToProcess = activeTab === "record" ? audioBlob : uploadedFile;
    if (!audioToProcess) return;

    setIsProcessing(true);
    setProcessingProgress(0);

    const progressInterval = setInterval(() => {
      setProcessingProgress((prev) => Math.min(prev + 10, 90));
    }, 500);

    // Convert Blob to File if needed
    const audioFile = audioToProcess instanceof File
      ? audioToProcess
      : new File([audioToProcess], meetingTitle || "recording.webm", { type: audioToProcess.type });

    transcribeMutation.mutate(audioFile);
    clearInterval(progressInterval);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const hasAudioToProcess = activeTab === "record" ? audioBlob : uploadedFile;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#4FA6A6]/10 flex items-center justify-center">
          <Mic className="w-6 h-6 text-[#4FA6A6]" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Meeting Notes</h1>
          <p className="text-sm text-muted-foreground">
            Record or upload meeting audio for AI-powered transcription and insights
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#4FA6A6]/10 flex items-center justify-center mb-4">
                <FileAudio className="w-6 h-6 text-[#4FA6A6]" />
              </div>
              <div className="text-2xl font-bold">{notes?.length || 0}</div>
              <p className="text-sm text-muted-foreground">Total Notes</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#92A05A]/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#92A05A]" />
              </div>
              <div className="text-2xl font-bold">
                {notes?.filter((n) => n.status === "completed").length || 0}
              </div>
              <p className="text-sm text-muted-foreground">Processed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#E8A54B]/10 flex items-center justify-center mb-4">
                <ListChecks className="w-6 h-6 text-[#E8A54B]" />
              </div>
              <div className="text-2xl font-bold">
                {notes?.reduce((sum, n) => sum + (n.actionItems?.length || 0), 0) || 0}
              </div>
              <p className="text-sm text-muted-foreground">Action Items</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#7BC4DC]/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#7BC4DC]" />
              </div>
              <div className="text-2xl font-bold">
                {notes?.reduce((sum, n) => sum + (n.duration || 0), 0) 
                  ? `${Math.round((notes?.reduce((sum, n) => sum + (n.duration || 0), 0) || 0) / 60)}m` 
                  : "0m"}
              </div>
              <p className="text-sm text-muted-foreground">Total Duration</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Recording/Upload */}
        <Card>
          <CardHeader className="rounded-t-xl" style={{ backgroundColor: '#395174' }}>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              New Meeting Note
            </CardTitle>
            <CardDescription className="text-white/80">
              Record live or upload an audio file
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Meeting Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Meeting Title</label>
                <Input 
                  placeholder="e.g., Q4 Giving Discussion with Margaret Chen"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  data-testid="input-meeting-title"
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

            {/* Recording/Upload Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 gap-1 bg-transparent p-0 mb-4">
                <TabsTrigger 
                  value="record" 
                  className="group relative gap-2 bg-[#4FA6A6] text-white data-[state=active]:bg-[#4FA6A6] data-[state=active]:text-white data-[state=active]:shadow-none"
                  data-testid="tab-record"
                >
                  <Mic className="w-4 h-4" />
                  Record
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#4FA6A6] opacity-0 group-data-[state=active]:opacity-100" />
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

              <TabsContent value="record" className="mt-6 space-y-4">
                {/* Recording Interface */}
                <div className="flex flex-col items-center py-8 space-y-6">
                  {/* Recording Status */}
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                    isRecording 
                      ? isPaused 
                        ? "bg-[#E8A54B]/20 animate-pulse" 
                        : "bg-[#E86B5A]/20 animate-pulse" 
                      : audioBlob 
                        ? "bg-[#92A05A]/20" 
                        : "bg-muted"
                  }`}>
                    {isRecording ? (
                      isPaused ? (
                        <Pause className="w-12 h-12 text-[#E8A54B]" />
                      ) : (
                        <Mic className="w-12 h-12 text-[#E86B5A]" />
                      )
                    ) : audioBlob ? (
                      <CheckCircle2 className="w-12 h-12 text-[#92A05A]" />
                    ) : (
                      <MicOff className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>

                  {/* Timer */}
                  <div className="text-4xl font-mono font-bold" data-testid="recording-time">
                    {formatTime(recordingTime)}
                  </div>

                  {/* Recording Controls */}
                  <div className="flex items-center gap-3">
                    {!isRecording && !audioBlob && (
                      <Button 
                        size="lg" 
                        onClick={startRecording}
                        className="bg-[#E86B5A] hover:bg-[#E86B5A]/90"
                        data-testid="button-start-recording"
                      >
                        <Mic className="w-5 h-5 mr-2" />
                        Start Recording
                      </Button>
                    )}

                    {isRecording && (
                      <>
                        <Button 
                          size="icon" 
                          variant="outline"
                          onClick={pauseRecording}
                          data-testid="button-pause-recording"
                        >
                          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                        </Button>
                        <Button 
                          size="lg" 
                          variant="destructive"
                          onClick={stopRecording}
                          data-testid="button-stop-recording"
                        >
                          <Square className="w-5 h-5 mr-2" />
                          Stop
                        </Button>
                      </>
                    )}

                    {audioBlob && !isRecording && (
                      <>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="lg" 
                              variant="outline"
                              data-testid="button-clear-recording"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Clear
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Clear Recording?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete your current recording. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-testid="button-cancel-clear">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={clearRecording}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                data-testid="button-confirm-clear"
                              >
                                Clear Recording
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button 
                          size="lg" 
                          onClick={startRecording}
                          data-testid="button-re-record"
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          Re-record
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Audio Preview */}
                  {audioUrl && (
                    <audio controls src={audioUrl} className="w-full max-w-md" data-testid="audio-preview" />
                  )}
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
            {hasAudioToProcess && (
              <div className="space-y-4">
                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Processing audio...</span>
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
                      Transcribe & Extract Insights
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column - Results */}
        <Card>
          <CardHeader className="rounded-t-xl" style={{ backgroundColor: '#395174' }}>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Meeting Insights
            </CardTitle>
            <CardDescription className="text-white/80">
              AI-extracted information from your meeting
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
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
                    Save to Raiser's Edge
                  </Button>
                  <Button size="sm" variant="outline" data-testid="button-download-notes">
                    <Download className="w-4 h-4 mr-2" />
                    Download Notes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">No Results Yet</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Record or upload audio from a meeting to get AI-powered transcription and insights
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Meeting Notes */}
      <Card>
        <CardHeader className="rounded-t-xl" style={{ backgroundColor: '#395174' }}>
          <CardTitle className="text-white">Recent Meeting Notes</CardTitle>
          <CardDescription className="text-white/80">
            Your transcribed meetings and extracted insights
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
              <h3 className="font-semibold mb-2">No Meeting Notes Yet</h3>
              <p className="text-sm text-muted-foreground">
                Record or upload your first meeting to get started
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

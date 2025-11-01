import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Mic, FileText, CheckCircle2, List } from "lucide-react";
import type { VoiceNote } from "@shared/schema";

export default function AIVoiceNotes() {
  const { data: notes, isLoading } = useQuery<VoiceNote[]>({
    queryKey: ["/api/ai/voice-notes"],
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Voice-to-CRM</h1>
        <p className="text-sm text-muted-foreground">
          Record voice notes that automatically transcribe, create interactions, and generate follow-up tasks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Voice Notes</CardTitle>
            <Mic className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notes?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transcribed</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notes?.filter((n) => n.transcription).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Created</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notes?.reduce((sum, n) => sum + (n.processedTaskIds?.length || 0), 0) || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (<Skeleton key={i} className="h-40 w-full" />))}
        </div>
      ) : notes && notes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {note.recordedAt ? new Date(note.recordedAt).toLocaleString() : "Voice Note"}
                    </CardTitle>
                    <CardDescription>
                      {note.processedInteractionId && (
                        <Badge variant="default" className="mt-2">Interaction Created</Badge>
                      )}
                    </CardDescription>
                  </div>
                  <Mic className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {note.transcription && (
                  <div>
                    <h4 className="font-semibold mb-2">Transcription</h4>
                    <p className="text-sm">{note.transcription}</p>
                  </div>
                )}

                {note.aiSummary && (
                  <div>
                    <h4 className="font-semibold mb-2">AI Summary</h4>
                    <p className="text-sm text-muted-foreground">{note.aiSummary}</p>
                  </div>
                )}

                {note.extractedActionItems && note.extractedActionItems.length > 0 && (
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <List className="w-4 h-4" />
                      Action Items ({note.extractedActionItems.length})
                    </h4>
                    <ul className="space-y-1">
                      {note.extractedActionItems.map((item, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 mt-0.5 text-green-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Mic className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Voice Notes Yet</h3>
            <p className="text-muted-foreground">Record voice notes after donor meetings to automatically create CRM interactions</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

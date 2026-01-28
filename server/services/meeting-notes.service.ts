import OpenAI from 'openai';
import { logger } from '../config/logging';
import { ValidationError } from '../utils/errors';

/**
 * Meeting Notes Service
 *
 * Business logic for meeting notes transcription and analysis.
 * Note: Currently uses in-memory storage. Future enhancement: persist to database.
 */

// In-memory store (TODO: migrate to database table)
const meetingNotesStore: any[] = [];

export interface MeetingNote {
  id: string;
  title: string;
  recordedAt: string;
  duration: number;
  transcription: string;
  purpose: string;
  topicsDiscussed: string[];
  keyLearnings: string[];
  actionItems: string[];
  donorName: string | null;
  status: string;
}

export interface TranscriptionResult {
  transcription: string;
  purpose: string;
  topicsDiscussed: string[];
  keyLearnings: string[];
  actionItems: string[];
}

export function getAllMeetingNotes(): MeetingNote[] {
  logger.debug('Fetching all meeting notes', {
    count: meetingNotesStore.length,
  });
  return meetingNotesStore;
}

export async function transcribeAndAnalyzeMeeting(
  title: string | undefined,
  donorName: string | undefined,
  manualTranscript: string | undefined
): Promise<TranscriptionResult> {
  logger.debug('Processing meeting transcription', {
    title,
    donorName,
    hasManualTranscript: !!manualTranscript,
  });

  let transcription: string;

  // Check if manual transcript was provided
  if (manualTranscript && manualTranscript.trim().length > 0) {
    transcription = manualTranscript.trim();
  } else {
    // No transcript provided - return helpful message
    throw new ValidationError(
      'HIPAA-compliant transcription requires integration with a certified provider (Amazon Transcribe Medical, Rev AI, or AssemblyAI). Please enter your notes manually in the text field, or contact your administrator to configure a HIPAA-compliant transcription service.'
    );
  }

  // Extract insights using GPT-4o via OpenAI integration
  const openaiChat = new OpenAI({
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  });

  const extractionPrompt = `Analyze this voice note transcription and extract key information. Respond in JSON format only.

Transcription:
${transcription}

Extract and return ONLY a JSON object with these fields:
{
  "purpose": "A one-sentence summary of what this voice note is about",
  "topicsDiscussed": ["Array of 3-5 main topics or themes mentioned"],
  "keyLearnings": ["Array of 3-5 key insights, observations, or important points"],
  "actionItems": ["Array of specific action items, follow-ups, or next steps mentioned"]
}

If any category has no relevant content, return an empty array for that field.
Return only valid JSON, no markdown or explanation.`;

  const extractionResponse = await openaiChat.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content:
          'You are an expert meeting analyst. Extract structured information from meeting transcriptions. Always respond with valid JSON only.',
      },
      { role: 'user', content: extractionPrompt },
    ],
    max_tokens: 1024,
    response_format: { type: 'json_object' },
  });

  const extractedContent = extractionResponse.choices[0]?.message?.content || '{}';
  let extracted;
  try {
    extracted = JSON.parse(extractedContent);
  } catch (e) {
    logger.warn('Failed to parse OpenAI extraction response, using defaults', {
      error: e,
    });
    extracted = {
      purpose: 'Meeting discussion',
      topicsDiscussed: ['General discussion'],
      keyLearnings: ['Meeting transcribed successfully'],
      actionItems: [],
    };
  }

  // Create meeting note record
  const meetingNote: MeetingNote = {
    id: `mn_${Date.now()}`,
    title: title || 'Untitled Meeting',
    recordedAt: new Date().toISOString(),
    duration: 0, // Would calculate from audio duration
    transcription: transcription,
    purpose: extracted.purpose || '',
    topicsDiscussed: extracted.topicsDiscussed || [],
    keyLearnings: extracted.keyLearnings || [],
    actionItems: extracted.actionItems || [],
    donorName: donorName || null,
    status: 'completed',
  };

  // Store in memory (TODO: persist to database)
  meetingNotesStore.unshift(meetingNote);

  logger.info('Meeting transcribed and analyzed', {
    id: meetingNote.id,
    title: meetingNote.title,
    actionItemsCount: meetingNote.actionItems.length,
  });

  return {
    transcription: transcription,
    purpose: extracted.purpose,
    topicsDiscussed: extracted.topicsDiscussed,
    keyLearnings: extracted.keyLearnings,
    actionItems: extracted.actionItems,
  };
}

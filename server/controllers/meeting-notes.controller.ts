import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as meetingNotesService from '../services/meeting-notes.service';
import * as fs from 'fs';
import { ValidationError } from '../utils/errors';

/**
 * Meeting Notes Controller
 *
 * Handles HTTP requests for meeting notes and transcription.
 */

export const getMeetingNotes = asyncHandler(async (_req: Request, res: Response) => {
  const notes = meetingNotesService.getAllMeetingNotes();
  res.json(notes);
});

export const transcribeMeeting = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ValidationError('No audio file provided');
  }

  const { title, donorName, manualTranscript } = req.body;
  const audioPath = req.file.path;

  // Clean up uploaded file immediately (we use manual transcript for now)
  fs.unlink(audioPath, (err) => {
    if (err) console.error('Error deleting temp file:', err);
  });

  const result = await meetingNotesService.transcribeAndAnalyzeMeeting(
    title,
    donorName,
    manualTranscript
  );

  res.json(result);
});

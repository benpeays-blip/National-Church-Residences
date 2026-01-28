import { Router } from 'express';
import multer from 'multer';
import * as meetingNotesController from '../controllers/meeting-notes.controller';

/**
 * Meeting Notes Routes
 *
 * Defines routes for meeting notes and transcription:
 * - GET  /api/meeting-notes             - Get all meeting notes
 * - POST /api/meeting-notes/transcribe  - Transcribe and analyze audio file
 */

// Multer configuration for audio uploads
const uploadDir = '/tmp/uploads';
const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

export const meetingNotesRouter = Router();

meetingNotesRouter.get('/', meetingNotesController.getMeetingNotes);
meetingNotesRouter.post(
  '/transcribe',
  upload.single('audio'),
  meetingNotesController.transcribeMeeting
);

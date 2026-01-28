import OpenAI from 'openai';
import * as aiRepository from './storage/ai.repository';
import { logger } from '../config/logging';
import { ValidationError } from '../utils/errors';

/**
 * AI Service
 *
 * Business logic for AI-powered features:
 * - Predictive major gift timing
 * - Wealth events monitoring
 * - Meeting briefs
 * - Voice notes
 * - Impact Intelligence chat (OpenAI integration)
 */

/**
 * Get predictive timing predictions
 * Returns scored donors ordered by giving probability
 */
export async function getPredictiveTiming() {
  logger.debug('Fetching predictive timing data');
  const predictions = await aiRepository.findPredictiveTiming();

  logger.info('Predictive timing scores fetched', {
    count: predictions.length,
  });

  return predictions;
}

/**
 * Get wealth events
 * Returns recent wealth events with associated donor data
 */
export async function getWealthEvents() {
  logger.debug('Fetching wealth events');
  const events = await aiRepository.findWealthEvents();

  logger.info('Wealth events fetched', {
    count: events.length,
  });

  return events;
}

/**
 * Get meeting briefs
 * Returns recent AI-generated meeting briefs
 */
export async function getMeetingBriefs() {
  logger.debug('Fetching meeting briefs');
  const briefs = await aiRepository.findMeetingBriefs();

  logger.info('Meeting briefs fetched', {
    count: briefs.length,
  });

  return briefs;
}

/**
 * Get voice notes
 * Returns recent voice note recordings
 */
export async function getVoiceNotes() {
  logger.debug('Fetching voice notes');
  const notes = await aiRepository.findVoiceNotes();

  logger.info('Voice notes fetched', {
    count: notes.length,
  });

  return notes;
}

/**
 * Impact Intelligence Chat
 * Uses OpenAI to help staff find impact stories and outcomes data
 */
export async function chat(message: string, context?: string): Promise<string> {
  if (!message || message.trim().length === 0) {
    throw new ValidationError('Message is required');
  }

  logger.debug('Processing impact intelligence chat', {
    messageLength: message.length,
    hasContext: !!context
  });

  // Validate OpenAI configuration
  const baseURL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
  const apiKey = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;

  if (!baseURL || !apiKey) {
    logger.error('OpenAI configuration missing', {
      hasBaseURL: !!baseURL,
      hasApiKey: !!apiKey
    });
    throw new Error('OpenAI is not configured. Please set AI_INTEGRATIONS_OPENAI_BASE_URL and AI_INTEGRATIONS_OPENAI_API_KEY environment variables.');
  }

  const openai = new OpenAI({
    baseURL,
    apiKey
  });

  const systemPrompt = `You are an Impact Intelligence Assistant for National Church Residences (NCR), a nonprofit organization serving seniors through affordable housing, healthcare services, and community programs.

Your role is to help staff find impact stories, outcomes data, and metrics for donor communications and grant reports.

NCR's key program areas include:
- Affordable Housing: 4,200+ units across multiple states
- Home Health: In-home healthcare services
- Memory Care: Specialized dementia care programs
- Chaplaincy: Spiritual care and grief support
- Volunteer Services: Community engagement programs

When responding:
- Provide specific, quantifiable outcomes when possible
- Frame responses for donor communication use
- Suggest relevant stories or metrics that could strengthen reports
- Be concise but thorough`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 1024,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      logger.warn('OpenAI returned empty response');
      return "I couldn't generate a response. Please try again.";
    }

    logger.info('Chat response generated', {
      inputLength: message.length,
      outputLength: reply.length
    });

    return reply;
  } catch (error: any) {
    logger.error('OpenAI API error', {
      error: error.message,
      code: error.code,
      type: error.type
    });

    // Re-throw with more context
    if (error.status === 401) {
      throw new Error('OpenAI authentication failed. Check your API key.');
    } else if (error.status === 429) {
      throw new Error('OpenAI rate limit exceeded. Please try again later.');
    } else {
      throw new Error(`OpenAI API error: ${error.message}`);
    }
  }
}

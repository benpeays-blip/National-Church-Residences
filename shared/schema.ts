import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
  decimal,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const userRoleEnum = pgEnum("user_role", [
  "ADMIN",
  "CEO",
  "DEV_DIRECTOR",
  "MGO",
  "DATA_OPS",
]);

export const opportunityStageEnum = pgEnum("opportunity_stage", [
  "Prospect",
  "Cultivation",
  "Ask",
  "Steward",
  "Renewal",
]);

export const interactionTypeEnum = pgEnum("interaction_type", [
  "email_open",
  "email_click",
  "meeting",
  "call",
  "event",
  "note",
]);

export const taskPriorityEnum = pgEnum("task_priority", [
  "low",
  "medium",
  "high",
  "urgent",
]);

export const integrationStatusEnum = pgEnum("integration_status", [
  "connected",
  "syncing",
  "error",
  "disconnected",
]);

export const dataQualitySeverityEnum = pgEnum("data_quality_severity", [
  "low",
  "medium",
  "high",
  "critical",
]);

export const grantStageEnum = pgEnum("grant_stage", [
  "Research",
  "LOI",
  "Submitted",
  "Awarded",
  "Declined",
  "ReportDue",
]);

export const wealthEventTypeEnum = pgEnum("wealth_event_type", [
  "stock_sale",
  "ipo",
  "property_sale",
  "inheritance",
  "promotion",
  "business_sale",
  "bonus",
  "other",
]);

export const proposalStatusEnum = pgEnum("proposal_status", [
  "draft",
  "generated",
  "reviewed",
  "submitted",
]);

export const workflowStatusEnum = pgEnum("workflow_status", [
  "draft",
  "published",
  "archived",
]);

export const blockTypeEnum = pgEnum("block_type", [
  "system",
  "human",
  "data",
  "action",
  "organization",
  "logic",
  "annotation",
]);

export const connectionTypeEnum = pgEnum("connection_type", [
  "dataFlow",
  "handoff",
  "dependency",
]);

export const orgArtifactTypeEnum = pgEnum("org_artifact_type", [
  "stage",
  "role",
  "software",
  "document",
  "metric",
  "process",
]);

export const giftTypeEnum = pgEnum("gift_type", [
  "one_time",
  "major",
  "recurring",
  "planned",
  "pledge",
  "in_kind",
]);

export const recurringCadenceEnum = pgEnum("recurring_cadence", [
  "weekly",
  "monthly",
  "quarterly",
  "annual",
  "one_time",
]);

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: userRoleEnum("role").notNull().default("MGO"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Households
export const households = pgTable("households", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  primaryAddress: text("primary_address"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Persons (Donors)
export const persons = pgTable("persons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  preferredName: varchar("preferred_name"),
  primaryEmail: varchar("primary_email"),
  primaryPhone: varchar("primary_phone"),
  householdId: varchar("household_id").references(() => households.id),
  organizationName: varchar("organization_name"),
  wealthBand: varchar("wealth_band"), // e.g., "P2-P5"
  capacityScore: integer("capacity_score"), // 0-100
  engagementScore: integer("engagement_score"), // 0-100
  affinityScore: integer("affinity_score"), // 0-100
  relationshipEnergy: integer("relationship_energy"), // 0-100, energy required for relationship
  relationshipStructure: integer("relationship_structure"), // 0-100, structure level in relationship
  lastGiftDate: timestamp("last_gift_date"),
  lastGiftAmount: decimal("last_gift_amount", { precision: 10, scale: 2 }),
  totalLifetimeGiving: decimal("total_lifetime_giving", {
    precision: 12,
    scale: 2,
  }),
  // Integration metadata
  sourceSystem: varchar("source_system"), // e.g., "Salesforce", "WealthEngine"
  sourceRecordId: varchar("source_record_id"), // External system ID
  syncedAt: timestamp("synced_at"), // Last sync timestamp
  dataQualityScore: integer("data_quality_score"), // 0-100, overall data completeness/freshness
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Campaigns
export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  type: varchar("type").notNull(), // Annual, Year-End, Gala, P2P, etc.
  description: text("description"),
  status: varchar("status").notNull().default("planning"), // planning, active, completed, paused
  goal: decimal("goal", { precision: 12, scale: 2 }),
  raised: decimal("raised", { precision: 12, scale: 2 }).default("0.00"),
  donorCount: integer("donor_count").default(0),
  avgGiftSize: decimal("avg_gift_size", { precision: 12, scale: 2 }),
  totalGifts: integer("total_gifts").default(0),
  ownerId: varchar("owner_id").references(() => users.id),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Gifts
export const gifts = pgTable("gifts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id")
    .references(() => persons.id)
    .notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("USD"),
  receivedAt: timestamp("received_at").notNull(),
  campaignId: varchar("campaign_id").references(() => campaigns.id),
  designation: varchar("designation"),
  paymentMethod: varchar("payment_method"),
  // Gift classification (structured fields)
  giftType: giftTypeEnum("gift_type").default("one_time"),
  recurringCadence: recurringCadenceEnum("recurring_cadence").default("one_time"),
  // Integration metadata
  sourceSystem: varchar("source_system"), // e.g., "Salesforce", "Classy"
  sourceRecordId: varchar("source_record_id"),
  syncedAt: timestamp("synced_at"),
  dataQualityScore: integer("data_quality_score"), // 0-100
  createdAt: timestamp("created_at").defaultNow(),
});

// Opportunities (Pipeline)
export const opportunities = pgTable("opportunities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id")
    .references(() => persons.id)
    .notNull(),
  stage: opportunityStageEnum("stage").notNull().default("Prospect"),
  askAmount: decimal("ask_amount", { precision: 10, scale: 2 }),
  probability: integer("probability"), // 0-100
  closeDate: timestamp("close_date"),
  ownerId: varchar("owner_id").references(() => users.id),
  notes: text("notes"),
  daysInStage: integer("days_in_stage"),
  // Integration metadata
  sourceSystem: varchar("source_system"), // e.g., "Salesforce"
  sourceRecordId: varchar("source_record_id"),
  syncedAt: timestamp("synced_at"),
  dataQualityScore: integer("data_quality_score"), // 0-100
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Grants
export const grants = pgTable("grants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  funderName: varchar("funder_name").notNull(),
  funderContactId: varchar("funder_contact_id").references(() => persons.id), // Optional funder contact
  stage: grantStageEnum("stage").notNull().default("Research"),
  purpose: text("purpose"), // Grant purpose/designation
  askAmount: decimal("ask_amount", { precision: 10, scale: 2 }),
  awardedAmount: decimal("awarded_amount", { precision: 10, scale: 2 }),
  campaignId: varchar("campaign_id").references(() => campaigns.id),
  ownerId: varchar("owner_id").references(() => users.id), // Grant writer/manager
  loiDueDate: timestamp("loi_due_date"),
  applicationDueDate: timestamp("application_due_date"),
  decisionDate: timestamp("decision_date"),
  reportDueDate: timestamp("report_due_date"),
  notes: text("notes"),
  // Integration metadata
  sourceSystem: varchar("source_system"),
  sourceRecordId: varchar("source_record_id"),
  syncedAt: timestamp("synced_at"),
  dataQualityScore: integer("data_quality_score"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Interactions (Moves)
export const interactions = pgTable("interactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id")
    .references(() => persons.id)
    .notNull(),
  type: interactionTypeEnum("type").notNull(),
  occurredAt: timestamp("occurred_at").notNull(),
  ownerId: varchar("owner_id").references(() => users.id),
  notes: text("notes"),
  source: varchar("source"),
  // Integration metadata
  sourceSystem: varchar("source_system"), // e.g., "Mailchimp", "Salesforce"
  sourceRecordId: varchar("source_record_id"),
  syncedAt: timestamp("synced_at"),
  dataQualityScore: integer("data_quality_score"), // 0-100
  createdAt: timestamp("created_at").defaultNow(),
});

// Portfolios
export const portfolios = pgTable("portfolios", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ownerId: varchar("owner_id")
    .references(() => users.id)
    .notNull(),
  name: varchar("name").notNull(),
  prospectIds: text("prospect_ids").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tasks (Next Best Actions)
export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").references(() => persons.id),
  ownerId: varchar("owner_id")
    .references(() => users.id)
    .notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  reason: text("reason"), // Why this task was generated
  priority: taskPriorityEnum("priority").notNull().default("medium"),
  dueDate: timestamp("due_date"),
  completed: integer("completed").notNull().default(0), // 0 or 1
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Integrations (External System Connections)
export const integrations = pgTable("integrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(), // e.g., "Salesforce", "WealthEngine"
  type: varchar("type").notNull(), // e.g., "CRM", "WealthScreening", "Email", "Giving"
  status: integrationStatusEnum("status").notNull().default("connected"),
  lastSyncAt: timestamp("last_sync_at"),
  lastSuccessfulSyncAt: timestamp("last_successful_sync_at"),
  recordCount: integer("record_count").default(0),
  errorMessage: text("error_message"),
  config: jsonb("config"), // Connection config (non-sensitive)
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Integration Sync Runs (Sync History)
export const integrationSyncRuns = pgTable("integration_sync_runs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  integrationId: varchar("integration_id")
    .references(() => integrations.id)
    .notNull(),
  status: varchar("status").notNull(), // "success", "error", "partial"
  recordsProcessed: integer("records_processed").default(0),
  recordsCreated: integer("records_created").default(0),
  recordsUpdated: integer("records_updated").default(0),
  recordsSkipped: integer("records_skipped").default(0),
  errorCount: integer("error_count").default(0),
  errorDetails: jsonb("error_details"),
  startedAt: timestamp("started_at").notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Data Quality Issues
export const dataQualityIssues = pgTable("data_quality_issues", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityType: varchar("entity_type").notNull(), // "person", "gift", etc.
  entityId: varchar("entity_id").notNull(),
  sourceSystem: varchar("source_system"),
  issueType: varchar("issue_type").notNull(), // "missing_field", "duplicate", "stale_data"
  severity: dataQualitySeverityEnum("severity").notNull().default("medium"),
  description: text("description"),
  fieldName: varchar("field_name"),
  resolved: integer("resolved").notNull().default(0), // 0 or 1
  resolvedAt: timestamp("resolved_at"),
  resolvedBy: varchar("resolved_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// 🚀 AI Intelligence Features

// Wealth Events - Real-Time Wealth Event Monitoring
export const wealthEvents = pgTable("wealth_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").references(() => persons.id).notNull(),
  eventType: wealthEventTypeEnum("event_type").notNull(),
  estimatedValue: decimal("estimated_value", { precision: 12, scale: 2 }),
  eventDate: timestamp("event_date").notNull(),
  source: varchar("source"), // "SEC", "LinkedIn", "PropertyRecords", etc.
  sourceUrl: text("source_url"),
  description: text("description"),
  verified: integer("verified").notNull().default(0), // 0 or 1
  alertSent: integer("alert_sent").notNull().default(0), // 0 or 1
  createdAt: timestamp("created_at").defaultNow(),
});

// Meeting Briefs - AI Meeting Prep Assistant
export const meetingBriefs = pgTable("meeting_briefs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").references(() => persons.id).notNull(),
  generatedForUserId: varchar("generated_for_user_id").references(() => users.id).notNull(),
  meetingDate: timestamp("meeting_date"),
  recentNews: jsonb("recent_news"), // Array of news items
  conversationStarters: text("conversation_starters").array(),
  optimalAskAmount: decimal("optimal_ask_amount", { precision: 10, scale: 2 }),
  askConfidence: integer("ask_confidence"), // 0-100
  talkingPoints: text("talking_points").array(),
  riskFactors: text("risk_factors").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Voice Notes - Voice-to-CRM
export const voiceNotes = pgTable("voice_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  personId: varchar("person_id").references(() => persons.id),
  audioUrl: text("audio_url"),
  transcription: text("transcription"),
  aiSummary: text("ai_summary"),
  extractedActionItems: text("extracted_action_items").array(),
  processedInteractionId: varchar("processed_interaction_id").references(() => interactions.id),
  processedTaskIds: text("processed_task_ids").array(), // Array of task IDs created
  recordedAt: timestamp("recorded_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Predictive Scores - Predictive Major Gift Timing
export const predictiveScores = pgTable("predictive_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").references(() => persons.id).notNull(),
  givingProbability: integer("giving_probability"), // 0-100
  predictedAmount: decimal("predicted_amount", { precision: 10, scale: 2 }),
  predictedTimeframe: integer("predicted_timeframe"), // Days until likely gift
  confidence: integer("confidence"), // 0-100
  keyFactors: text("key_factors").array(), // Why this prediction
  calculatedAt: timestamp("calculated_at").defaultNow(),
});

// Board Connections - Board Member Network Mapping
export const boardConnections = pgTable("board_connections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  boardMemberId: varchar("board_member_id").references(() => persons.id).notNull(),
  prospectId: varchar("prospect_id").references(() => persons.id).notNull(),
  connectionStrength: integer("connection_strength"), // 1-3 (1st, 2nd, 3rd degree)
  relationshipType: varchar("relationship_type"), // "colleague", "friend", "family", etc.
  organization: varchar("organization"), // Shared organization (e.g., "Google", "Stanford University")
  position: varchar("position"), // Prospect's position at organization
  yearStart: integer("year_start"), // When they started working together
  yearEnd: integer("year_end"), // When they stopped (null if current)
  source: varchar("source"), // "LinkedIn", "Manual", etc.
  notes: text("notes"),
  introductionRequested: integer("introduction_requested").notNull().default(0),
  introductionMade: integer("introduction_made").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Corporate Partnerships - Corporate Partnership Intelligence
export const corporatePartnerships = pgTable("corporate_partnerships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyName: varchar("company_name").notNull(),
  domain: varchar("domain"), // Company domain for logo API (e.g., "apple.com")
  logoUrl: text("logo_url"), // Direct logo URL
  description: text("description"), // Company description
  industry: varchar("industry"), // Industry category
  location: varchar("location"), // Headquarters location
  employeeCount: integer("employee_count"), // Number of donors at this company
  totalEmployeeGiving: decimal("total_employee_giving", { precision: 12, scale: 2 }),
  totalContributions: decimal("total_contributions", { precision: 12, scale: 2 }), // All-time contributions
  hasMatchingProgram: integer("has_matching_program").notNull().default(0),
  matchingRatio: varchar("matching_ratio"), // "1:1", "2:1", etc.
  estimatedMatchingPotential: decimal("estimated_matching_potential", { precision: 12, scale: 2 }),
  // Contact info
  contactName: varchar("contact_name"),
  contactTitle: varchar("contact_title"),
  contactEmail: varchar("contact_email"),
  contactPhone: varchar("contact_phone"),
  // Partnership details
  partnershipTypes: text("partnership_types").array(), // ["volunteer", "donate", "sponsor", "goods_services"]
  partnershipGoals: text("partnership_goals"), // What they want to achieve
  pastActivities: text("past_activities").array(), // Array of past activity descriptions
  partnershipStatus: varchar("partnership_status").default("active"), // active, inactive, prospect
  partnershipStartYear: integer("partnership_start_year"),
  volunteerHours: integer("volunteer_hours"), // Total volunteer hours contributed
  volunteerCount: integer("volunteer_count"), // Number of volunteers
  decisionMakers: text("decision_makers").array(), // Array of person IDs
  foundationUrl: text("foundation_url"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Peer Donors - Automated Peer Discovery
export const peerDonors = pgTable("peer_donors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").references(() => persons.id).notNull(),
  peerPersonId: varchar("peer_person_id").references(() => persons.id).notNull(),
  similarityScore: integer("similarity_score"), // 0-100
  sharedCharacteristics: text("shared_characteristics").array(),
  peerGaveToPrograms: text("peer_gave_to_programs").array(), // Campaign IDs
  personNotYetAskedFor: text("person_not_yet_asked_for").array(), // Campaign IDs
  calculatedAt: timestamp("calculated_at").defaultNow(),
});

// Outreach Templates - Personalized Outreach Generator
export const outreachTemplates = pgTable("outreach_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").references(() => persons.id).notNull(),
  generatedForUserId: varchar("generated_for_user_id").references(() => users.id).notNull(),
  templateType: varchar("template_type"), // "email", "letter", "call_script"
  subject: varchar("subject"),
  content: text("content").notNull(),
  tone: varchar("tone"), // "formal", "casual", "grateful", etc.
  purpose: varchar("purpose"), // "thank_you", "ask", "update", "event_invite"
  aiRationale: text("ai_rationale"), // Why AI chose this approach
  used: integer("used").notNull().default(0),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Grant Proposals - Automated Grant Proposal Writing
export const grantProposals = pgTable("grant_proposals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  grantId: varchar("grant_id").references(() => grants.id).notNull(),
  funderGuidelines: text("funder_guidelines"),
  generatedNarrative: text("generated_narrative"),
  generatedBudget: jsonb("generated_budget"),
  generatedOutcomes: text("generated_outcomes").array(),
  generatedEvaluationPlan: text("generated_evaluation_plan"),
  status: proposalStatusEnum("status").notNull().default("draft"),
  reviewedBy: varchar("reviewed_by").references(() => users.id),
  edits: text("edits"), // Human edits made after AI generation
  submittedAt: timestamp("submitted_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Impact Reports - Impact Report Personalization
export const impactReports = pgTable("impact_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").references(() => persons.id).notNull(),
  reportingPeriod: varchar("reporting_period"), // "2024-Q1", "2024", etc.
  totalImpact: decimal("total_impact", { precision: 12, scale: 2 }),
  programsSupported: text("programs_supported").array(),
  beneficiariesHelped: integer("beneficiaries_helped"),
  personalizedStories: jsonb("personalized_stories"), // Array of story objects
  photosUrls: text("photos_urls").array(),
  customMessage: text("custom_message"),
  videoUrl: text("video_url"),
  sentAt: timestamp("sent_at"),
  opened: integer("opened").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Sentiment Analysis - Donor Sentiment Analysis
export const sentimentAnalysis = pgTable("sentiment_analysis", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").references(() => persons.id).notNull(),
  analysisDate: timestamp("analysis_date").notNull(),
  emailResponseTime: decimal("email_response_time", { precision: 10, scale: 2 }), // Hours
  engagementTrend: varchar("engagement_trend"), // "increasing", "stable", "declining"
  sentimentScore: integer("sentiment_score"), // 0-100
  riskLevel: varchar("risk_level"), // "low", "medium", "high"
  keySignals: text("key_signals").array(),
  recommendedAction: text("recommended_action"),
  alertGenerated: integer("alert_generated").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Peer Benchmarks - Peer Benchmarking Dashboard
export const peerBenchmarks = pgTable("peer_benchmarks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  metricName: varchar("metric_name").notNull(),
  ourValue: decimal("our_value", { precision: 12, scale: 2 }),
  peerAverage: decimal("peer_average", { precision: 12, scale: 2 }),
  peerMedian: decimal("peer_median", { precision: 12, scale: 2 }),
  peerTop25: decimal("peer_top_25", { precision: 12, scale: 2 }),
  percentileRank: integer("percentile_rank"), // 0-100
  trend: varchar("trend"), // "improving", "stable", "declining"
  aiRecommendation: text("ai_recommendation"),
  calculatedAt: timestamp("calculated_at").defaultNow(),
});

// Portfolio Optimizations - Portfolio Optimization Engine
export const portfolioOptimizations = pgTable("portfolio_optimizations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  runDate: timestamp("run_date").notNull(),
  recommendations: jsonb("recommendations"), // Array of portfolio assignment recommendations
  projectedImpact: decimal("projected_impact", { precision: 12, scale: 2 }),
  optimizationCriteria: text("optimization_criteria").array(),
  implemented: integer("implemented").notNull().default(0),
  actualImpact: decimal("actual_impact", { precision: 12, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Calendar Events - Smart Calendar Integration
export const calendarEvents = pgTable("calendar_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  personId: varchar("person_id").references(() => persons.id),
  eventType: varchar("event_type"), // "donor_meeting", "cultivation_event", etc.
  scheduledAt: timestamp("scheduled_at").notNull(),
  duration: integer("duration"), // Minutes
  aiSuggestedTime: timestamp("ai_suggested_time"),
  priority: integer("priority"), // 0-100, AI-calculated
  estimatedImpact: decimal("estimated_impact", { precision: 10, scale: 2 }),
  meetingBriefId: varchar("meeting_brief_id").references(() => meetingBriefs.id),
  completed: integer("completed").notNull().default(0),
  outcome: text("outcome"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Stewardship Workflows - Automated Stewardship Workflows
export const stewardshipWorkflows = pgTable("stewardship_workflows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  giftId: varchar("gift_id").references(() => gifts.id).notNull(),
  personId: varchar("person_id").references(() => persons.id).notNull(),
  workflowName: varchar("workflow_name"), // "Major Gift Stewardship", "Annual Fund", etc.
  steps: jsonb("steps"), // Array of step objects with timing and content
  currentStep: integer("current_step").notNull().default(0),
  completedSteps: integer("completed_steps").notNull().default(0),
  nextActionDate: timestamp("next_action_date"),
  nextActionType: varchar("next_action_type"),
  paused: integer("paused").notNull().default(0),
  pausedReason: text("paused_reason"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Task Priority Scores - Smart Task Prioritization
export const taskPriorityScores = pgTable("task_priority_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  taskId: varchar("task_id").references(() => tasks.id).notNull(),
  estimatedRevenue: decimal("estimated_revenue", { precision: 10, scale: 2 }),
  urgencyScore: integer("urgency_score"), // 0-100
  impactScore: integer("impact_score"), // 0-100
  effortScore: integer("effort_score"), // 0-100 (lower = less effort)
  finalPriority: integer("final_priority"), // 0-100, weighted combination
  reasoning: text("reasoning"),
  calculatedAt: timestamp("calculated_at").defaultNow(),
});

// Gift Registry - Charitable Gift Registry
export const giftRegistries = pgTable("gift_registries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").references(() => persons.id).notNull(),
  occasionType: varchar("occasion_type"), // "birthday", "wedding", "holiday", etc.
  occasionDate: timestamp("occasion_date"),
  goalAmount: decimal("goal_amount", { precision: 10, scale: 2 }),
  amountRaised: decimal("amount_raised", { precision: 10, scale: 2 }).notNull().default('0'),
  campaignId: varchar("campaign_id").references(() => campaigns.id),
  personalMessage: text("personal_message"),
  publicUrl: varchar("public_url").unique(),
  active: integer("active").notNull().default(1),
  closedAt: timestamp("closed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Fundraising Events - Galas, Golf Tournaments, Rides, etc.
export const fundraisingEvents = pgTable("fundraising_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  eventType: varchar("event_type").notNull(), // "golf", "gala", "ride", "walk", "auction", etc.
  eventDate: timestamp("event_date").notNull(),
  venue: varchar("venue"),
  description: text("description"),
  goalAmount: decimal("goal_amount", { precision: 12, scale: 2 }),
  amountRaised: decimal("amount_raised", { precision: 12, scale: 2 }).notNull().default('0'),
  attendees: integer("attendees"),
  sponsors: text("sponsors").array(),
  campaignId: varchar("campaign_id").references(() => campaigns.id),
  status: varchar("status").notNull().default("upcoming"), // "upcoming", "completed", "cancelled"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Workflows - Visual Workflow Builder
export const workflows = pgTable("workflows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  ownerId: varchar("owner_id").references(() => users.id),
  status: workflowStatusEnum("status").notNull().default("draft"),
  isTemplate: boolean("is_template").notNull().default(false),
  tags: jsonb("tags"), // Array of tags for filtering
  templateCategory: varchar("template_category"), // For templates: "fundraising", "operations", etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Workflow Blocks - Nodes on the canvas
export const workflowBlocks = pgTable("workflow_blocks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  workflowId: varchar("workflow_id").references(() => workflows.id, { onDelete: 'cascade' }).notNull(),
  type: blockTypeEnum("type").notNull(),
  subtype: varchar("subtype").notNull(), // Specific tool or role (e.g., "Salesforce", "MGO", "Gift")
  displayName: varchar("display_name").notNull(),
  positionX: decimal("position_x", { precision: 10, scale: 2 }).notNull(),
  positionY: decimal("position_y", { precision: 10, scale: 2 }).notNull(),
  width: integer("width").default(200),
  height: integer("height").default(80),
  metadata: jsonb("metadata"), // Configuration, notes, links
  colorToken: varchar("color_token"), // For visual styling
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Workflow Connections - Edges/arrows between blocks
export const workflowConnections = pgTable("workflow_connections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  workflowId: varchar("workflow_id").references(() => workflows.id, { onDelete: 'cascade' }).notNull(),
  sourceBlockId: varchar("source_block_id").references(() => workflowBlocks.id, { onDelete: 'cascade' }).notNull(),
  targetBlockId: varchar("target_block_id").references(() => workflowBlocks.id, { onDelete: 'cascade' }).notNull(),
  label: varchar("label"), // Optional label on arrow
  connectionType: connectionTypeEnum("connection_type").notNull().default("dataFlow"),
  metadata: jsonb("metadata"), // Additional config
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Workflow Versions - Version history (optional for MVP)
export const workflowVersions = pgTable("workflow_versions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  workflowId: varchar("workflow_id").references(() => workflows.id, { onDelete: 'cascade' }).notNull(),
  versionNumber: integer("version_number").notNull(),
  snapshot: jsonb("snapshot").notNull(), // Full workflow state
  publishedAt: timestamp("published_at"),
  authorId: varchar("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Organization Canvases - Visual Workflow Canvas persistence
export const organizationCanvases = pgTable("organization_canvases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  ownerId: varchar("owner_id").references(() => users.id),
  isDefault: boolean("is_default").notNull().default(false), // The default canvas for org mapping
  canvasData: jsonb("canvas_data").notNull(), // Nodes, edges, viewport state
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Organization Artifacts - Artifact definitions for the canvas
export const organizationArtifacts = pgTable("organization_artifacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: orgArtifactTypeEnum("type").notNull(),
  subtype: varchar("subtype").notNull(), // e.g., "Prospect Research" for stage, "Salesforce" for software
  displayName: varchar("display_name").notNull(),
  description: text("description"),
  iconName: varchar("icon_name"), // Lucide icon name
  logoUrl: varchar("logo_url"), // For software tools with logos
  colorToken: varchar("color_token"), // Color scheme identifier
  metadata: jsonb("metadata"), // Additional properties
  isBuiltIn: boolean("is_built_in").notNull().default(false), // System-provided vs user-created
  createdAt: timestamp("created_at").defaultNow(),
});

// Board Memberships - Board Relationship Mapping (cross-org board network analysis)
export const boardMemberships = pgTable("board_memberships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personName: varchar("person_name").notNull(), // Full name of board member
  personEmail: varchar("person_email"), // Email for de-duplication
  personId: varchar("person_id").references(() => persons.id), // Link to persons table if known
  orgName: varchar("org_name").notNull(), // Organization name
  orgSector: varchar("org_sector"), // Nonprofit sector (education, health, etc.)
  orgCity: varchar("org_city"),
  orgState: varchar("org_state"),
  role: varchar("role"), // "Director", "Chair", "Treasurer", etc.
  startYear: integer("start_year"),
  endYear: integer("end_year"), // null if current
  source: varchar("source").default("CSV Import"), // "CSV Import", "Manual", "LinkedIn"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const personsRelations = relations(persons, ({ one, many }) => ({
  household: one(households, {
    fields: [persons.householdId],
    references: [households.id],
  }),
  gifts: many(gifts),
  opportunities: many(opportunities),
  interactions: many(interactions),
  tasks: many(tasks),
}));

export const householdsRelations = relations(households, ({ many }) => ({
  members: many(persons),
}));

export const giftsRelations = relations(gifts, ({ one }) => ({
  person: one(persons, {
    fields: [gifts.personId],
    references: [persons.id],
  }),
  campaign: one(campaigns, {
    fields: [gifts.campaignId],
    references: [campaigns.id],
  }),
}));

export const opportunitiesRelations = relations(opportunities, ({ one }) => ({
  person: one(persons, {
    fields: [opportunities.personId],
    references: [persons.id],
  }),
  owner: one(users, {
    fields: [opportunities.ownerId],
    references: [users.id],
  }),
}));

export const grantsRelations = relations(grants, ({ one }) => ({
  funderContact: one(persons, {
    fields: [grants.funderContactId],
    references: [persons.id],
  }),
  campaign: one(campaigns, {
    fields: [grants.campaignId],
    references: [campaigns.id],
  }),
  owner: one(users, {
    fields: [grants.ownerId],
    references: [users.id],
  }),
}));

export const interactionsRelations = relations(interactions, ({ one }) => ({
  person: one(persons, {
    fields: [interactions.personId],
    references: [persons.id],
  }),
  owner: one(users, {
    fields: [interactions.ownerId],
    references: [users.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  person: one(persons, {
    fields: [tasks.personId],
    references: [persons.id],
  }),
  owner: one(users, {
    fields: [tasks.ownerId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  opportunities: many(opportunities),
  interactions: many(interactions),
  portfolios: many(portfolios),
  tasks: many(tasks),
}));

export const campaignsRelations = relations(campaigns, ({ many }) => ({
  gifts: many(gifts),
}));

export const portfoliosRelations = relations(portfolios, ({ one }) => ({
  owner: one(users, {
    fields: [portfolios.ownerId],
    references: [users.id],
  }),
}));

export const integrationsRelations = relations(integrations, ({ many }) => ({
  syncRuns: many(integrationSyncRuns),
}));

export const integrationSyncRunsRelations = relations(integrationSyncRuns, ({ one }) => ({
  integration: one(integrations, {
    fields: [integrationSyncRuns.integrationId],
    references: [integrations.id],
  }),
}));

export const dataQualityIssuesRelations = relations(dataQualityIssues, ({ one }) => ({
  resolvedByUser: one(users, {
    fields: [dataQualityIssues.resolvedBy],
    references: [users.id],
  }),
}));

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPersonSchema = createInsertSchema(persons).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  capacityScore: true,
  engagementScore: true,
  affinityScore: true,
  lastGiftDate: true,
  lastGiftAmount: true,
  totalLifetimeGiving: true,
});

export const insertGiftSchema = createInsertSchema(gifts).omit({
  id: true,
  createdAt: true,
});

export const insertOpportunitySchema = createInsertSchema(opportunities).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInteractionSchema = createInsertSchema(interactions).omit({
  id: true,
  createdAt: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertIntegrationSchema = createInsertSchema(integrations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertIntegrationSyncRunSchema = createInsertSchema(integrationSyncRuns).omit({
  id: true,
  createdAt: true,
});

export const insertDataQualityIssueSchema = createInsertSchema(dataQualityIssues).omit({
  id: true,
  createdAt: true,
  resolvedAt: true,
});

export const insertGrantSchema = createInsertSchema(grants).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWealthEventSchema = createInsertSchema(wealthEvents).omit({
  id: true,
  createdAt: true,
});

export const insertMeetingBriefSchema = createInsertSchema(meetingBriefs).omit({
  id: true,
  createdAt: true,
});

export const insertVoiceNoteSchema = createInsertSchema(voiceNotes).omit({
  id: true,
  createdAt: true,
});

export const insertPredictiveScoreSchema = createInsertSchema(predictiveScores).omit({
  id: true,
  calculatedAt: true,
});

export const insertBoardConnectionSchema = createInsertSchema(boardConnections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCorporatePartnershipSchema = createInsertSchema(corporatePartnerships).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPeerDonorSchema = createInsertSchema(peerDonors).omit({
  id: true,
  calculatedAt: true,
});

export const insertOutreachTemplateSchema = createInsertSchema(outreachTemplates).omit({
  id: true,
  createdAt: true,
  sentAt: true,
});

export const insertGrantProposalSchema = createInsertSchema(grantProposals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  submittedAt: true,
});

export const insertImpactReportSchema = createInsertSchema(impactReports).omit({
  id: true,
  createdAt: true,
  sentAt: true,
});

export const insertSentimentAnalysisSchema = createInsertSchema(sentimentAnalysis).omit({
  id: true,
  createdAt: true,
});

export const insertPeerBenchmarkSchema = createInsertSchema(peerBenchmarks).omit({
  id: true,
  calculatedAt: true,
});

export const insertPortfolioOptimizationSchema = createInsertSchema(portfolioOptimizations).omit({
  id: true,
  createdAt: true,
});

export const insertCalendarEventSchema = createInsertSchema(calendarEvents).omit({
  id: true,
  createdAt: true,
});

export const insertStewardshipWorkflowSchema = createInsertSchema(stewardshipWorkflows).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  completedAt: true,
});

export const insertTaskPriorityScoreSchema = createInsertSchema(taskPriorityScores).omit({
  id: true,
  calculatedAt: true,
});

export const insertGiftRegistrySchema = createInsertSchema(giftRegistries).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  closedAt: true,
});

export const insertFundraisingEventSchema = createInsertSchema(fundraisingEvents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWorkflowSchema = createInsertSchema(workflows).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWorkflowBlockSchema = createInsertSchema(workflowBlocks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWorkflowConnectionSchema = createInsertSchema(workflowConnections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWorkflowVersionSchema = createInsertSchema(workflowVersions).omit({
  id: true,
  createdAt: true,
});

export const insertBoardMembershipSchema = createInsertSchema(boardMemberships).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrganizationCanvasSchema = createInsertSchema(organizationCanvases).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrganizationArtifactSchema = createInsertSchema(organizationArtifacts).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertPerson = z.infer<typeof insertPersonSchema>;
export type Person = typeof persons.$inferSelect;
export type InsertGift = z.infer<typeof insertGiftSchema>;
export type Gift = typeof gifts.$inferSelect;
export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;
export type Opportunity = typeof opportunities.$inferSelect;
export type InsertInteraction = z.infer<typeof insertInteractionSchema>;
export type Interaction = typeof interactions.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;
export type Household = typeof households.$inferSelect;
export type Portfolio = typeof portfolios.$inferSelect;
export type InsertIntegration = z.infer<typeof insertIntegrationSchema>;
export type Integration = typeof integrations.$inferSelect;
export type InsertIntegrationSyncRun = z.infer<typeof insertIntegrationSyncRunSchema>;
export type IntegrationSyncRun = typeof integrationSyncRuns.$inferSelect;
export type InsertDataQualityIssue = z.infer<typeof insertDataQualityIssueSchema>;
export type DataQualityIssue = typeof dataQualityIssues.$inferSelect;
export type InsertGrant = z.infer<typeof insertGrantSchema>;
export type Grant = typeof grants.$inferSelect;
export type InsertWealthEvent = z.infer<typeof insertWealthEventSchema>;
export type WealthEvent = typeof wealthEvents.$inferSelect;
export type InsertMeetingBrief = z.infer<typeof insertMeetingBriefSchema>;
export type MeetingBrief = typeof meetingBriefs.$inferSelect;
export type InsertVoiceNote = z.infer<typeof insertVoiceNoteSchema>;
export type VoiceNote = typeof voiceNotes.$inferSelect;
export type InsertPredictiveScore = z.infer<typeof insertPredictiveScoreSchema>;
export type PredictiveScore = typeof predictiveScores.$inferSelect;
export type InsertBoardConnection = z.infer<typeof insertBoardConnectionSchema>;
export type BoardConnection = typeof boardConnections.$inferSelect;
export type InsertCorporatePartnership = z.infer<typeof insertCorporatePartnershipSchema>;
export type CorporatePartnership = typeof corporatePartnerships.$inferSelect;
export type InsertPeerDonor = z.infer<typeof insertPeerDonorSchema>;
export type PeerDonor = typeof peerDonors.$inferSelect;
export type InsertOutreachTemplate = z.infer<typeof insertOutreachTemplateSchema>;
export type OutreachTemplate = typeof outreachTemplates.$inferSelect;
export type InsertGrantProposal = z.infer<typeof insertGrantProposalSchema>;
export type GrantProposal = typeof grantProposals.$inferSelect;
export type InsertImpactReport = z.infer<typeof insertImpactReportSchema>;
export type ImpactReport = typeof impactReports.$inferSelect;
export type InsertSentimentAnalysis = z.infer<typeof insertSentimentAnalysisSchema>;
export type SentimentAnalysis = typeof sentimentAnalysis.$inferSelect;
export type InsertPeerBenchmark = z.infer<typeof insertPeerBenchmarkSchema>;
export type PeerBenchmark = typeof peerBenchmarks.$inferSelect;
export type InsertPortfolioOptimization = z.infer<typeof insertPortfolioOptimizationSchema>;
export type PortfolioOptimization = typeof portfolioOptimizations.$inferSelect;
export type InsertCalendarEvent = z.infer<typeof insertCalendarEventSchema>;
export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type InsertStewardshipWorkflow = z.infer<typeof insertStewardshipWorkflowSchema>;
export type StewardshipWorkflow = typeof stewardshipWorkflows.$inferSelect;
export type InsertTaskPriorityScore = z.infer<typeof insertTaskPriorityScoreSchema>;
export type TaskPriorityScore = typeof taskPriorityScores.$inferSelect;
export type InsertGiftRegistry = z.infer<typeof insertGiftRegistrySchema>;
export type GiftRegistry = typeof giftRegistries.$inferSelect;
export type InsertFundraisingEvent = z.infer<typeof insertFundraisingEventSchema>;
export type FundraisingEvent = typeof fundraisingEvents.$inferSelect;
export type InsertWorkflow = z.infer<typeof insertWorkflowSchema>;
export type Workflow = typeof workflows.$inferSelect;
export type InsertWorkflowBlock = z.infer<typeof insertWorkflowBlockSchema>;
export type WorkflowBlock = typeof workflowBlocks.$inferSelect;
export type InsertWorkflowConnection = z.infer<typeof insertWorkflowConnectionSchema>;
export type WorkflowConnection = typeof workflowConnections.$inferSelect;
export type InsertWorkflowVersion = z.infer<typeof insertWorkflowVersionSchema>;
export type WorkflowVersion = typeof workflowVersions.$inferSelect;
export type InsertBoardMembership = z.infer<typeof insertBoardMembershipSchema>;
export type BoardMembership = typeof boardMemberships.$inferSelect;
export type InsertOrganizationCanvas = z.infer<typeof insertOrganizationCanvasSchema>;
export type OrganizationCanvas = typeof organizationCanvases.$inferSelect;
export type InsertOrganizationArtifact = z.infer<typeof insertOrganizationArtifactSchema>;
export type OrganizationArtifact = typeof organizationArtifacts.$inferSelect;

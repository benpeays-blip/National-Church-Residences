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
  goal: decimal("goal", { precision: 12, scale: 2 }),
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

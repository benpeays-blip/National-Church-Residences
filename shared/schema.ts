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

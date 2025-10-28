import { db } from "./db";
import {
  users,
  persons,
  households,
  gifts,
  opportunities,
  interactions,
  campaigns,
  portfolios,
  tasks,
  type User,
  type UpsertUser,
  type Person,
  type InsertPerson,
  type Gift,
  type InsertGift,
  type Opportunity,
  type InsertOpportunity,
  type Interaction,
  type InsertInteraction,
  type Campaign,
  type InsertCampaign,
  type Task,
  type InsertTask,
} from "@shared/schema";
import { eq, like, or, and, desc, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  getPersons(search?: string): Promise<Person[]>;
  getPerson(id: string): Promise<Person | undefined>;
  createPerson(person: InsertPerson): Promise<Person>;
  updatePerson(id: string, person: Partial<InsertPerson>): Promise<Person | undefined>;
  
  getGifts(personId?: string): Promise<Gift[]>;
  createGift(gift: InsertGift): Promise<Gift>;
  
  getOpportunities(ownerId?: string): Promise<Opportunity[]>;
  getOpportunity(id: string): Promise<Opportunity | undefined>;
  createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity>;
  updateOpportunity(id: string, opportunity: Partial<InsertOpportunity>): Promise<Opportunity | undefined>;
  
  getInteractions(personId?: string): Promise<Interaction[]>;
  createInteraction(interaction: InsertInteraction): Promise<Interaction>;
  
  getCampaigns(): Promise<Campaign[]>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  
  getTasks(ownerId?: string, completed?: boolean): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, task: Partial<InsertTask>): Promise<Task | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async upsertUser(user: UpsertUser): Promise<User> {
    const existing = user.id ? await this.getUser(user.id) : undefined;
    
    if (existing) {
      const result = await db
        .update(users)
        .set({ ...user, updatedAt: new Date() })
        .where(eq(users.id, user.id!))
        .returning();
      return result[0];
    }
    
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async getPersons(search?: string): Promise<Person[]> {
    if (search) {
      return db
        .select()
        .from(persons)
        .where(
          or(
            like(persons.firstName, `%${search}%`),
            like(persons.lastName, `%${search}%`),
            like(persons.primaryEmail, `%${search}%`)
          )
        )
        .orderBy(desc(persons.totalLifetimeGiving));
    }
    return db.select().from(persons).orderBy(desc(persons.totalLifetimeGiving));
  }

  async getPerson(id: string): Promise<Person | undefined> {
    const result = await db.select().from(persons).where(eq(persons.id, id));
    return result[0];
  }

  async createPerson(person: InsertPerson): Promise<Person> {
    const result = await db.insert(persons).values(person).returning();
    return result[0];
  }

  async updatePerson(id: string, person: Partial<InsertPerson>): Promise<Person | undefined> {
    const result = await db
      .update(persons)
      .set({ ...person, updatedAt: new Date() })
      .where(eq(persons.id, id))
      .returning();
    return result[0];
  }

  async getGifts(personId?: string): Promise<Gift[]> {
    if (personId) {
      return db.select().from(gifts).where(eq(gifts.personId, personId)).orderBy(desc(gifts.receivedAt));
    }
    return db.select().from(gifts).orderBy(desc(gifts.receivedAt));
  }

  async createGift(gift: InsertGift): Promise<Gift> {
    const result = await db.insert(gifts).values(gift).returning();
    
    await this.updateDonorScores(gift.personId);
    
    return result[0];
  }

  async getOpportunities(ownerId?: string): Promise<Opportunity[]> {
    if (ownerId) {
      return db.select().from(opportunities).where(eq(opportunities.ownerId, ownerId));
    }
    return db.select().from(opportunities);
  }

  async getOpportunity(id: string): Promise<Opportunity | undefined> {
    const result = await db.select().from(opportunities).where(eq(opportunities.id, id));
    return result[0];
  }

  async createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity> {
    const result = await db.insert(opportunities).values(opportunity).returning();
    return result[0];
  }

  async updateOpportunity(id: string, opportunity: Partial<InsertOpportunity>): Promise<Opportunity | undefined> {
    const result = await db
      .update(opportunities)
      .set({ ...opportunity, updatedAt: new Date() })
      .where(eq(opportunities.id, id))
      .returning();
    return result[0];
  }

  async getInteractions(personId?: string): Promise<Interaction[]> {
    if (personId) {
      return db.select().from(interactions).where(eq(interactions.personId, personId)).orderBy(desc(interactions.occurredAt));
    }
    return db.select().from(interactions).orderBy(desc(interactions.occurredAt));
  }

  async createInteraction(interaction: InsertInteraction): Promise<Interaction> {
    const result = await db.insert(interactions).values(interaction).returning();
    
    await this.updateDonorScores(interaction.personId);
    
    return result[0];
  }

  async getCampaigns(): Promise<Campaign[]> {
    return db.select().from(campaigns);
  }

  async createCampaign(campaign: InsertCampaign): Promise<Campaign> {
    const result = await db.insert(campaigns).values(campaign).returning();
    return result[0];
  }

  async getTasks(ownerId?: string, completed?: boolean): Promise<Task[]> {
    const conditions = [];
    if (ownerId) conditions.push(eq(tasks.ownerId, ownerId));
    if (completed !== undefined) conditions.push(eq(tasks.completed, completed ? 1 : 0));
    
    if (conditions.length > 0) {
      return db.select().from(tasks).where(and(...conditions)).orderBy(desc(tasks.priority), tasks.dueDate);
    }
    return db.select().from(tasks).orderBy(desc(tasks.priority), tasks.dueDate);
  }

  async createTask(task: InsertTask): Promise<Task> {
    const result = await db.insert(tasks).values(task).returning();
    return result[0];
  }

  async updateTask(id: string, task: Partial<InsertTask>): Promise<Task | undefined> {
    const updates: any = { ...task };
    if (task.completed === 1 && !task.completedAt) {
      updates.completedAt = new Date();
    }
    
    const result = await db
      .update(tasks)
      .set(updates)
      .where(eq(tasks.id, id))
      .returning();
    return result[0];
  }

  private async updateDonorScores(personId: string): Promise<void> {
    const person = await this.getPerson(personId);
    if (!person) return;

    const giftsList = await this.getGifts(personId);
    const interactionsList = await this.getInteractions(personId);

    const engagementScore = this.calculateEngagementScore(interactionsList);
    const capacityScore = this.calculateCapacityScore(giftsList);
    const affinityScore = this.calculateAffinityScore(giftsList, interactionsList);

    const lastGift = giftsList[0];
    const totalLifetimeGiving = giftsList.reduce((sum, g) => sum + parseFloat(g.amount), 0);

    await this.updatePerson(personId, {
      engagementScore,
      capacityScore,
      affinityScore,
      lastGiftDate: lastGift?.receivedAt,
      lastGiftAmount: lastGift?.amount,
      totalLifetimeGiving: totalLifetimeGiving.toString(),
    });
  }

  private calculateEngagementScore(interactions: Interaction[]): number {
    if (interactions.length === 0) return 0;

    const now = new Date();
    const recentInteractions = interactions.filter(i => {
      const daysSince = (now.getTime() - new Date(i.occurredAt).getTime()) / (1000 * 60 * 60 * 24);
      return daysSince <= 90;
    });

    const score = Math.min(100, (recentInteractions.length / 5) * 100);
    return Math.round(score);
  }

  private calculateCapacityScore(gifts: Gift[]): number {
    if (gifts.length === 0) return 0;

    const totalGiving = gifts.reduce((sum, g) => sum + parseFloat(g.amount), 0);
    const avgGift = totalGiving / gifts.length;

    if (avgGift >= 10000) return 100;
    if (avgGift >= 5000) return 85;
    if (avgGift >= 1000) return 70;
    if (avgGift >= 500) return 55;
    if (avgGift >= 100) return 40;
    return 25;
  }

  private calculateAffinityScore(gifts: Gift[], interactions: Interaction[]): number {
    if (gifts.length === 0) return 0;

    const avgScore = (this.calculateEngagementScore(interactions) + this.calculateCapacityScore(gifts)) / 2;
    
    const recency = gifts.length > 0 ? 
      Math.max(0, 100 - ((new Date().getTime() - new Date(gifts[0].receivedAt).getTime()) / (1000 * 60 * 60 * 24 * 365)) * 20) : 0;

    return Math.round((avgScore + recency) / 2);
  }
}

export const storage = new DatabaseStorage();

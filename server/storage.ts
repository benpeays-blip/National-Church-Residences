import { db } from "./db";
import {
  users,
  persons,
  households,
  gifts,
  opportunities,
  grants,
  interactions,
  campaigns,
  portfolios,
  tasks,
  workflows,
  workflowBlocks,
  workflowConnections,
  organizationCanvases,
  type User,
  type UpsertUser,
  type Person,
  type InsertPerson,
  type Gift,
  type InsertGift,
  type Opportunity,
  type InsertOpportunity,
  type Grant,
  type InsertGrant,
  type Interaction,
  type InsertInteraction,
  type Campaign,
  type InsertCampaign,
  type Task,
  type InsertTask,
  type Workflow,
  type InsertWorkflow,
  type WorkflowBlock,
  type InsertWorkflowBlock,
  type WorkflowConnection,
  type InsertWorkflowConnection,
  type OrganizationCanvas,
  type InsertOrganizationCanvas,
} from "@shared/schema";
import { eq, like, or, and, desc, sql, ilike } from "drizzle-orm";

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
  
  getGrants(ownerId?: string, stage?: string): Promise<Grant[]>;
  getGrant(id: string): Promise<Grant | undefined>;
  createGrant(grant: InsertGrant): Promise<Grant>;
  updateGrant(id: string, grant: Partial<InsertGrant>): Promise<Grant | undefined>;
  
  getInteractions(personId?: string): Promise<Interaction[]>;
  createInteraction(interaction: InsertInteraction): Promise<Interaction>;
  
  getCampaigns(): Promise<Campaign[]>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  
  getTasks(ownerId?: string, completed?: boolean): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, task: Partial<InsertTask>): Promise<Task | undefined>;
  generateNextBestActions(ownerId?: string): Promise<Task[]>;
  
  // Workflows
  getWorkflows(ownerId?: string, isTemplate?: boolean): Promise<Workflow[]>;
  getWorkflow(id: string): Promise<Workflow | undefined>;
  createWorkflow(workflow: InsertWorkflow): Promise<Workflow>;
  updateWorkflow(id: string, workflow: Partial<InsertWorkflow>): Promise<Workflow | undefined>;
  deleteWorkflow(id: string): Promise<void>;
  cloneWorkflow(id: string, ownerId?: string): Promise<Workflow>;
  
  // Workflow Blocks
  getWorkflowBlocks(workflowId: string): Promise<WorkflowBlock[]>;
  createWorkflowBlock(block: InsertWorkflowBlock): Promise<WorkflowBlock>;
  updateWorkflowBlock(id: string, block: Partial<InsertWorkflowBlock>): Promise<WorkflowBlock | undefined>;
  deleteWorkflowBlock(id: string): Promise<void>;
  
  // Workflow Connections
  getWorkflowConnections(workflowId: string): Promise<WorkflowConnection[]>;
  createWorkflowConnection(connection: InsertWorkflowConnection): Promise<WorkflowConnection>;
  updateWorkflowConnection(id: string, connection: Partial<InsertWorkflowConnection>): Promise<WorkflowConnection | undefined>;
  deleteWorkflowConnection(id: string): Promise<void>;
  
  // Template Seeding
  seedWorkflowTemplates(): Promise<void>;
  
  // Organization Canvases
  getOrganizationCanvases(ownerId?: string): Promise<OrganizationCanvas[]>;
  getOrganizationCanvas(id: string): Promise<OrganizationCanvas | undefined>;
  createOrganizationCanvas(canvas: InsertOrganizationCanvas): Promise<OrganizationCanvas>;
  updateOrganizationCanvas(id: string, canvas: Partial<InsertOrganizationCanvas>): Promise<OrganizationCanvas | undefined>;
  deleteOrganizationCanvas(id: string): Promise<void>;
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

  async getOpportunities(ownerId?: string): Promise<any[]> {
    const baseQuery = db
      .select({
        opportunity: opportunities,
        person: {
          firstName: persons.firstName,
          lastName: persons.lastName,
        },
        owner: {
          firstName: users.firstName,
          lastName: users.lastName,
        },
      })
      .from(opportunities)
      .leftJoin(persons, eq(opportunities.personId, persons.id))
      .leftJoin(users, eq(opportunities.ownerId, users.id));
    
    const results = ownerId
      ? await baseQuery.where(eq(opportunities.ownerId, ownerId))
      : await baseQuery;
    
    return results.map((row) => ({
      ...row.opportunity,
      person: row.person,
      owner: row.owner,
    }));
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

  async getGrants(ownerId?: string, stage?: string): Promise<Grant[]> {
    const conditions = [];
    if (ownerId) conditions.push(eq(grants.ownerId, ownerId));
    if (stage) conditions.push(eq(grants.stage, stage as any));
    
    if (conditions.length > 0) {
      return db.select().from(grants).where(and(...conditions)).orderBy(grants.applicationDueDate);
    }
    return db.select().from(grants).orderBy(grants.applicationDueDate);
  }

  async getGrant(id: string): Promise<Grant | undefined> {
    const result = await db.select().from(grants).where(eq(grants.id, id));
    return result[0];
  }

  async createGrant(grant: InsertGrant): Promise<Grant> {
    const result = await db.insert(grants).values(grant).returning();
    return result[0];
  }

  async updateGrant(id: string, grant: Partial<InsertGrant>): Promise<Grant | undefined> {
    const result = await db
      .update(grants)
      .set({ ...grant, updatedAt: new Date() })
      .where(eq(grants.id, id))
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

  async generateNextBestActions(ownerId?: string): Promise<Task[]> {
    const generatedTasks: Task[] = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const lastYear = currentYear - 1;

    // Get all persons with their data
    const allPersons = await this.getPersons();
    
    // Get all MGO users to assign tasks
    const mgoUsers = await db
      .select()
      .from(users)
      .where(eq(users.role, "MGO"));
    
    const defaultOwner = ownerId || mgoUsers[0]?.id;
    if (!defaultOwner) return [];

    // Helper: Check if similar open task already exists for this person
    const hasSimilarOpenTask = async (personId: string, titleKeyword: string): Promise<boolean> => {
      const existingTasks = await db
        .select()
        .from(tasks)
        .where(
          and(
            eq(tasks.personId, personId),
            eq(tasks.completed, 0), // 0 = not completed, 1 = completed
            ilike(tasks.title, `%${titleKeyword}%`)
          )
        )
        .limit(1);
      return existingTasks.length > 0;
    };

    for (const person of allPersons) {
      const personGifts = await this.getGifts(person.id);
      const personInteractions = await this.getInteractions(person.id);
      const personOpportunities = await db
        .select()
        .from(opportunities)
        .where(eq(opportunities.personId, person.id));

      // Rule 1: LYBUNT Detection (gave last year but not this year)
      const gave2024 = personGifts.some(g => 
        new Date(g.receivedAt).getFullYear() === lastYear
      );
      const gave2025 = personGifts.some(g => 
        new Date(g.receivedAt).getFullYear() === currentYear
      );
      
      if (gave2024 && !gave2025) {
        // Check if similar task already exists
        const hasExisting = await hasSimilarOpenTask(person.id, "LYBUNT");
        if (!hasExisting) {
          const lastGift = personGifts.find(g => 
            new Date(g.receivedAt).getFullYear() === lastYear
          );
          const task = await this.createTask({
            personId: person.id,
            ownerId: defaultOwner,
            title: `LYBUNT: Re-engage ${person.firstName} ${person.lastName}`,
            description: `Personal renewal outreach needed. ${person.firstName} gave ${lastGift ? `$${lastGift.amount}` : ''} in ${lastYear} but hasn't renewed yet.`,
            reason: `Gave last year but not this year - high priority for retention`,
            priority: "high",
            dueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
          });
          generatedTasks.push(task);
        }
      }

      // Rule 2: High Engagement + No Recent Gift → Cultivation Call
      if (
        (person.engagementScore ?? 0) >= 70 &&
        person.lastGiftDate &&
        (now.getTime() - new Date(person.lastGiftDate).getTime()) / (1000 * 60 * 60 * 24) > 180
      ) {
        // Check if similar task already exists
        const hasExisting = await hasSimilarOpenTask(person.id, "cultivation call");
        if (!hasExisting) {
          const task = await this.createTask({
            personId: person.id,
            ownerId: defaultOwner,
            title: `Schedule cultivation call with ${person.firstName} ${person.lastName}`,
            description: `High engagement (${person.engagementScore}%) but last gift was ${Math.round((now.getTime() - new Date(person.lastGiftDate).getTime()) / (1000 * 60 * 60 * 24))} days ago. Time for a personal touch.`,
            reason: `High engagement score with no recent giving - ready for cultivation`,
            priority: "high",
            dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days
          });
          generatedTasks.push(task);
        }
      }

      // Rule 3: Recent Event Attendance + High Capacity → Follow-up
      const recentEventInteraction = personInteractions.find(i => 
        i.type === "event" &&
        (now.getTime() - new Date(i.occurredAt).getTime()) / (1000 * 60 * 60 * 24) <= 7
      );
      
      if (recentEventInteraction && (person.capacityScore ?? 0) >= 60) {
        // Check if similar task already exists
        const hasExisting = await hasSimilarOpenTask(person.id, "Follow up");
        if (!hasExisting) {
          const task = await this.createTask({
            personId: person.id,
            ownerId: defaultOwner,
            title: `Follow up with ${person.firstName} ${person.lastName} after event`,
            description: `${person.firstName} attended an event recently and has capacity score of ${person.capacityScore}%. Send personalized follow-up with soft ask.`,
            reason: `Recent event attendance with high capacity - strike while iron is hot`,
            priority: "urgent",
            dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days
          });
          generatedTasks.push(task);
        }
      }

      // Rule 4: Opportunity Stuck in Stage → Advance or Meeting
      for (const opp of personOpportunities) {
        if (opp.daysInStage && opp.daysInStage > 90) {
          // Check if similar task already exists
          const hasExisting = await hasSimilarOpenTask(person.id, "Advance opportunity");
          if (!hasExisting) {
            const task = await this.createTask({
              personId: person.id,
              ownerId: opp.ownerId || defaultOwner,
              title: `Advance opportunity for ${person.firstName} ${person.lastName}`,
              description: `Opportunity has been in "${opp.stage}" stage for ${opp.daysInStage} days. Schedule meeting to advance or close.`,
              reason: `Opportunity stalled - needs action to prevent pipeline decay`,
              priority: "medium",
              dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days
            });
            generatedTasks.push(task);
          }
        }
      }

      // Rule 5: High Email Engagement + No Opportunity → Create Prospect
      const recentEmailEngagement = personInteractions.filter(i => 
        (i.type === "email_open" || i.type === "email_click") &&
        (now.getTime() - new Date(i.occurredAt).getTime()) / (1000 * 60 * 60 * 24) <= 30
      );
      
      if (
        recentEmailEngagement.length >= 3 &&
        (person.capacityScore ?? 0) >= 60 &&
        personOpportunities.length === 0
      ) {
        // Check if similar task already exists
        const hasExisting = await hasSimilarOpenTask(person.id, "Create opportunity");
        if (!hasExisting) {
          const task = await this.createTask({
            personId: person.id,
            ownerId: defaultOwner,
            title: `Create opportunity for ${person.firstName} ${person.lastName}`,
            description: `${person.firstName} has opened/clicked ${recentEmailEngagement.length} emails in the last 30 days and has capacity score of ${person.capacityScore}%. Consider adding to pipeline.`,
            reason: `High email engagement with no active opportunity - prospect ready for cultivation`,
            priority: "medium",
            dueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
          });
          generatedTasks.push(task);
        }
      }
    }

    return generatedTasks;
  }

  // Workflow Methods
  async getWorkflows(ownerId?: string, isTemplate?: boolean): Promise<Workflow[]> {
    let query = db.select().from(workflows);
    
    if (ownerId !== undefined || isTemplate !== undefined) {
      const conditions = [];
      if (ownerId) conditions.push(eq(workflows.ownerId, ownerId));
      if (isTemplate !== undefined) conditions.push(eq(workflows.isTemplate, isTemplate));
      query = query.where(and(...conditions)) as any;
    }
    
    return query.orderBy(desc(workflows.updatedAt));
  }

  async getWorkflow(id: string): Promise<Workflow | undefined> {
    const result = await db.select().from(workflows).where(eq(workflows.id, id));
    return result[0];
  }

  async createWorkflow(workflow: InsertWorkflow): Promise<Workflow> {
    const result = await db.insert(workflows).values(workflow).returning();
    return result[0];
  }

  async updateWorkflow(id: string, workflow: Partial<InsertWorkflow>): Promise<Workflow | undefined> {
    const result = await db
      .update(workflows)
      .set({ ...workflow, updatedAt: new Date() })
      .where(eq(workflows.id, id))
      .returning();
    return result[0];
  }

  async deleteWorkflow(id: string): Promise<void> {
    await db.delete(workflows).where(eq(workflows.id, id));
  }

  async cloneWorkflow(id: string, ownerId?: string): Promise<Workflow> {
    // Get the original workflow
    const original = await this.getWorkflow(id);
    if (!original) throw new Error("Workflow not found");

    // Get all blocks and connections
    const blocks = await this.getWorkflowBlocks(id);
    const connections = await this.getWorkflowConnections(id);

    // Create new workflow
    const newWorkflow = await this.createWorkflow({
      name: `${original.name} (Copy)`,
      description: original.description,
      ownerId: ownerId || original.ownerId,
      status: "draft",
      isTemplate: false,
      tags: original.tags,
      templateCategory: original.templateCategory,
    });

    // Clone blocks with ID mapping
    const blockIdMap = new Map<string, string>();
    for (const block of blocks) {
      const newBlock = await this.createWorkflowBlock({
        workflowId: newWorkflow.id,
        type: block.type,
        subtype: block.subtype,
        displayName: block.displayName,
        positionX: block.positionX,
        positionY: block.positionY,
        width: block.width,
        height: block.height,
        metadata: block.metadata,
        colorToken: block.colorToken,
      });
      blockIdMap.set(block.id, newBlock.id);
    }

    // Clone connections with updated block IDs
    for (const connection of connections) {
      await this.createWorkflowConnection({
        workflowId: newWorkflow.id,
        sourceBlockId: blockIdMap.get(connection.sourceBlockId)!,
        targetBlockId: blockIdMap.get(connection.targetBlockId)!,
        label: connection.label,
        connectionType: connection.connectionType,
        metadata: connection.metadata,
      });
    }

    return newWorkflow;
  }

  // Workflow Blocks
  async getWorkflowBlocks(workflowId: string): Promise<WorkflowBlock[]> {
    return db.select().from(workflowBlocks).where(eq(workflowBlocks.workflowId, workflowId));
  }

  async createWorkflowBlock(block: InsertWorkflowBlock): Promise<WorkflowBlock> {
    const result = await db.insert(workflowBlocks).values(block).returning();
    return result[0];
  }

  async updateWorkflowBlock(id: string, block: Partial<InsertWorkflowBlock>): Promise<WorkflowBlock | undefined> {
    const result = await db
      .update(workflowBlocks)
      .set({ ...block, updatedAt: new Date() })
      .where(eq(workflowBlocks.id, id))
      .returning();
    return result[0];
  }

  async deleteWorkflowBlock(id: string): Promise<void> {
    await db.delete(workflowBlocks).where(eq(workflowBlocks.id, id));
  }

  // Workflow Connections
  async getWorkflowConnections(workflowId: string): Promise<WorkflowConnection[]> {
    return db.select().from(workflowConnections).where(eq(workflowConnections.workflowId, workflowId));
  }

  async createWorkflowConnection(connection: InsertWorkflowConnection): Promise<WorkflowConnection> {
    const result = await db.insert(workflowConnections).values(connection).returning();
    return result[0];
  }

  async updateWorkflowConnection(id: string, connection: Partial<InsertWorkflowConnection>): Promise<WorkflowConnection | undefined> {
    const result = await db
      .update(workflowConnections)
      .set({ ...connection, updatedAt: new Date() })
      .where(eq(workflowConnections.id, id))
      .returning();
    return result[0];
  }

  async deleteWorkflowConnection(id: string): Promise<void> {
    await db.delete(workflowConnections).where(eq(workflowConnections.id, id));
  }

  // Seed workflow templates
  async seedWorkflowTemplates(): Promise<void> {
    const { demoWorkflows } = await import('./demo-workflows');
    const { randomUUID } = await import('crypto');
    
    // Check if templates already exist
    const existingTemplates = await this.getWorkflows(undefined, true);
    if (existingTemplates.length > 0) {
      console.log('Templates already seeded, skipping...');
      return;
    }

    console.log(`Seeding ${demoWorkflows.length} workflow templates...`);

    for (const demoWorkflow of demoWorkflows) {
      try {
        // Create the workflow
        const workflow = await this.createWorkflow({
          name: demoWorkflow.name,
          description: demoWorkflow.description,
          ownerId: null, // Templates have no owner
          status: 'published',
          isTemplate: true,
          tags: { categories: [demoWorkflow.templateCategory] },
          templateCategory: demoWorkflow.templateCategory,
        });

        // Create blocks with ID mapping
        const blockIdMap = new Map<string, string>();
        
        for (const demoBlock of demoWorkflow.blocks) {
          const blockId = randomUUID();
          blockIdMap.set(demoBlock.key, blockId);
          
          await this.createWorkflowBlock({
            id: blockId,
            workflowId: workflow.id,
            type: demoBlock.type,
            subtype: demoBlock.subtype,
            displayName: demoBlock.label,
            positionX: demoBlock.position.x,
            positionY: demoBlock.position.y,
            config: demoBlock.config || {},
          });
        }

        // Create connections using mapped IDs
        for (const demoConn of demoWorkflow.connections) {
          const sourceId = blockIdMap.get(demoConn.sourceKey);
          const targetId = blockIdMap.get(demoConn.targetKey);
          
          if (!sourceId || !targetId) {
            console.warn(`Skipping connection: source or target not found`, demoConn);
            continue;
          }

          await this.createWorkflowConnection({
            workflowId: workflow.id,
            sourceBlockId: sourceId,
            targetBlockId: targetId,
            label: demoConn.label,
          });
        }

        console.log(`✓ Seeded template: ${workflow.name}`);
      } catch (error) {
        console.error(`Error seeding template ${demoWorkflow.name}:`, error);
      }
    }

    console.log('Template seeding complete!');
  }

  // Organization Canvases
  async getOrganizationCanvases(ownerId?: string): Promise<OrganizationCanvas[]> {
    if (ownerId) {
      return await db
        .select()
        .from(organizationCanvases)
        .where(eq(organizationCanvases.ownerId, ownerId))
        .orderBy(desc(organizationCanvases.updatedAt));
    }
    return await db.select().from(organizationCanvases).orderBy(desc(organizationCanvases.updatedAt));
  }

  async getOrganizationCanvas(id: string): Promise<OrganizationCanvas | undefined> {
    const result = await db.select().from(organizationCanvases).where(eq(organizationCanvases.id, id));
    return result[0];
  }

  async createOrganizationCanvas(canvas: InsertOrganizationCanvas): Promise<OrganizationCanvas> {
    const result = await db.insert(organizationCanvases).values(canvas).returning();
    return result[0];
  }

  async updateOrganizationCanvas(id: string, canvas: Partial<InsertOrganizationCanvas>): Promise<OrganizationCanvas | undefined> {
    const result = await db
      .update(organizationCanvases)
      .set({ ...canvas, updatedAt: new Date() })
      .where(eq(organizationCanvases.id, id))
      .returning();
    return result[0];
  }

  async deleteOrganizationCanvas(id: string): Promise<void> {
    await db.delete(organizationCanvases).where(eq(organizationCanvases.id, id));
  }
}

export const storage = new DatabaseStorage();

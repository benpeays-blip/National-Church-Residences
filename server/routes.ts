import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { db } from "./db";
import { persons, opportunities, users } from "@shared/schema";
import { eq, sql, desc } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/persons", isAuthenticated, async (req, res) => {
    try {
      const search = req.query.search as string | undefined;
      const personsList = await storage.getPersons(search);
      res.json(personsList);
    } catch (error) {
      console.error("Error fetching persons:", error);
      res.status(500).json({ message: "Failed to fetch persons" });
    }
  });

  app.get("/api/persons/:id", isAuthenticated, async (req, res) => {
    try {
      const person = await storage.getPerson(req.params.id);
      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }
      res.json(person);
    } catch (error) {
      console.error("Error fetching person:", error);
      res.status(500).json({ message: "Failed to fetch person" });
    }
  });

  app.post("/api/persons", isAuthenticated, async (req, res) => {
    try {
      const person = await storage.createPerson(req.body);
      res.json(person);
    } catch (error) {
      console.error("Error creating person:", error);
      res.status(500).json({ message: "Failed to create person" });
    }
  });

  app.get("/api/gifts", isAuthenticated, async (req, res) => {
    try {
      const personId = req.query.personId as string | undefined;
      const giftsList = await storage.getGifts(personId);
      res.json(giftsList);
    } catch (error) {
      console.error("Error fetching gifts:", error);
      res.status(500).json({ message: "Failed to fetch gifts" });
    }
  });

  app.post("/api/gifts", isAuthenticated, async (req, res) => {
    try {
      const gift = await storage.createGift(req.body);
      res.json(gift);
    } catch (error) {
      console.error("Error creating gift:", error);
      res.status(500).json({ message: "Failed to create gift" });
    }
  });

  app.get("/api/opportunities", isAuthenticated, async (req, res) => {
    try {
      const ownerId = req.query.ownerId as string | undefined;
      const opportunitiesList = await storage.getOpportunities(ownerId);
      res.json(opportunitiesList);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
      res.status(500).json({ message: "Failed to fetch opportunities" });
    }
  });

  app.post("/api/opportunities", isAuthenticated, async (req, res) => {
    try {
      const opportunity = await storage.createOpportunity(req.body);
      res.json(opportunity);
    } catch (error) {
      console.error("Error creating opportunity:", error);
      res.status(500).json({ message: "Failed to create opportunity" });
    }
  });

  app.patch("/api/opportunities/:id", isAuthenticated, async (req, res) => {
    try {
      const opportunity = await storage.updateOpportunity(req.params.id, req.body);
      if (!opportunity) {
        return res.status(404).json({ message: "Opportunity not found" });
      }
      res.json(opportunity);
    } catch (error) {
      console.error("Error updating opportunity:", error);
      res.status(500).json({ message: "Failed to update opportunity" });
    }
  });

  app.get("/api/interactions", isAuthenticated, async (req, res) => {
    try {
      const personId = req.query.personId as string | undefined;
      const interactionsList = await storage.getInteractions(personId);
      res.json(interactionsList);
    } catch (error) {
      console.error("Error fetching interactions:", error);
      res.status(500).json({ message: "Failed to fetch interactions" });
    }
  });

  app.post("/api/interactions", isAuthenticated, async (req, res) => {
    try {
      const interaction = await storage.createInteraction(req.body);
      res.json(interaction);
    } catch (error) {
      console.error("Error creating interaction:", error);
      res.status(500).json({ message: "Failed to create interaction" });
    }
  });

  app.get("/api/campaigns", isAuthenticated, async (req, res) => {
    try {
      const campaignsList = await storage.getCampaigns();
      res.json(campaignsList);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  app.post("/api/campaigns", isAuthenticated, async (req, res) => {
    try {
      const campaign = await storage.createCampaign(req.body);
      res.json(campaign);
    } catch (error) {
      console.error("Error creating campaign:", error);
      res.status(500).json({ message: "Failed to create campaign" });
    }
  });

  app.get("/api/tasks", isAuthenticated, async (req, res) => {
    try {
      const ownerId = req.query.ownerId as string | undefined;
      const completed = req.query.completed === "true" ? true : req.query.completed === "false" ? false : undefined;
      const tasksList = await storage.getTasks(ownerId, completed);
      res.json(tasksList);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  app.post("/api/tasks", isAuthenticated, async (req, res) => {
    try {
      const task = await storage.createTask(req.body);
      res.json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  app.patch("/api/tasks/:id", isAuthenticated, async (req, res) => {
    try {
      const task = await storage.updateTask(req.params.id, req.body);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  app.get("/api/dashboard/mgo", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;

      const opportunitiesList = await db
        .select({
          id: opportunities.id,
          personId: opportunities.personId,
          stage: opportunities.stage,
          askAmount: opportunities.askAmount,
          probability: opportunities.probability,
          closeDate: opportunities.closeDate,
          ownerId: opportunities.ownerId,
          notes: opportunities.notes,
          daysInStage: opportunities.daysInStage,
          createdAt: opportunities.createdAt,
          updatedAt: opportunities.updatedAt,
          personFirstName: persons.firstName,
          personLastName: persons.lastName,
          ownerFirstName: users.firstName,
          ownerLastName: users.lastName,
        })
        .from(opportunities)
        .leftJoin(persons, eq(opportunities.personId, persons.id))
        .leftJoin(users, eq(opportunities.ownerId, users.id))
        .where(eq(opportunities.ownerId, userId));

      const tasksList = await storage.getTasks(userId, false);

      const portfolioPersons = await db
        .select()
        .from(persons)
        .where(
          sql`${persons.id} IN (SELECT DISTINCT ${opportunities.personId} FROM ${opportunities} WHERE ${opportunities.ownerId} = ${userId})`
        );

      const pipelineValue = opportunitiesList.reduce(
        (sum, opp) => sum + parseFloat(opp.askAmount || "0"),
        0
      );

      res.json({
        metrics: {
          portfolioSize: portfolioPersons.length,
          pipelineValue,
          completedTasks: tasksList.filter((t) => t.completed).length,
          upcomingMeetings: 0,
        },
        tasks: tasksList.slice(0, 10).map((t) => ({
          ...t,
          person: portfolioPersons.find((p) => p.id === t.personId),
        })),
        opportunities: opportunitiesList.map((opp) => ({
          id: opp.id,
          personId: opp.personId,
          stage: opp.stage,
          askAmount: opp.askAmount,
          probability: opp.probability,
          closeDate: opp.closeDate,
          ownerId: opp.ownerId,
          notes: opp.notes,
          daysInStage: opp.daysInStage,
          createdAt: opp.createdAt,
          updatedAt: opp.updatedAt,
          person: {
            firstName: opp.personFirstName,
            lastName: opp.personLastName,
          },
          owner: {
            firstName: opp.ownerFirstName,
            lastName: opp.ownerLastName,
          },
        })),
      });
    } catch (error) {
      console.error("Error fetching MGO dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  app.get("/api/dashboard/dev-director", isAuthenticated, async (req, res) => {
    try {
      const allOpportunities = await db
        .select({
          id: opportunities.id,
          askAmount: opportunities.askAmount,
          stage: opportunities.stage,
          ownerId: opportunities.ownerId,
          ownerFirstName: users.firstName,
          ownerLastName: users.lastName,
        })
        .from(opportunities)
        .leftJoin(users, eq(opportunities.ownerId, users.id));

      const pipelineByOwner = allOpportunities.reduce((acc, opp) => {
        const ownerId = opp.ownerId || "unassigned";
        if (!acc[ownerId]) {
          acc[ownerId] = {
            ownerId,
            ownerName: `${opp.ownerFirstName || "Unassigned"} ${opp.ownerLastName || ""}`.trim(),
            totalValue: 0,
            opportunityCount: 0,
            stageDistribution: {} as Record<string, number>,
          };
        }
        acc[ownerId].totalValue += parseFloat(opp.askAmount || "0");
        acc[ownerId].opportunityCount += 1;
        acc[ownerId].stageDistribution[opp.stage] =
          (acc[ownerId].stageDistribution[opp.stage] || 0) + 1;
        return acc;
      }, {} as Record<string, any>);

      const pipelineValue = allOpportunities.reduce(
        (sum, opp) => sum + parseFloat(opp.askAmount || "0"),
        0
      );

      res.json({
        metrics: {
          ytdRaised: 0,
          ytdGoal: 1000000,
          pipelineValue,
          forecast90Days: pipelineValue * 0.3,
          dataHealthScore: 85,
        },
        pipelineByOwner: Object.values(pipelineByOwner),
        recentActivity: [],
      });
    } catch (error) {
      console.error("Error fetching Dev Director dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  app.get("/api/dashboard/ceo", isAuthenticated, async (req, res) => {
    try {
      const topProspects = await db
        .select({
          id: persons.id,
          firstName: persons.firstName,
          lastName: persons.lastName,
          organizationName: persons.organizationName,
          capacityScore: persons.capacityScore,
          wealthBand: persons.wealthBand,
          totalLifetimeGiving: persons.totalLifetimeGiving,
          ownerId: opportunities.ownerId,
          ownerFirstName: users.firstName,
          ownerLastName: users.lastName,
          stage: opportunities.stage,
          askAmount: opportunities.askAmount,
        })
        .from(persons)
        .leftJoin(opportunities, eq(persons.id, opportunities.personId))
        .leftJoin(users, eq(opportunities.ownerId, users.id))
        .orderBy(desc(persons.capacityScore))
        .limit(25);

      res.json({
        metrics: {
          ytdRaised: 0,
          forecast90Days: 0,
          activeMonthlyDonors: 0,
          avgGiftSize: 0,
        },
        topProspects: topProspects.map((p) => ({
          id: p.id,
          firstName: p.firstName,
          lastName: p.lastName,
          organizationName: p.organizationName,
          capacityScore: p.capacityScore,
          wealthBand: p.wealthBand,
          totalLifetimeGiving: p.totalLifetimeGiving,
          stage: p.stage,
          currentAsk: p.askAmount,
          owner: {
            firstName: p.ownerFirstName,
            lastName: p.ownerLastName,
          },
        })),
      });
    } catch (error) {
      console.error("Error fetching CEO dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

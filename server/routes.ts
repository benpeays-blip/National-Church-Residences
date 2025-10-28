import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { db } from "./db";
import { persons, opportunities, users, gifts, interactions } from "@shared/schema";
import { eq, sql, desc, gte, and, inArray } from "drizzle-orm";

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

      const allTasksList = await storage.getTasks(userId);
      const incompleteTasks = allTasksList.filter((t) => !t.completed);

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

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const completedTasksToday = allTasksList.filter((t) => {
        if (!t.completed || !t.completedAt) return false;
        return new Date(t.completedAt) >= today;
      }).length;

      const upcomingInteractions = await db
        .select()
        .from(interactions)
        .where(
          and(
            eq(interactions.ownerId, userId),
            gte(interactions.occurredAt, new Date())
          )
        );

      res.json({
        metrics: {
          portfolioSize: portfolioPersons.length,
          pipelineValue,
          completedTasks: completedTasksToday,
          upcomingMeetings: upcomingInteractions.filter((i) => i.type === "meeting").length,
        },
        tasks: incompleteTasks.slice(0, 10).map((t) => ({
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
      const yearStart = new Date(new Date().getFullYear(), 0, 1);
      
      const allOpportunities = await db
        .select({
          id: opportunities.id,
          askAmount: opportunities.askAmount,
          stage: opportunities.stage,
          ownerId: opportunities.ownerId,
          probability: opportunities.probability,
          closeDate: opportunities.closeDate,
          ownerFirstName: users.firstName,
          ownerLastName: users.lastName,
        })
        .from(opportunities)
        .leftJoin(users, eq(opportunities.ownerId, users.id));

      const ytdGifts = await db
        .select({
          amount: gifts.amount,
        })
        .from(gifts)
        .where(gte(gifts.receivedAt, yearStart));

      const ytdRaised = ytdGifts.reduce((sum, g) => sum + parseFloat(g.amount), 0);

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

      const next90Days = new Date();
      next90Days.setDate(next90Days.getDate() + 90);
      const forecast90Days = allOpportunities
        .filter((opp) => opp.closeDate && new Date(opp.closeDate) <= next90Days)
        .reduce((sum, opp) => {
          const amount = parseFloat(opp.askAmount || "0");
          const prob = (opp.probability || 50) / 100;
          return sum + amount * prob;
        }, 0);

      const allPersons = await db.select().from(persons);
      const personsWithEmail = allPersons.filter((p) => p.primaryEmail).length;
      const dataHealthScore = Math.round((personsWithEmail / Math.max(allPersons.length, 1)) * 100);

      const recentInteractions = await db
        .select({
          id: interactions.id,
          type: interactions.type,
          occurredAt: interactions.occurredAt,
          ownerFirstName: users.firstName,
          ownerLastName: users.lastName,
          personFirstName: persons.firstName,
          personLastName: persons.lastName,
        })
        .from(interactions)
        .leftJoin(users, eq(interactions.ownerId, users.id))
        .leftJoin(persons, eq(interactions.personId, persons.id))
        .orderBy(desc(interactions.occurredAt))
        .limit(10);

      const recentActivity = recentInteractions.map((i) => ({
        id: i.id,
        type: i.type,
        description: `${i.type.replace("_", " ")} with ${i.personFirstName} ${i.personLastName}`,
        timestamp: i.occurredAt.toISOString(),
        userName: `${i.ownerFirstName || ""} ${i.ownerLastName || ""}`.trim(),
      }));

      // LYBUNT/SYBUNT Calculations (optimized)
      const allGifts = await db
        .select({
          personId: gifts.personId,
          receivedAt: gifts.receivedAt,
          amount: gifts.amount,
        })
        .from(gifts);

      const currentYear = new Date().getFullYear();
      const lastYear = currentYear - 1;

      // Group gifts by person with year info
      const giftsByPerson = allGifts.reduce((acc, gift) => {
        const year = new Date(gift.receivedAt).getFullYear();
        if (!acc[gift.personId]) {
          acc[gift.personId] = {
            years: new Set<number>(),
            lastAmount: 0,
            lastGiftDate: gift.receivedAt,
          };
        }
        acc[gift.personId].years.add(year);
        
        // Track most recent gift
        if (new Date(gift.receivedAt) > new Date(acc[gift.personId].lastGiftDate)) {
          acc[gift.personId].lastAmount = parseFloat(gift.amount);
          acc[gift.personId].lastGiftDate = gift.receivedAt;
        }
        
        return acc;
      }, {} as Record<string, { years: Set<number>; lastAmount: number; lastGiftDate: Date }>);

      // LYBUNT: Gave last year but not this year
      const lybuntPersonIds = Object.entries(giftsByPerson)
        .filter(([_, data]) => data.years.has(lastYear) && !data.years.has(currentYear))
        .map(([personId, _]) => personId);

      // SYBUNT: Gave 2+ years ago but not in last 2 years
      const sybuntPersonIds = Object.entries(giftsByPerson)
        .filter(([_, data]) => {
          const hasLastYear = data.years.has(lastYear);
          const hasThisYear = data.years.has(currentYear);
          const hasPriorYears = Array.from(data.years).some(y => y < lastYear);
          return !hasLastYear && !hasThisYear && hasPriorYears;
        })
        .map(([personId, _]) => personId);

      // Get full donor details for LYBUNT/SYBUNT (limit to top 10 each, ordered by last gift date)
      const lybuntDonorDetails = lybuntPersonIds.length > 0 ? await db
        .select({
          id: persons.id,
          firstName: persons.firstName,
          lastName: persons.lastName,
          primaryEmail: persons.primaryEmail,
          lastGiftAmount: persons.lastGiftAmount,
          lastGiftDate: persons.lastGiftDate,
          totalLifetimeGiving: persons.totalLifetimeGiving,
        })
        .from(persons)
        .where(inArray(persons.id, lybuntPersonIds))
        .orderBy(desc(persons.lastGiftDate))
        .limit(10) : [];

      const sybuntDonorDetails = sybuntPersonIds.length > 0 ? await db
        .select({
          id: persons.id,
          firstName: persons.firstName,
          lastName: persons.lastName,
          primaryEmail: persons.primaryEmail,
          lastGiftAmount: persons.lastGiftAmount,
          lastGiftDate: persons.lastGiftDate,
          totalLifetimeGiving: persons.totalLifetimeGiving,
        })
        .from(persons)
        .where(inArray(persons.id, sybuntPersonIds))
        .orderBy(desc(persons.lastGiftDate))
        .limit(10) : [];

      res.json({
        metrics: {
          ytdRaised,
          ytdGoal: 1000000,
          pipelineValue,
          forecast90Days,
          dataHealthScore,
          lybuntCount: lybuntPersonIds.length,
          sybuntCount: sybuntPersonIds.length,
        },
        pipelineByOwner: Object.values(pipelineByOwner),
        recentActivity,
        lybuntDonors: lybuntDonorDetails,
        sybuntDonors: sybuntDonorDetails,
      });
    } catch (error) {
      console.error("Error fetching Dev Director dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  app.get("/api/dashboard/ceo", isAuthenticated, async (req, res) => {
    try {
      const yearStart = new Date(new Date().getFullYear(), 0, 1);
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const ytdGifts = await db
        .select({
          amount: gifts.amount,
        })
        .from(gifts)
        .where(gte(gifts.receivedAt, yearStart));

      const ytdRaised = ytdGifts.reduce((sum, g) => sum + parseFloat(g.amount), 0);
      const avgGiftSize = ytdGifts.length > 0 ? ytdRaised / ytdGifts.length : 0;

      const monthlyDonors = await db
        .select({
          personId: gifts.personId,
        })
        .from(gifts)
        .where(gte(gifts.receivedAt, monthStart));

      const uniqueMonthlyDonors = new Set(monthlyDonors.map((g) => g.personId)).size;

      const allOpportunities = await db
        .select({
          askAmount: opportunities.askAmount,
          probability: opportunities.probability,
          closeDate: opportunities.closeDate,
        })
        .from(opportunities);

      const next90Days = new Date();
      next90Days.setDate(next90Days.getDate() + 90);
      const forecast90Days = allOpportunities
        .filter((opp) => opp.closeDate && new Date(opp.closeDate) <= next90Days)
        .reduce((sum, opp) => {
          const amount = parseFloat(opp.askAmount || "0");
          const prob = (opp.probability || 50) / 100;
          return sum + amount * prob;
        }, 0);

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
          ytdRaised,
          forecast90Days,
          activeMonthlyDonors: uniqueMonthlyDonors,
          avgGiftSize,
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

  app.get("/api/data-health", isAuthenticated, async (req, res) => {
    try {
      const allPersons = await db.select().from(persons);
      
      const totalPersons = allPersons.length;
      const missingEmails = allPersons.filter((p) => !p.primaryEmail || p.primaryEmail.trim() === "").length;
      const missingPhones = allPersons.filter((p) => !p.primaryPhone || p.primaryPhone.trim() === "").length;
      const incompleteProfiles = allPersons.filter((p) => !p.organizationName && !p.wealthBand).length;
      
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentInteractions = await db
        .select()
        .from(interactions)
        .where(gte(interactions.occurredAt, thirtyDaysAgo));
      
      const dataFreshness = recentInteractions.length > 0 ? "Good" : "Needs Attention";
      
      const unassignedOpportunities = await db
        .select()
        .from(opportunities)
        .where(sql`${opportunities.ownerId} IS NULL OR ${opportunities.ownerId} = ''`);
      
      const potentialDuplicates = await db.execute(sql`
        SELECT COUNT(*) as count FROM (
          SELECT LOWER(CONCAT(${persons.firstName}, ' ', ${persons.lastName})) as full_name, COUNT(*) as name_count
          FROM ${persons}
          GROUP BY LOWER(CONCAT(${persons.firstName}, ' ', ${persons.lastName}))
          HAVING COUNT(*) > 1
        ) dupes
      `);
      
      const duplicateCount = Number(potentialDuplicates.rows[0]?.count || 0);
      
      const completeProfiles = allPersons.filter((p) => {
        const hasEmail = p.primaryEmail && p.primaryEmail.trim() !== "";
        const hasPhone = p.primaryPhone && p.primaryPhone.trim() !== "";
        const hasOrgOrWealth = p.organizationName || p.wealthBand;
        return hasEmail && hasPhone && hasOrgOrWealth;
      }).length;
      
      const profileCompleteness = totalPersons > 0 
        ? Math.round((completeProfiles / totalPersons) * 100)
        : 100;
      
      const emailStatus = missingEmails === 0 ? "Passing" : missingEmails < 5 ? "Warning" : "Failing";
      const phoneStatus = missingPhones === 0 ? "Passing" : missingPhones < 10 ? "Warning" : "Failing";
      const profileStatus = incompleteProfiles === 0 ? "Passing" : incompleteProfiles < 10 ? "Warning" : "Failing";
      const duplicateStatus = duplicateCount === 0 ? "Passing" : duplicateCount < 3 ? "Warning" : "Failing";
      
      const overallHealth = Math.min(100, Math.max(0, 100 - missingEmails * 2 - missingPhones - incompleteProfiles - duplicateCount * 5));
      
      res.json({
        metrics: {
          overallHealth: Math.round(overallHealth),
          profileCompleteness: Math.round(profileCompleteness),
          missingEmails,
          dataFreshness,
        },
        qualityChecks: {
          emailValidation: emailStatus,
          phoneFormatting: phoneStatus,
          addressCompleteness: profileStatus,
          duplicateDetection: duplicateStatus,
        },
        actionItems: [
          ...(missingEmails > 0 ? [{
            id: "missing-emails",
            title: `${missingEmails} donors missing email addresses`,
            description: "Update contact information to improve engagement",
          }] : []),
          ...(unassignedOpportunities.length > 0 ? [{
            id: "unassigned-opps",
            title: `${unassignedOpportunities.length} opportunities without owners`,
            description: "Assign portfolio managers to track these prospects",
          }] : []),
          ...(Number(duplicateCount) > 0 ? [{
            id: "duplicates",
            title: `${duplicateCount} potential duplicate records detected`,
            description: "Review and merge duplicate donor profiles",
          }] : []),
        ],
      });
    } catch (error) {
      console.error("Error fetching data health:", error);
      res.status(500).json({ message: "Failed to fetch data health metrics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

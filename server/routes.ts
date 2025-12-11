import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { db } from "./db";
import { 
  persons, opportunities, users, gifts, campaigns, interactions, integrations, integrationSyncRuns, dataQualityIssues, households, tasks,
  predictiveScores, wealthEvents, meetingBriefs, voiceNotes, boardConnections, corporatePartnerships, peerDonors,
  outreachTemplates, grantProposals, impactReports, sentimentAnalysis, peerBenchmarks, portfolioOptimizations,
  calendarEvents, stewardshipWorkflows, taskPriorityScores, giftRegistries, grants, boardMemberships,
  fundraisingEvents,
  insertBoardMembershipSchema, insertOrganizationCanvasSchema
} from "@shared/schema";
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

  app.get("/api/persons", async (req, res) => {
    try {
      const search = req.query.search as string | undefined;
      const personsList = await storage.getPersons(search);
      res.json(personsList);
    } catch (error) {
      console.error("Error fetching persons:", error);
      res.status(500).json({ message: "Failed to fetch persons" });
    }
  });

  app.get("/api/persons/:id", async (req, res) => {
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

  app.get("/api/persons/:id/profile", async (req, res) => {
    try {
      const personId = req.params.id;
      const person = await storage.getPerson(personId);
      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }

      // Fetch all related data
      const [giftsList, interactionsList, opportunitiesList, tasksList] = await Promise.all([
        storage.getGifts(personId),
        storage.getInteractions(personId),
        db.select().from(opportunities).where(eq(opportunities.personId, personId)),
        db.select().from(tasks).where(eq(tasks.personId, personId)),
      ]);

      // Get household info if applicable
      let household = null;
      if (person.householdId) {
        const householdResult = await db
          .select()
          .from(households)
          .where(eq(households.id, person.householdId));
        household = householdResult[0] || null;
      }

      res.json({
        person,
        household,
        gifts: giftsList,
        interactions: interactionsList,
        opportunities: opportunitiesList,
        tasks: tasksList,
      });
    } catch (error) {
      console.error("Error fetching person profile:", error);
      res.status(500).json({ message: "Failed to fetch person profile" });
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

  app.get("/api/donors/quadrant", async (req, res) => {
    try {
      const allDonors = await db.select().from(persons);
      
      // Get all gifts with dates for proper calculations
      const allGifts = await db.select().from(gifts);
      
      // Calculate gift counts and earliest gift dates
      const giftCounts: Record<string, number> = {};
      const earliestGiftDates: Record<string, Date> = {};
      const recentGiftCounts: Record<string, number> = {};
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
      
      allGifts.forEach(gift => {
        // Total gift count
        giftCounts[gift.personId] = (giftCounts[gift.personId] || 0) + 1;
        
        // Track earliest gift date
        const giftDate = new Date(gift.receivedAt);
        if (!earliestGiftDates[gift.personId] || giftDate < earliestGiftDates[gift.personId]) {
          earliestGiftDates[gift.personId] = giftDate;
        }
        
        // Count gifts in last 12 months
        if (giftDate >= twelveMonthsAgo) {
          recentGiftCounts[gift.personId] = (recentGiftCounts[gift.personId] || 0) + 1;
        }
      });
      
      // Generate dummy data for donors without quadrant positions
      // Create an array to track which quadrant each donor will be assigned to
      const quadrantAssignments: ('partner' | 'friend' | 'colleague' | 'acquaintance')[] = [];
      const donorCount = allDonors.length;
      
      // Distribute donors evenly across quadrants
      const donorsPerQuadrant = Math.floor(donorCount / 4);
      const remainder = donorCount % 4;
      
      // Fill quadrant assignments evenly
      for (let i = 0; i < donorsPerQuadrant; i++) {
        quadrantAssignments.push('partner', 'friend', 'colleague', 'acquaintance');
      }
      // Distribute remaining donors
      const extraQuadrants: ('partner' | 'friend' | 'colleague' | 'acquaintance')[] = ['partner', 'friend', 'colleague', 'acquaintance'];
      for (let i = 0; i < remainder; i++) {
        quadrantAssignments.push(extraQuadrants[i]);
      }
      
      // Shuffle the assignments for randomness
      for (let i = quadrantAssignments.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quadrantAssignments[i], quadrantAssignments[j]] = [quadrantAssignments[j], quadrantAssignments[i]];
      }
      
      const donorsWithQuadrant = allDonors.map((donor, index) => {
        // Get the assigned quadrant for this donor
        const assignedQuadrant = quadrantAssignments[index];
        
        // Generate energy and structure based on the assigned quadrant
        // Partner: high energy (50-95), high structure (50-95)
        // Friend: high energy (50-95), low structure (5-49)
        // Colleague: low energy (5-49), high structure (50-95)
        // Acquaintance: low energy (5-49), low structure (5-49)
        
        let energy: number;
        let structure: number;
        
        switch (assignedQuadrant) {
          case 'partner':
            energy = 50 + Math.floor(Math.random() * 46); // 50-95
            structure = 50 + Math.floor(Math.random() * 46); // 50-95
            break;
          case 'friend':
            energy = 50 + Math.floor(Math.random() * 46); // 50-95
            structure = 5 + Math.floor(Math.random() * 45); // 5-49
            break;
          case 'colleague':
            energy = 5 + Math.floor(Math.random() * 45); // 5-49
            structure = 50 + Math.floor(Math.random() * 46); // 50-95
            break;
          case 'acquaintance':
            energy = 5 + Math.floor(Math.random() * 45); // 5-49
            structure = 5 + Math.floor(Math.random() * 45); // 5-49
            break;
        }
        
        // Ensure values are within 0-100 range (already guaranteed by the switch above)
        energy = Math.max(0, Math.min(100, energy));
        structure = Math.max(0, Math.min(100, structure));
        
        // Calculate years as donor from FIRST gift (or createdAt as fallback)
        let yearsAsDonor = 0;
        if (earliestGiftDates[donor.id]) {
          yearsAsDonor = Math.floor((new Date().getTime() - earliestGiftDates[donor.id].getTime()) / (1000 * 60 * 60 * 24 * 365));
        } else if (donor.createdAt) {
          yearsAsDonor = Math.floor((new Date().getTime() - new Date(donor.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 365));
        }
        yearsAsDonor = Math.max(yearsAsDonor, 1); // Minimum 1 year
        
        // Determine status based on last gift date
        const daysSinceLastGift = donor.lastGiftDate 
          ? Math.floor((new Date().getTime() - new Date(donor.lastGiftDate).getTime()) / (1000 * 60 * 60 * 24))
          : 999;
        const status = daysSinceLastGift < 365 ? 'ACTIVE' : 'INACTIVE';
        
        // Determine badges based on actual data
        const badges: string[] = [];
        const lifetimeGiving = parseFloat(donor.totalLifetimeGiving?.toString() || '0');
        if (lifetimeGiving >= 25000) badges.push('Major Donor');
        // Monthly Donor: at least 8 gifts in the last 12 months (roughly monthly)
        if (recentGiftCounts[donor.id] && recentGiftCounts[donor.id] >= 8) badges.push('Monthly Donor');
        // Note: Volunteer badge removed until we have proper volunteer tracking field
        
        // Generate a short bio
        const bios = [
          `${donor.firstName} is a dedicated supporter who has a passion for sustainable living and community development.`,
          `${donor.firstName} is a working professional who values education and youth programs.`,
          `${donor.firstName} enjoys supporting arts and culture initiatives in the local community.`,
          `${donor.firstName} is committed to environmental conservation and green initiatives.`,
          `${donor.firstName} has a strong interest in healthcare access and medical research funding.`,
        ];
        const bio = bios[Math.floor(Math.random() * bios.length)];
        
        return {
          id: donor.id,
          firstName: donor.firstName,
          lastName: donor.lastName,
          primaryEmail: donor.primaryEmail,
          primaryPhone: donor.primaryPhone,
          organizationName: donor.organizationName,
          totalLifetimeGiving: donor.totalLifetimeGiving,
          giftCount: giftCounts[donor.id] || 0,
          yearsAsDonor,
          status,
          badges,
          bio,
          energy,
          structure,
          capacityScore: donor.capacityScore,
          engagementScore: donor.engagementScore,
          affinityScore: donor.affinityScore,
        };
      });
      
      // Calculate quadrant for each donor
      const getQuadrant = (energy: number, structure: number) => {
        if (energy >= 50 && structure < 50) return 'friend';
        if (energy >= 50 && structure >= 50) return 'partner';
        if (energy < 50 && structure < 50) return 'acquaintance';
        return 'colleague';
      };
      
      const donorsWithQuadrantName = donorsWithQuadrant.map(d => ({
        ...d,
        quadrant: getQuadrant(d.energy, d.structure),
      }));
      
      // Count by quadrant
      const counts = {
        partner: donorsWithQuadrantName.filter(d => d.quadrant === 'partner').length,
        friend: donorsWithQuadrantName.filter(d => d.quadrant === 'friend').length,
        colleague: donorsWithQuadrantName.filter(d => d.quadrant === 'colleague').length,
        acquaintance: donorsWithQuadrantName.filter(d => d.quadrant === 'acquaintance').length,
      };
      
      // AI-generated playbooks for each quadrant
      const playbooks = {
        partner: [
          "Protect cadence: quarterly 1:1 touch + semiannual impact brief",
          "Invite into planning: previews of strategy, governance opportunities",
          "Co-create: align giving vehicles (DAF, equity, family office) to initiatives"
        ],
        friend: [
          "Channel energy into commitment: propose a simple, structured next step",
          "Add light structure: calendar a site visit / 30-min vision call",
          "Convert advocacy into plan: outline 90-day milestones toward partnership"
        ],
        colleague: [
          "Warm the relationship: share a concise story of impact tied to their interests",
          "Humanize the structure: short video + invite to meet a program lead",
          "Map a path: define 1–2 co-owned wins that increase energy and trust"
        ],
        acquaintance: [
          "Low-lift on-ramp: personalized thank-you + 2-minute impact clip",
          "Qualify interest: one thoughtful question with easy reply options",
          "Offer a micro-commitment: RSVP to a brief virtual update or tour"
        ]
      };
      
      res.json({
        donors: donorsWithQuadrantName,
        counts,
        playbooks,
        totalDonors: donorsWithQuadrant.length,
      });
    } catch (error) {
      console.error("Error fetching donor quadrant data:", error);
      res.status(500).json({ message: "Failed to fetch donor quadrant data" });
    }
  });

  app.get("/api/donors/:id", async (req, res) => {
    try {
      const personId = req.params.id;
      const person = await storage.getPerson(personId);
      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }

      // Fetch all related data using storage methods
      const [giftsList, interactionsList, opportunitiesList, tasksList] = await Promise.all([
        storage.getGifts(personId),
        storage.getInteractions(personId),
        db.select().from(opportunities).where(eq(opportunities.personId, personId)),
        db
          .select()
          .from(tasks)
          .where(eq(tasks.personId, personId))
          .orderBy(desc(tasks.createdAt))
          .limit(5),
      ]);

      // Get household info if applicable
      let household = null;
      if (person.householdId) {
        const householdResults = await db
          .select({
            id: households.id,
            name: households.name,
            totalMembers: sql<number>`(SELECT COUNT(*) FROM ${persons} WHERE ${persons.householdId} = ${households.id})`,
          })
          .from(households)
          .where(eq(households.id, person.householdId));
        household = householdResults[0] || null;
      }

      // Calculate stats
      const totalGifts = giftsList.length;
      const totalGiving = giftsList.reduce((sum, g) => sum + parseFloat(g.amount), 0);
      const avgGiftSize = totalGifts > 0 ? totalGiving / totalGifts : 0;
      const firstGiftDate = giftsList.length > 0
        ? new Date(Math.min(...giftsList.map((g) => new Date(g.receivedAt).getTime())))
        : null;
      const daysSinceLastGift = person.lastGiftDate
        ? Math.floor((Date.now() - new Date(person.lastGiftDate).getTime()) / (1000 * 60 * 60 * 24))
        : null;

      // Calculate giving frequency
      let giftFrequency = "Never given";
      if (totalGifts > 0) {
        if (totalGifts === 1) {
          giftFrequency = "One-time donor";
        } else if (firstGiftDate) {
          const daysSinceFirst = Math.floor((Date.now() - firstGiftDate.getTime()) / (1000 * 60 * 60 * 24));
          const yearsActive = daysSinceFirst / 365;
          if (yearsActive < 1) {
            giftFrequency = `${totalGifts} gifts in first year`;
          } else {
            const giftsPerYear = totalGifts / yearsActive;
            if (giftsPerYear >= 12) {
              giftFrequency = "Monthly donor";
            } else if (giftsPerYear >= 4) {
              giftFrequency = "Quarterly donor";
            } else if (giftsPerYear >= 2) {
              giftFrequency = "Semi-annual donor";
            } else {
              giftFrequency = "Annual donor";
            }
          }
        }
      }

      res.json({
        person,
        household,
        gifts: giftsList,
        opportunities: opportunitiesList,
        interactions: interactionsList,
        nextBestActions: tasksList.map((task) => ({
          id: task.id,
          priority: task.priority || "Medium",
          reason: task.description || "Follow up with donor",
          suggestedAction: task.title,
          createdAt: task.createdAt,
        })),
        stats: {
          totalGifts,
          avgGiftSize,
          firstGiftDate,
          daysSinceLastGift,
          giftFrequency,
        },
      });
    } catch (error) {
      console.error("Error fetching donor details:", error);
      res.status(500).json({ message: "Failed to fetch donor details" });
    }
  });

  app.get("/api/gifts", async (req, res) => {
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

  app.get("/api/opportunities", async (req, res) => {
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

  app.get("/api/grants", async (req, res) => {
    try {
      const ownerId = req.query.ownerId as string | undefined;
      const stage = req.query.stage as string | undefined;
      const grantsList = await storage.getGrants(ownerId, stage);
      res.json(grantsList);
    } catch (error) {
      console.error("Error fetching grants:", error);
      res.status(500).json({ message: "Failed to fetch grants" });
    }
  });

  app.post("/api/grants", isAuthenticated, async (req, res) => {
    try {
      const grant = await storage.createGrant(req.body);
      res.json(grant);
    } catch (error) {
      console.error("Error creating grant:", error);
      res.status(500).json({ message: "Failed to create grant" });
    }
  });

  app.patch("/api/grants/:id", isAuthenticated, async (req, res) => {
    try {
      const grant = await storage.updateGrant(req.params.id, req.body);
      if (!grant) {
        return res.status(404).json({ message: "Grant not found" });
      }
      res.json(grant);
    } catch (error) {
      console.error("Error updating grant:", error);
      res.status(500).json({ message: "Failed to update grant" });
    }
  });

  app.get("/api/fundraising-events", async (req, res) => {
    try {
      const events = await db
        .select()
        .from(fundraisingEvents)
        .orderBy(desc(fundraisingEvents.eventDate));
      res.json(events);
    } catch (error) {
      console.error("Error fetching fundraising events:", error);
      res.status(500).json({ message: "Failed to fetch fundraising events" });
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

  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaignsList = await storage.getCampaigns();
      res.json(campaignsList);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const [campaign] = await db
        .select({
          id: campaigns.id,
          name: campaigns.name,
          type: campaigns.type,
          description: campaigns.description,
          status: campaigns.status,
          goal: campaigns.goal,
          raised: campaigns.raised,
          donorCount: campaigns.donorCount,
          avgGiftSize: campaigns.avgGiftSize,
          totalGifts: campaigns.totalGifts,
          ownerId: campaigns.ownerId,
          startDate: campaigns.startDate,
          endDate: campaigns.endDate,
          ownerName: sql<string>`CONCAT(${users.firstName}, ' ', ${users.lastName})`,
        })
        .from(campaigns)
        .leftJoin(users, eq(campaigns.ownerId, users.id))
        .where(eq(campaigns.id, id));

      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }

      res.json(campaign);
    } catch (error) {
      console.error("Error fetching campaign:", error);
      res.status(500).json({ message: "Failed to fetch campaign" });
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

  app.get("/api/tasks", async (req, res) => {
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

  app.post("/api/tasks/generate-nba", async (req, res) => {
    try {
      const ownerId = req.body.ownerId as string | undefined;
      const generatedTasks = await storage.generateNextBestActions(ownerId);
      res.json(generatedTasks);
    } catch (error) {
      console.error("Error generating next best actions:", error);
      res.status(500).json({ message: "Failed to generate next best actions" });
    }
  });

  app.get("/api/dashboard/home", async (req, res) => {
    try {
      // Calculate fiscal year metrics
      const yearStart = new Date(new Date().getFullYear(), 0, 1);
      const annualGoal = 15000000; // $15M annual goal
      
      // Get YTD gifts
      const ytdGifts = await db
        .select({
          amount: gifts.amount,
          receivedAt: gifts.receivedAt,
          personId: gifts.personId,
          campaignId: gifts.campaignId,
          id: gifts.id,
        })
        .from(gifts)
        .where(gte(gifts.receivedAt, yearStart));
      
      const ytdRaised = ytdGifts.reduce((sum, g) => sum + parseFloat(g.amount), 0);
      
      // Get all opportunities for pipeline value
      const allOpportunities = await db
        .select({
          id: opportunities.id,
          askAmount: opportunities.askAmount,
          probability: opportunities.probability,
          personId: opportunities.personId,
          stage: opportunities.stage,
          closeDate: opportunities.closeDate,
          daysInStage: opportunities.daysInStage,
          notes: opportunities.notes,
          ownerId: opportunities.ownerId,
          personFirstName: persons.firstName,
          personLastName: persons.lastName,
          ownerFirstName: users.firstName,
          ownerLastName: users.lastName,
        })
        .from(opportunities)
        .leftJoin(persons, eq(opportunities.personId, persons.id))
        .leftJoin(users, eq(opportunities.ownerId, users.id))
        .orderBy(desc(opportunities.askAmount));
      
      const pipelineValue = allOpportunities.reduce((sum, opp) => sum + parseFloat(opp.askAmount || "0"), 0);
      const pipelineWeightedValue = allOpportunities.reduce(
        (sum, opp) => sum + (parseFloat(opp.askAmount || "0") * ((opp.probability || 0) / 100)),
        0
      );
      
      // Count active monthly donors (donors who gave in last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentGifts = await db
        .select({ personId: gifts.personId })
        .from(gifts)
        .where(gte(gifts.receivedAt, thirtyDaysAgo));
      const activeMonthlyDonors = new Set(recentGifts.map(g => g.personId)).size;
      
      // Calculate average gift size
      const avgGiftSize = ytdGifts.length > 0 ? ytdRaised / ytdGifts.length : 0;
      
      // Calculate 90-day forecast based on weighted pipeline opportunities closing in next 90 days
      const ninetyDaysFromNow = new Date();
      ninetyDaysFromNow.setDate(ninetyDaysFromNow.getDate() + 90);
      const forecast90Days = allOpportunities
        .filter(opp => opp.closeDate && new Date(opp.closeDate) <= ninetyDaysFromNow)
        .reduce((sum, opp) => sum + (parseFloat(opp.askAmount || "0") * ((opp.probability || 0) / 100)), 0);
      
      // Get top 10 opportunities with action descriptions
      const topOpportunities = allOpportunities.slice(0, 10).map(opp => {
        // Generate action description based on stage
        let actionDescription = '';
        const ownerName = opp.ownerFirstName && opp.ownerLastName 
          ? `${opp.ownerFirstName} ${opp.ownerLastName}`
          : 'the assigned MGO';
        
        switch (opp.stage) {
          case 'Prospect':
            actionDescription = `${ownerName} should conduct initial discovery meeting to assess interest and capacity for a ${opp.askAmount ? `$${parseFloat(opp.askAmount).toLocaleString()}` : 'major gift'} ask. Schedule an in-person meeting at donor's office or preferred location.`;
            break;
          case 'Cultivation':
            actionDescription = `Arrange facility tour for donor and spouse, followed by lunch meeting with CEO. ${ownerName} should prepare tailored case statement highlighting donor's areas of interest and complete wealth screening.`;
            break;
          case 'Ask':
            actionDescription = `${ownerName} should schedule ask meeting with CEO present. Prepare formal proposal document and gift agreement for ${opp.askAmount ? `$${parseFloat(opp.askAmount).toLocaleString()}` : 'major gift'} commitment at donor's preferred location.`;
            break;
          case 'Steward':
            actionDescription = `Gift received. ${ownerName} should send personalized thank you within 48 hours and begin stewardship plan including quarterly impact reports and annual recognition event invitation.`;
            break;
          case 'Renewal':
            actionDescription = `${ownerName} should schedule renewal conversation meeting to discuss multi-year commitment. Prepare updated impact report showing how previous gift was used and propose ${opp.askAmount ? `$${parseFloat(opp.askAmount).toLocaleString()}` : 'renewed commitment'}.`;
            break;
          default:
            actionDescription = `${ownerName} should review opportunity status and determine next steps.`;
        }
        
        return {
          id: opp.id,
          askAmount: opp.askAmount,
          probability: opp.probability,
          stage: opp.stage,
          closeDate: opp.closeDate,
          daysInStage: opp.daysInStage,
          actionDescription,
          person: opp.personFirstName ? {
            firstName: opp.personFirstName,
            lastName: opp.personLastName,
          } : undefined,
        };
      });
      
      // Get recent gifts with person and campaign info
      const recentGiftsData = await db
        .select({
          id: gifts.id,
          amount: gifts.amount,
          receivedAt: gifts.receivedAt,
          personId: gifts.personId,
          campaignId: gifts.campaignId,
          personFirstName: persons.firstName,
          personLastName: persons.lastName,
          campaignName: campaigns.name,
        })
        .from(gifts)
        .leftJoin(persons, eq(gifts.personId, persons.id))
        .leftJoin(campaigns, eq(gifts.campaignId, campaigns.id))
        .orderBy(desc(gifts.receivedAt))
        .limit(10);
      
      const recentGiftsFormatted = recentGiftsData.map(g => ({
        id: g.id,
        amount: g.amount,
        receivedAt: g.receivedAt,
        person: g.personFirstName ? {
          firstName: g.personFirstName,
          lastName: g.personLastName,
        } : undefined,
        campaign: g.campaignName ? { name: g.campaignName } : undefined,
      }));
      
      // Get next best actions with person and owner details
      const allTasks = await db
        .select({
          id: tasks.id,
          title: tasks.title,
          description: tasks.description,
          priority: tasks.priority,
          dueDate: tasks.dueDate,
          completed: tasks.completed,
          reason: tasks.reason,
          personId: tasks.personId,
          ownerId: tasks.ownerId,
          personFirstName: persons.firstName,
          personLastName: persons.lastName,
          ownerFirstName: users.firstName,
          ownerLastName: users.lastName,
        })
        .from(tasks)
        .leftJoin(persons, eq(tasks.personId, persons.id))
        .leftJoin(users, eq(tasks.ownerId, users.id))
        .where(eq(tasks.completed, 0))
        .orderBy(
          sql`CASE ${tasks.priority}
            WHEN 'urgent' THEN 1
            WHEN 'high' THEN 2
            WHEN 'medium' THEN 3
            WHEN 'low' THEN 4
          END`,
          tasks.dueDate
        )
        .limit(10);
      
      // Enhance task descriptions with specific details
      const enhancedTasks = allTasks.map(task => {
        const personName = task.personFirstName && task.personLastName
          ? `${task.personFirstName} ${task.personLastName}`
          : 'the donor';
        const ownerName = task.ownerFirstName && task.ownerLastName
          ? `${task.ownerFirstName} ${task.ownerLastName}`
          : 'the assigned officer';
        
        // If there's already a description, enhance it with context
        let enhancedDescription = task.description || '';
        
        // If no description, generate one based on the title and reason
        if (!enhancedDescription && task.reason) {
          // Generate contextual description based on common task patterns
          if (task.title.toLowerCase().includes('meeting')) {
            enhancedDescription = `${ownerName} should schedule an in-person meeting with ${personName}. ${task.reason}`;
          } else if (task.title.toLowerCase().includes('call') || task.title.toLowerCase().includes('phone')) {
            enhancedDescription = `${ownerName} needs to make a personal phone call to ${personName}. ${task.reason}`;
          } else if (task.title.toLowerCase().includes('proposal') || task.title.toLowerCase().includes('submit')) {
            enhancedDescription = `${ownerName} should prepare and submit a formal proposal to ${personName}. ${task.reason}`;
          } else if (task.title.toLowerCase().includes('thank')) {
            enhancedDescription = `${ownerName} must send a personalized thank you note to ${personName}. ${task.reason}`;
          } else if (task.title.toLowerCase().includes('tour') || task.title.toLowerCase().includes('visit')) {
            enhancedDescription = `${ownerName} should arrange a campus/facility tour for ${personName}. ${task.reason}`;
          } else {
            enhancedDescription = `${ownerName} should reach out to ${personName}. ${task.reason}`;
          }
        }
        
        return {
          id: task.id,
          title: task.title,
          description: enhancedDescription,
          priority: task.priority,
          dueDate: task.dueDate,
          reason: task.reason,
        };
      });
      
      res.json({
        metrics: {
          ytdRaised,
          annualGoal,
          pipelineValue,
          pipelineWeightedValue,
          activeMonthlyDonors,
          avgGiftSize,
          forecast90Days,
        },
        topOpportunities,
        recentGifts: recentGiftsFormatted,
        nextBestActions: enhancedTasks,
      });
    } catch (error) {
      console.error("Error fetching home dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  app.get("/api/dashboard/mgo", async (req: any, res) => {
    try {
      // Use first MGO user for demo (no auth required)
      const [defaultUser] = await db.select().from(users).where(eq(users.role, "MGO")).limit(1);
      const userId = defaultUser?.id || "mgo-1";

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

      // Enhanced dummy data with comprehensive priorities and opportunities
      const dummyTasks = incompleteTasks.length < 10 ? [
        { id: 'task-1', personId: 'person-1', title: 'Schedule cultivation meeting with Robert Chen', priority: 'Critical', category: 'Cultivation', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), completed: false, person: { firstName: 'Robert', lastName: 'Chen' }, reason: 'High capacity donor showing increased engagement (+40% event attendance)' },
        { id: 'task-2', personId: 'person-2', title: 'Send thank you note to Patricia Williams for $50K gift', priority: 'High', category: 'Stewardship', dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), completed: false, person: { firstName: 'Patricia', lastName: 'Williams' }, reason: 'Major gift received within 48 hours - immediate acknowledgment critical' },
        { id: 'task-3', personId: 'person-3', title: 'Prepare proposal for James Martinez capital campaign', priority: 'Critical', category: 'Ask', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), completed: false, person: { firstName: 'James', lastName: 'Martinez' }, reason: 'Ask meeting scheduled in 5 days - proposal must be customized' },
        { id: 'task-4', personId: 'person-4', title: 'Follow up on research meeting with Lisa Thompson', priority: 'Medium', category: 'Cultivation', dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), completed: false, person: { firstName: 'Lisa', lastName: 'Thompson' }, reason: 'Expressed interest in scholarship program during last visit' },
        { id: 'task-5', personId: 'person-5', title: 'Submit grant report to David Anderson Foundation', priority: 'Critical', category: 'Stewardship', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), completed: false, person: { firstName: 'David', lastName: 'Anderson' }, reason: 'Grant report due in 3 days - $100K grant at risk' },
        { id: 'task-6', personId: 'person-6', title: 'Invite Jennifer Lee to annual gala', priority: 'High', category: 'Cultivation', dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), completed: false, person: { firstName: 'Jennifer', lastName: 'Lee' }, reason: 'Recently promoted to CEO - perfect cultivation opportunity' },
        { id: 'task-7', personId: 'person-7', title: 'Research Michael Brown\'s company acquisition', priority: 'Medium', category: 'Prospect', dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), completed: false, person: { firstName: 'Michael', lastName: 'Brown' }, reason: 'Wealth event detected - company sold for $45M' },
        { id: 'task-8', personId: 'person-8', title: 'Schedule site visit for Sarah Davis', priority: 'High', category: 'Cultivation', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), completed: false, person: { firstName: 'Sarah', lastName: 'Davis' }, reason: 'Requested program visit - ready to move to ask stage' },
        { id: 'task-9', personId: 'person-9', title: 'Send quarterly impact report to Thomas Wilson', priority: 'Medium', category: 'Stewardship', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), completed: false, person: { firstName: 'Thomas', lastName: 'Wilson' }, reason: 'Endowment donor expecting quarterly updates' },
        { id: 'task-10', personId: 'person-10', title: 'Draft pledge reminder for Elizabeth Garcia', priority: 'High', category: 'Stewardship', dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), completed: false, person: { firstName: 'Elizabeth', lastName: 'Garcia' }, reason: '$25K pledge payment due next week' }
      ] : incompleteTasks.slice(0, 10);

      const dummyOpportunities = opportunitiesList.length < 15 ? [
        { id: 'opp-1', personId: 'person-1', stage: 'Prospect', askAmount: '25000', probability: 30, closeDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), notes: 'New prospect identified through board connection', daysInStage: 15, person: { firstName: 'Robert', lastName: 'Chen' } },
        { id: 'opp-2', personId: 'person-2', stage: 'Cultivation', askAmount: '50000', probability: 60, closeDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), notes: 'Attended last 3 events, very engaged', daysInStage: 45, person: { firstName: 'Patricia', lastName: 'Williams' } },
        { id: 'opp-3', personId: 'person-3', stage: 'Ask', askAmount: '100000', probability: 75, closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), notes: 'Proposal submitted, meeting scheduled', daysInStage: 120, person: { firstName: 'James', lastName: 'Martinez' } },
        { id: 'opp-4', personId: 'person-4', stage: 'Cultivation', askAmount: '35000', probability: 50, closeDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000), notes: 'Interested in scholarship program', daysInStage: 30, person: { firstName: 'Lisa', lastName: 'Thompson' } },
        { id: 'opp-5', personId: 'person-5', stage: 'Steward', askAmount: '75000', probability: 90, closeDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), notes: 'Verbal commitment received', daysInStage: 180, person: { firstName: 'David', lastName: 'Anderson' } },
        { id: 'opp-6', personId: 'person-6', stage: 'Cultivation', askAmount: '45000', probability: 55, closeDate: new Date(Date.now() + 65 * 24 * 60 * 60 * 1000), notes: 'Recent promotion - perfect timing', daysInStage: 20, person: { firstName: 'Jennifer', lastName: 'Lee' } },
        { id: 'opp-7', personId: 'person-7', stage: 'Prospect', askAmount: '150000', probability: 25, closeDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), notes: 'Major wealth event - company acquisition', daysInStage: 10, person: { firstName: 'Michael', lastName: 'Brown' } },
        { id: 'opp-8', personId: 'person-8', stage: 'Ask', askAmount: '60000', probability: 70, closeDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), notes: 'Site visit completed, very positive', daysInStage: 90, person: { firstName: 'Sarah', lastName: 'Davis' } },
        { id: 'opp-9', personId: 'person-9', stage: 'Steward', askAmount: '30000', probability: 85, closeDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), notes: 'Annual renewal opportunity', daysInStage: 365, person: { firstName: 'Thomas', lastName: 'Wilson' } },
        { id: 'opp-10', personId: 'person-10', stage: 'Cultivation', askAmount: '40000', probability: 45, closeDate: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000), notes: 'Building relationship slowly', daysInStage: 60, person: { firstName: 'Elizabeth', lastName: 'Garcia' } },
        { id: 'opp-11', personId: 'person-11', stage: 'Prospect', askAmount: '20000', probability: 35, closeDate: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000), notes: 'Board referral - initial outreach made', daysInStage: 5, person: { firstName: 'Richard', lastName: 'Moore' } },
        { id: 'opp-12', personId: 'person-12', stage: 'Renewal', askAmount: '55000', probability: 80, closeDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), notes: 'Multi-year donor up for renewal', daysInStage: 730, person: { firstName: 'Linda', lastName: 'Taylor' } },
        { id: 'opp-13', personId: 'person-13', stage: 'Ask', askAmount: '85000', probability: 65, closeDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000), notes: 'Named gift opportunity presented', daysInStage: 105, person: { firstName: 'Christopher', lastName: 'White' } },
        { id: 'opp-14', personId: 'person-14', stage: 'Cultivation', askAmount: '32000', probability: 48, closeDate: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000), notes: 'Young professional, building capacity', daysInStage: 25, person: { firstName: 'Amanda', lastName: 'Harris' } },
        { id: 'opp-15', personId: 'person-15', stage: 'Steward', askAmount: '95000', probability: 88, closeDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000), notes: 'Final paperwork in progress', daysInStage: 150, person: { firstName: 'Daniel', lastName: 'Martin' } }
      ] : opportunitiesList.map((opp) => ({
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
      }));

      const totalPipelineValue = dummyOpportunities.reduce((sum, opp) => sum + parseFloat(opp.askAmount || "0"), 0);

      res.json({
        metrics: {
          portfolioSize: portfolioPersons.length || 12,
          pipelineValue: totalPipelineValue || 845000,
          completedTasks: completedTasksToday || 7,
          upcomingMeetings: upcomingInteractions.filter((i) => i.type === "meeting").length || 4,
        },
        tasks: dummyTasks.map((t: any) => ({
          ...t,
          person: t.person || portfolioPersons.find((p) => p.id === t.personId),
        })),
        opportunities: dummyOpportunities,
      });
    } catch (error) {
      console.error("Error fetching MGO dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  app.get("/api/dashboard/dev-director", async (req, res) => {
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

      // Pipeline Forecasting by Month
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today (midnight)
      const pipelineForecasting = allOpportunities
        .filter((opp) => opp.closeDate && new Date(opp.closeDate) >= today)
        .reduce((acc, opp) => {
          const closeDate = new Date(opp.closeDate!);
          const monthKey = `${closeDate.getFullYear()}-${String(closeDate.getMonth() + 1).padStart(2, '0')}`;
          const monthName = closeDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
          
          const amount = parseFloat(opp.askAmount || "0");
          const probability = (opp.probability || 50) / 100;
          const weightedValue = amount * probability;
          
          if (!acc[monthKey]) {
            acc[monthKey] = {
              month: monthName,
              totalAskAmount: 0,
              weightedValue: 0,
              opportunityCount: 0,
            };
          }
          
          acc[monthKey].totalAskAmount += amount;
          acc[monthKey].weightedValue += weightedValue;
          acc[monthKey].opportunityCount += 1;
          
          return acc;
        }, {} as Record<string, { month: string; totalAskAmount: number; weightedValue: number; opportunityCount: number }>);

      // Convert to array and sort by month
      const forecastingArray = Object.entries(pipelineForecasting)
        .map(([monthKey, data]) => ({ monthKey, ...data }))
        .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
        .slice(0, 12); // Next 12 months

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
        pipelineForecasting: forecastingArray,
        recentActivity,
        lybuntDonors: lybuntDonorDetails,
        sybuntDonors: sybuntDonorDetails,
      });
    } catch (error) {
      console.error("Error fetching Dev Director dashboard:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  app.get("/api/dashboard/ceo", async (req, res) => {
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

  app.get("/api/data-health", async (req, res) => {
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

  // Integrations & Data Health endpoint
  app.get("/api/integrations", async (req, res) => {
    try {
      // Fetch all integrations
      const integrationsList = await db.select().from(integrations).orderBy(integrations.name);
      
      // Fetch recent sync runs (last 20)
      const recentSyncRuns = await db
        .select()
        .from(integrationSyncRuns)
        .orderBy(desc(integrationSyncRuns.startedAt))
        .limit(20);
      
      // Fetch unresolved data quality issues
      const unresolvedIssues = await db
        .select()
        .from(dataQualityIssues)
        .where(eq(dataQualityIssues.resolved, 0))
        .orderBy(desc(dataQualityIssues.createdAt))
        .limit(50);
      
      // Calculate coverage metrics
      const [totalDonorsResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(persons);
      const totalDonors = Number(totalDonorsResult.count) || 0;
      
      const [donorsWithWealthResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(persons)
        .where(sql`${persons.wealthBand} IS NOT NULL AND ${persons.wealthBand} != ''`);
      const donorsWithWealthData = Number(donorsWithWealthResult.count) || 0;
      
      // Recent interaction = last 90 days
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      const [donorsWithRecentInteractionResult] = await db
        .select({ count: sql<number>`count(DISTINCT ${interactions.personId})` })
        .from(interactions)
        .where(gte(interactions.occurredAt, ninetyDaysAgo));
      const donorsWithRecentInteraction = Number(donorsWithRecentInteractionResult.count) || 0;
      
      const [donorsWithEmailResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(persons)
        .where(sql`${persons.primaryEmail} IS NOT NULL AND ${persons.primaryEmail} != ''`);
      const donorsWithEmail = Number(donorsWithEmailResult.count) || 0;
      
      const [opportunitiesWithActivityResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(opportunities)
        .where(
          and(
            sql`${opportunities.syncedAt} IS NOT NULL`,
            gte(opportunities.syncedAt, ninetyDaysAgo)
          )
        );
      const opportunitiesWithRecentActivity = Number(opportunitiesWithActivityResult.count) || 0;
      
      const [giftsFromOnlinePlatformsResult] = await db
        .select({ count: sql<number>`count(*)` })
        .from(gifts)
        .where(sql`${gifts.sourceSystem} IN ('Classy', 'DAFGiving360')`);
      const giftsFromOnlinePlatforms = Number(giftsFromOnlinePlatformsResult.count) || 0;
      
      res.json({
        integrations: integrationsList,
        recentSyncRuns: recentSyncRuns,
        unresolvedIssues: unresolvedIssues,
        coverageMetrics: {
          totalDonors,
          donorsWithWealthData,
          donorsWithRecentInteraction,
          donorsWithEmail,
          opportunitiesWithRecentActivity,
          giftsFromOnlinePlatforms,
        },
      });
    } catch (error) {
      console.error("Error fetching integrations data:", error);
      res.status(500).json({ message: "Failed to fetch integrations data" });
    }
  });

  // 🚀 AI Intelligence Layer APIs
  
  // Predictive Major Gift Timing
  app.get("/api/ai/predictive-timing", async (req, res) => {
    try {
      const predictions = await db
        .select({
          score: predictiveScores,
          person: persons,
        })
        .from(predictiveScores)
        .innerJoin(persons, eq(predictiveScores.personId, persons.id))
        .orderBy(desc(predictiveScores.givingProbability));
      
      res.json(predictions);
    } catch (error) {
      console.error("Error fetching predictive timing:", error);
      res.status(500).json({ message: "Failed to fetch predictions" });
    }
  });

  // Wealth Events Monitoring
  app.get("/api/ai/wealth-events", async (req, res) => {
    try {
      const events = await db
        .select({
          event: wealthEvents,
          person: persons,
        })
        .from(wealthEvents)
        .innerJoin(persons, eq(wealthEvents.personId, persons.id))
        .orderBy(desc(wealthEvents.eventDate))
        .limit(100);
      
      res.json(events);
    } catch (error) {
      console.error("Error fetching wealth events:", error);
      res.status(500).json({ message: "Failed to fetch wealth events" });
    }
  });

  // Meeting Briefs
  app.get("/api/ai/meeting-briefs", async (req, res) => {
    try {
      const briefs = await db
        .select({
          brief: meetingBriefs,
          person: persons,
        })
        .from(meetingBriefs)
        .innerJoin(persons, eq(meetingBriefs.personId, persons.id))
        .orderBy(desc(meetingBriefs.createdAt))
        .limit(50);
      
      res.json(briefs);
    } catch (error) {
      console.error("Error fetching meeting briefs:", error);
      res.status(500).json({ message: "Failed to fetch meeting briefs" });
    }
  });

  // Voice Notes
  app.get("/api/ai/voice-notes", async (req, res) => {
    try {
      const notes = await db
        .select()
        .from(voiceNotes)
        .orderBy(desc(voiceNotes.recordedAt))
        .limit(50);
      
      res.json(notes);
    } catch (error) {
      console.error("Error fetching voice notes:", error);
      res.status(500).json({ message: "Failed to fetch voice notes" });
    }
  });

  // 🎯 Relationship Intelligence APIs

  // Board Connections
  app.get("/api/relationship/board-connections", async (req, res) => {
    try {
      const results = await db
        .select()
        .from(boardConnections)
        .innerJoin(persons, eq(boardConnections.boardMemberId, persons.id))
        .orderBy(desc(boardConnections.connectionStrength));
      
      // Also fetch prospect data
      const connectionsWithProspects = await Promise.all(
        results.map(async (row) => {
          const prospect = await db
            .select()
            .from(persons)
            .where(eq(persons.id, row.board_connections.prospectId))
            .limit(1);
          
          return {
            connection: row.board_connections,
            boardMember: row.persons,
            prospect: prospect[0] || null,
          };
        })
      );
      
      res.json(connectionsWithProspects);
    } catch (error) {
      console.error("Error fetching board connections:", error);
      res.status(500).json({ message: "Failed to fetch board connections" });
    }
  });

  // Corporate Partnerships (legacy route for relationships page)
  app.get("/api/relationship/corporate-partnerships", async (req, res) => {
    try {
      const partnerships = await db
        .select()
        .from(corporatePartnerships)
        .orderBy(desc(corporatePartnerships.totalEmployeeGiving));
      
      res.json(partnerships);
    } catch (error) {
      console.error("Error fetching corporate partnerships:", error);
      res.status(500).json({ message: "Failed to fetch corporate partnerships" });
    }
  });

  // Corporate Partnerships - Main listing
  app.get("/api/corporate-partnerships", async (req, res) => {
    try {
      const partnerships = await db
        .select()
        .from(corporatePartnerships)
        .orderBy(desc(corporatePartnerships.totalContributions));
      
      res.json(partnerships);
    } catch (error) {
      console.error("Error fetching corporate partnerships:", error);
      res.status(500).json({ message: "Failed to fetch corporate partnerships" });
    }
  });

  // Corporate Partnership - Single partner detail
  app.get("/api/corporate-partnerships/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const partnership = await db
        .select()
        .from(corporatePartnerships)
        .where(eq(corporatePartnerships.id, id))
        .limit(1);
      
      if (partnership.length === 0) {
        return res.status(404).json({ message: "Corporate partnership not found" });
      }
      
      res.json(partnership[0]);
    } catch (error) {
      console.error("Error fetching corporate partnership:", error);
      res.status(500).json({ message: "Failed to fetch corporate partnership" });
    }
  });

  // Peer Donors
  app.get("/api/relationship/peer-donors/:personId", async (req, res) => {
    try {
      const { personId } = req.params;
      const peers = await db
        .select({
          peerDonor: peerDonors,
          peer: persons,
        })
        .from(peerDonors)
        .innerJoin(persons, eq(peerDonors.peerPersonId, persons.id))
        .where(eq(peerDonors.personId, personId))
        .orderBy(desc(peerDonors.similarityScore));
      
      res.json(peers);
    } catch (error) {
      console.error("Error fetching peer donors:", error);
      res.status(500).json({ message: "Failed to fetch peer donors" });
    }
  });

  // Board Network Mapper - Cross-org board relationship analysis
  app.get("/api/board-network", async (req, res) => {
    try {
      const memberships = await db
        .select()
        .from(boardMemberships)
        .orderBy(boardMemberships.orgName, boardMemberships.personName);
      
      res.json(memberships);
    } catch (error) {
      console.error("Error fetching board memberships:", error);
      res.status(500).json({ message: "Failed to fetch board memberships" });
    }
  });

  app.post("/api/board-network/import", isAuthenticated, async (req, res) => {
    try {
      const { memberships } = req.body;
      
      if (!Array.isArray(memberships) || memberships.length === 0) {
        return res.status(400).json({ message: "Invalid data: expected array of memberships" });
      }

      // Validate each membership, collecting errors
      const validatedMemberships: any[] = [];
      const errors: any[] = [];

      for (let i = 0; i < memberships.length; i++) {
        try {
          const validated = insertBoardMembershipSchema.parse(memberships[i]);
          validatedMemberships.push(validated);
        } catch (validationError: any) {
          errors.push({
            row: i + 1,
            error: validationError.errors?.[0]?.message || validationError.message || "Validation failed",
          });
        }
      }

      // If all records failed validation, return 400
      if (validatedMemberships.length === 0) {
        return res.status(400).json({
          message: "All records failed validation",
          errors: errors.slice(0, 10), // Return first 10 errors
        });
      }

      // Insert valid records
      const inserted = await db
        .insert(boardMemberships)
        .values(validatedMemberships)
        .returning();

      // Return success with warnings if some records failed
      const response: any = {
        message: `Successfully imported ${inserted.length} board memberships`,
        count: inserted.length,
      };

      if (errors.length > 0) {
        response.warnings = `${errors.length} records skipped due to validation errors`;
        response.errors = errors.slice(0, 10); // Include first 10 errors
      }

      res.json(response);
    } catch (error) {
      console.error("Error importing board memberships:", error);
      res.status(500).json({ message: "Failed to import board memberships" });
    }
  });

  // ✍️ AI Content Generation APIs

  // Outreach Templates
  app.get("/api/content/outreach-templates", async (req, res) => {
    try {
      const templates = await db
        .select({
          template: outreachTemplates,
          person: persons,
        })
        .from(outreachTemplates)
        .innerJoin(persons, eq(outreachTemplates.personId, persons.id))
        .orderBy(desc(outreachTemplates.createdAt))
        .limit(50);
      
      res.json(templates);
    } catch (error) {
      console.error("Error fetching outreach templates:", error);
      res.status(500).json({ message: "Failed to fetch outreach templates" });
    }
  });

  // Grant Proposals
  app.get("/api/content/grant-proposals", async (req, res) => {
    try {
      const proposals = await db
        .select({
          proposal: grantProposals,
          grant: grants,
        })
        .from(grantProposals)
        .innerJoin(grants, eq(grantProposals.grantId, grants.id))
        .orderBy(desc(grantProposals.createdAt));
      
      res.json(proposals);
    } catch (error) {
      console.error("Error fetching grant proposals:", error);
      res.status(500).json({ message: "Failed to fetch grant proposals" });
    }
  });

  // Impact Reports
  app.get("/api/content/impact-reports", async (req, res) => {
    try {
      const reports = await db
        .select({
          report: impactReports,
          person: persons,
        })
        .from(impactReports)
        .innerJoin(persons, eq(impactReports.personId, persons.id))
        .orderBy(desc(impactReports.createdAt));
      
      res.json(reports);
    } catch (error) {
      console.error("Error fetching impact reports:", error);
      res.status(500).json({ message: "Failed to fetch impact reports" });
    }
  });

  // 📊 Analytics APIs

  // Peer Benchmarks
  app.get("/api/analytics/peer-benchmarks", async (req, res) => {
    try {
      const benchmarks = await db
        .select()
        .from(peerBenchmarks)
        .orderBy(desc(peerBenchmarks.calculatedAt));
      
      res.json(benchmarks);
    } catch (error) {
      console.error("Error fetching peer benchmarks:", error);
      res.status(500).json({ message: "Failed to fetch peer benchmarks" });
    }
  });

  // Sentiment Analysis
  app.get("/api/analytics/sentiment", async (req, res) => {
    try {
      const results = await db
        .select()
        .from(sentimentAnalysis)
        .orderBy(desc(sentimentAnalysis.analysisDate))
        .limit(100);
      
      res.json(results);
    } catch (error) {
      console.error("Error fetching sentiment analysis:", error);
      res.status(500).json({ message: "Failed to fetch sentiment analysis" });
    }
  });

  // Portfolio Optimization
  app.get("/api/analytics/portfolio-optimization", async (req, res) => {
    try {
      const optimizations = await db
        .select()
        .from(portfolioOptimizations)
        .orderBy(desc(portfolioOptimizations.runDate))
        .limit(10);
      
      res.json(optimizations);
    } catch (error) {
      console.error("Error fetching portfolio optimizations:", error);
      res.status(500).json({ message: "Failed to fetch portfolio optimizations" });
    }
  });

  // 🤖 Workflow Automation APIs

  // Calendar Events
  app.get("/api/workflow/calendar", async (req, res) => {
    try {
      const results = await db
        .select()
        .from(calendarEvents)
        .orderBy(desc(calendarEvents.scheduledAt))
        .limit(100);
      
      res.json(results);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      res.status(500).json({ message: "Failed to fetch calendar events" });
    }
  });

  // Stewardship Workflows
  app.get("/api/workflow/stewardship", async (req, res) => {
    try {
      const workflows = await db
        .select({
          workflow: stewardshipWorkflows,
          person: persons,
          gift: gifts,
        })
        .from(stewardshipWorkflows)
        .innerJoin(persons, eq(stewardshipWorkflows.personId, persons.id))
        .innerJoin(gifts, eq(stewardshipWorkflows.giftId, gifts.id))
        .orderBy(desc(stewardshipWorkflows.createdAt))
        .limit(50);
      
      res.json(workflows);
    } catch (error) {
      console.error("Error fetching stewardship workflows:", error);
      res.status(500).json({ message: "Failed to fetch stewardship workflows" });
    }
  });

  // Task Priority Scores
  app.get("/api/workflow/task-priorities", async (req, res) => {
    try {
      const priorities = await db
        .select({
          priorityScore: taskPriorityScores,
          task: tasks,
        })
        .from(taskPriorityScores)
        .innerJoin(tasks, eq(taskPriorityScores.taskId, tasks.id))
        .orderBy(desc(taskPriorityScores.finalPriority))
        .limit(100);
      
      res.json(priorities);
    } catch (error) {
      console.error("Error fetching task priorities:", error);
      res.status(500).json({ message: "Failed to fetch task priorities" });
    }
  });

  // Gift Registries
  app.get("/api/workflow/gift-registries", async (req, res) => {
    try {
      const registries = await db
        .select({
          registry: giftRegistries,
          person: persons,
        })
        .from(giftRegistries)
        .innerJoin(persons, eq(giftRegistries.personId, persons.id))
        .orderBy(desc(giftRegistries.createdAt))
        .limit(100);
      
      res.json(registries);
    } catch (error) {
      console.error("Error fetching gift registries:", error);
      res.status(500).json({ message: "Failed to fetch gift registries" });
    }
  });

  // 🔗 Integration APIs

  // Gift Registries
  app.get("/api/integrations/gift-registries", async (req, res) => {
    try {
      const registries = await db
        .select({
          registry: giftRegistries,
          person: persons,
        })
        .from(giftRegistries)
        .innerJoin(persons, eq(giftRegistries.personId, persons.id))
        .where(eq(giftRegistries.active, 1))
        .orderBy(desc(giftRegistries.createdAt));
      
      res.json(registries);
    } catch (error) {
      console.error("Error fetching gift registries:", error);
      res.status(500).json({ message: "Failed to fetch gift registries" });
    }
  });

  // 🔄 Workflow APIs
  
  // List all workflows (with optional filters)
  app.get("/api/workflows", async (req, res) => {
    try {
      const ownerId = req.query.ownerId as string | undefined;
      const isTemplate = req.query.isTemplate === 'true' ? true : req.query.isTemplate === 'false' ? false : undefined;
      
      const workflows = await storage.getWorkflows(ownerId, isTemplate);
      res.json(workflows);
    } catch (error) {
      console.error("Error fetching workflows:", error);
      res.status(500).json({ message: "Failed to fetch workflows" });
    }
  });

  // Get workflow with blocks and connections
  app.get("/api/workflows/:id", async (req, res) => {
    try {
      const workflow = await storage.getWorkflow(req.params.id);
      if (!workflow) {
        return res.status(404).json({ message: "Workflow not found" });
      }

      const [blocks, connections] = await Promise.all([
        storage.getWorkflowBlocks(req.params.id),
        storage.getWorkflowConnections(req.params.id),
      ]);

      res.json({ workflow, blocks, connections });
    } catch (error) {
      console.error("Error fetching workflow:", error);
      res.status(500).json({ message: "Failed to fetch workflow" });
    }
  });

  // Create new workflow
  app.post("/api/workflows", async (req, res) => {
    try {
      const workflow = await storage.createWorkflow(req.body);
      res.json(workflow);
    } catch (error) {
      console.error("Error creating workflow:", error);
      res.status(500).json({ message: "Failed to create workflow" });
    }
  });

  // Update workflow
  app.put("/api/workflows/:id", async (req, res) => {
    try {
      const workflow = await storage.updateWorkflow(req.params.id, req.body);
      if (!workflow) {
        return res.status(404).json({ message: "Workflow not found" });
      }
      res.json(workflow);
    } catch (error) {
      console.error("Error updating workflow:", error);
      res.status(500).json({ message: "Failed to update workflow" });
    }
  });

  // Delete workflow
  app.delete("/api/workflows/:id", async (req, res) => {
    try {
      await storage.deleteWorkflow(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting workflow:", error);
      res.status(500).json({ message: "Failed to delete workflow" });
    }
  });

  // Clone workflow
  app.post("/api/workflows/:id/clone", async (req, res) => {
    try {
      const ownerId = req.body.ownerId as string | undefined;
      const clonedWorkflow = await storage.cloneWorkflow(req.params.id, ownerId);
      res.json(clonedWorkflow);
    } catch (error) {
      console.error("Error cloning workflow:", error);
      res.status(500).json({ message: "Failed to clone workflow" });
    }
  });

  // Workflow blocks
  app.get("/api/workflows/:workflowId/blocks", async (req, res) => {
    try {
      const blocks = await storage.getWorkflowBlocks(req.params.workflowId);
      res.json(blocks);
    } catch (error) {
      console.error("Error fetching blocks:", error);
      res.status(500).json({ message: "Failed to fetch blocks" });
    }
  });

  app.post("/api/workflows/:workflowId/blocks", async (req, res) => {
    try {
      const block = await storage.createWorkflowBlock({ ...req.body, workflowId: req.params.workflowId });
      res.json(block);
    } catch (error) {
      console.error("Error creating block:", error);
      res.status(500).json({ message: "Failed to create block" });
    }
  });

  app.patch("/api/workflows/:workflowId/blocks/positions", async (req, res) => {
    try {
      const positions = req.body.positions as Array<{ id: string; positionX: number; positionY: number }>;
      
      // Update all positions
      await Promise.all(
        positions.map((pos) =>
          storage.updateWorkflowBlock(pos.id, { 
            positionX: pos.positionX.toString(), 
            positionY: pos.positionY.toString() 
          })
        )
      );
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating positions:", error);
      res.status(500).json({ message: "Failed to update positions" });
    }
  });

  app.put("/api/workflows/:workflowId/blocks/:id", async (req, res) => {
    try {
      const block = await storage.updateWorkflowBlock(req.params.id, req.body);
      res.json(block);
    } catch (error) {
      console.error("Error updating block:", error);
      res.status(500).json({ message: "Failed to update block" });
    }
  });

  app.delete("/api/workflows/:workflowId/blocks/:id", async (req, res) => {
    try {
      await storage.deleteWorkflowBlock(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting block:", error);
      res.status(500).json({ message: "Failed to delete block" });
    }
  });

  // Workflow connections
  app.get("/api/workflows/:workflowId/connections", async (req, res) => {
    try {
      const connections = await storage.getWorkflowConnections(req.params.workflowId);
      res.json(connections);
    } catch (error) {
      console.error("Error fetching connections:", error);
      res.status(500).json({ message: "Failed to fetch connections" });
    }
  });

  app.post("/api/workflows/:workflowId/connections", async (req, res) => {
    try {
      const connection = await storage.createWorkflowConnection({ ...req.body, workflowId: req.params.workflowId });
      res.json(connection);
    } catch (error) {
      console.error("Error creating connection:", error);
      res.status(500).json({ message: "Failed to create connection" });
    }
  });

  app.delete("/api/workflows/:workflowId/connections/:id", async (req, res) => {
    try {
      await storage.deleteWorkflowConnection(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting connection:", error);
      res.status(500).json({ message: "Failed to delete connection" });
    }
  });

  // Organization Canvases
  app.get("/api/organization-canvases", async (req, res) => {
    try {
      const ownerId = req.query.ownerId as string | undefined;
      const canvases = await storage.getOrganizationCanvases(ownerId);
      res.json(canvases);
    } catch (error) {
      console.error("Error fetching organization canvases:", error);
      res.status(500).json({ message: "Failed to fetch organization canvases" });
    }
  });

  app.get("/api/organization-canvases/:id", async (req, res) => {
    try {
      const canvas = await storage.getOrganizationCanvas(req.params.id);
      if (!canvas) {
        return res.status(404).json({ message: "Organization canvas not found" });
      }
      res.json(canvas);
    } catch (error) {
      console.error("Error fetching organization canvas:", error);
      res.status(500).json({ message: "Failed to fetch organization canvas" });
    }
  });

  app.post("/api/organization-canvases", async (req, res) => {
    try {
      console.log("Creating organization canvas with data:", JSON.stringify(req.body, null, 2));
      const validated = insertOrganizationCanvasSchema.parse(req.body);
      console.log("Validated data:", JSON.stringify(validated, null, 2));
      const canvas = await storage.createOrganizationCanvas(validated);
      console.log("Canvas created successfully:", canvas.id);
      res.json(canvas);
    } catch (error) {
      console.error("Error creating organization canvas:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      res.status(500).json({ message: "Failed to create organization canvas", error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.put("/api/organization-canvases/:id", async (req, res) => {
    try {
      const canvas = await storage.updateOrganizationCanvas(req.params.id, req.body);
      if (!canvas) {
        return res.status(404).json({ message: "Organization canvas not found" });
      }
      res.json(canvas);
    } catch (error) {
      console.error("Error updating organization canvas:", error);
      res.status(500).json({ message: "Failed to update organization canvas" });
    }
  });

  app.delete("/api/organization-canvases/:id", async (req, res) => {
    try {
      await storage.deleteOrganizationCanvas(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting organization canvas:", error);
      res.status(500).json({ message: "Failed to delete organization canvas" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

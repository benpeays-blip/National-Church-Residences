import { db } from "./db";
import {
  users,
  households,
  persons,
  gifts,
  opportunities,
  grants,
  interactions,
  campaigns,
  portfolios,
  tasks,
  integrations,
  integrationSyncRuns,
  dataQualityIssues,
  wealthEvents,
  meetingBriefs,
  voiceNotes,
  predictiveScores,
  boardConnections,
  boardMemberships,
  corporatePartnerships,
  peerDonors,
  outreachTemplates,
  grantProposals,
  impactReports,
  sentimentAnalysis,
  peerBenchmarks,
  portfolioOptimizations,
  calendarEvents,
  stewardshipWorkflows,
  taskPriorityScores,
  giftRegistries,
} from "@shared/schema";
import { sql } from "drizzle-orm";

// Helper to create deterministic UUIDs for seeding
function createUUID(seed: string): string {
  // In production, we'd use a proper UUID library
  // For seeding, we'll use gen_random_uuid() from the database
  return seed; // placeholder - will be replaced by database default
}

// Helper for random dates
function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Helper for weighted random selection
function weightedRandom<T>(items: T[], weights: number[]): T {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  for (let i = 0; i < items.length; i++) {
    if (random < weights[i]) {
      return items[i];
    }
    random -= weights[i];
  }
  return items[items.length - 1];
}

async function seed() {
  console.log("🌱 Starting comprehensive database seeding...");

  // Clear existing data (in reverse order of dependencies)
  console.log("🗑️  Clearing existing data...");
  await db.delete(taskPriorityScores);
  await db.delete(tasks);
  await db.delete(giftRegistries);
  await db.delete(stewardshipWorkflows);
  await db.delete(calendarEvents);
  await db.delete(portfolioOptimizations);
  await db.delete(peerBenchmarks);
  await db.delete(sentimentAnalysis);
  await db.delete(impactReports);
  await db.delete(grantProposals);
  await db.delete(outreachTemplates);
  await db.delete(peerDonors);
  await db.delete(corporatePartnerships);
  await db.delete(boardConnections);
  await db.delete(boardMemberships);
  await db.delete(predictiveScores);
  await db.delete(voiceNotes);
  await db.delete(meetingBriefs);
  await db.delete(wealthEvents);
  await db.delete(dataQualityIssues);
  await db.delete(integrationSyncRuns);
  await db.delete(integrations);
  await db.delete(portfolios);
  await db.delete(interactions);
  await db.delete(grants);
  await db.delete(opportunities);
  await db.delete(gifts);
  await db.delete(campaigns);
  await db.delete(persons);
  await db.delete(households);
  await db.delete(users);

  // ==================== USERS ====================
  console.log("👥 Creating users (staff)...");
  const usersList = await db
    .insert(users)
    .values([
      {
        email: "ceo@fundrazor.org",
        firstName: "Margaret",
        lastName: "Sullivan",
        role: "CEO",
      },
      {
        email: "devdirector@fundrazor.org",
        firstName: "James",
        lastName: "Patterson",
        role: "DEV_DIRECTOR",
      },
      {
        email: "mgo1@fundrazor.org",
        firstName: "Rachel",
        lastName: "Kim",
        role: "MGO",
      },
      {
        email: "mgo2@fundrazor.org",
        firstName: "David",
        lastName: "Torres",
        role: "MGO",
      },
      {
        email: "mgo3@fundrazor.org",
        firstName: "Aisha",
        lastName: "Patel",
        role: "MGO",
      },
      {
        email: "mgo4@fundrazor.org",
        firstName: "Marcus",
        lastName: "Johnson",
        role: "MGO",
      },
      {
        email: "mgo5@fundrazor.org",
        firstName: "Sofia",
        lastName: "Rodriguez",
        role: "MGO",
      },
      {
        email: "mgo6@fundrazor.org",
        firstName: "Chen",
        lastName: "Liu",
        role: "MGO",
      },
      {
        email: "mgo7@fundrazor.org",
        firstName: "Priya",
        lastName: "Sharma",
        role: "MGO",
      },
      {
        email: "mgo8@fundrazor.org",
        firstName: "James",
        lastName: "O'Brien",
        role: "MGO",
      },
      {
        email: "mgo9@fundrazor.org",
        firstName: "Fatima",
        lastName: "Hassan",
        role: "MGO",
      },
      {
        email: "mgo10@fundrazor.org",
        firstName: "Alexander",
        lastName: "Kowalski",
        role: "MGO",
      },
      {
        email: "mgo11@fundrazor.org",
        firstName: "Yuki",
        lastName: "Tanaka",
        role: "MGO",
      },
      {
        email: "mgo12@fundrazor.org",
        firstName: "Elena",
        lastName: "Fernandez",
        role: "MGO",
      },
      {
        email: "mgo13@fundrazor.org",
        firstName: "Mohammed",
        lastName: "Al-Sayed",
        role: "MGO",
      },
      {
        email: "dataops@fundrazor.org",
        firstName: "Michael",
        lastName: "Chang",
        role: "DATA_OPS",
      },
    ])
    .returning();
  console.log(`✅ Created ${usersList.length} staff users`);

  // ==================== CAMPAIGNS ====================
  console.log("📢 Creating campaigns...");
  const campaignsList = await db
    .insert(campaigns)
    .values([
      {
        name: "Annual Fund 2025",
        type: "Annual",
        goal: "850000.00",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-12-31"),
      },
      {
        name: "Spring Appeal 2024",
        type: "Direct Mail",
        goal: "120000.00",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-05-31"),
      },
      {
        name: "Fall Gala 2024",
        type: "Event",
        goal: "250000.00",
        startDate: new Date("2024-09-01"),
        endDate: new Date("2024-10-15"),
      },
      {
        name: "Giving Tuesday 2024",
        type: "Online",
        goal: "75000.00",
        startDate: new Date("2024-11-26"),
        endDate: new Date("2024-12-03"),
      },
      {
        name: "Year-End 2024",
        type: "Multi-Channel",
        goal: "450000.00",
        startDate: new Date("2024-11-01"),
        endDate: new Date("2024-12-31"),
      },
      {
        name: "Capital Campaign - New Building",
        type: "Capital",
        goal: "5000000.00",
        startDate: new Date("2023-06-01"),
        endDate: new Date("2026-12-31"),
      },
      {
        name: "Monthly Sustainer Program",
        type: "Recurring",
        goal: "180000.00",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2025-12-31"),
      },
      {
        name: "Corporate Matching 2024",
        type: "Corporate",
        goal: "200000.00",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-12-31"),
      },
    ])
    .returning();
  console.log(`✅ Created ${campaignsList.length} campaigns`);

  // ==================== HOUSEHOLDS ====================
  console.log("🏠 Creating households...");
  const householdData = [
    { name: "Anderson-Smith Family", address: "1234 Oak Avenue, Seattle, WA 98101" },
    { name: "Martinez Household", address: "5678 Pine Street, Portland, OR 97201" },
    { name: "Johnson-Lee Family", address: "9012 Maple Drive, San Francisco, CA 94102" },
    { name: "Williams Household", address: "3456 Elm Court, Austin, TX 78701" },
    { name: "Chen-Wong Family", address: "7890 Cedar Lane, Boston, MA 02101" },
    { name: "Thompson Household", address: "2345 Birch Road, Denver, CO 80201" },
    { name: "Garcia-Rodriguez Family", address: "6789 Spruce Way, Miami, FL 33101" },
    { name: "Wilson Household", address: "1357 Willow Street, Chicago, IL 60601" },
    { name: "Brown-Davis Family", address: "2468 Aspen Boulevard, Phoenix, AZ 85001" },
    { name: "Miller Household", address: "3579 Redwood Avenue, Atlanta, GA 30301" },
    { name: "Taylor-Moore Family", address: "4680 Magnolia Drive, Nashville, TN 37201" },
    { name: "Nguyen Household", address: "5791 Cypress Court, San Diego, CA 92101" },
    { name: "Jackson-White Family", address: "6802 Hickory Lane, Minneapolis, MN 55401" },
    { name: "Harris Household", address: "7913 Poplar Street, Philadelphia, PA 19101" },
    { name: "Clark-Lewis Family", address: "8024 Sycamore Way, Detroit, MI 48201" },
  ];

  const householdsList = await db
    .insert(households)
    .values(
      householdData.map((h) => ({
        name: h.name,
        primaryAddress: h.address,
      }))
    )
    .returning();
  console.log(`✅ Created ${householdsList.length} households`);

  // ==================== PERSONS (DONORS) ====================
  console.log("🎯 Creating donors (persons)...");

  // Diverse, realistic donor data
  const donorData = [
    // High-capacity donors
    {
      firstName: "Elizabeth",
      lastName: "Anderson",
      email: "e.anderson@wealthfund.com",
      phone: "(206) 555-0101",
      householdId: householdsList[0].id,
      org: "Anderson Family Foundation",
      wealthBand: "P5",
      capacity: 98,
      engagement: 92,
      affinity: 95,
    },
    {
      firstName: "Robert",
      lastName: "Martinez",
      email: "rmartinez@techventures.com",
      phone: "(503) 555-0102",
      householdId: householdsList[1].id,
      org: "TechVentures LLC",
      wealthBand: "P4",
      capacity: 88,
      engagement: 78,
      affinity: 82,
    },
    {
      firstName: "Jennifer",
      lastName: "Johnson",
      email: "jjohnson@globalinvest.com",
      phone: "(415) 555-0103",
      householdId: householdsList[2].id,
      org: "Global Investment Partners",
      wealthBand: "P5",
      capacity: 95,
      engagement: 65,
      affinity: 88,
    },
    {
      firstName: "Michael",
      lastName: "Williams",
      email: "m.williams@realtygroup.com",
      phone: "(512) 555-0104",
      householdId: householdsList[3].id,
      org: "Williams Realty Group",
      wealthBand: "P4",
      capacity: 85,
      engagement: 71,
      affinity: 79,
    },
    {
      firstName: "Linda",
      lastName: "Chen",
      email: "lchen@biotech.io",
      phone: "(617) 555-0105",
      householdId: householdsList[4].id,
      org: "BioTech Innovations",
      wealthBand: "P4",
      capacity: 82,
      engagement: 88,
      affinity: 91,
    },
    {
      firstName: "David",
      lastName: "Thompson",
      email: "dthompson@energycorp.com",
      phone: "(303) 555-0106",
      householdId: householdsList[5].id,
      org: "Renewable Energy Corp",
      wealthBand: "P3",
      capacity: 75,
      engagement: 82,
      affinity: 76,
    },
    {
      firstName: "Maria",
      lastName: "Garcia",
      email: "mgarcia@healthsystems.org",
      phone: "(305) 555-0107",
      householdId: householdsList[6].id,
      org: "Healthcare Systems Inc",
      wealthBand: "P4",
      capacity: 80,
      engagement: 74,
      affinity: 85,
    },
    {
      firstName: "James",
      lastName: "Wilson",
      email: "jwilson@lawfirm.com",
      phone: "(312) 555-0108",
      householdId: householdsList[7].id,
      org: "Wilson & Associates",
      wealthBand: "P3",
      capacity: 72,
      engagement: 68,
      affinity: 73,
    },

    // Mid-level donors
    {
      firstName: "Patricia",
      lastName: "Brown",
      email: "pbrown@consulting.com",
      phone: "(602) 555-0109",
      householdId: householdsList[8].id,
      org: null,
      wealthBand: "P2",
      capacity: 58,
      engagement: 85,
      affinity: 78,
    },
    {
      firstName: "Christopher",
      lastName: "Miller",
      email: "cmiller@architect.net",
      phone: "(404) 555-0110",
      householdId: householdsList[9].id,
      org: "Miller Architecture",
      wealthBand: "P2",
      capacity: 62,
      engagement: 79,
      affinity: 81,
    },
    {
      firstName: "Susan",
      lastName: "Taylor",
      email: "staylor@education.org",
      phone: "(615) 555-0111",
      householdId: householdsList[10].id,
      org: null,
      wealthBand: "P2",
      capacity: 55,
      engagement: 91,
      affinity: 88,
    },
    {
      firstName: "Daniel",
      lastName: "Nguyen",
      email: "dnguyen@startuplab.io",
      phone: "(619) 555-0112",
      householdId: householdsList[11].id,
      org: "StartupLab",
      wealthBand: "P2",
      capacity: 60,
      engagement: 82,
      affinity: 75,
    },
    {
      firstName: "Rebecca",
      lastName: "Jackson",
      email: "rjackson@marketing.com",
      phone: "(612) 555-0113",
      householdId: householdsList[12].id,
      org: null,
      wealthBand: "P2",
      capacity: 52,
      engagement: 88,
      affinity: 82,
    },
    {
      firstName: "Thomas",
      lastName: "Harris",
      email: "tharris@finance.com",
      phone: "(215) 555-0114",
      householdId: householdsList[13].id,
      org: null,
      wealthBand: "P2",
      capacity: 57,
      engagement: 76,
      affinity: 79,
    },
    {
      firstName: "Nancy",
      lastName: "Clark",
      email: "nclark@nonprofit.org",
      phone: "(313) 555-0115",
      householdId: householdsList[14].id,
      org: null,
      wealthBand: "P2",
      capacity: 54,
      engagement: 84,
      affinity: 86,
    },

    // Active donors (smaller amounts, high engagement)
    {
      firstName: "Kevin",
      lastName: "Lee",
      email: "klee@email.com",
      phone: "(206) 555-0116",
      householdId: householdsList[2].id,
      org: null,
      wealthBand: "P1",
      capacity: 38,
      engagement: 95,
      affinity: 92,
    },
    {
      firstName: "Sarah",
      lastName: "Rodriguez",
      email: "srodriguez@gmail.com",
      phone: "(503) 555-0117",
      householdId: householdsList[6].id,
      org: null,
      wealthBand: "P1",
      capacity: 42,
      engagement: 89,
      affinity: 85,
    },
    {
      firstName: "Brian",
      lastName: "Moore",
      email: "bmoore@outlook.com",
      phone: "(415) 555-0118",
      householdId: householdsList[10].id,
      org: null,
      wealthBand: "P1",
      capacity: 35,
      engagement: 92,
      affinity: 88,
    },
    {
      firstName: "Michelle",
      lastName: "White",
      email: "mwhite@yahoo.com",
      phone: "(512) 555-0119",
      householdId: householdsList[12].id,
      org: null,
      wealthBand: "P1",
      capacity: 40,
      engagement: 87,
      affinity: 81,
    },
    {
      firstName: "Jason",
      lastName: "Lewis",
      email: "jlewis@proton.me",
      phone: "(617) 555-0120",
      householdId: null,
      org: null,
      wealthBand: "P1",
      capacity: 33,
      engagement: 94,
      affinity: 90,
    },

    // LYBUNT donors (gave 2024, not 2025) - 10 donors
    {
      firstName: "Amanda",
      lastName: "Foster",
      email: "afoster@email.com",
      phone: "(303) 555-0121",
      householdId: null,
      org: null,
      wealthBand: "P2",
      capacity: 48,
      engagement: 62,
      affinity: 65,
    },
    {
      firstName: "Gregory",
      lastName: "Hughes",
      email: "ghughes@mail.com",
      phone: "(305) 555-0122",
      householdId: null,
      org: null,
      wealthBand: "P1",
      capacity: 35,
      engagement: 58,
      affinity: 61,
    },
    {
      firstName: "Nicole",
      lastName: "Bennett",
      email: "nbennett@email.net",
      phone: "(312) 555-0123",
      householdId: null,
      org: null,
      wealthBand: "P2",
      capacity: 52,
      engagement: 55,
      affinity: 68,
    },
    {
      firstName: "Aaron",
      lastName: "Cooper",
      email: "acooper@gmail.com",
      phone: "(602) 555-0124",
      householdId: null,
      org: null,
      wealthBand: "P1",
      capacity: 40,
      engagement: 60,
      affinity: 62,
    },
    {
      firstName: "Laura",
      lastName: "Peterson",
      email: "lpeterson@yahoo.com",
      phone: "(404) 555-0125",
      householdId: null,
      org: null,
      wealthBand: "P3",
      capacity: 65,
      engagement: 52,
      affinity: 70,
    },
    {
      firstName: "Ryan",
      lastName: "Richardson",
      email: "rrichardson@outlook.com",
      phone: "(615) 555-0126",
      householdId: null,
      org: null,
      wealthBand: "P2",
      capacity: 50,
      engagement: 58,
      affinity: 64,
    },
    {
      firstName: "Melissa",
      lastName: "Cox",
      email: "mcox@proton.me",
      phone: "(619) 555-0127",
      householdId: null,
      org: null,
      wealthBand: "P1",
      capacity: 38,
      engagement: 63,
      affinity: 59,
    },
    {
      firstName: "Brandon",
      lastName: "Howard",
      email: "bhoward@email.com",
      phone: "(612) 555-0128",
      householdId: null,
      org: null,
      wealthBand: "P2",
      capacity: 45,
      engagement: 57,
      affinity: 66,
    },
    {
      firstName: "Rachel",
      lastName: "Ward",
      email: "rward@mail.com",
      phone: "(215) 555-0129",
      householdId: null,
      org: null,
      wealthBand: "P1",
      capacity: 36,
      engagement: 61,
      affinity: 58,
    },
    {
      firstName: "Justin",
      lastName: "Torres",
      email: "jtorres@gmail.com",
      phone: "(313) 555-0130",
      householdId: null,
      org: null,
      wealthBand: "P2",
      capacity: 47,
      engagement: 59,
      affinity: 67,
    },

    // SYBUNT donors (gave 2022-2023, not recently) - 8 donors
    {
      firstName: "Angela",
      lastName: "Gray",
      email: "agray@email.com",
      phone: "(206) 555-0131",
      householdId: null,
      org: null,
      wealthBand: "P2",
      capacity: 50,
      engagement: 35,
      affinity: 58,
    },
    {
      firstName: "Timothy",
      lastName: "James",
      email: "tjames@yahoo.com",
      phone: "(503) 555-0132",
      householdId: null,
      org: null,
      wealthBand: "P1",
      capacity: 38,
      engagement: 28,
      affinity: 52,
    },
    {
      firstName: "Stephanie",
      lastName: "Ramirez",
      email: "sramirez@outlook.com",
      phone: "(415) 555-0133",
      householdId: null,
      org: null,
      wealthBand: "P3",
      capacity: 68,
      engagement: 32,
      affinity: 61,
    },
    {
      firstName: "Eric",
      lastName: "Watson",
      email: "ewatson@gmail.com",
      phone: "(512) 555-0134",
      householdId: null,
      org: null,
      wealthBand: "P2",
      capacity: 48,
      engagement: 30,
      affinity: 55,
    },
    {
      firstName: "Kathleen",
      lastName: "Brooks",
      email: "kbrooks@proton.me",
      phone: "(617) 555-0135",
      householdId: null,
      org: null,
      wealthBand: "P1",
      capacity: 35,
      engagement: 25,
      affinity: 49,
    },
    {
      firstName: "Jeffrey",
      lastName: "Kelly",
      email: "jkelly@email.net",
      phone: "(303) 555-0136",
      householdId: null,
      org: null,
      wealthBand: "P2",
      capacity: 52,
      engagement: 33,
      affinity: 57,
    },
    {
      firstName: "Christine",
      lastName: "Sanders",
      email: "csanders@mail.com",
      phone: "(305) 555-0137",
      householdId: null,
      org: null,
      wealthBand: "P1",
      capacity: 40,
      engagement: 29,
      affinity: 54,
    },
    {
      firstName: "Scott",
      lastName: "Price",
      email: "sprice@yahoo.com",
      phone: "(312) 555-0138",
      householdId: null,
      org: null,
      wealthBand: "P2",
      capacity: 46,
      engagement: 31,
      affinity: 56,
    },

    // Additional active donors
    {
      firstName: "Victoria",
      lastName: "Bennett",
      email: "vbennett@email.com",
      phone: "(602) 555-0139",
      householdId: null,
      org: null,
      wealthBand: "P1",
      capacity: 41,
      engagement: 86,
      affinity: 83,
    },
    {
      firstName: "Andrew",
      lastName: "Powell",
      email: "apowell@gmail.com",
      phone: "(404) 555-0140",
      householdId: null,
      org: null,
      wealthBand: "P2",
      capacity: 55,
      engagement: 80,
      affinity: 77,
    },
    {
      firstName: "Samantha",
      lastName: "Long",
      email: "slong@outlook.com",
      phone: "(615) 555-0141",
      householdId: null,
      org: null,
      wealthBand: "P1",
      capacity: 37,
      engagement: 90,
      affinity: 84,
    },
    {
      firstName: "Joshua",
      lastName: "Rivera",
      email: "jrivera@proton.me",
      phone: "(619) 555-0142",
      householdId: null,
      org: null,
      wealthBand: "P2",
      capacity: 58,
      engagement: 81,
      affinity: 79,
    },
    {
      firstName: "Emily",
      lastName: "Collins",
      email: "ecollins@email.net",
      phone: "(612) 555-0143",
      householdId: null,
      org: null,
      wealthBand: "P1",
      capacity: 39,
      engagement: 88,
      affinity: 85,
    },
    {
      firstName: "Matthew",
      lastName: "Stewart",
      email: "mstewart@mail.com",
      phone: "(215) 555-0144",
      householdId: null,
      org: null,
      wealthBand: "P2",
      capacity: 53,
      engagement: 83,
      affinity: 80,
    },
    {
      firstName: "Jessica",
      lastName: "Morgan",
      email: "jmorgan@yahoo.com",
      phone: "(313) 555-0145",
      householdId: null,
      org: null,
      wealthBand: "P1",
      capacity: 44,
      engagement: 87,
      affinity: 82,
    },
  ];

  const personsList = await db
    .insert(persons)
    .values(
      donorData.map((d, index) => {
        // Integration metadata: most from Salesforce, some stale data
        const isStale = index % 8 === 0; // Every 8th donor has stale data
        const syncedDaysAgo = isStale ? Math.floor(Math.random() * 90) + 30 : Math.floor(Math.random() * 7);
        const syncedAt = new Date();
        syncedAt.setDate(syncedAt.getDate() - syncedDaysAgo);
        
        // Data quality: based on completeness of fields
        const hasEmail = !!d.email;
        const hasPhone = !!d.phone;
        const hasOrg = !!d.org;
        const hasWealthBand = !!d.wealthBand;
        let dataQuality = 60; // base score
        if (hasEmail) dataQuality += 15;
        if (hasPhone) dataQuality += 10;
        if (hasOrg) dataQuality += 10;
        if (hasWealthBand) dataQuality += 5;
        
        return {
          firstName: d.firstName,
          lastName: d.lastName,
          primaryEmail: d.email,
          primaryPhone: d.phone,
          householdId: d.householdId,
          organizationName: d.org,
          wealthBand: d.wealthBand,
          capacityScore: d.capacity,
          engagementScore: d.engagement,
          affinityScore: d.affinity,
          // Integration metadata
          sourceSystem: "Salesforce", // All donors from CRM
          sourceRecordId: `SF-${String(index + 1000).padStart(6, '0')}`,
          syncedAt: syncedAt,
          dataQualityScore: dataQuality,
        };
      })
    )
    .returning();
  console.log(`✅ Created ${personsList.length} donors`);

  // ==================== GIFTS ====================
  console.log("💰 Creating gifts...");

  const giftsList: any[] = [];

  // Helper to create gifts for a person
  async function createGiftsForPerson(
    person: (typeof personsList)[0],
    personIndex: number
  ) {
    const isLYBUNT = personIndex >= 20 && personIndex <= 29; // indices 20-29
    const isSYBUNT = personIndex >= 30 && personIndex <= 37; // indices 30-37

    // Determine gift pattern based on wealth band and donor type
    let giftCount: number;
    let giftAmounts: number[];
    let giftDates: Date[];

    if (isLYBUNT) {
      // LYBUNT: gave in 2024 but not 2025
      giftCount = Math.floor(Math.random() * 3) + 2; // 2-4 gifts
      giftAmounts = [];
      giftDates = [];

      for (let i = 0; i < giftCount; i++) {
        // All gifts in 2024
        const date = randomDate(new Date("2024-01-01"), new Date("2024-12-31"));
        giftDates.push(date);

        // Amount based on capacity
        const baseAmount =
          person.capacityScore! > 60
            ? Math.random() * 5000 + 1000
            : Math.random() * 1000 + 100;
        giftAmounts.push(baseAmount);
      }
    } else if (isSYBUNT) {
      // SYBUNT: gave in 2022-2023 but not recently
      giftCount = Math.floor(Math.random() * 3) + 1; // 1-3 gifts
      giftAmounts = [];
      giftDates = [];

      for (let i = 0; i < giftCount; i++) {
        // All gifts in 2022-2023
        const date = randomDate(new Date("2022-01-01"), new Date("2023-12-31"));
        giftDates.push(date);

        const baseAmount =
          person.capacityScore! > 60
            ? Math.random() * 4000 + 800
            : Math.random() * 800 + 100;
        giftAmounts.push(baseAmount);
      }
    } else {
      // Regular donors with varied patterns
      const capacityScore = person.capacityScore || 50;

      if (capacityScore >= 85) {
        // Major donors: fewer, larger gifts
        giftCount = Math.floor(Math.random() * 5) + 3; // 3-7 gifts
        giftAmounts = [];
        giftDates = [];

        for (let i = 0; i < giftCount; i++) {
          const date = randomDate(new Date("2023-01-01"), new Date("2025-01-15"));
          giftDates.push(date);

          // Major gifts: $10k-$100k
          const amount = Math.random() * 90000 + 10000;
          giftAmounts.push(amount);
        }
      } else if (capacityScore >= 60) {
        // Mid-level donors
        giftCount = Math.floor(Math.random() * 6) + 4; // 4-9 gifts
        giftAmounts = [];
        giftDates = [];

        for (let i = 0; i < giftCount; i++) {
          const date = randomDate(new Date("2023-06-01"), new Date("2025-01-15"));
          giftDates.push(date);

          // Mid-level gifts: $500-$10k
          const amount = Math.random() * 9500 + 500;
          giftAmounts.push(amount);
        }
      } else {
        // Regular donors: more frequent, smaller gifts
        giftCount = Math.floor(Math.random() * 10) + 5; // 5-14 gifts
        giftAmounts = [];
        giftDates = [];

        for (let i = 0; i < giftCount; i++) {
          const date = randomDate(new Date("2023-01-01"), new Date("2025-01-15"));
          giftDates.push(date);

          // Small gifts: $25-$500
          const amount = Math.random() * 475 + 25;
          giftAmounts.push(amount);
        }
      }
    }

    // Create the gifts
    for (let i = 0; i < giftCount; i++) {
      const campaignId = weightedRandom(
        campaignsList.map((c) => c.id),
        [20, 15, 18, 12, 20, 5, 5, 5] // weights for each campaign
      );

      const paymentMethods = [
        "Credit Card",
        "ACH",
        "Check",
        "Wire Transfer",
        "DAF",
        "Stock",
      ];
      const paymentWeights = [40, 25, 15, 5, 10, 5];

      const paymentMethod = weightedRandom(paymentMethods, paymentWeights);
      
      // Integration metadata: determine source system based on payment method and campaign
      let sourceSystem = "Salesforce"; // default CRM
      if (paymentMethod === "Credit Card" && Math.random() > 0.5) {
        sourceSystem = "Classy"; // Online giving platform
      } else if (paymentMethod === "DAF") {
        sourceSystem = "DAFGiving360";
      }
      
      // Sync timestamp: recent gifts synced more recently
      const daysSinceGift = Math.floor((new Date().getTime() - giftDates[i].getTime()) / (1000 * 60 * 60 * 24));
      const syncDelay = Math.min(daysSinceGift, Math.floor(Math.random() * 5) + 1); // 1-5 days after gift, or gift date if older
      const syncedAt = new Date(giftDates[i]);
      syncedAt.setDate(syncedAt.getDate() + syncDelay);
      
      // Data quality: 90-100 for recent gifts, lower for older
      const dataQuality = daysSinceGift < 30 ? 95 + Math.floor(Math.random() * 5) : 85 + Math.floor(Math.random() * 10);
      
      giftsList.push({
        personId: person.id,
        amount: giftAmounts[i].toFixed(2),
        currency: "USD",
        receivedAt: giftDates[i],
        campaignId: campaignId,
        designation: weightedRandom(
          ["General Fund", "Education Program", "Community Outreach", "Capital Fund"],
          [50, 25, 15, 10]
        ),
        paymentMethod: paymentMethod,
        // Integration metadata
        sourceSystem: sourceSystem,
        sourceRecordId: `${sourceSystem === "Salesforce" ? "SF-G" : sourceSystem === "Classy" ? "CL-G" : "DAF-G"}-${Math.floor(Math.random() * 900000) + 100000}`,
        syncedAt: syncedAt,
        dataQualityScore: dataQuality,
      });
    }
  }

  // Create gifts for all persons
  for (let i = 0; i < personsList.length; i++) {
    await createGiftsForPerson(personsList[i], i);
  }

  const insertedGifts = await db.insert(gifts).values(giftsList).returning();
  console.log(`✅ Created ${insertedGifts.length} gifts`);

  // ==================== UPDATE PERSON AGGREGATES ====================
  console.log("🔄 Updating donor aggregates (lastGiftDate, lastGiftAmount, totalLifetimeGiving)...");

  // Calculate aggregates for each person
  for (const person of personsList) {
    const personGifts = giftsList
      .filter((g) => g.personId === person.id)
      .sort((a, b) => b.receivedAt.getTime() - a.receivedAt.getTime());

    if (personGifts.length > 0) {
      const lastGift = personGifts[0];
      const totalGiving = personGifts.reduce(
        (sum, g) => sum + parseFloat(g.amount),
        0
      );

      await db
        .update(persons)
        .set({
          lastGiftDate: lastGift.receivedAt,
          lastGiftAmount: lastGift.amount,
          totalLifetimeGiving: totalGiving.toFixed(2),
        })
        .where(sql`${persons.id} = ${person.id}`);
    }
  }
  console.log("✅ Updated all donor aggregates");

  // ==================== OPPORTUNITIES ====================
  console.log("🎯 Creating opportunities...");

  const mgoUsers = usersList.filter((u) => u.role === "MGO");
  const opportunitiesList: any[] = [];

  // Create opportunities for top 30 capacity donors
  const topDonors = [...personsList]
    .sort((a, b) => (b.capacityScore || 0) - (a.capacityScore || 0))
    .slice(0, 30);

  for (const donor of topDonors) {
    // 60% chance of having an opportunity
    if (Math.random() > 0.4) {
      const stage = weightedRandom(
        ["Prospect", "Cultivation", "Ask", "Steward", "Renewal"],
        [35, 30, 20, 10, 5]
      );

      const probability =
        stage === "Prospect"
          ? 15
          : stage === "Cultivation"
          ? 35
          : stage === "Ask"
          ? 60
          : stage === "Steward"
          ? 85
          : 25;

      // Ask amount based on wealth band
      const capacityScore = donor.capacityScore || 50;
      let askAmount: number;

      if (capacityScore >= 90) {
        askAmount = Math.random() * 200000 + 50000; // $50k-$250k
      } else if (capacityScore >= 75) {
        askAmount = Math.random() * 75000 + 25000; // $25k-$100k
      } else if (capacityScore >= 60) {
        askAmount = Math.random() * 20000 + 5000; // $5k-$25k
      } else {
        askAmount = Math.random() * 4000 + 1000; // $1k-$5k
      }

      // Calculate expected close date
      const daysOut =
        stage === "Prospect"
          ? 180
          : stage === "Cultivation"
          ? 120
          : stage === "Ask"
          ? 60
          : stage === "Steward"
          ? 30
          : 90;

      const closeDate = new Date();
      closeDate.setDate(closeDate.getDate() + daysOut + Math.random() * 60);

      const owner = mgoUsers[Math.floor(Math.random() * mgoUsers.length)];

      // Integration metadata: all opportunities from Salesforce CRM
      const createdDaysAgo = Math.floor(Math.random() * 90); // Created in last 90 days
      const syncedDaysAgo = Math.floor(Math.random() * 3); // Synced in last 3 days
      const syncedAt = new Date();
      syncedAt.setDate(syncedAt.getDate() - syncedDaysAgo);
      
      // Data quality: higher for more recent stages
      const dataQuality = stage === "Ask" || stage === "Steward" ? 95 : stage === "Cultivation" ? 88 : 82;
      
      opportunitiesList.push({
        personId: donor.id,
        stage: stage,
        askAmount: askAmount.toFixed(2),
        probability: probability,
        closeDate: closeDate,
        notes: `Major gift opportunity for ${donor.organizationName || "individual donor"} - ${donor.firstName} ${donor.lastName}`,
        ownerId: owner.id,
        // Integration metadata
        sourceSystem: "Salesforce",
        sourceRecordId: `SF-OPP-${Math.floor(Math.random() * 900000) + 100000}`,
        syncedAt: syncedAt,
        dataQualityScore: dataQuality,
      });
    }
  }

  await db.insert(opportunities).values(opportunitiesList);
  console.log(`✅ Created ${opportunitiesList.length} opportunities`);

  // ==================== GRANTS ====================
  console.log("📝 Creating grants...");

  const devDirector = usersList.find((u) => u.role === "DEV_DIRECTOR");
  const dataOpsUser = usersList.find((u) => u.role === "DATA_OPS");
  
  // Realistic foundation grants in various stages
  const grantsList = await db.insert(grants).values([
    // LOI Stage - Letter of Intent submitted, waiting for feedback
    {
      funderName: "Gates Foundation",
      stage: "LOI",
      purpose: "Education program expansion and curriculum development",
      askAmount: "500000.00",
      ownerId: devDirector?.id,
      loiDueDate: new Date("2025-01-15"),
      applicationDueDate: new Date("2025-03-15"),
      decisionDate: new Date("2025-06-01"),
      notes: "LOI submitted on time. Program officer expressed interest in our outcomes data.",
      campaignId: campaignsList[5].id, // Capital Campaign
      sourceSystem: "Salesforce",
      sourceRecordId: "SF-GRANT-100234",
      syncedAt: new Date(),
      dataQualityScore: 92,
    },
    // Submitted - Full proposal submitted, in review
    {
      funderName: "Kresge Foundation",
      stage: "Submitted",
      purpose: "Capital improvements and facility upgrades",
      askAmount: "250000.00",
      ownerId: devDirector?.id,
      loiDueDate: new Date("2024-10-01"),
      applicationDueDate: new Date("2024-12-15"),
      decisionDate: new Date("2025-02-28"),
      notes: "Full application submitted Dec 12. Site visit scheduled for Feb 5.",
      campaignId: campaignsList[5].id, // Capital Campaign
      sourceSystem: "Salesforce",
      sourceRecordId: "SF-GRANT-100567",
      syncedAt: new Date(),
      dataQualityScore: 95,
    },
    // Submitted - Another proposal in review
    {
      funderName: "Ford Foundation",
      stage: "Submitted",
      purpose: "Community outreach and engagement initiatives",
      askAmount: "150000.00",
      ownerId: devDirector?.id,
      loiDueDate: new Date("2024-11-01"),
      applicationDueDate: new Date("2025-01-10"),
      decisionDate: new Date("2025-03-31"),
      notes: "Application submitted Jan 8. Waiting on decision by end of March.",
      campaignId: campaignsList[0].id, // Annual Fund
      sourceSystem: "Salesforce",
      sourceRecordId: "SF-GRANT-100789",
      syncedAt: new Date(),
      dataQualityScore: 93,
    },
    // Awarded - Grant won, report due
    {
      funderName: "MacArthur Foundation",
      stage: "Awarded",
      purpose: "Youth development and mentorship program",
      askAmount: "300000.00",
      awardedAmount: "300000.00",
      ownerId: devDirector?.id,
      loiDueDate: new Date("2024-03-01"),
      applicationDueDate: new Date("2024-05-15"),
      decisionDate: new Date("2024-08-01"),
      reportDueDate: new Date("2025-08-01"),
      notes: "Full award received! First payment deposited Sept 2024. Annual report due Aug 2025.",
      campaignId: campaignsList[0].id, // Annual Fund
      sourceSystem: "Salesforce",
      sourceRecordId: "SF-GRANT-99834",
      syncedAt: new Date(),
      dataQualityScore: 98,
    },
    // Awarded - Another successful grant
    {
      funderName: "Walton Family Foundation",
      stage: "Awarded",
      purpose: "Scholarship fund and student support services",
      askAmount: "200000.00",
      awardedAmount: "175000.00",
      ownerId: devDirector?.id,
      loiDueDate: new Date("2024-02-01"),
      applicationDueDate: new Date("2024-04-01"),
      decisionDate: new Date("2024-07-15"),
      reportDueDate: new Date("2025-07-15"),
      notes: "Awarded $175k (asked $200k). Program running smoothly, mid-year report submitted.",
      campaignId: campaignsList[0].id, // Annual Fund
      sourceSystem: "Salesforce",
      sourceRecordId: "SF-GRANT-99921",
      syncedAt: new Date(),
      dataQualityScore: 96,
    },
    // Research - Early stage grant prospect
    {
      funderName: "Robert Wood Johnson Foundation",
      stage: "Research",
      purpose: "Health and wellness program development",
      askAmount: "400000.00",
      ownerId: dataOpsUser?.id,
      loiDueDate: new Date("2025-04-01"),
      notes: "Researching alignment with foundation priorities. Initial outreach planned for Feb.",
      sourceSystem: "Salesforce",
      sourceRecordId: "SF-GRANT-101023",
      syncedAt: new Date(),
      dataQualityScore: 78,
    },
    // Research - Another early prospect
    {
      funderName: "Hewlett Foundation",
      stage: "Research",
      purpose: "Arts and culture programming expansion",
      askAmount: "125000.00",
      ownerId: devDirector?.id,
      loiDueDate: new Date("2025-05-15"),
      notes: "Good mission alignment. Reviewing past grantees and application guidelines.",
      sourceSystem: "Salesforce",
      sourceRecordId: "SF-GRANT-101145",
      syncedAt: new Date(),
      dataQualityScore: 75,
    },
    // Declined - Not funded this cycle
    {
      funderName: "Mellon Foundation",
      stage: "Declined",
      purpose: "Archives digitization project",
      askAmount: "100000.00",
      ownerId: devDirector?.id,
      loiDueDate: new Date("2024-06-01"),
      applicationDueDate: new Date("2024-08-01"),
      decisionDate: new Date("2024-10-15"),
      notes: "Declined Oct 2024. Feedback: Strong proposal but limited funding. Encouraged to reapply next cycle.",
      sourceSystem: "Salesforce",
      sourceRecordId: "SF-GRANT-99456",
      syncedAt: new Date(),
      dataQualityScore: 88,
    },
    // Report Due - Grant report deadline approaching
    {
      funderName: "Packard Foundation",
      stage: "ReportDue",
      purpose: "Environmental education and sustainability initiatives",
      askAmount: "180000.00",
      awardedAmount: "180000.00",
      ownerId: devDirector?.id,
      loiDueDate: new Date("2023-11-01"),
      applicationDueDate: new Date("2024-01-15"),
      decisionDate: new Date("2024-04-01"),
      reportDueDate: new Date("2025-04-01"),
      notes: "Final report due April 1, 2025. Gathering program outcomes and financials.",
      campaignId: campaignsList[0].id, // Annual Fund
      sourceSystem: "Salesforce",
      sourceRecordId: "SF-GRANT-98567",
      syncedAt: new Date(),
      dataQualityScore: 94,
    },
    // Submitted - Healthcare grant
    {
      funderName: "Kaiser Permanente Foundation",
      stage: "Submitted",
      purpose: "Community health screening and wellness workshops",
      askAmount: "75000.00",
      ownerId: devDirector?.id,
      loiDueDate: new Date("2024-12-01"),
      applicationDueDate: new Date("2025-01-31"),
      decisionDate: new Date("2025-04-15"),
      notes: "Application submitted Jan 28. Strong community health outcomes data included.",
      campaignId: campaignsList[0].id, // Annual Fund
      sourceSystem: "Salesforce",
      sourceRecordId: "SF-GRANT-100890",
      syncedAt: new Date(),
      dataQualityScore: 91,
    },
  ]).returning();
  
  console.log(`✅ Created ${grantsList.length} grants across all stages`);

  // ==================== INTERACTIONS ====================
  console.log("💬 Creating interactions...");

  const interactionsList: any[] = [];

  // Create interactions for active donors (top 35)
  const activeDonors = [...personsList]
    .sort((a, b) => (b.engagementScore || 0) - (a.engagementScore || 0))
    .slice(0, 35);

  for (const donor of activeDonors) {
    const interactionCount = Math.floor(Math.random() * 6) + 4; // 4-9 interactions
    const owner = mgoUsers[Math.floor(Math.random() * mgoUsers.length)];

    for (let i = 0; i < interactionCount; i++) {
      const type = weightedRandom(
        ["email_open", "email_click", "meeting", "call", "event", "note"],
        [30, 20, 15, 15, 10, 10]
      );

      const daysAgo = Math.floor(Math.random() * 180); // Last 6 months
      const interactionDate = new Date();
      interactionDate.setDate(interactionDate.getDate() - daysAgo);

      let description = "";
      if (type === "email_open") {
        description = "Opened email: Monthly Impact Report";
      } else if (type === "email_click") {
        description = "Clicked link in email: Volunteer Opportunities";
      } else if (type === "meeting") {
        description = "In-person meeting at coffee shop to discuss giving plans";
      } else if (type === "call") {
        description = "Phone call to thank for recent gift and provide update";
      } else if (type === "event") {
        description = "Attended annual gala / donor appreciation event";
      } else if (type === "note") {
        description = "Follow-up note sent with personalized impact story";
      }

      // Integration metadata: email interactions from Mailchimp, others from Salesforce
      const sourceSystem = (type === "email_open" || type === "email_click") ? "Mailchimp" : "Salesforce";
      
      // Sync timestamp: email interactions sync faster (hourly), manual entries sync daily
      const syncDelayHours = sourceSystem === "Mailchimp" ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 48) + 2;
      const syncedAt = new Date(interactionDate);
      syncedAt.setHours(syncedAt.getHours() + syncDelayHours);
      
      // Data quality: email tracking very reliable (95-98), manual entries more variable (80-92)
      const dataQuality = sourceSystem === "Mailchimp" ? 95 + Math.floor(Math.random() * 3) : 80 + Math.floor(Math.random() * 12);
      
      interactionsList.push({
        personId: donor.id,
        type: type,
        notes: description,
        occurredAt: interactionDate,
        ownerId: owner.id,
        // Integration metadata
        sourceSystem: sourceSystem,
        sourceRecordId: `${sourceSystem === "Mailchimp" ? "MC-" : "SF-"}INT-${Math.floor(Math.random() * 900000) + 100000}`,
        syncedAt: syncedAt,
        dataQualityScore: dataQuality,
      });
    }
  }

  await db.insert(interactions).values(interactionsList);
  console.log(`✅ Created ${interactionsList.length} interactions`);

  // ==================== INTEGRATIONS ====================
  console.log("🔌 Creating integration connections...");
  
  const now = new Date();
  const integrationsList = await db
    .insert(integrations)
    .values([
      {
        name: "Salesforce NPSP",
        type: "CRM",
        status: "connected",
        lastSyncAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        lastSuccessfulSyncAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
        recordCount: personsList.length + giftsList.filter(g => g.sourceSystem === "Salesforce").length + opportunitiesList.length,
        errorMessage: null,
        config: { instanceUrl: "https://fundrazor.my.salesforce.com", apiVersion: "v58.0" },
      },
      {
        name: "Mailchimp",
        type: "Email",
        status: "connected",
        lastSyncAt: new Date(now.getTime() - 30 * 60 * 1000), // 30 minutes ago
        lastSuccessfulSyncAt: new Date(now.getTime() - 30 * 60 * 1000),
        recordCount: interactionsList.filter(i => i.sourceSystem === "Mailchimp").length,
        errorMessage: null,
        config: { listId: "a1b2c3d4e5", audienceSize: 12450 },
      },
      {
        name: "Classy Online Giving",
        type: "Giving",
        status: "connected",
        lastSyncAt: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
        lastSuccessfulSyncAt: new Date(now.getTime() - 4 * 60 * 60 * 1000),
        recordCount: giftsList.filter(g => g.sourceSystem === "Classy").length,
        errorMessage: null,
        config: { campaignIds: ["12345", "12346", "12347"] },
      },
      {
        name: "WealthEngine",
        type: "WealthScreening",
        status: "syncing",
        lastSyncAt: new Date(now.getTime() - 15 * 60 * 1000), // 15 minutes ago (in progress)
        lastSuccessfulSyncAt: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
        recordCount: Math.floor(personsList.length * 0.75), // 75% of donors have wealth data
        errorMessage: null,
        config: { batchSize: 100, autoRefresh: true },
      },
      {
        name: "DAFGiving360",
        type: "Giving",
        status: "connected",
        lastSyncAt: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
        lastSuccessfulSyncAt: new Date(now.getTime() - 6 * 60 * 60 * 1000),
        recordCount: giftsList.filter(g => g.sourceSystem === "DAFGiving360").length,
        errorMessage: null,
        config: { fundId: "FUND-98765" },
      },
    ])
    .returning();
  console.log(`✅ Created ${integrationsList.length} integration connections`);

  // ==================== INTEGRATION SYNC RUNS ====================
  console.log("📊 Creating integration sync history...");
  
  const syncRunsList: any[] = [];
  
  // Create 2-4 recent sync runs for each integration
  for (const integration of integrationsList) {
    const runCount = Math.floor(Math.random() * 3) + 2; // 2-4 runs
    
    for (let i = 0; i < runCount; i++) {
      const hoursAgo = Math.floor(Math.random() * 72) + (i * 6); // Spread over 3 days
      const startedAt = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
      const completedAt = new Date(startedAt.getTime() + Math.floor(Math.random() * 1800) * 1000); // 0-30 min duration
      
      const isSuccess = Math.random() > 0.15; // 85% success rate
      const recordsProcessed = Math.floor(Math.random() * 200) + 50;
      const recordsCreated = Math.floor(recordsProcessed * 0.1);
      const recordsUpdated = Math.floor(recordsProcessed * 0.7);
      const recordsSkipped = Math.floor(recordsProcessed * 0.15);
      const errorCount = isSuccess ? 0 : Math.floor(Math.random() * 10) + 1;
      
      syncRunsList.push({
        integrationId: integration.id,
        status: isSuccess ? "success" : (errorCount < 5 ? "partial" : "error"),
        recordsProcessed: recordsProcessed,
        recordsCreated: recordsCreated,
        recordsUpdated: recordsUpdated,
        recordsSkipped: recordsSkipped,
        errorCount: errorCount,
        errorDetails: isSuccess ? null : {
          errors: Array.from({ length: errorCount }, (_, idx) => ({
            recordId: `REC-${Math.floor(Math.random() * 100000)}`,
            message: idx % 2 === 0 ? "Missing required field: email" : "Duplicate record detected",
          }))
        },
        startedAt: startedAt,
        completedAt: completedAt,
      });
    }
  }
  
  await db.insert(integrationSyncRuns).values(syncRunsList);
  console.log(`✅ Created ${syncRunsList.length} sync run records`);

  // ==================== DATA QUALITY ISSUES ====================
  console.log("⚠️  Creating data quality issues...");
  
  const qualityIssuesList: any[] = [];
  
  // Create 15-20 sample data quality issues
  const issueCount = Math.floor(Math.random() * 6) + 15;
  
  for (let i = 0; i < issueCount; i++) {
    const entityTypes = ["person", "gift", "interaction"];
    const entityType = entityTypes[Math.floor(Math.random() * entityTypes.length)];
    
    let entityId: string;
    let sourceSystem: string;
    
    if (entityType === "person") {
      const randomPerson = personsList[Math.floor(Math.random() * personsList.length)];
      entityId = randomPerson.id;
      sourceSystem = randomPerson.sourceSystem || "Salesforce";
    } else if (entityType === "gift") {
      const randomGift = giftsList[Math.floor(Math.random() * giftsList.length)];
      entityId = randomGift.personId; // Using personId as proxy
      sourceSystem = randomGift.sourceSystem || "Salesforce";
    } else {
      const randomInteraction = interactionsList[Math.floor(Math.random() * interactionsList.length)];
      entityId = randomInteraction.personId;
      sourceSystem = randomInteraction.sourceSystem || "Salesforce";
    }
    
    const issueTypes = ["missing_field", "stale_data", "duplicate", "invalid_format"];
    const issueType = issueTypes[Math.floor(Math.random() * issueTypes.length)];
    
    const severities = ["low", "medium", "high", "critical"];
    const severityWeights = [30, 40, 20, 10];
    const severity = weightedRandom(severities, severityWeights);
    
    const isResolved = Math.random() > 0.6; // 40% resolved
    
    let description: string;
    let fieldName: string | null = null;
    
    if (issueType === "missing_field") {
      const fields = ["primaryEmail", "primaryPhone", "wealthBand", "householdId"];
      fieldName = fields[Math.floor(Math.random() * fields.length)];
      description = `Required field '${fieldName}' is missing or empty`;
    } else if (issueType === "stale_data") {
      description = `Record has not been updated in over 90 days`;
      fieldName = "syncedAt";
    } else if (issueType === "duplicate") {
      description = `Potential duplicate record detected based on email/phone match`;
    } else {
      fieldName = Math.random() > 0.5 ? "primaryEmail" : "primaryPhone";
      description = `Field '${fieldName}' contains invalid format`;
    }
    
    const daysAgo = Math.floor(Math.random() * 60);
    const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    
    qualityIssuesList.push({
      entityType: entityType,
      entityId: entityId,
      sourceSystem: sourceSystem,
      issueType: issueType,
      severity: severity,
      description: description,
      fieldName: fieldName,
      resolved: isResolved ? 1 : 0,
      resolvedAt: isResolved ? new Date(createdAt.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000) : null,
      resolvedBy: isResolved ? dataOpsUser?.id || null : null,
      createdAt: createdAt,
    });
  }
  
  await db.insert(dataQualityIssues).values(qualityIssuesList);
  console.log(`✅ Created ${qualityIssuesList.length} data quality issues`);

  // ==================== PORTFOLIOS ====================
  console.log("📋 Creating portfolios...");

  const portfoliosList: any[] = [];

  // Create a portfolio for each MGO
  for (let i = 0; i < mgoUsers.length; i++) {
    const mgo = mgoUsers[i];
    
    // Each MGO gets 25-30 donors
    const portfolioSize = Math.floor(Math.random() * 6) + 25;
    const startIndex = i * 15; // Distribute donors
    
    const prospectIds: string[] = [];
    for (let j = 0; j < portfolioSize && startIndex + j < personsList.length; j++) {
      prospectIds.push(personsList[startIndex + j].id);
    }

    portfoliosList.push({
      ownerId: mgo.id,
      name: `${mgo.firstName} ${mgo.lastName}'s Portfolio`,
      prospectIds: prospectIds,
    });
  }

  await db.insert(portfolios).values(portfoliosList);
  console.log(`✅ Created ${portfoliosList.length} portfolios`);

  // ==================== TASKS ====================
  console.log("✅ Creating tasks...");

  const tasksList: any[] = [];

  // Create tasks for top 25 donors
  const topTaskDonors = [...personsList]
    .sort((a, b) => (b.engagementScore || 0) - (a.engagementScore || 0))
    .slice(0, 25);

  for (const donor of topTaskDonors) {
    // Each donor gets 1-2 tasks
    const taskCount = Math.floor(Math.random() * 2) + 1;
    const owner = mgoUsers[Math.floor(Math.random() * mgoUsers.length)];

    for (let i = 0; i < taskCount; i++) {
      const taskType = weightedRandom(
        ["call", "email", "meeting", "proposal", "follow-up"],
        [25, 30, 20, 10, 15]
      );

      const priority = weightedRandom(
        ["low", "medium", "high", "urgent"],
        [20, 40, 30, 10]
      );

      const daysOut = Math.floor(Math.random() * 30); // Next 30 days
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + daysOut);

      let title = "";
      let description = "";
      if (taskType === "call") {
        title = "Cultivation Call";
        description = `Schedule cultivation call with ${donor.firstName} ${donor.lastName}`;
      } else if (taskType === "email") {
        title = "Send Impact Report";
        description = `Send impact report to ${donor.firstName} ${donor.lastName}`;
      } else if (taskType === "meeting") {
        title = "Schedule Meeting";
        description = `Schedule in-person meeting with ${donor.firstName} ${donor.lastName}`;
      } else if (taskType === "proposal") {
        title = "Prepare Proposal";
        description = `Prepare and send proposal to ${donor.firstName} ${donor.lastName}`;
      } else if (taskType === "follow-up") {
        title = "Event Follow-up";
        description = `Follow up with ${donor.firstName} ${donor.lastName} after event`;
      }

      tasksList.push({
        personId: donor.id,
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        completed: Math.random() > 0.7 ? 1 : 0, // 30% already completed
        ownerId: owner.id,
      });
    }
  }

  const insertedTasks = await db.insert(tasks).values(tasksList).returning();
  console.log(`✅ Created ${insertedTasks.length} tasks`);

  // ==================== 19 GAME-CHANGING FEATURES ====================
  console.log("\n🚀 Creating data for 19 game-changing features...");

  // ==================== WEALTH EVENTS ====================
  console.log("💎 Creating wealth events...");
  const wealthEventsList: any[] = [];
  const topWealthDonors = personsList.filter(p => p.capacityScore && p.capacityScore >= 80).slice(0, 20);
  
  const eventTypes = ["ipo", "stock_sale", "property_sale", "inheritance", "promotion"];
  const sources = ["SEC Filings", "LinkedIn", "Property Records", "Business News", "Social Media"];
  
  for (let i = 0; i < 25; i++) {
    const donor = topWealthDonors[i % topWealthDonors.length];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const daysAgo = Math.floor(Math.random() * 90);
    const eventDate = new Date();
    eventDate.setDate(eventDate.getDate() - daysAgo);
    
    let estimatedValue = 0;
    if (eventType === "ipo") estimatedValue = Math.floor(Math.random() * 10000000) + 5000000;
    else if (eventType === "stock_sale") estimatedValue = Math.floor(Math.random() * 5000000) + 1000000;
    else if (eventType === "property_sale") estimatedValue = Math.floor(Math.random() * 3000000) + 500000;
    else if (eventType === "inheritance") estimatedValue = Math.floor(Math.random() * 2000000) + 500000;
    else estimatedValue = Math.floor(Math.random() * 500000) + 100000;
    
    wealthEventsList.push({
      personId: donor.id,
      eventType,
      eventDate,
      estimatedValue: estimatedValue.toString(),
      source,
      verified: Math.random() > 0.3 ? 1 : 0,
      alertSent: Math.random() > 0.5 ? 1 : 0,
    });
  }
  await db.insert(wealthEvents).values(wealthEventsList);
  console.log(`✅ Created ${wealthEventsList.length} wealth events`);

  // ==================== PREDICTIVE SCORES ====================
  console.log("🎯 Creating predictive scores...");
  const predictiveScoresList: any[] = [];
  
  const keyFactorsPool = [
    "Consistent giving history over 5+ years",
    "Recent engagement increase by 45%",
    "Attended 3+ events in last 6 months",
    "Life event detected: job promotion",
    "Life event detected: inheritance",
    "Wealth capacity verified via WealthEngine",
    "Strong affinity score (92/100)",
    "Close relationship with board member",
    "Increased gift size by 300% recently",
    "High engagement with email campaigns",
    "Frequently opens annual reports",
    "Donated to similar cause this quarter",
    "Net worth increase detected",
    "Stock portfolio value up 25%",
    "Recently sold property",
    "Regular monthly donor for 3+ years",
    "Responded positively to last ask",
    "Attended private donor briefing",
    "Peer influence: friends are major donors",
    "Tax planning window approaching",
  ];
  
  for (let i = 0; i < personsList.length; i++) {
    const donor = personsList[i];
    
    // Generate realistic probability (weighted toward lower scores)
    const probabilityRoll = Math.random();
    let givingProbability;
    if (probabilityRoll < 0.15) {
      givingProbability = Math.floor(Math.random() * 20) + 80; // 15% Very High (80-100)
    } else if (probabilityRoll < 0.35) {
      givingProbability = Math.floor(Math.random() * 20) + 60; // 20% High (60-80)
    } else if (probabilityRoll < 0.65) {
      givingProbability = Math.floor(Math.random() * 20) + 40; // 30% Medium (40-60)
    } else {
      givingProbability = Math.floor(Math.random() * 40) + 10; // 35% Low (10-50)
    }
    
    // Predicted amount correlates with probability
    let predictedAmount;
    if (givingProbability >= 80) {
      predictedAmount = (Math.floor(Math.random() * 75000) + 25000).toString(); // $25k-$100k
    } else if (givingProbability >= 60) {
      predictedAmount = (Math.floor(Math.random() * 40000) + 10000).toString(); // $10k-$50k
    } else if (givingProbability >= 40) {
      predictedAmount = (Math.floor(Math.random() * 15000) + 5000).toString(); // $5k-$20k
    } else {
      predictedAmount = (Math.floor(Math.random() * 4000) + 1000).toString(); // $1k-$5k
    }
    
    // Timeframe (days until predicted gift)
    const timeframeRoll = Math.random();
    let predictedTimeframe;
    if (timeframeRoll < 0.2) {
      predictedTimeframe = Math.floor(Math.random() * 30) + 1; // 20% within 30 days
    } else if (timeframeRoll < 0.4) {
      predictedTimeframe = Math.floor(Math.random() * 30) + 31; // 20% 31-60 days
    } else if (timeframeRoll < 0.65) {
      predictedTimeframe = Math.floor(Math.random() * 30) + 61; // 25% 61-90 days
    } else {
      predictedTimeframe = Math.floor(Math.random() * 90) + 91; // 35% 91-180 days
    }
    
    // Confidence level (higher probability = higher confidence)
    const baseConfidence = Math.floor(givingProbability * 0.7); // Confidence correlates with probability
    const confidence = Math.min(95, Math.max(40, baseConfidence + Math.floor(Math.random() * 20) - 10));
    
    // Select 2-4 random key factors
    const numFactors = Math.floor(Math.random() * 3) + 2;
    const shuffledFactors = [...keyFactorsPool].sort(() => Math.random() - 0.5);
    const keyFactors = shuffledFactors.slice(0, numFactors);
    
    predictiveScoresList.push({
      personId: donor.id,
      givingProbability,
      predictedAmount,
      predictedTimeframe,
      confidence,
      keyFactors,
    });
  }
  await db.insert(predictiveScores).values(predictiveScoresList);
  console.log(`✅ Created ${predictiveScoresList.length} predictive scores`);

  // ==================== MEETING BRIEFS ====================
  console.log("📋 Creating AI meeting briefs...");
  const meetingBriefsList: any[] = [];
  
  for (let i = 0; i < 30; i++) {
    const donor = personsList[Math.floor(Math.random() * personsList.length)];
    const mgo = mgoUsers[Math.floor(Math.random() * mgoUsers.length)];
    
    meetingBriefsList.push({
      personId: donor.id,
      generatedForUserId: mgo.id,
      meetingDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
      recentNews: [
        `${donor.firstName} ${donor.lastName} mentioned in industry publication`,
        "Company announced Q4 earnings beat expectations",
        "Promoted to VP of Operations"
      ].slice(0, Math.floor(Math.random() * 2) + 1),
      conversationStarters: [
        `Ask about their recent promotion at ${donor.organizationName || 'their company'}`,
        "Mention the new scholarship program in their area of interest",
        "Thank them for attending the Fall Gala"
      ].slice(0, 2),
      optimalAskAmount: (Math.floor(Math.random() * 50000) + 5000).toString(),
      askConfidence: Math.floor(Math.random() * 30) + 70,
      riskFactors: Math.random() > 0.7 ? ["Gave to competing organization last month", "Email engagement declining"] : null,
      talkingPoints: [
        "Capital campaign progress update",
        "New program impact stories",
        "Board expansion opportunity"
      ].slice(0, 2),
    });
  }
  await db.insert(meetingBriefs).values(meetingBriefsList);
  console.log(`✅ Created ${meetingBriefsList.length} meeting briefs`);

  // ==================== VOICE NOTES ====================
  console.log("🎙️  Creating voice notes...");
  const voiceNotesList: any[] = [];
  
  for (let i = 0; i < 20; i++) {
    const donor = personsList[Math.floor(Math.random() * personsList.length)];
    const mgo = mgoUsers[Math.floor(Math.random() * mgoUsers.length)];
    
    const daysAgo = Math.floor(Math.random() * 14);
    const recordedAt = new Date();
    recordedAt.setDate(recordedAt.getDate() - daysAgo);
    
    voiceNotesList.push({
      userId: mgo.id,
      personId: donor.id,
      audioUrl: `https://storage.fundrazor.org/voice-notes/${i + 1}.mp3`,
      recordedAt,
      transcription: `Had a great call with ${donor.firstName} ${donor.lastName}. They expressed interest in our new scholarship program and mentioned they might be able to contribute $25,000 this year. Need to follow up with a proposal by next week. They also asked about naming opportunities for the new building.`,
      aiSummary: `${donor.firstName} is interested in scholarship program. Potential $25K gift. Follow up with proposal and naming opportunities info.`,
      extractedActionItems: [
        "Send scholarship program proposal",
        "Share naming opportunities brochure",
        "Schedule follow-up call next week"
      ].slice(0, Math.floor(Math.random() * 2) + 1),
    });
  }
  await db.insert(voiceNotes).values(voiceNotesList);
  console.log(`✅ Created ${voiceNotesList.length} voice notes`);

  // ==================== BOARD CONNECTIONS ====================
  console.log("🤝 Creating board connections...");
  const boardConnectionsList: any[] = [];
  
  const boardMembers = personsList.filter(p => p.capacityScore && p.capacityScore >= 85).slice(0, 8);
  
  const organizations = [
    "Google", "Microsoft", "Amazon", "Salesforce", "Meta", "Apple", "Oracle", "Adobe",
    "McKinsey & Company", "Goldman Sachs", "JP Morgan", "Bain & Company",
    "Stanford University", "Harvard Business School", "MIT", "UC Berkeley",
    "Accenture", "Deloitte", "PwC", "KPMG"
  ];
  
  const positions = [
    "Senior Product Manager", "VP Engineering", "Director of Operations", "Chief Technology Officer",
    "Senior Software Engineer", "VP Sales", "Head of Marketing", "VP Product",
    "Managing Director", "Senior Consultant", "Partner", "Executive Director"
  ];
  
  for (const donor of personsList.slice(0, 50)) {
    const hasConnection = Math.random() > 0.6;
    if (hasConnection) {
      const boardMember = boardMembers[Math.floor(Math.random() * boardMembers.length)];
      const degrees = Math.random() > 0.5 ? 1 : 2;
      const org = organizations[Math.floor(Math.random() * organizations.length)];
      const position = positions[Math.floor(Math.random() * positions.length)];
      const relationshipType = degrees === 1 
        ? (Math.random() > 0.6 ? "colleague" : "classmate")
        : "friend";
      
      const isCurrent = Math.random() > 0.3;
      const yearStart = Math.floor(Math.random() * 10) + 2010; // 2010-2020
      const yearEnd = isCurrent ? null : Math.floor(Math.random() * 4) + yearStart + 1; // 1-4 years later
      
      boardConnectionsList.push({
        prospectId: donor.id,
        boardMemberId: boardMember.id,
        connectionStrength: degrees,
        relationshipType,
        organization: org,
        position,
        yearStart,
        yearEnd,
        source: "LinkedIn",
        notes: degrees === 1 
          ? `Worked together at ${org} from ${yearStart}${yearEnd ? ` to ${yearEnd}` : ' (current)'}. Direct LinkedIn connection.`
          : `Both worked at ${org}. Connected through mutual colleague.`,
        introductionRequested: Math.random() > 0.7 ? 1 : 0,
        introductionMade: Math.random() > 0.8 ? 1 : 0,
      });
    }
  }
  await db.insert(boardConnections).values(boardConnectionsList);
  console.log(`✅ Created ${boardConnectionsList.length} board connections`);

  // ==================== CORPORATE PARTNERSHIPS ====================
  console.log("🏢 Creating corporate partnerships...");
  const corporatePartnershipsList: any[] = [];
  
  const companies = [
    { name: "Google", domain: "google.com" },
    { name: "Microsoft", domain: "microsoft.com" },
    { name: "Amazon", domain: "amazon.com" },
    { name: "Salesforce", domain: "salesforce.com" },
    { name: "Meta", domain: "meta.com" },
    { name: "Apple", domain: "apple.com" },
    { name: "Oracle", domain: "oracle.com" },
    { name: "Adobe", domain: "adobe.com" },
    { name: "Cisco", domain: "cisco.com" },
    { name: "Intel", domain: "intel.com" },
    { name: "IBM", domain: "ibm.com" },
    { name: "Tesla", domain: "tesla.com" },
    { name: "Netflix", domain: "netflix.com" },
    { name: "Airbnb", domain: "airbnb.com" },
    { name: "Uber", domain: "uber.com" },
  ];
  
  for (let i = 0; i < 15; i++) {
    const company = companies[i];
    const hasMatching = Math.random() > 0.3;
    const employeeCount = Math.floor(Math.random() * 45) + 5; // 5-50 employee donors per company
    const avgGift = Math.floor(Math.random() * 3000) + 500; // $500-$3500 average gift
    const totalEmployeeGiving = (employeeCount * avgGift).toString();
    const matchingRatio = hasMatching ? ["1:1", "2:1", "1:2", "0.5:1"][Math.floor(Math.random() * 4)] : null;
    
    // Calculate matching potential
    let estimatedMatchingPotential = null;
    if (hasMatching && matchingRatio) {
      const ratioMultiplier = matchingRatio === "2:1" ? 2 : matchingRatio === "1:1" ? 1 : matchingRatio === "1:2" ? 0.5 : 0.5;
      estimatedMatchingPotential = (parseFloat(totalEmployeeGiving) * ratioMultiplier).toString();
    }
    
    // Select some employees as decision makers
    const potentialDecisionMakers = personsList.filter(p => p.organizationName && p.organizationName.includes(company.name.split(' ')[0]));
    const decisionMakers = potentialDecisionMakers.slice(0, Math.min(2, potentialDecisionMakers.length)).map(p => p.id);
    
    corporatePartnershipsList.push({
      companyName: company.name,
      domain: company.domain,
      employeeCount,
      totalEmployeeGiving,
      hasMatchingProgram: hasMatching ? 1 : 0,
      matchingRatio,
      estimatedMatchingPotential,
      decisionMakers: decisionMakers.length > 0 ? decisionMakers : null,
      foundationUrl: hasMatching ? `https://${company.name.toLowerCase().replace(/\s/g, '')}.org/foundation` : null,
      notes: hasMatching ? `Active matching gift program. ${employeeCount} employee donors contributing.` : `${employeeCount} employee donors. No formal matching program yet.`,
    });
  }
  await db.insert(corporatePartnerships).values(corporatePartnershipsList);
  console.log(`✅ Created ${corporatePartnershipsList.length} corporate partnerships`);

  // ==================== PEER DONORS ====================
  console.log("👥 Creating peer donor recommendations...");
  const peerDonorsList: any[] = [];
  
  for (let i = 0; i < 40; i++) {
    const donor = personsList[i];
    const similarDonors = personsList.filter((p, idx) => idx !== i && Math.abs((p.capacityScore || 0) - (donor.capacityScore || 0)) < 15);
    
    if (similarDonors.length > 0) {
      const similarDonor = similarDonors[Math.floor(Math.random() * Math.min(3, similarDonors.length))];
      
      peerDonorsList.push({
        personId: donor.id,
        peerPersonId: similarDonor.id,
        similarityScore: Math.floor(Math.random() * 30) + 70,
        sharedCharacteristics: [
          "Similar wealth band",
          "Both give to education",
          "Annual giving pattern",
          "Program-specific interests"
        ].slice(0, Math.floor(Math.random() * 2) + 2),
        peerGaveToPrograms: campaignsList.slice(0, Math.floor(Math.random() * 3) + 1).map(c => c.id),
        personNotYetAskedFor: campaignsList.slice(2, Math.floor(Math.random() * 2) + 3).map(c => c.id),
      });
    }
  }
  await db.insert(peerDonors).values(peerDonorsList);
  console.log(`✅ Created ${peerDonorsList.length} peer donor matches`);

  // ==================== OUTREACH TEMPLATES ====================
  console.log("✉️  Creating personalized outreach templates...");
  const outreachTemplatesList: any[] = [];
  
  for (let i = 0; i < 35; i++) {
    const donor = personsList[i];
    const templateType = ["email", "letter", "call_script"][Math.floor(Math.random() * 3)];
    const purposes = ["thank_you", "ask", "update", "event_invite"];
    const purpose = purposes[Math.floor(Math.random() * purposes.length)];
    
    const mgo = mgoUsers[Math.floor(Math.random() * mgoUsers.length)];
    
    // Generate content based on purpose
    let content = "";
    let subject = "";
    
    if (purpose === "thank_you") {
      subject = `${donor.firstName}, thank you for your incredible support`;
      content = `Dear ${donor.firstName},\n\nThank you for your generous gift of $${Math.floor(Math.random() * 50000) + 1000}. Your support is making a real difference in the lives of our students.\n\nBecause of donors like you, we were able to award 120 scholarships this year, helping first-generation college students achieve their dreams.\n\nWarm regards,\nJames Patterson\nDevelopment Director`;
    } else if (purpose === "ask") {
      subject = `${donor.firstName}, will you join us in expanding our impact?`;
      content = `Dear ${donor.firstName},\n\nYour ${donor.engagementScore && donor.engagementScore > 70 ? 'continued' : 'valued'} support has been instrumental in our success. This year, we're expanding our scholarship program to serve an additional 75 students.\n\nWould you consider a gift of $${Math.floor(Math.random() * 10000) + 5000} to help us reach this goal? Your investment will directly support students from underrepresented communities.\n\nThank you for considering this opportunity.\n\nWarm regards,\nJames Patterson`;
    } else if (purpose === "update") {
      subject = `Your 2024 Impact: ${donor.firstName}, see what you made possible`;
      content = `Dear ${donor.firstName},\n\nI wanted to share an update on the impact of your support this year. Thanks to donors like you:\n\n• 450 students received scholarships\n• 92% retention rate achieved\n• 88% graduation rate within 6 years\n\nYour generosity is changing lives. Thank you for being part of our community.\n\nBest regards,\nJames Patterson`;
    } else {
      subject = `${donor.firstName}, you're invited to our Annual Scholarship Celebration`;
      content = `Dear ${donor.firstName},\n\nWe would be honored to have you join us for our Annual Scholarship Celebration on November 15th at 6:00 PM.\n\nThis special evening will feature:\n• Student success stories\n• Program updates\n• Networking with fellow supporters\n• Recognition of our donors\n\nPlease RSVP by November 1st. We hope to see you there!\n\nWarm regards,\nJames Patterson`;
    }
    
    outreachTemplatesList.push({
      personId: donor.id,
      generatedForUserId: mgo.id,
      templateType,
      subject: templateType !== "call_script" ? subject : null,
      content,
      tone: ["warm", "professional", "enthusiastic", "grateful"][Math.floor(Math.random() * 4)],
      purpose,
      aiRationale: `Generated ${purpose.replace('_', ' ')} message for ${donor.firstName} based on giving history (${donor.engagementScore || 50}/100 engagement), wealth band ${donor.wealthBand || 'P2'}, and preferred communication style. Emphasized ${purpose === 'ask' ? 'specific program impact and clear ask amount' : purpose === 'thank_you' ? 'gratitude and specific impact metrics' : purpose === 'update' ? 'concrete outcomes and student success' : 'exclusive event and community connection'}.`,
      used: Math.random() > 0.6 ? 1 : 0,
      sentAt: Math.random() > 0.6 ? new Date() : null,
    });
  }
  await db.insert(outreachTemplates).values(outreachTemplatesList);
  console.log(`✅ Created ${outreachTemplatesList.length} outreach templates`);

  // ==================== GRANT PROPOSALS ====================
  console.log("📝 Creating grant proposals...");
  const grantProposalsList: any[] = [];
  const existingGrants = await db.select().from(grants);
  
  for (let i = 0; i < Math.min(20, existingGrants.length); i++) {
    const grant = existingGrants[i];
    const status = ["draft", "generated", "reviewed", "submitted"][Math.floor(Math.random() * 4)];
    
    grantProposalsList.push({
      grantId: grant.id,
      funderGuidelines: "Foundation seeks proposals for education programs serving underrepresented communities. Preference for programs with measurable outcomes, sustainability plans, and community partnerships. Maximum award: $100,000. Focus areas: STEM education, college access, workforce development.",
      generatedNarrative: `Our scholarship program directly addresses the foundation's priorities by providing comprehensive support to first-generation college students from underrepresented backgrounds. Over the past three years, we have served 450 students with a 92% retention rate and 88% graduation rate—significantly exceeding national averages.\n\nThe proposed expansion will enable us to serve an additional 75 students annually, with enhanced mentoring, career development workshops, and emergency financial assistance. Our partnership with local community colleges and four-year institutions ensures smooth transitions and continued support throughout the student journey.`,
      generatedBudget: {
        personnel: 45000,
        scholarships: 450000,
        mentoring: 25000,
        workshops: 15000,
        administration: 15000,
        total: 550000
      },
      generatedOutcomes: [
        "Serve 75 additional students annually",
        "Maintain 90%+ retention rate",
        "Achieve 85%+ graduation rate within 6 years",
        "100% of graduates employed or in graduate school within 6 months"
      ],
      generatedEvaluationPlan: "We will track student outcomes using a comprehensive database system, conduct quarterly surveys, and provide annual reports to the foundation. Independent evaluation will be conducted by the University Research Center.",
      status,
      reviewedBy: status !== "draft" ? mgoUsers[0].id : null,
      edits: status === "needs_revision" ? "Strengthen evaluation methodology, add more specific outcome metrics, clarify sustainability plan beyond grant period" : null,
      submittedAt: status === "submitted" ? new Date() : null,
    });
  }
  await db.insert(grantProposals).values(grantProposalsList);
  console.log(`✅ Created ${grantProposalsList.length} grant proposals`);

  // ==================== IMPACT REPORTS ====================
  console.log("❤️  Creating personalized impact reports...");
  const impactReportsList: any[] = [];
  
  for (let i = 0; i < 30; i++) {
    const donor = personsList[i];
    const totalGiving = giftsList
      .filter(g => g.personId === donor.id)
      .reduce((sum, g) => sum + parseFloat(g.amount), 0);
    
    impactReportsList.push({
      personId: donor.id,
      reportingPeriod: "2024",
      totalImpact: totalGiving.toString(),
      programsSupported: ["Scholarship Program", "Building Fund", "Annual Fund", "Emergency Relief"].slice(0, Math.floor(Math.random() * 3) + 1),
      beneficiariesHelped: Math.floor(totalGiving / 100) + 10,
      personalizedStories: {
        stories: [
          {
            name: "Maria Rodriguez",
            program: "Scholarship",
            impact: "First in family to attend college, now studying engineering"
          },
          {
            name: "James Chen",
            program: "After-School Program",
            impact: "Improved grades from C to A average, planning for college"
          }
        ]
      },
      photosUrls: ["https://images.fundrazor.org/impact/photo1.jpg", "https://images.fundrazor.org/impact/photo2.jpg"],
      customMessage: `${donor.firstName}, your generosity made it possible for ${Math.floor(totalGiving / 100) + 10} students to access life-changing educational opportunities this year. Thank you for believing in our mission!`,
      videoUrl: Math.random() > 0.7 ? "https://videos.fundrazor.org/2024-impact.mp4" : null,
      sentAt: Math.random() > 0.5 ? new Date() : null,
      opened: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : 0,
    });
  }
  await db.insert(impactReports).values(impactReportsList);
  console.log(`✅ Created ${impactReportsList.length} impact reports`);

  // ==================== SENTIMENT ANALYSIS ====================
  console.log("😊 Creating sentiment analysis...");
  const sentimentAnalysisList: any[] = [];
  
  for (let i = 0; i < 35; i++) {
    const donor = personsList[i];
    const sentimentScore = Math.floor(Math.random() * 60) + 40;
    const trend = sentimentScore > 70 ? "increasing" : sentimentScore < 50 ? "declining" : "stable";
    const riskLevel = sentimentScore > 70 ? "low" : sentimentScore > 50 ? "medium" : "high";
    
    sentimentAnalysisList.push({
      personId: donor.id,
      analysisDate: new Date(),
      emailResponseTime: (Math.random() * 48 + 2).toFixed(2),
      engagementTrend: trend,
      sentimentScore,
      riskLevel,
      keySignals: trend === "declining" 
        ? ["Email open rate decreased 40%", "No event attendance in 6 months", "Decreased gift amount"]
        : trend === "increasing"
        ? ["Responded to 4/5 recent emails", "Attended 2 events this quarter", "Increased gift amount"]
        : ["Consistent engagement pattern", "Responds to major appeals"],
      recommendedAction: riskLevel === "high"
        ? "Schedule personal call within 2 weeks to address concerns and re-engage"
        : riskLevel === "medium"
        ? "Send personalized impact story and invitation to upcoming event"
        : "Continue current cultivation strategy, consider upgrade ask",
      alertGenerated: riskLevel === "high" ? 1 : 0,
    });
  }
  await db.insert(sentimentAnalysis).values(sentimentAnalysisList);
  console.log(`✅ Created ${sentimentAnalysisList.length} sentiment analyses`);

  // ==================== PEER BENCHMARKS ====================
  console.log("📊 Creating peer benchmarks...");
  const peerBenchmarksList: any[] = [];
  
  const benchmarkMetrics = [
    { name: "Average Gift Size", ourValue: 1842, peerAvg: 1650, peerMedian: 1580, peerTop25: 2100 },
    { name: "Donor Retention Rate", ourValue: 68, peerAvg: 62, peerMedian: 60, peerTop25: 75 },
    { name: "Major Gifts ($10K+) Count", ourValue: 42, peerAvg: 35, peerMedian: 32, peerTop25: 55 },
    { name: "Monthly Recurring Donors", ourValue: 234, peerAvg: 210, peerMedian: 195, peerTop25: 280 },
    { name: "Event Attendance Rate", ourValue: 45, peerAvg: 52, peerMedian: 50, peerTop25: 65 },
    { name: "Email Open Rate (%)", ourValue: 28, peerAvg: 25, peerMedian: 24, peerTop25: 32 },
    { name: "Planned Giving Inquiries", ourValue: 12, peerAvg: 15, peerMedian: 14, peerTop25: 22 },
    { name: "Grant Success Rate (%)", ourValue: 42, peerAvg: 38, peerMedian: 36, peerTop25: 55 },
  ];
  
  for (const metric of benchmarkMetrics) {
    const percentile = ((metric.ourValue - metric.peerMedian) / (metric.peerTop25 - metric.peerMedian)) * 50 + 50;
    const trend = Math.random() > 0.4 ? "improving" : Math.random() > 0.5 ? "stable" : "declining";
    
    peerBenchmarksList.push({
      metricName: metric.name,
      ourValue: metric.ourValue.toString(),
      peerAverage: metric.peerAvg.toString(),
      peerMedian: metric.peerMedian.toString(),
      peerTop25: metric.peerTop25.toString(),
      percentileRank: Math.max(10, Math.min(95, Math.round(percentile))),
      trend,
      aiRecommendation: percentile < 50
        ? `You're below the peer median. Consider implementing best practices from top-performing organizations in this area.`
        : percentile > 75
        ? `Strong performance! You're in the top quartile. Share your strategies with peer organizations.`
        : `Solid performance. Small improvements could move you into top quartile.`,
    });
  }
  await db.insert(peerBenchmarks).values(peerBenchmarksList);
  console.log(`✅ Created ${peerBenchmarksList.length} peer benchmarks`);

  // ==================== PORTFOLIO OPTIMIZATIONS ====================
  console.log("🎯 Creating portfolio optimizations...");
  const portfolioOptimizationsList: any[] = [];
  
  for (let i = 0; i < 20; i++) {
    const runDate = new Date();
    runDate.setDate(runDate.getDate() - Math.floor(Math.random() * 30));
    
    // Generate optimization recommendations
    const numRecommendations = Math.floor(Math.random() * 8) + 5; // 5-12 recommendations
    const recommendations = [];
    
    for (let j = 0; j < numRecommendations; j++) {
      const donor = personsList[Math.floor(Math.random() * personsList.length)];
      const currentMGO = mgoUsers[j % mgoUsers.length];
      const recommendedMGO = mgoUsers[(j + 1) % mgoUsers.length];
      
      recommendations.push({
        donorId: donor.id,
        donorName: `${donor.firstName} ${donor.lastName}`,
        currentMGO: currentMGO.id,
        currentMGOName: `${currentMGO.firstName} ${currentMGO.lastName}`,
        recommendedMGO: recommendedMGO.id,
        recommendedMGOName: `${recommendedMGO.firstName} ${recommendedMGO.lastName}`,
        score: Math.floor(Math.random() * 40) + 60,
        reasoning: [
          `${recommendedMGO.firstName} has stronger track record with donors in ${donor.organizationName ? 'corporate sector' : 'this wealth band'}`,
          "Geographic proximity: Lives in same region",
          "Workload balance: Would improve capacity utilization by 15%",
          "Shared professional background increases rapport potential"
        ].slice(0, Math.floor(Math.random() * 2) + 2),
        estimatedImpact: Math.floor(Math.random() * 50000) + 10000,
      });
    }
    
    portfolioOptimizationsList.push({
      runDate,
      recommendations,
      projectedImpact: recommendations.reduce((sum, r) => sum + r.estimatedImpact, 0).toString(),
      optimizationCriteria: [
        "Geographic proximity",
        "Donor capacity alignment", 
        "MGO workload balance",
        "Historical performance with similar donors",
        "Relationship strength"
      ],
      implemented: Math.random() > 0.6 ? 1 : 0,
      actualImpact: Math.random() > 0.6 ? (Math.floor(Math.random() * 200000) + 50000).toString() : null,
    });
  }
  await db.insert(portfolioOptimizations).values(portfolioOptimizationsList);
  console.log(`✅ Created ${portfolioOptimizationsList.length} portfolio optimizations`);

  // ==================== CALENDAR EVENTS ====================
  console.log("📅 Creating smart calendar events...");
  const calendarEventsList: any[] = [];
  
  for (let i = 0; i < 40; i++) {
    const donor = personsList[Math.floor(Math.random() * personsList.length)];
    const mgo = mgoUsers[Math.floor(Math.random() * mgoUsers.length)];
    const daysOut = Math.floor(Math.random() * 60) - 10;
    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + daysOut);
    
    const eventTypes = ["donor_meeting", "cultivation_lunch", "site_visit", "proposal_presentation", "stewardship_call"];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    calendarEventsList.push({
      userId: mgo.id,
      personId: donor.id,
      eventType,
      scheduledAt: scheduledDate,
      duration: eventType === "donor_meeting" ? 60 : eventType === "cultivation_lunch" ? 90 : eventType === "site_visit" ? 120 : 45,
      aiSuggestedTime: Math.random() > 0.5 ? new Date(scheduledDate.getTime() + 24 * 60 * 60 * 1000) : null,
      priority: Math.floor(Math.random() * 60) + 40,
      estimatedImpact: (Math.floor(Math.random() * 100000) + 5000).toString(),
      completed: daysOut < 0 ? 1 : 0,
      outcome: daysOut < 0 && Math.random() > 0.5 
        ? `Great meeting! ${donor.firstName} expressed interest in $${Math.floor(Math.random() * 50000) + 10000} gift. Follow-up proposal needed.`
        : null,
    });
  }
  await db.insert(calendarEvents).values(calendarEventsList);
  console.log(`✅ Created ${calendarEventsList.length} calendar events`);

  // ==================== STEWARDSHIP WORKFLOWS ====================
  console.log("✨ Creating stewardship workflows...");
  const stewardshipWorkflowsList: any[] = [];
  
  const majorGifts = insertedGifts.filter(g => g && g.id && parseFloat(g.amount) >= 10000).slice(0, 25);
  
  for (const gift of majorGifts) {
    if (!gift || !gift.id) continue; // Safety check
    
    const steps = [
      { day: 1, type: "thank_you_call", status: "completed" },
      { day: 3, type: "thank_you_letter", status: "completed" },
      { day: 14, type: "impact_update", status: "completed" },
      { day: 90, type: "quarterly_report", status: "pending" },
      { day: 180, type: "event_invitation", status: "pending" },
      { day: 365, type: "renewal_ask", status: "pending" }
    ];
    
    const currentStep = Math.floor(Math.random() * steps.length);
    const completedSteps = Math.min(currentStep, steps.length - 1);
    
    stewardshipWorkflowsList.push({
      giftId: gift.id,
      personId: gift.personId,
      workflowName: parseFloat(gift.amount) >= 25000 ? "Major Gift Stewardship" : "Leadership Donor Stewardship",
      steps: JSON.stringify(steps),
      currentStep,
      completedSteps,
      nextActionDate: new Date(Date.now() + (steps[currentStep]?.day || 7) * 24 * 60 * 60 * 1000),
      nextActionType: steps[currentStep]?.type || "follow_up",
      paused: Math.random() > 0.9 ? 1 : 0,
      pausedReason: Math.random() > 0.9 ? "Donor requested pause on communications" : null,
      completedAt: completedSteps === steps.length ? new Date() : null,
    });
  }
  if (stewardshipWorkflowsList.length > 0) {
    await db.insert(stewardshipWorkflows).values(stewardshipWorkflowsList);
  }
  console.log(`✅ Created ${stewardshipWorkflowsList.length} stewardship workflows`);

  // ==================== TASK PRIORITY SCORES ====================
  console.log("⚡ Creating task priority scores...");
  const taskPriorityScoresList: any[] = [];
  
  for (const task of insertedTasks) {
    if (!task || !task.id) continue; // Safety check
    
    const urgencyScore = task.priority === "urgent" ? 95 : task.priority === "high" ? 75 : task.priority === "medium" ? 50 : 30;
    const impactScore = Math.floor(Math.random() * 40) + 50;
    const effortScore = Math.floor(Math.random() * 30) + 20;
    const finalPriority = Math.round((urgencyScore * 0.4 + impactScore * 0.4 + (100 - effortScore) * 0.2));
    
    taskPriorityScoresList.push({
      taskId: task.id,
      estimatedRevenue: (Math.floor(Math.random() * 50000) + 5000).toString(),
      urgencyScore,
      impactScore,
      effortScore,
      finalPriority,
      reasoning: `High ${urgencyScore > 80 ? 'urgency' : 'impact'} task with ${effortScore < 40 ? 'low' : 'moderate'} effort required. Donor has ${impactScore > 70 ? 'strong' : 'moderate'} capacity and engagement. Recommended to prioritize ${finalPriority > 75 ? 'immediately' : 'within this week'}.`,
    });
  }
  if (taskPriorityScoresList.length > 0) {
    await db.insert(taskPriorityScores).values(taskPriorityScoresList);
  }
  console.log(`✅ Created ${taskPriorityScoresList.length} task priority scores`);

  // ==================== GIFT REGISTRIES ====================
  console.log("🎁 Creating gift registries...");
  const giftRegistriesList: any[] = [];
  
  for (let i = 0; i < 20; i++) {
    const donor = personsList[Math.floor(Math.random() * personsList.length)];
    const occasionTypes = ["wedding", "birthday", "anniversary", "graduation", "baby_shower"];
    const occasionType = occasionTypes[Math.floor(Math.random() * occasionTypes.length)];
    const daysOut = Math.floor(Math.random() * 180) - 30;
    const occasionDate = new Date();
    occasionDate.setDate(occasionDate.getDate() + daysOut);
    
    const goalAmount = Math.floor(Math.random() * 15000) + 2000;
    const amountRaised = daysOut < 0 ? goalAmount * (0.6 + Math.random() * 0.4) : goalAmount * Math.random() * 0.8;
    
    giftRegistriesList.push({
      personId: donor.id,
      occasionType,
      occasionDate,
      goalAmount: goalAmount.toString(),
      amountRaised: Math.round(amountRaised).toString(),
      campaignId: campaignsList[0].id,
      personalMessage: occasionType === "wedding"
        ? `In lieu of traditional wedding gifts, we're asking friends and family to support our favorite cause: education for underprivileged youth.`
        : occasionType === "birthday"
        ? `For my birthday this year, I'm asking for donations to help fund scholarships instead of presents!`
        : `Help us celebrate by supporting a cause close to our hearts.`,
      publicUrl: `https://give.fundrazor.org/registry/${donor.id}-${occasionType}-${i}`,
      active: daysOut > -30 ? 1 : 0,
      closedAt: daysOut < -30 ? new Date() : null,
    });
  }
  await db.insert(giftRegistries).values(giftRegistriesList);
  console.log(`✅ Created ${giftRegistriesList.length} gift registries`);

  // ==================== BOARD NETWORK MEMBERSHIPS ====================
  console.log("🔗 Creating board network memberships...");
  const boardMembershipsList: any[] = [
    // Person 1: Sarah Chen - Super connector across 4 orgs
    { personName: "Sarah Chen", personEmail: "sarah.chen@email.com", orgName: "Hope Foundation", role: "Chair", startYear: 2019, endYear: null },
    { personName: "Sarah Chen", personEmail: "sarah.chen@email.com", orgName: "TechReach Initiative", role: "Director", startYear: 2020, endYear: null },
    { personName: "Sarah Chen", personEmail: "sarah.chen@email.com", orgName: "Green Earth Coalition", role: "Director", startYear: 2021, endYear: null },
    { personName: "Sarah Chen", personEmail: "sarah.chen@email.com", orgName: "Arts For All", role: "Treasurer", startYear: 2022, endYear: null },
    
    // Person 2: Michael Rodriguez - on 3 org boards
    { personName: "Michael Rodriguez", personEmail: "m.rodriguez@email.com", orgName: "Hope Foundation", role: "Director", startYear: 2020, endYear: null },
    { personName: "Michael Rodriguez", personEmail: "m.rodriguez@email.com", orgName: "Water Now", role: "Vice Chair", startYear: 2018, endYear: null },
    { personName: "Michael Rodriguez", personEmail: "m.rodriguez@email.com", orgName: "Community Health Network", role: "Director", startYear: 2021, endYear: null },
    
    // Person 3: Jennifer Park - Education focused, 3 orgs
    { personName: "Jennifer Park", orgName: "Education First Alliance", role: "Chair", startYear: 2017, endYear: null },
    { personName: "Jennifer Park", orgName: "Youth Leadership Institute", role: "Director", startYear: 2019, endYear: null },
    { personName: "Jennifer Park", orgName: "TechReach Initiative", role: "Secretary", startYear: 2020, endYear: null },
    
    // Person 4: David Thompson - connector between tech and environment
    { personName: "David Thompson", personEmail: "d.thompson@email.com", orgName: "TechReach Initiative", role: "Director", startYear: 2019, endYear: null },
    { personName: "David Thompson", personEmail: "d.thompson@email.com", orgName: "Green Earth Coalition", role: "Chair", startYear: 2020, endYear: null },
    { personName: "David Thompson", personEmail: "d.thompson@email.com", orgName: "Clean Water Alliance", role: "Director", startYear: 2022, endYear: null },
    
    // Person 5: Lisa Martinez - Healthcare + Education
    { personName: "Lisa Martinez", orgName: "Community Health Network", role: "Chair", startYear: 2018, endYear: null },
    { personName: "Lisa Martinez", orgName: "Education First Alliance", role: "Treasurer", startYear: 2020, endYear: null },
    { personName: "Lisa Martinez", orgName: "Youth Leadership Institute", role: "Director", startYear: 2021, endYear: null },
    
    // Person 6: James Wilson - Arts + Community
    { personName: "James Wilson", personEmail: "james.w@email.com", orgName: "Arts For All", role: "Director", startYear: 2019, endYear: null },
    { personName: "James Wilson", personEmail: "james.w@email.com", orgName: "Downtown Community Center", role: "Vice Chair", startYear: 2020, endYear: null },
    
    // Person 7: Amanda Foster - Environment focused
    { personName: "Amanda Foster", orgName: "Green Earth Coalition", role: "Director", startYear: 2019, endYear: null },
    { personName: "Amanda Foster", orgName: "Clean Water Alliance", role: "Chair", startYear: 2021, endYear: null },
    { personName: "Amanda Foster", orgName: "Water Now", role: "Director", startYear: 2022, endYear: null },
    
    // Person 8: Robert Lee - Past chair now advisor
    { personName: "Robert Lee", orgName: "Hope Foundation", role: "Director", startYear: 2015, endYear: 2023 },
    { personName: "Robert Lee", orgName: "Community Health Network", role: "Director", startYear: 2018, endYear: null },
    
    // Person 9: Maria Gonzalez - Youth + Education
    { personName: "Maria Gonzalez", personEmail: "maria.g@email.com", orgName: "Youth Leadership Institute", role: "Chair", startYear: 2020, endYear: null },
    { personName: "Maria Gonzalez", personEmail: "maria.g@email.com", orgName: "Education First Alliance", role: "Director", startYear: 2021, endYear: null },
    
    // Person 10: Kevin Patel - Tech + Social Impact
    { personName: "Kevin Patel", orgName: "TechReach Initiative", role: "Chair", startYear: 2021, endYear: null },
    { personName: "Kevin Patel", orgName: "Social Innovation Hub", role: "Founder & Director", startYear: 2019, endYear: null },
    
    // Additional members for overlap
    { personName: "Rachel Kim", orgName: "Arts For All", role: "Director", startYear: 2020, endYear: null },
    { personName: "Rachel Kim", orgName: "Downtown Community Center", role: "Director", startYear: 2021, endYear: null },
    
    { personName: "Daniel Nguyen", orgName: "Water Now", role: "Treasurer", startYear: 2020, endYear: null },
    { personName: "Daniel Nguyen", orgName: "Clean Water Alliance", role: "Secretary", startYear: 2021, endYear: null },
    
    { personName: "Emily Brooks", orgName: "Hope Foundation", role: "Secretary", startYear: 2021, endYear: null },
    { personName: "Emily Brooks", orgName: "Downtown Community Center", role: "Chair", startYear: 2022, endYear: null },
    
    { personName: "Christopher Davis", orgName: "Education First Alliance", role: "Director", startYear: 2019, endYear: null },
    { personName: "Christopher Davis", orgName: "Social Innovation Hub", role: "Director", startYear: 2020, endYear: null },
    
    { personName: "Ashley Johnson", orgName: "Community Health Network", role: "Director", startYear: 2021, endYear: null },
    { personName: "Ashley Johnson", orgName: "Youth Leadership Institute", role: "Treasurer", startYear: 2022, endYear: null },
    
    // Single-org board members (realistic mix)
    { personName: "Brian Taylor", orgName: "Green Earth Coalition", role: "Treasurer", startYear: 2020, endYear: null },
    { personName: "Nicole Anderson", orgName: "Clean Water Alliance", role: "Director", startYear: 2021, endYear: null },
    { personName: "Steven White", orgName: "Social Innovation Hub", role: "Secretary", startYear: 2021, endYear: null },
    { personName: "Karen Moore", orgName: "Downtown Community Center", role: "Treasurer", startYear: 2019, endYear: null },
  ];

  await db.insert(boardMemberships).values(boardMembershipsList);
  console.log(`✅ Created ${boardMembershipsList.length} board memberships across 12 organizations`);

  console.log("\n🎉 All 20 game-changing features seeded successfully!");

  // ==================== SUMMARY ====================
  console.log("\n🎉 Database seeding completed successfully!");
  console.log("=" .repeat(50));
  console.log(`👥 Users: ${usersList.length}`);
  console.log(`🏠 Households: ${householdsList.length}`);
  console.log(`🎯 Donors: ${personsList.length}`);
  console.log(`💰 Gifts: ${giftsList.length}`);
  console.log(`📢 Campaigns: ${campaignsList.length}`);
  console.log(`🎯 Opportunities: ${opportunitiesList.length}`);
  console.log(`💬 Interactions: ${interactionsList.length}`);
  console.log(`📋 Portfolios: ${portfoliosList.length}`);
  console.log(`✅ Tasks: ${tasksList.length}`);
  console.log("=" .repeat(50));
  console.log("\n📊 Special Segments:");
  console.log(`   LYBUNT Donors (gave 2024, not 2025): 10`);
  console.log(`   SYBUNT Donors (gave 2022-2023, not recently): 8`);
  console.log("\n✨ Your FundRazor database is now populated with realistic data!");
}

seed()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });

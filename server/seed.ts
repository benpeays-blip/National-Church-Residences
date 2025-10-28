import { db } from "./db";
import {
  users,
  households,
  persons,
  gifts,
  opportunities,
  interactions,
  campaigns,
  portfolios,
  tasks,
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
  await db.delete(tasks);
  await db.delete(portfolios);
  await db.delete(interactions);
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
      donorData.map((d) => ({
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
      }))
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
        paymentMethod: weightedRandom(paymentMethods, paymentWeights),
      });
    }
  }

  // Create gifts for all persons
  for (let i = 0; i < personsList.length; i++) {
    await createGiftsForPerson(personsList[i], i);
  }

  await db.insert(gifts).values(giftsList);
  console.log(`✅ Created ${giftsList.length} gifts`);

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

      opportunitiesList.push({
        personId: donor.id,
        stage: stage,
        askAmount: askAmount.toFixed(2),
        probability: probability,
        closeDate: closeDate,
        notes: `Major gift opportunity for ${donor.organizationName || "individual donor"} - ${donor.firstName} ${donor.lastName}`,
        ownerId: owner.id,
      });
    }
  }

  await db.insert(opportunities).values(opportunitiesList);
  console.log(`✅ Created ${opportunitiesList.length} opportunities`);

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

      interactionsList.push({
        personId: donor.id,
        type: type,
        notes: description,
        occurredAt: interactionDate,
        ownerId: owner.id,
      });
    }
  }

  await db.insert(interactions).values(interactionsList);
  console.log(`✅ Created ${interactionsList.length} interactions`);

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

  await db.insert(tasks).values(tasksList);
  console.log(`✅ Created ${tasksList.length} tasks`);

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

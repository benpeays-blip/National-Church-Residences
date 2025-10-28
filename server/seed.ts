import { db } from "./db";
import { persons, gifts, opportunities, tasks, campaigns } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  const campaign = await db
    .insert(campaigns)
    .values({
      name: "Annual Fund 2024",
      type: "Annual",
      goal: "500000",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
    })
    .returning();

  const samplePersons = [
    {
      firstName: "Sarah",
      lastName: "Johnson",
      primaryEmail: "sarah.johnson@example.com",
      primaryPhone: "(555) 123-4567",
      organizationName: "Johnson Family Foundation",
      wealthBand: "P4",
      capacityScore: 95,
      engagementScore: 88,
      affinityScore: 92,
      lastGiftDate: new Date("2024-06-15"),
      lastGiftAmount: "50000",
      totalLifetimeGiving: "250000",
    },
    {
      firstName: "Michael",
      lastName: "Chen",
      primaryEmail: "mchen@techcorp.com",
      primaryPhone: "(555) 234-5678",
      organizationName: "TechCorp Industries",
      wealthBand: "P3",
      capacityScore: 78,
      engagementScore: 65,
      affinityScore: 71,
      lastGiftDate: new Date("2024-03-20"),
      lastGiftAmount: "15000",
      totalLifetimeGiving: "75000",
    },
    {
      firstName: "Jennifer",
      lastName: "Williams",
      primaryEmail: "jwilliams@email.com",
      primaryPhone: "(555) 345-6789",
      wealthBand: "P2",
      capacityScore: 55,
      engagementScore: 82,
      affinityScore: 68,
      lastGiftDate: new Date("2024-08-10"),
      lastGiftAmount: "5000",
      totalLifetimeGiving: "25000",
    },
    {
      firstName: "Robert",
      lastName: "Davis",
      primaryEmail: "rdavis@gmail.com",
      primaryPhone: "(555) 456-7890",
      wealthBand: "P5",
      capacityScore: 100,
      engagementScore: 45,
      affinityScore: 72,
      lastGiftDate: new Date("2023-12-15"),
      lastGiftAmount: "100000",
      totalLifetimeGiving: "500000",
    },
    {
      firstName: "Emily",
      lastName: "Martinez",
      primaryEmail: "emily.m@startup.io",
      primaryPhone: "(555) 567-8901",
      organizationName: "StartupXYZ",
      wealthBand: "P2",
      capacityScore: 48,
      engagementScore: 91,
      affinityScore: 69,
      lastGiftDate: new Date("2024-09-01"),
      lastGiftAmount: "2500",
      totalLifetimeGiving: "12500",
    },
  ];

  const createdPersons = await db.insert(persons).values(samplePersons).returning();

  console.log(`Created ${createdPersons.length} sample persons`);

  for (const person of createdPersons) {
    const giftCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < giftCount; i++) {
      const amount = parseFloat(person.lastGiftAmount || "1000");
      const randomAmount = (amount * (0.5 + Math.random())).toFixed(2);
      const daysAgo = Math.floor(Math.random() * 365);
      
      await db.insert(gifts).values({
        personId: person.id,
        amount: randomAmount,
        currency: "USD",
        receivedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
        campaignId: campaign[0].id,
        designation: "General Fund",
        paymentMethod: "Credit Card",
      });
    }
  }

  console.log("Created sample gifts");

  console.log("Database seeding completed!");
}

seed()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });

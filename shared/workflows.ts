// Workflow Block Taxonomy & Catalog
// Defines all available block types and subtypes for the visual workflow builder

export type BlockCategory = "system" | "human" | "data" | "action" | "organization" | "logic" | "annotation";

export interface BlockDefinition {
  type: BlockCategory;
  subtype: string;
  displayName: string;
  description: string;
  category: string; // Group name for palette organization
  defaultWidth?: number;
  defaultHeight?: number;
  colorToken?: string;
}

// A. Systems & Software Blocks
export const systemBlocks: BlockDefinition[] = [
  // CRM Systems
  { type: "system", subtype: "salesforce", displayName: "Salesforce NPSP", description: "CRM platform for nonprofits", category: "CRM Systems", colorToken: "blue" },
  { type: "system", subtype: "blackbaud", displayName: "Blackbaud RE NXT", description: "Fundraising & donor management", category: "CRM Systems", colorToken: "blue" },
  { type: "system", subtype: "virtuous", displayName: "Virtuous", description: "Responsive fundraising CRM", category: "CRM Systems", colorToken: "blue" },
  { type: "system", subtype: "neon", displayName: "Neon CRM", description: "All-in-one nonprofit software", category: "CRM Systems", colorToken: "blue" },
  { type: "system", subtype: "bloomerang", displayName: "Bloomerang", description: "Donor management system", category: "CRM Systems", colorToken: "blue" },
  { type: "system", subtype: "hubspot", displayName: "HubSpot", description: "Marketing & CRM platform", category: "CRM Systems", colorToken: "blue" },
  
  // Wealth & Research
  { type: "system", subtype: "wealthengine", displayName: "WealthEngine", description: "Wealth screening & analytics", category: "Wealth & Research", colorToken: "purple" },
  { type: "system", subtype: "iwave", displayName: "iWave", description: "Prospect research platform", category: "Wealth & Research", colorToken: "purple" },
  { type: "system", subtype: "donorsearch", displayName: "DonorSearch", description: "Philanthropy screening", category: "Wealth & Research", colorToken: "purple" },
  { type: "system", subtype: "windfall", displayName: "Windfall", description: "AI-powered net worth data", category: "Wealth & Research", colorToken: "purple" },
  
  // Email & Marketing
  { type: "system", subtype: "mailchimp", displayName: "Mailchimp", description: "Email marketing platform", category: "Email & Marketing", colorToken: "orange" },
  { type: "system", subtype: "activecampaign", displayName: "ActiveCampaign", description: "Marketing automation", category: "Email & Marketing", colorToken: "orange" },
  { type: "system", subtype: "constantcontact", displayName: "Constant Contact", description: "Email & online marketing", category: "Email & Marketing", colorToken: "orange" },
  
  // Donation Platforms
  { type: "system", subtype: "classy", displayName: "Classy", description: "Online fundraising platform", category: "Donation Platforms", colorToken: "green" },
  { type: "system", subtype: "funraise", displayName: "Funraise", description: "Digital fundraising platform", category: "Donation Platforms", colorToken: "green" },
  { type: "system", subtype: "givebutter", displayName: "GiveButter", description: "Free fundraising platform", category: "Donation Platforms", colorToken: "green" },
  { type: "system", subtype: "stripe", displayName: "Stripe", description: "Payment processing", category: "Donation Platforms", colorToken: "green" },
  
  // Grant Management
  { type: "system", subtype: "foundant", displayName: "Foundant", description: "Grant management software", category: "Grant Management", colorToken: "teal" },
  { type: "system", subtype: "fluxx", displayName: "Fluxx", description: "Grantmaking platform", category: "Grant Management", colorToken: "teal" },
  { type: "system", subtype: "instrumentl", displayName: "Instrumentl", description: "Grant discovery & tracking", category: "Grant Management", colorToken: "teal" },
  
  // Event Platforms
  { type: "system", subtype: "givesmart", displayName: "GiveSmart", description: "Event & auction platform", category: "Event Platforms", colorToken: "pink" },
  { type: "system", subtype: "eventbrite", displayName: "Eventbrite", description: "Event management & ticketing", category: "Event Platforms", colorToken: "pink" },
  { type: "system", subtype: "onecause", displayName: "OneCause", description: "Fundraising event software", category: "Event Platforms", colorToken: "pink" },
  
  // Analytics & BI
  { type: "system", subtype: "powerbi", displayName: "Power BI", description: "Business intelligence", category: "Analytics & BI", colorToken: "yellow" },
  { type: "system", subtype: "tableau", displayName: "Tableau", description: "Data visualization", category: "Analytics & BI", colorToken: "yellow" },
  { type: "system", subtype: "looker", displayName: "Looker", description: "Data analytics platform", category: "Analytics & BI", colorToken: "yellow" },
  
  // Accounting & Finance
  { type: "system", subtype: "quickbooks", displayName: "QuickBooks", description: "Accounting software", category: "Accounting & Finance", colorToken: "indigo" },
  { type: "system", subtype: "intacct", displayName: "Sage Intacct", description: "Financial management", category: "Accounting & Finance", colorToken: "indigo" },
  { type: "system", subtype: "netsuite", displayName: "NetSuite", description: "ERP & accounting", category: "Accounting & Finance", colorToken: "indigo" },
  
  // Communication Tools
  { type: "system", subtype: "twilio", displayName: "Twilio", description: "SMS & communications API", category: "Communication", colorToken: "red" },
  { type: "system", subtype: "zoom", displayName: "Zoom", description: "Video conferencing", category: "Communication", colorToken: "red" },
  { type: "system", subtype: "calendly", displayName: "Calendly", description: "Scheduling automation", category: "Communication", colorToken: "red" },
  { type: "system", subtype: "slack", displayName: "Slack", description: "Team messaging", category: "Communication", colorToken: "red" },
  
  // AI & Agents
  { type: "system", subtype: "fundrazor-ai", displayName: "FundRazor AI", description: "AI-powered fundraising intelligence", category: "AI & Automation", colorToken: "purple" },
  { type: "system", subtype: "chatgpt", displayName: "ChatGPT", description: "AI assistant", category: "AI & Automation", colorToken: "purple" },
];

// B. Human / Role Blocks
export const humanBlocks: BlockDefinition[] = [
  { type: "human", subtype: "mgo", displayName: "Major Gift Officer", description: "Portfolio management, visits", category: "Fundraising Roles" },
  { type: "human", subtype: "dev_director", displayName: "Development Director", description: "Oversight, forecasting", category: "Leadership" },
  { type: "human", subtype: "grant_writer", displayName: "Grant Writer", description: "LOIs, proposals, reports", category: "Fundraising Roles" },
  { type: "human", subtype: "digital_manager", displayName: "Digital Fundraising Manager", description: "Campaigns, social, email", category: "Fundraising Roles" },
  { type: "human", subtype: "db_admin", displayName: "Database Administrator", description: "Data quality, dedupe", category: "Operations" },
  { type: "human", subtype: "finance_officer", displayName: "Finance Officer", description: "Reconciliation", category: "Finance" },
  { type: "human", subtype: "ceo", displayName: "Executive Director / CEO", description: "Strategic review", category: "Leadership" },
  { type: "human", subtype: "board_member", displayName: "Board Member", description: "Approvals, asks", category: "Governance" },
  { type: "human", subtype: "volunteer", displayName: "Volunteer / Advocate", description: "Peer-to-peer fundraising", category: "Community" },
  { type: "human", subtype: "consultant", displayName: "Consultant / Agency", description: "Audits, training", category: "External" },
  { type: "human", subtype: "ai_agent", displayName: "AI Agent", description: "Prediction, drafting, automation", category: "AI & Automation" },
];

// C. Data / Object Blocks
export const dataBlocks: BlockDefinition[] = [
  { type: "data", subtype: "person", displayName: "Person / Constituent", description: "Donor or prospect record", category: "Core Data" },
  { type: "data", subtype: "gift", displayName: "Gift / Transaction", description: "Donation record", category: "Core Data" },
  { type: "data", subtype: "opportunity", displayName: "Opportunity / Ask", description: "Pipeline prospect", category: "Core Data" },
  { type: "data", subtype: "grant", displayName: "Grant Record", description: "Foundation grant", category: "Core Data" },
  { type: "data", subtype: "campaign", displayName: "Campaign", description: "Fundraising campaign", category: "Core Data" },
  { type: "data", subtype: "event", displayName: "Event", description: "Fundraising event", category: "Core Data" },
  { type: "data", subtype: "interaction", displayName: "Interaction", description: "Touchpoint log (call, email, meeting)", category: "Activities" },
  { type: "data", subtype: "task", displayName: "Task", description: "Action item", category: "Activities" },
  { type: "data", subtype: "report", displayName: "Report / Dashboard", description: "Analytics output", category: "Outputs" },
  { type: "data", subtype: "document", displayName: "Document", description: "Proposal, letter, budget", category: "Outputs" },
  { type: "data", subtype: "dataset", displayName: "Dataset / Export", description: "CSV, API payload", category: "Outputs" },
  { type: "data", subtype: "ai_output", displayName: "AI Output", description: "Summary, insight, recommendation", category: "AI & Automation" },
];

// D. Action / Process Blocks
export const actionBlocks: BlockDefinition[] = [
  { type: "action", subtype: "import", displayName: "Data Entry / Import", description: "Upload CSV → System", category: "Data Operations" },
  { type: "action", subtype: "sync", displayName: "Sync / Integration", description: "Auto-push between systems", category: "Data Operations" },
  { type: "action", subtype: "segment", displayName: "Segmentation", description: "Filter by criteria", category: "Data Operations" },
  { type: "action", subtype: "email", displayName: "Send Email", description: "Email communication", category: "Communications" },
  { type: "action", subtype: "call", displayName: "Phone Call", description: "Phone outreach", category: "Communications" },
  { type: "action", subtype: "sms", displayName: "Send SMS", description: "Text message", category: "Communications" },
  { type: "action", subtype: "meeting", displayName: "Meeting / Event", description: "Schedule → Log outcome", category: "Engagement" },
  { type: "action", subtype: "approval", displayName: "Approval / Review", description: "Sign-off required", category: "Workflow" },
  { type: "action", subtype: "ai_generate", displayName: "AI Generation", description: "Draft proposal, summary", category: "AI & Automation" },
  { type: "action", subtype: "report_gen", displayName: "Generate Report", description: "Create dashboard or document", category: "Reporting" },
  { type: "action", subtype: "export", displayName: "Export / Distribution", description: "Push CSV → Finance/Board", category: "Data Operations" },
  { type: "action", subtype: "trigger", displayName: "Automation Trigger", description: "When condition met → action", category: "Workflow" },
];

// E. Organizational / Output Blocks
export const organizationBlocks: BlockDefinition[] = [
  { type: "organization", subtype: "portfolio", displayName: "Portfolio", description: "Assigned donor list", category: "Structure" },
  { type: "organization", subtype: "department", displayName: "Department / Team", description: "Development, Finance, Programs", category: "Structure" },
  { type: "organization", subtype: "board", displayName: "Board / Committee", description: "Governance body", category: "Governance" },
  { type: "organization", subtype: "dashboard", displayName: "Dashboard View", description: "CEO Dashboard, Board Packet", category: "Reporting" },
  { type: "organization", subtype: "library", displayName: "Library / Repository", description: "Templates, Documents, Playbooks", category: "Resources" },
  { type: "organization", subtype: "training", displayName: "Training Module", description: "Onboarding flows", category: "Resources" },
];

// F. Logic / Connector Blocks
export const logicBlocks: BlockDefinition[] = [
  { type: "logic", subtype: "trigger", displayName: "Trigger", description: "When event occurs", category: "Logic & Flow" },
  { type: "logic", subtype: "condition", displayName: "Condition", description: "If/then logic", category: "Logic & Flow" },
  { type: "logic", subtype: "loop", displayName: "Loop / Iteration", description: "For each item", category: "Logic & Flow" },
  { type: "logic", subtype: "decision", displayName: "Decision Gate", description: "Manual approval step", category: "Logic & Flow" },
  { type: "logic", subtype: "transform", displayName: "Data Transform", description: "Normalize fields, map IDs", category: "Logic & Flow" },
  { type: "logic", subtype: "webhook", displayName: "Webhook / API Call", description: "Real-time integration", category: "Logic & Flow" },
  { type: "logic", subtype: "notification", displayName: "Notification", description: "Email, Slack, SMS alert", category: "Logic & Flow" },
];

// All blocks combined
export const allBlocks = [
  ...systemBlocks,
  ...humanBlocks,
  ...dataBlocks,
  ...actionBlocks,
  ...organizationBlocks,
  ...logicBlocks,
];

// Block categories for palette organization
export const blockCategories = [
  { id: "system", label: "Systems & Software", blocks: systemBlocks },
  { id: "human", label: "People & Roles", blocks: humanBlocks },
  { id: "data", label: "Data & Objects", blocks: dataBlocks },
  { id: "action", label: "Actions & Processes", blocks: actionBlocks },
  { id: "organization", label: "Organization", blocks: organizationBlocks },
  { id: "logic", label: "Logic & Connectors", blocks: logicBlocks },
];

// Helper function to get block definition by subtype
export function getBlockDefinition(subtype: string): BlockDefinition | undefined {
  return allBlocks.find(block => block.subtype === subtype);
}

// Helper function to get blocks by category
export function getBlocksByCategory(category: BlockCategory): BlockDefinition[] {
  return allBlocks.filter(block => block.type === category);
}

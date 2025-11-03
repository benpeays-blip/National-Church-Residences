import {
  Target,
  Users,
  Handshake,
  DollarSign,
  Heart,
  BarChart3,
  User,
  Search,
  Megaphone,
  FileText,
  Calculator,
  Briefcase,
  Settings,
  Mail,
  TrendingUp,
  Database,
  Globe,
  Calendar,
  Phone,
  FileBarChart,
  type LucideIcon,
} from "lucide-react";

// Artifact type definition
export interface ArtifactDefinition {
  id: string;
  type: "stage" | "role" | "software" | "document" | "metric" | "process";
  subtype: string;
  displayName: string;
  description: string;
  icon: LucideIcon;
  colorToken: string; // Color identifier for branding
  category?: string; // Software category (CRM, Email Marketing, etc.)
  metadata?: Record<string, any>;
}

// Color tokens for different artifact types
// Palette based on Sky Blue (#0284C7) and Ice Blue (#7DD3FC) accents
export const colorTokens = {
  // Stages - Sky Blue to Deep Blue gradient (primary color family)
  stageProspect: "bg-sky-500/10 border-sky-500/50 text-sky-700 dark:text-sky-300",
  stageCultivation: "bg-sky-600/10 border-sky-600/50 text-sky-800 dark:text-sky-200",
  stageSolicitation: "bg-blue-600/10 border-blue-600/50 text-blue-800 dark:text-blue-200",
  stageProcessing: "bg-blue-700/10 border-blue-700/50 text-blue-900 dark:text-blue-100",
  stageStewardship: "bg-indigo-600/10 border-indigo-600/50 text-indigo-800 dark:text-indigo-200",
  stageLeadership: "bg-indigo-700/10 border-indigo-700/50 text-indigo-900 dark:text-indigo-100",
  
  // Roles - Cyan to Teal gradient (complementary cool tones)
  roleDevOfficer: "bg-cyan-500/10 border-cyan-500/50 text-cyan-700 dark:text-cyan-300",
  roleResearcher: "bg-cyan-600/10 border-cyan-600/50 text-cyan-800 dark:text-cyan-200",
  roleMarketing: "bg-teal-500/10 border-teal-500/50 text-teal-700 dark:text-teal-300",
  roleGrants: "bg-teal-600/10 border-teal-600/50 text-teal-800 dark:text-teal-200",
  roleFinance: "bg-sky-700/10 border-sky-700/50 text-sky-900 dark:text-sky-100",
  roleExecutive: "bg-blue-500/10 border-blue-500/50 text-blue-700 dark:text-blue-300",
  
  // Software - Slate to Purple gradient (sophisticated neutral to accent)
  software: "bg-slate-500/10 border-slate-500/50 text-slate-700 dark:text-slate-300",
  softwareAlt: "bg-violet-600/10 border-violet-600/50 text-violet-800 dark:text-violet-200",
};

// Fundraising Workflow Stages
export const stageArtifacts: ArtifactDefinition[] = [
  {
    id: "stage-prospect",
    type: "stage",
    subtype: "Prospect Research",
    displayName: "Prospect Research",
    description: "Identify and qualify potential major donors",
    icon: Search,
    colorToken: colorTokens.stageProspect,
    metadata: { order: 1, category: "Discovery" },
  },
  {
    id: "stage-cultivation",
    type: "stage",
    subtype: "Cultivation",
    displayName: "Cultivation",
    description: "Build relationships and assess interest",
    icon: Users,
    colorToken: colorTokens.stageCultivation,
    metadata: { order: 2, category: "Engagement" },
  },
  {
    id: "stage-solicitation",
    type: "stage",
    subtype: "Solicitation",
    displayName: "Solicitation",
    description: "Make the ask and negotiate commitment",
    icon: Handshake,
    colorToken: colorTokens.stageSolicitation,
    metadata: { order: 3, category: "Ask" },
  },
  {
    id: "stage-processing",
    type: "stage",
    subtype: "Processing",
    displayName: "Processing",
    description: "Record gift and generate acknowledgment",
    icon: DollarSign,
    colorToken: colorTokens.stageProcessing,
    metadata: { order: 4, category: "Transaction" },
  },
  {
    id: "stage-stewardship",
    type: "stage",
    subtype: "Stewardship",
    displayName: "Stewardship",
    description: "Thank donors and report impact",
    icon: Heart,
    colorToken: colorTokens.stageStewardship,
    metadata: { order: 5, category: "Retention" },
  },
  {
    id: "stage-leadership",
    type: "stage",
    subtype: "Leadership Insight",
    displayName: "Leadership Insight",
    description: "Strategic reporting and forecasting",
    icon: BarChart3,
    colorToken: colorTokens.stageLeadership,
    metadata: { order: 6, category: "Analytics" },
  },
];

// Organizational Roles
export const roleArtifacts: ArtifactDefinition[] = [
  {
    id: "role-dev-officer",
    type: "role",
    subtype: "Development Officer",
    displayName: "Development Officer",
    description: "Major gift officer (MGO)",
    icon: User,
    colorToken: colorTokens.roleDevOfficer,
  },
  {
    id: "role-researcher",
    type: "role",
    subtype: "Prospect Researcher",
    displayName: "Prospect Researcher",
    description: "Wealth screening & research",
    icon: Search,
    colorToken: colorTokens.roleResearcher,
  },
  {
    id: "role-marketing",
    type: "role",
    subtype: "Marketing/Communications",
    displayName: "Marketing/Communications",
    description: "Campaign & donor comms",
    icon: Megaphone,
    colorToken: colorTokens.roleMarketing,
  },
  {
    id: "role-grants",
    type: "role",
    subtype: "Grants Team",
    displayName: "Grants Team",
    description: "Foundation & grant proposals",
    icon: FileText,
    colorToken: colorTokens.roleGrants,
  },
  {
    id: "role-finance",
    type: "role",
    subtype: "Finance/Accounting",
    displayName: "Finance/Accounting",
    description: "Gift processing & reporting",
    icon: Calculator,
    colorToken: colorTokens.roleFinance,
  },
  {
    id: "role-executive",
    type: "role",
    subtype: "Executive Leadership",
    displayName: "Executive Leadership",
    description: "CEO, Board, VP Development",
    icon: Briefcase,
    colorToken: colorTokens.roleExecutive,
  },
];

// Software Tools (36 platforms from Tech Stack Mapper) - Organized by category
export const softwareArtifacts: ArtifactDefinition[] = [
  // CRM & Donor Management
  { id: "soft-salesforce", type: "software", subtype: "Salesforce", displayName: "Salesforce", description: "CRM platform", icon: Database, colorToken: colorTokens.software, category: "CRM" },
  { id: "soft-blackbaud", type: "software", subtype: "Blackbaud Raiser's Edge", displayName: "Blackbaud Raiser's Edge", description: "Fundraising CRM", icon: Database, colorToken: colorTokens.software, category: "CRM" },
  { id: "soft-bloomerang", type: "software", subtype: "Bloomerang", displayName: "Bloomerang", description: "Donor management", icon: Database, colorToken: colorTokens.software, category: "CRM" },
  { id: "soft-donorperfect", type: "software", subtype: "DonorPerfect", displayName: "DonorPerfect", description: "Fundraising software", icon: Database, colorToken: colorTokens.software, category: "CRM" },
  
  // Email Marketing
  { id: "soft-mailchimp", type: "software", subtype: "Mailchimp", displayName: "Mailchimp", description: "Email marketing", icon: Mail, colorToken: colorTokens.software, category: "Email Marketing" },
  { id: "soft-constant-contact", type: "software", subtype: "Constant Contact", displayName: "Constant Contact", description: "Email campaigns", icon: Mail, colorToken: colorTokens.software, category: "Email Marketing" },
  { id: "soft-emma", type: "software", subtype: "Emma", displayName: "Emma", description: "Email platform", icon: Mail, colorToken: colorTokens.software, category: "Email Marketing" },
  
  // Wealth Screening
  { id: "soft-wealthengine", type: "software", subtype: "WealthEngine", displayName: "WealthEngine", description: "Wealth screening", icon: TrendingUp, colorToken: colorTokens.software, category: "Wealth Screening" },
  { id: "soft-iwave", type: "software", subtype: "iWave", displayName: "iWave", description: "Prospect research", icon: Search, colorToken: colorTokens.software, category: "Wealth Screening" },
  { id: "soft-donorsearch", type: "software", subtype: "DonorSearch", displayName: "DonorSearch", description: "Donor intelligence", icon: Search, colorToken: colorTokens.software, category: "Wealth Screening" },
  
  // Payment Processing
  { id: "soft-classy", type: "software", subtype: "Classy", displayName: "Classy", description: "Online fundraising", icon: DollarSign, colorToken: colorTokens.software, category: "Payment Processing" },
  { id: "soft-givebutter", type: "software", subtype: "Givebutter", displayName: "Givebutter", description: "Fundraising platform", icon: DollarSign, colorToken: colorTokens.software, category: "Payment Processing" },
  { id: "soft-donorbox", type: "software", subtype: "Donorbox", displayName: "Donorbox", description: "Donation platform", icon: DollarSign, colorToken: colorTokens.software, category: "Payment Processing" },
  { id: "soft-stripe", type: "software", subtype: "Stripe", displayName: "Stripe", description: "Payment processing", icon: DollarSign, colorToken: colorTokens.software, category: "Payment Processing" },
  
  // Event Management
  { id: "soft-eventbrite", type: "software", subtype: "Eventbrite", displayName: "Eventbrite", description: "Event ticketing", icon: Calendar, colorToken: colorTokens.software, category: "Event Management" },
  { id: "soft-givesmart", type: "software", subtype: "GiveSmart", displayName: "GiveSmart", description: "Event fundraising", icon: Calendar, colorToken: colorTokens.software, category: "Event Management" },
  { id: "soft-greater-giving", type: "software", subtype: "Greater Giving", displayName: "Greater Giving", description: "Auction software", icon: Calendar, colorToken: colorTokens.software, category: "Event Management" },
  
  // Grant Management
  { id: "soft-foundant", type: "software", subtype: "Foundant", displayName: "Foundant", description: "Grant management", icon: FileText, colorToken: colorTokens.software, category: "Grant Management" },
  { id: "soft-fluxx", type: "software", subtype: "Fluxx", displayName: "Fluxx", description: "Grantmaking platform", icon: FileText, colorToken: colorTokens.software, category: "Grant Management" },
  { id: "soft-candid", type: "software", subtype: "Candid", displayName: "Candid (Foundation Directory)", description: "Foundation research", icon: FileText, colorToken: colorTokens.software, category: "Grant Management" },
  
  // DAF Integration
  { id: "soft-daf-giving360", type: "software", subtype: "DAF Giving360", displayName: "DAF Giving360", description: "DAF integration", icon: DollarSign, colorToken: colorTokens.software, category: "Planned Giving" },
  { id: "soft-freewill", type: "software", subtype: "FreeWill", displayName: "FreeWill", description: "Planned giving", icon: FileText, colorToken: colorTokens.software, category: "Planned Giving" },
  
  // Communications
  { id: "soft-microsoft-outlook", type: "software", subtype: "Microsoft Outlook", displayName: "Microsoft Outlook", description: "Email client", icon: Mail, colorToken: colorTokens.software, category: "Communications" },
  { id: "soft-gmail", type: "software", subtype: "Gmail", displayName: "Gmail", description: "Email service", icon: Mail, colorToken: colorTokens.software, category: "Communications" },
  
  // Social Media
  { id: "soft-linkedin", type: "software", subtype: "LinkedIn", displayName: "LinkedIn", description: "Professional network", icon: Globe, colorToken: colorTokens.software, category: "Social Media" },
  { id: "soft-facebook", type: "software", subtype: "Facebook", displayName: "Facebook", description: "Social media", icon: Globe, colorToken: colorTokens.software, category: "Social Media" },
  { id: "soft-twitter", type: "software", subtype: "Twitter/X", displayName: "Twitter/X", description: "Social platform", icon: Globe, colorToken: colorTokens.software, category: "Social Media" },
  
  // Analytics & BI
  { id: "soft-tableau", type: "software", subtype: "Tableau", displayName: "Tableau", description: "Data visualization", icon: BarChart3, colorToken: colorTokens.software, category: "Analytics" },
  { id: "soft-power-bi", type: "software", subtype: "Power BI", displayName: "Power BI", description: "Business intelligence", icon: BarChart3, colorToken: colorTokens.software, category: "Analytics" },
  { id: "soft-google-analytics", type: "software", subtype: "Google Analytics", displayName: "Google Analytics", description: "Web analytics", icon: BarChart3, colorToken: colorTokens.software, category: "Analytics" },
  
  // Workflow & Project Management
  { id: "soft-asana", type: "software", subtype: "Asana", displayName: "Asana", description: "Project management", icon: Settings, colorToken: colorTokens.software, category: "Project Management" },
  { id: "soft-monday", type: "software", subtype: "Monday.com", displayName: "Monday.com", description: "Work OS", icon: Settings, colorToken: colorTokens.software, category: "Project Management" },
  { id: "soft-trello", type: "software", subtype: "Trello", displayName: "Trello", description: "Task boards", icon: Settings, colorToken: colorTokens.software, category: "Project Management" },
  
  // Calling & Video
  { id: "soft-zoom", type: "software", subtype: "Zoom", displayName: "Zoom", description: "Video conferencing", icon: Phone, colorToken: colorTokens.software, category: "Video/Calling" },
  { id: "soft-teams", type: "software", subtype: "Microsoft Teams", displayName: "Microsoft Teams", description: "Collaboration platform", icon: Phone, colorToken: colorTokens.software, category: "Video/Calling" },
  
  // Accounting
  { id: "soft-quickbooks", type: "software", subtype: "QuickBooks", displayName: "QuickBooks", description: "Accounting software", icon: Calculator, colorToken: colorTokens.software, category: "Accounting" },
];

// All artifacts combined
export const allArtifacts: ArtifactDefinition[] = [
  ...stageArtifacts,
  ...roleArtifacts,
  ...softwareArtifacts,
];

// Helper function to get artifact by ID
export function getArtifactById(id: string): ArtifactDefinition | undefined {
  return allArtifacts.find(a => a.id === id);
}

// Helper function to get artifacts by type
export function getArtifactsByType(type: string): ArtifactDefinition[] {
  return allArtifacts.filter(a => a.type === type);
}

// Helper function to group software artifacts by category
export function getSoftwareByCategory(): Record<string, ArtifactDefinition[]> {
  const grouped: Record<string, ArtifactDefinition[]> = {};
  
  softwareArtifacts.forEach(artifact => {
    const category = artifact.category || "Other";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(artifact);
  });
  
  return grouped;
}

// Get all unique software categories in order
export const softwareCategories = [
  "CRM",
  "Email Marketing",
  "Wealth Screening",
  "Payment Processing",
  "Event Management",
  "Grant Management",
  "Planned Giving",
  "Communications",
  "Social Media",
  "Analytics",
  "Project Management",
  "Video/Calling",
  "Accounting",
];

// Workflow stage connections (for initial canvas setup)
export const defaultStageConnections = [
  { source: "stage-prospect", target: "stage-cultivation", label: "Qualified prospects", animated: true },
  { source: "stage-cultivation", target: "stage-solicitation", label: "Ready for ask", animated: true },
  { source: "stage-solicitation", target: "stage-processing", label: "Committed gifts", animated: true },
  { source: "stage-processing", target: "stage-stewardship", label: "Processed gifts", animated: true },
  { source: "stage-stewardship", target: "stage-leadership", label: "Impact metrics", animated: true },
  // Feedback loops
  { source: "stage-stewardship", target: "stage-cultivation", label: "Upgrade prospects", animated: true, style: "dashed" },
  { source: "stage-leadership", target: "stage-prospect", label: "Strategy insights", animated: true, style: "dashed" },
];

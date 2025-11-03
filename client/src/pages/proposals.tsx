import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  Database,
  Brain,
  FileText,
  Users,
  Sparkles,
  ChevronRight,
  CheckCircle,
  Award,
  Target,
  Network,
  GitBranch,
  Lightbulb,
  Calendar,
  AlertTriangle,
  Settings,
  TrendingUp,
} from "lucide-react";

export default function Proposals() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Engagement Timeline Proposal</h1>
        <p className="text-sm text-muted-foreground">
          AI Integration & Fundraising Intelligence Roadmap
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Areas of Focus</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            {/* Focus Area 1 */}
            <AccordionItem value="focus-1" className="border rounded-lg px-6 py-2" data-testid="accordion-focus-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base" data-testid="text-focus-1-title">AI-Powered Prospect Discovery & Prioritization</h3>
                    <p className="text-sm text-muted-foreground">
                      Analyze 5,000+ donors and rank high-potential individuals by capacity and engagement
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 ml-16">
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Goals
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Analyze 5,000+ active donors plus external data (wealth indicators, philanthropy records)</li>
                      <li>• Rank high-potential individuals, foundations, and corporations by giving capacity, engagement history, and program affinity</li>
                      <li>• Maintain live-updating prospect profiles for continuous refinement</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Current Pain Points
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Manual research consumes hours per prospect</li>
                      <li>• Wealth screening data quickly becomes outdated</li>
                      <li>• "Hidden" wealthy donors remain undiscovered in the database</li>
                      <li>• Capacity ratings are too broad or inaccurate</li>
                      <li>• Hard to predict who will give versus who merely can give</li>
                      <li>• External data sources are siloed and expensive</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Current Tech Stack / Operational Process
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Donor data stored in Raiser's Edge and Excel-based lists</li>
                      <li>• Wealth screening done periodically through iWave or DonorSearch, refreshed manually</li>
                      <li>• Staff manually review donor notes and past giving to build shortlists</li>
                      <li>• Limited integration between CRM and external databases; reports exported manually</li>
                      <li>• No live donor scoring or automated enrichment process in place</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Solution
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Integrate CRM and accounting systems with external data (WealthEngine, IRS 990s, LinkedIn, real estate, and philanthropy indexes)</li>
                      <li>• Deploy AI-driven scoring to predict propensity to give using engagement history, event participation, and wealth signals</li>
                      <li>• Automate data refreshes and enrichment for continuous accuracy</li>
                      <li>• Create real-time dashboards highlighting the top 10% of prospects by readiness to give and affinity</li>
                    </ul>
                  </div>
                  <div className="rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Result
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Prospect research time cut by 60%</li>
                      <li>• Increased accuracy in identifying active, high-probability donors</li>
                      <li>• Dynamic prospect ranking system continuously learning and improving</li>
                      <li>• Fundraisers focus their time where it has the highest impact</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Focus Area 2 */}
            <AccordionItem value="focus-2" className="border rounded-lg px-6 py-2" data-testid="accordion-focus-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Network className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base" data-testid="text-focus-2-title">Advanced Relationship Mapping & Network Intelligence</h3>
                    <p className="text-sm text-muted-foreground">
                      Identify hidden connections and strengthen collaboration with key stakeholders
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 ml-16">
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Goals
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Deploy an AI-driven platform that goes beyond tools like Relationship Science</li>
                      <li>• Identify hidden connections, referral paths, and influence networks</li>
                      <li>• Strengthen collaboration with thought leaders, board members, and aligned partners</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Current Pain Points
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Relationship Science is costly ($25K–50K/year) and underutilized</li>
                      <li>• Board members rarely share their full networks</li>
                      <li>• LinkedIn data lacks context and integration</li>
                      <li>• "Warm paths" to major prospects remain hidden</li>
                      <li>• Event, volunteer, and corporate relationships aren't linked in the CRM</li>
                      <li>• Corporate partnership opportunities are often missed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Current Tech Stack / Operational Process
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Relationships tracked manually via spreadsheets and board member updates</li>
                      <li>• LinkedIn used informally but not connected to CRM</li>
                      <li>• Relationship Science data (if used) sits outside daily operations</li>
                      <li>• Event systems (like Eventbrite or Excel guest lists) are disconnected from donor profiles</li>
                      <li>• No central visualization of organizational relationships or shared affiliations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Solution
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Implement a relationship intelligence layer using graph-based AI (e.g., Neo4j, Affinity, or Foundry Ontology)</li>
                      <li>• Ingest CRM, event, and volunteer data to map shared affiliations and connections</li>
                      <li>• Enrich records with public network data to surface influence chains and warm introductions</li>
                      <li>• Generate visual "relationship maps" and suggest key introducers for each major donor</li>
                    </ul>
                  </div>
                  <div className="rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Result
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Clear visualization of the Foundation's donor ecosystem</li>
                      <li>• 25–35% increase in warm introductions and board-driven leads</li>
                      <li>• Strengthened corporate and foundation partnerships through connection intelligence</li>
                      <li>• Board engagement deepens as members see the tangible value of their networks</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Focus Area 3 */}
            <AccordionItem value="focus-3" className="border rounded-lg px-6 py-2" data-testid="accordion-focus-3">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <GitBranch className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base" data-testid="text-focus-3-title">Data-Driven Pipeline Management & Segmentation</h3>
                    <p className="text-sm text-muted-foreground">
                      Automate segmentation and use AI to prioritize donor pipelines
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 ml-16">
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Goals
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Automate segmentation for individuals, foundations, and corporations</li>
                      <li>• Use AI to generate and prioritize donor pipelines based on giving potential and strategic fit</li>
                      <li>• Tailor engagement strategies dynamically by donor type</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Current Pain Points
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Static donor segments that don't reflect current engagement</li>
                      <li>• Move management handled inconsistently across gift officers</li>
                      <li>• No way to predict when donors are "ready" to give</li>
                      <li>• Corporate/foundation giving tracked separately from individuals</li>
                      <li>• Officers spend time on low-probability donors</li>
                      <li>• No system for early detection of lapsed donors</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Current Tech Stack / Operational Process
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Donor portfolios assigned manually; progress tracked via Excel or static CRM reports</li>
                      <li>• Move management notes entered inconsistently across gift officers</li>
                      <li>• Corporate and foundation records often stored in different databases or modules</li>
                      <li>• No automated alerts when engagement declines or new signals arise</li>
                      <li>• Reporting consolidated manually by development staff at quarter-end</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Solution
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Centralize all donor types into a unified pipeline view using AI-assisted CRM integration</li>
                      <li>• Deploy predictive scoring that updates weekly based on donor activity, giving trends, and engagement signals</li>
                      <li>• Automate alerts for lapsed or reactivated donors</li>
                      <li>• Standardize move management workflows across the team with AI-driven prioritization</li>
                    </ul>
                  </div>
                  <div className="rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Result
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 30–40% increase in gift officer efficiency</li>
                      <li>• Consistent donor follow-up across the organization</li>
                      <li>• Real-time insight into which donors are trending up or at risk</li>
                      <li>• Predictive, living donor pipelines that adapt to behavior and timing</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Focus Area 4 */}
            <AccordionItem value="focus-4" className="border rounded-lg px-6 py-2" data-testid="accordion-focus-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base" data-testid="text-focus-4-title">AI-Enhanced Grant Proposal Crafting</h3>
                    <p className="text-sm text-muted-foreground">
                      Automate proposal drafting aligned with funder priorities
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 ml-16">
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Goals
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Use AI to automate proposal drafting aligned with funder priorities</li>
                      <li>• Integrate workflow tracking for submissions, deadlines, and reporting</li>
                      <li>• Improve proposal quality and efficiency organization-wide</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Current Pain Points
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Each proposal written manually from scratch</li>
                      <li>• Hard to tailor for each funder without starting over</li>
                      <li>• Program staff aren't natural writers; quality varies</li>
                      <li>• Internal reviews delay submission timelines</li>
                      <li>• No centralized tracking of which proposals succeed or fail</li>
                      <li>• Reporting consumes substantial administrative time</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Current Tech Stack / Operational Process
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Proposal development tracked through Word docs and shared drives</li>
                      <li>• Deadlines managed through Outlook calendars or Excel sheets</li>
                      <li>• Reporting templates recreated for each funder</li>
                      <li>• Narrative content manually copied between proposals and reports</li>
                      <li>• No AI or automation supporting drafting or compliance tracking</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Solution
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Introduce an AI grant-writing assistant trained on previous proposals and funder guidelines</li>
                      <li>• Auto-generate first drafts, budgets, and measurable outcomes</li>
                      <li>• Embed workflow automation with reminders and task tracking for deadlines</li>
                      <li>• Implement feedback loops that identify language patterns correlated with wins</li>
                    </ul>
                  </div>
                  <div className="rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Result
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 70–80% reduction in proposal creation time</li>
                      <li>• Higher success rate through tailored, data-aligned narratives</li>
                      <li>• Centralized visibility on grant cycles, deadlines, and success metrics</li>
                      <li>• Staff focus shifts from writing to strategic relationship development</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Focus Area 5 */}
            <AccordionItem value="focus-5" className="border rounded-lg px-6 py-2" data-testid="accordion-focus-5">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base" data-testid="text-focus-5-title">Smart Event Planning & Donor Engagement</h3>
                    <p className="text-sm text-muted-foreground">
                      Apply AI to identify top invitees and maximize event ROI
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 ml-16">
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Goals
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Apply AI to identify top invitees for fundraising and stewardship events</li>
                      <li>• Predict donor engagement to personalize outreach and maximize attendance</li>
                      <li>• Strengthen post-event relationships through targeted follow-up</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Current Pain Points
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• The same donors are invited repeatedly, missing new opportunities</li>
                      <li>• Attendance can't be reliably predicted</li>
                      <li>• Post-event follow-up is inconsistent or forgotten</li>
                      <li>• ROI measured only by attendance numbers</li>
                      <li>• Seating and grouping don't strategically connect donors</li>
                      <li>• Corporate sponsors often paired with mismatched events</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Current Tech Stack / Operational Process
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Event planning done via Eventbrite or manual guest lists</li>
                      <li>• Donor CRM not integrated with event attendance or engagement data</li>
                      <li>• RSVP and follow-up tracked via email chains or spreadsheets</li>
                      <li>• Post-event metrics limited to headcount, not gift impact</li>
                      <li>• No automated donor segmentation or recommendation system for events</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Solution
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Implement predictive analytics to select invitees most likely to attend and engage</li>
                      <li>• Personalize invitations and follow-up emails using donor insights and giving history</li>
                      <li>• Automate post-event reporting and ROI measurement (engagement scores, giving lift)</li>
                      <li>• Use AI to design seating arrangements that optimize networking and connection-building</li>
                    </ul>
                  </div>
                  <div className="rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Result
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Higher attendance and post-event conversion</li>
                      <li>• 2x ROI on event outcomes compared to prior years</li>
                      <li>• Corporate sponsors better aligned with mission-appropriate events</li>
                      <li>• More personalized, meaningful donor experiences that strengthen long-term loyalty</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            {/* Phase 1 */}
            <AccordionItem value="phase-1" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1" data-testid="text-phase-1-title">Phase 1 – Discovery & Data Foundation</h3>
                    <p className="text-sm text-muted-foreground">
                      Establish clear understanding of current systems and workflows
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 ml-16">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Activities</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Conduct interviews with Development, Grants, Accounting, and Events teams</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Audit donor data sources (CRM, Excel, wealth-screening tools, event systems, accounting)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Map current processes and identify integration gaps</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Assess data quality, duplication, and governance policies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Benchmark current fundraising KPIs</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Deliverables</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Data Integration Assessment Report</Badge>
                      <Badge variant="secondary">"As-Is" Process Maps</Badge>
                      <Badge variant="secondary">Unified Data Architecture</Badge>
                      <Badge variant="secondary">Quick Wins Dashboard</Badge>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Short-Term Wins
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Clarity on data silos and inefficiencies</li>
                      <li>• Leadership visibility into current donor landscape</li>
                      <li>• Early momentum with actionable data roadmap</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Phase 2 */}
            <AccordionItem value="phase-2" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1" data-testid="text-phase-2-title">Phase 2 – System Integration & Data Unification</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect existing systems and create a single source of truth
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 ml-16">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Activities</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Integrate CRM, wealth-screening, and event systems into a unified warehouse</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Clean, deduplicate, and enrich donor records</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Implement standardized donor IDs across systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Establish automated data-refresh cycles</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Deliverables</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Unified Data Layer</Badge>
                      <Badge variant="secondary">Donor Intelligence Dashboard v1</Badge>
                      <Badge variant="secondary">Data Governance Plan</Badge>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Short-Term Wins
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Real-time access to clean donor data</li>
                      <li>• Elimination of static Excel lists</li>
                      <li>• Leadership gains holistic view of donors and giving</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Phase 3 */}
            <AccordionItem value="phase-3" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-3">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1" data-testid="text-phase-3-title">Phase 3 – AI Prospect & Relationship Intelligence</h3>
                    <p className="text-sm text-muted-foreground">
                      Identify top prospects and hidden networks through AI-driven insight
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 ml-16">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Activities</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Train ML models to score donors by likelihood and timing to give</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Build graph-based relationship maps (Neo4j / Foundry Ontology)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Highlight warm introductions via board or partner networks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Prioritize donors by alignment with Foundation program areas</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Deliverables</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">AI Prospect Scoring Dashboard</Badge>
                      <Badge variant="secondary">Relationship Network Visualization</Badge>
                      <Badge variant="secondary">Top 25 Prospect Action Plan</Badge>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Short-Term Wins
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Fundraisers focus on high-probability donors</li>
                      <li>• New "warm path" introductions surface</li>
                      <li>• Efficiency gains for development officers and board engagement</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Phase 4 */}
            <AccordionItem value="phase-4" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1" data-testid="text-phase-4-title">Phase 4 – Workflow Automation & AI-Assisted Grant Writing</h3>
                    <p className="text-sm text-muted-foreground">
                      Streamline repetitive work and automate grant proposal creation
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 ml-16">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Activities</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Deploy AI-powered proposal and reporting generator trained on prior submissions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Integrate task tracking and automated deadline reminders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Centralize grant data in unified dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Analyze winning proposal language for continuous improvement</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Deliverables</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">AI Grant Proposal Generator (Pilot)</Badge>
                      <Badge variant="secondary">Automated Reporting Workflow</Badge>
                      <Badge variant="secondary">Grant Performance Dashboard</Badge>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Short-Term Wins
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• 70-80% reduction in proposal drafting time</li>
                      <li>• Higher proposal quality and alignment</li>
                      <li>• Transparent pipeline of proposals → submissions → results</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Phase 5 */}
            <AccordionItem value="phase-5" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-5">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1" data-testid="text-phase-5-title">Phase 5 – Smart Events & Dynamic Pipeline Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Use predictive analytics to enhance events and donor segmentation
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 ml-16">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Activities</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Implement AI event-planning model for invitee and sponsor alignment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Automate post-event follow-up and engagement tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Integrate predictive scoring for donor readiness and lapse risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Consolidate all giving pipelines into a dynamic dashboard</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Deliverables</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Smart Event Planner Dashboard</Badge>
                      <Badge variant="secondary">Dynamic Donor Pipeline System</Badge>
                      <Badge variant="secondary">Engagement Alert Automation</Badge>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Short-Term Wins
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Higher-ROI, better-targeted events</li>
                      <li>• Early-warning system for donor attrition</li>
                      <li>• Greater visibility into future giving potential</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Phase 6 */}
            <AccordionItem value="phase-6" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-6">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1" data-testid="text-phase-6-title">Phase 6 – Optimization & Training</h3>
                    <p className="text-sm text-muted-foreground">
                      Institutionalize AI systems and ensure continuous improvement
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="space-y-4 ml-16">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Activities</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Conduct staff training and AI-literacy workshops</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Deliver final dashboards and leadership reports</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Complete ROI and impact analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>Establish data-governance and privacy framework</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Deliverables</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Leadership Dashboard with Live KPIs</Badge>
                      <Badge variant="secondary">Final Impact and ROI Report</Badge>
                      <Badge variant="secondary">Ongoing Support & Optimization Plan</Badge>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Long-Term Wins
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Self-sustaining, data-driven fundraising culture</li>
                      <li>• Continuous learning models that adapt to donor behavior</li>
                      <li>• Measurable improvement in donor retention, grant success, and event ROI</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

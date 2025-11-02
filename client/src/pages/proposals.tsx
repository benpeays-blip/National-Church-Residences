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
          <CardTitle>Implementation Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            {/* Phase 1 */}
            <AccordionItem value="phase-1" className="border rounded-lg px-6 py-2" data-testid="accordion-phase-1">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                    <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base" data-testid="text-phase-1-title">Phase 1 – Discovery & Data Foundation</h3>
                      <Badge variant="outline" className="text-xs">Months 1-2</Badge>
                    </div>
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
                      <CheckCircle className="w-4 h-4 text-green-600" />
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
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center shrink-0">
                    <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base" data-testid="text-phase-2-title">Phase 2 – System Integration & Data Unification</h3>
                      <Badge variant="outline" className="text-xs">Months 3-4</Badge>
                    </div>
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
                      <CheckCircle className="w-4 h-4 text-green-600" />
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
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center shrink-0">
                    <Brain className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base" data-testid="text-phase-3-title">Phase 3 – AI Prospect & Relationship Intelligence</h3>
                      <Badge variant="outline" className="text-xs">Months 5-6</Badge>
                    </div>
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
                      <CheckCircle className="w-4 h-4 text-green-600" />
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
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base" data-testid="text-phase-4-title">Phase 4 – Workflow Automation & AI-Assisted Grant Writing</h3>
                      <Badge variant="outline" className="text-xs">Months 7-9</Badge>
                    </div>
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
                      <CheckCircle className="w-4 h-4 text-green-600" />
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
                  <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-950 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base" data-testid="text-phase-5-title">Phase 5 – Smart Events & Dynamic Pipeline Management</h3>
                      <Badge variant="outline" className="text-xs">Months 9-11</Badge>
                    </div>
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
                      <CheckCircle className="w-4 h-4 text-green-600" />
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
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base" data-testid="text-phase-6-title">Phase 6 – Optimization & Training</h3>
                      <Badge variant="outline" className="text-xs">Month 12+</Badge>
                    </div>
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
                      <Award className="w-4 h-4 text-amber-600" />
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

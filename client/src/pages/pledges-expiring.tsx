import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  AlertTriangle, 
  Calendar, 
  DollarSign, 
  Phone, 
  Mail, 
  FileText, 
  ArrowRight,
  ArrowLeft,
  Clock,
  User,
  Building2,
  CheckCircle2,
  Sparkles,
  Copy
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

const accentColors = {
  teal: "#2A9D8F",
  olive: "#6B8E23",
  orange: "#E76F51",
  coral: "#E07A5F",
  sky: "#4A90A4",
  lime: "#84a98c",
};

interface NextStep {
  action: string;
  type: string;
  priority: string;
  dueDate: string;
}

interface Pledge {
  id: number;
  donorName: string;
  donorId: string;
  pledgeAmount: string;
  pledgeRemaining: string;
  pledgeDate: string;
  expirationDate: string;
  daysUntilExpiration: number;
  campaign: string;
  paymentSchedule: string;
  lastPayment: string;
  lastPaymentAmount: string;
  contactPhone: string;
  contactEmail: string;
  urgency: string;
  nextSteps: NextStep[];
}

const expiringPledges: Pledge[] = [
  {
    id: 1,
    donorName: "Margaret Thompson",
    donorId: "1",
    pledgeAmount: "$50,000",
    pledgeRemaining: "$15,000",
    pledgeDate: "Jan 15, 2023",
    expirationDate: "Jan 15, 2025",
    daysUntilExpiration: 28,
    campaign: "Capital Campaign 2023",
    paymentSchedule: "Quarterly",
    lastPayment: "Oct 15, 2024",
    lastPaymentAmount: "$5,000",
    contactPhone: "(614) 555-0142",
    contactEmail: "m.thompson@email.com",
    urgency: "high",
    nextSteps: [
      { action: "Schedule reminder call", type: "call", priority: "High", dueDate: "Dec 20" },
      { action: "Send pledge fulfillment letter", type: "mail", priority: "Medium", dueDate: "Dec 22" },
      { action: "Prepare payment options memo", type: "document", priority: "Medium", dueDate: "Dec 23" },
    ]
  },
  {
    id: 2,
    donorName: "Robert Chen",
    donorId: "2",
    pledgeAmount: "$25,000",
    pledgeRemaining: "$10,000",
    pledgeDate: "Mar 1, 2023",
    expirationDate: "Mar 1, 2025",
    daysUntilExpiration: 73,
    campaign: "Annual Fund 2023",
    paymentSchedule: "Semi-Annual",
    lastPayment: "Sep 1, 2024",
    lastPaymentAmount: "$7,500",
    contactPhone: "(614) 555-0198",
    contactEmail: "r.chen@techcorp.com",
    urgency: "medium",
    nextSteps: [
      { action: "Send email reminder", type: "email", priority: "Medium", dueDate: "Jan 5" },
      { action: "Review giving history", type: "document", priority: "Low", dueDate: "Jan 8" },
    ]
  },
  {
    id: 3,
    donorName: "Patricia Williams",
    donorId: "3",
    pledgeAmount: "$100,000",
    pledgeRemaining: "$35,000",
    pledgeDate: "Jun 15, 2022",
    expirationDate: "Jun 15, 2025",
    daysUntilExpiration: 180,
    campaign: "Endowment Fund",
    paymentSchedule: "Annual",
    lastPayment: "Jun 15, 2024",
    lastPaymentAmount: "$25,000",
    contactPhone: "(614) 555-0234",
    contactEmail: "p.williams@foundation.org",
    urgency: "low",
    nextSteps: [
      { action: "Schedule stewardship meeting", type: "meeting", priority: "Medium", dueDate: "Feb 1" },
      { action: "Prepare impact report", type: "document", priority: "Low", dueDate: "Feb 15" },
    ]
  },
];

const summaryStats = {
  totalExpiring: 3,
  totalAtRisk: "$60,000",
  avgDaysToExpiration: 94,
  highUrgency: 1,
};

function getActionGuidance(step: NextStep, pledge: Pledge) {
  const firstName = pledge.donorName.split(" ")[0];
  
  switch (step.type) {
    case "call":
      return {
        title: "Phone Call Guidance",
        sections: [
          {
            heading: "Contact Information",
            content: `${pledge.donorName}\n${pledge.contactPhone}`,
            copyable: pledge.contactPhone,
          },
          {
            heading: "Call Objective",
            content: `Remind ${firstName} about their pledge commitment and discuss fulfillment timeline. Their pledge of ${pledge.pledgeAmount} to the ${pledge.campaign} expires on ${pledge.expirationDate}, with ${pledge.pledgeRemaining} remaining.`,
          },
          {
            heading: "Suggested Talking Points",
            bullets: [
              `Thank ${firstName} for their generous commitment to the ${pledge.campaign}`,
              `Share a brief impact update on what their previous payments have helped accomplish`,
              `Gently remind them that ${pledge.pledgeRemaining} remains on their pledge`,
              `Ask if their current ${pledge.paymentSchedule.toLowerCase()} payment schedule still works`,
              `Offer to discuss alternative payment arrangements if needed`,
              `Confirm the best way to send payment reminders`,
            ],
          },
          {
            heading: "Key Details to Reference",
            bullets: [
              `Last payment: ${pledge.lastPaymentAmount} on ${pledge.lastPayment}`,
              `Payment schedule: ${pledge.paymentSchedule}`,
              `Days until expiration: ${pledge.daysUntilExpiration}`,
            ],
          },
        ],
      };
    
    case "email":
      return {
        title: "Email Reminder Guidance",
        sections: [
          {
            heading: "Recipient",
            content: `${pledge.donorName}\n${pledge.contactEmail}`,
            copyable: pledge.contactEmail,
          },
          {
            heading: "Suggested Subject Line",
            content: `Thank you for your commitment to ${pledge.campaign}`,
            copyable: `Thank you for your commitment to ${pledge.campaign}`,
          },
          {
            heading: "Email Should Include",
            bullets: [
              `Personal greeting using "${firstName}"`,
              `Gratitude for their commitment to the ${pledge.campaign}`,
              `Brief impact statement about what their giving has accomplished`,
              `Gentle reminder of remaining pledge balance: ${pledge.pledgeRemaining}`,
              `Pledge expiration date: ${pledge.expirationDate}`,
              `Clear call-to-action with payment options`,
              `Offer to discuss if circumstances have changed`,
            ],
          },
          {
            heading: "Tone Guidelines",
            content: "Keep the tone warm and appreciative, not demanding. Focus on partnership and impact rather than obligation. Make it easy for them to respond with questions.",
          },
        ],
      };
    
    case "mail":
      return {
        title: "Pledge Fulfillment Letter",
        sections: [
          {
            heading: "Recipient",
            content: pledge.donorName,
          },
          {
            heading: "Letter Should Include",
            bullets: [
              `Personalized salutation to ${firstName}`,
              `Thank you for their ${pledge.pledgeAmount} commitment`,
              `Summary of impact from their previous contributions`,
              `Clear statement of remaining balance: ${pledge.pledgeRemaining}`,
              `Pledge expiration reminder: ${pledge.expirationDate}`,
              `Payment remittance envelope or online payment instructions`,
              `Contact information for questions`,
            ],
          },
          {
            heading: "Recommended Enclosures",
            bullets: [
              "Pre-addressed return envelope",
              "One-page impact summary specific to their campaign",
              "Payment options card with online giving URL",
            ],
          },
        ],
      };
    
    case "meeting":
      return {
        title: "Stewardship Meeting Guidance",
        sections: [
          {
            heading: "Contact to Schedule",
            content: `${pledge.donorName}\n${pledge.contactPhone}\n${pledge.contactEmail}`,
            copyable: pledge.contactEmail,
          },
          {
            heading: "Meeting Objectives",
            bullets: [
              `Strengthen relationship with ${firstName}`,
              `Share comprehensive impact report from their giving`,
              `Discuss their vision for continued partnership`,
              `Address any questions about pledge fulfillment`,
              `Explore potential for future giving beyond current pledge`,
            ],
          },
          {
            heading: "Agenda Topics",
            bullets: [
              `Welcome and personal check-in (5 min)`,
              `Impact presentation: How their ${pledge.pledgeAmount} commitment has made a difference (15 min)`,
              `Pledge status discussion: ${pledge.pledgeRemaining} remaining, expires ${pledge.expirationDate} (10 min)`,
              `Future vision and engagement opportunities (10 min)`,
              `Next steps and follow-up (5 min)`,
            ],
          },
          {
            heading: "Preparation Checklist",
            bullets: [
              "Prepare personalized impact report",
              "Review their complete giving history",
              "Identify 2-3 specific outcomes from their support",
              "Have pledge fulfillment options ready",
              "Prepare thank-you gift if appropriate",
            ],
          },
        ],
      };
    
    case "document":
      if (step.action.toLowerCase().includes("payment options")) {
        return {
          title: "Payment Options Memo",
          sections: [
            {
              heading: "Purpose",
              content: `Prepare a memo outlining flexible payment options for ${pledge.donorName} to fulfill their remaining ${pledge.pledgeRemaining} commitment before ${pledge.expirationDate}.`,
            },
            {
              heading: "Payment Options to Include",
              bullets: [
                `Lump sum payment of ${pledge.pledgeRemaining}`,
                `Continue current ${pledge.paymentSchedule.toLowerCase()} schedule`,
                `Accelerated payment plan (e.g., monthly payments)`,
                `Stock transfer or appreciated securities`,
                `Donor-advised fund distribution`,
                `Credit card or ACH recurring payments`,
              ],
            },
            {
              heading: "Document Should Include",
              bullets: [
                "Current pledge summary and payment history",
                "Clear deadline reminder",
                "All available payment methods",
                "Contact information for questions",
                "Tax deductibility information",
              ],
            },
          ],
        };
      } else if (step.action.toLowerCase().includes("impact report")) {
        return {
          title: "Impact Report Preparation",
          sections: [
            {
              heading: "Purpose",
              content: `Create a personalized impact report for ${pledge.donorName} showing how their ${pledge.pledgeAmount} commitment to ${pledge.campaign} has made a difference.`,
            },
            {
              heading: "Report Should Include",
              bullets: [
                "Executive summary of their giving impact",
                "Specific programs or projects funded",
                "Beneficiary stories or testimonials",
                "Key metrics and outcomes achieved",
                "Photos or visuals of impact",
                "Future plans for their remaining contribution",
              ],
            },
            {
              heading: "Personalization Tips",
              bullets: [
                `Reference their specific ${pledge.campaign} commitment`,
                `Include a personal thank-you message`,
                `Highlight outcomes aligned with their interests`,
                `Show timeline of their payments and impact`,
              ],
            },
          ],
        };
      } else {
        return {
          title: "Review Giving History",
          sections: [
            {
              heading: "Purpose",
              content: `Review ${pledge.donorName}'s complete giving history to prepare for engagement and identify patterns.`,
            },
            {
              heading: "Key Areas to Review",
              bullets: [
                "Total lifetime giving amount",
                "Giving frequency and consistency",
                "Campaign preferences and designations",
                "Payment method preferences",
                "Response to previous communications",
                "Event attendance history",
              ],
            },
            {
              heading: "Current Pledge Details",
              bullets: [
                `Pledge amount: ${pledge.pledgeAmount}`,
                `Remaining: ${pledge.pledgeRemaining}`,
                `Last payment: ${pledge.lastPaymentAmount} on ${pledge.lastPayment}`,
                `Payment schedule: ${pledge.paymentSchedule}`,
              ],
            },
          ],
        };
      }
    
    default:
      return {
        title: "Action Guidance",
        sections: [
          {
            heading: "Action Required",
            content: step.action,
          },
          {
            heading: "Donor Information",
            content: `${pledge.donorName}\n${pledge.contactPhone}\n${pledge.contactEmail}`,
          },
        ],
      };
  }
}

export default function PledgesExpiring() {
  const [selectedStep, setSelectedStep] = useState<{ step: NextStep; pledge: Pledge } | null>(null);
  const { toast } = useToast();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return accentColors.coral;
      case "medium": return accentColors.orange;
      default: return accentColors.olive;
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "call": return Phone;
      case "email": return Mail;
      case "mail": return FileText;
      case "document": return FileText;
      case "meeting": return Calendar;
      default: return CheckCircle2;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: text,
    });
  };

  const guidance = selectedStep ? getActionGuidance(selectedStep.step, selectedStep.pledge) : null;

  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Action Guidance Dialog */}
      <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {guidance && selectedStep && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColors.sky}15` }}
                  >
                    {(() => {
                      const Icon = getActionIcon(selectedStep.step.type);
                      return <Icon className="w-5 h-5" style={{ color: accentColors.sky }} />;
                    })()}
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{guidance.title}</DialogTitle>
                    <DialogDescription>
                      {selectedStep.step.action} for {selectedStep.pledge.donorName}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                {guidance.sections.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                      {section.heading}
                    </h3>
                    
                    {section.content && (
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm whitespace-pre-line">{section.content}</p>
                        {section.copyable && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                            onClick={() => copyToClipboard(section.copyable!)}
                            data-testid={`copy-${idx}`}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    )}
                    
                    {section.bullets && (
                      <ul className="space-y-2">
                        {section.bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                
                <div className="flex gap-3 pt-4 border-t">
                  {selectedStep.step.type === "call" && (
                    <Button 
                      className="gap-2"
                      onClick={() => window.open(`tel:${selectedStep.pledge.contactPhone}`)}
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </Button>
                  )}
                  {selectedStep.step.type === "email" && (
                    <Button 
                      className="gap-2"
                      onClick={() => window.open(`mailto:${selectedStep.pledge.contactEmail}`)}
                    >
                      <Mail className="w-4 h-4" />
                      Open Email
                    </Button>
                  )}
                  <Link href={`/donors/${selectedStep.pledge.donorId}`}>
                    <Button variant="outline" className="gap-2">
                      <User className="w-4 h-4" />
                      View Donor Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${accentColors.orange}15` }}
          >
            <AlertTriangle className="w-6 h-6" style={{ color: accentColors.orange }} />
          </div>
          <div>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1.5 mb-2 -ml-2" data-testid="button-back-dashboard">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Expiring Pledges</h1>
            <p className="text-muted-foreground">Pledges requiring attention and recommended next steps</p>
          </div>
        </div>
        <Link href="/gifts/planned">
          <Button variant="outline" className="gap-2" data-testid="back-to-planned-gifts">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Planned Gifts
          </Button>
        </Link>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${accentColors.orange}15` }}
              >
                <AlertTriangle className="w-5 h-5" style={{ color: accentColors.orange }} />
              </div>
              <div>
                <p className="text-2xl font-bold">{summaryStats.totalExpiring}</p>
                <p className="text-xs text-muted-foreground">Pledges Expiring</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${accentColors.coral}15` }}
              >
                <DollarSign className="w-5 h-5" style={{ color: accentColors.coral }} />
              </div>
              <div>
                <p className="text-2xl font-bold">{summaryStats.totalAtRisk}</p>
                <p className="text-xs text-muted-foreground">At Risk Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${accentColors.sky}15` }}
              >
                <Clock className="w-5 h-5" style={{ color: accentColors.sky }} />
              </div>
              <div>
                <p className="text-2xl font-bold">{summaryStats.avgDaysToExpiration}</p>
                <p className="text-xs text-muted-foreground">Avg Days to Expiration</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${accentColors.coral}15` }}
              >
                <Sparkles className="w-5 h-5" style={{ color: accentColors.coral }} />
              </div>
              <div>
                <p className="text-2xl font-bold">{summaryStats.highUrgency}</p>
                <p className="text-xs text-muted-foreground">High Urgency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expiring Pledges List */}
      <div className="space-y-6">
        {expiringPledges.map((pledge) => {
          const urgencyColor = getUrgencyColor(pledge.urgency);
          
          return (
            <Card key={pledge.id} className="overflow-hidden" data-testid={`pledge-card-${pledge.id}`}>
              <CardHeader 
                className="text-white rounded-t-lg"
                style={{ backgroundColor: urgencyColor }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">{pledge.donorName}</CardTitle>
                      <CardDescription className="text-white/80">
                        {pledge.campaign}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      variant="secondary" 
                      className="bg-white/20 text-white border-0 uppercase text-xs font-bold"
                    >
                      {pledge.urgency} urgency
                    </Badge>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{pledge.pledgeRemaining}</p>
                      <p className="text-xs text-white/80">remaining of {pledge.pledgeAmount}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Pledge Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      Pledge Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pledge Date</span>
                        <span className="font-medium">{pledge.pledgeDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expiration Date</span>
                        <span className="font-medium" style={{ color: urgencyColor }}>{pledge.expirationDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Days Until Expiration</span>
                        <Badge 
                          variant="outline" 
                          className="font-bold"
                          style={{ borderColor: urgencyColor, color: urgencyColor }}
                        >
                          {pledge.daysUntilExpiration} days
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Schedule</span>
                        <span className="font-medium">{pledge.paymentSchedule}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Payment</span>
                        <span className="font-medium">{pledge.lastPayment} ({pledge.lastPaymentAmount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <a 
                        href={`tel:${pledge.contactPhone}`}
                        className="flex items-center gap-3 p-3 rounded-lg border hover-elevate transition-all"
                        style={{ borderColor: `${accentColors.sky}30`, backgroundColor: `${accentColors.sky}05` }}
                      >
                        <div 
                          className="w-8 h-8 rounded-md flex items-center justify-center"
                          style={{ backgroundColor: `${accentColors.sky}15` }}
                        >
                          <Phone className="w-4 h-4" style={{ color: accentColors.sky }} />
                        </div>
                        <span className="text-sm font-medium">{pledge.contactPhone}</span>
                      </a>
                      <a 
                        href={`mailto:${pledge.contactEmail}`}
                        className="flex items-center gap-3 p-3 rounded-lg border hover-elevate transition-all"
                        style={{ borderColor: `${accentColors.teal}30`, backgroundColor: `${accentColors.teal}05` }}
                      >
                        <div 
                          className="w-8 h-8 rounded-md flex items-center justify-center"
                          style={{ backgroundColor: `${accentColors.teal}15` }}
                        >
                          <Mail className="w-4 h-4" style={{ color: accentColors.teal }} />
                        </div>
                        <span className="text-sm font-medium truncate">{pledge.contactEmail}</span>
                      </a>
                      <Link href={`/donors/${pledge.donorId}`}>
                        <Button 
                          variant="outline" 
                          className="w-full gap-2 mt-2"
                          data-testid={`view-donor-${pledge.id}`}
                        >
                          <User className="w-4 h-4" />
                          View Donor Profile
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Recommended Next Steps */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4" style={{ color: accentColors.sky }} />
                      Recommended Next Steps
                    </h3>
                    <div className="space-y-2">
                      {pledge.nextSteps.map((step, idx) => {
                        const StepIcon = getActionIcon(step.type);
                        const priorityColor = step.priority === "High" ? accentColors.coral : 
                                              step.priority === "Medium" ? accentColors.orange : accentColors.olive;
                        return (
                          <button 
                            key={idx}
                            onClick={() => setSelectedStep({ step, pledge })}
                            className="w-full flex items-center gap-3 p-3 rounded-lg border hover-elevate transition-all cursor-pointer text-left"
                            style={{ borderColor: `${priorityColor}30`, backgroundColor: `${priorityColor}05` }}
                            data-testid={`next-step-${pledge.id}-${idx}`}
                          >
                            <div 
                              className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                              style={{ backgroundColor: `${priorityColor}15` }}
                            >
                              <StepIcon className="w-4 h-4" style={{ color: priorityColor }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{step.action}</p>
                              <p className="text-xs text-muted-foreground">Due: {step.dueDate}</p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className="text-xs shrink-0"
                              style={{ borderColor: priorityColor, color: priorityColor }}
                            >
                              {step.priority}
                            </Badge>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

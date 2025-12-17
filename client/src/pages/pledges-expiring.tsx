import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Calendar, 
  DollarSign, 
  Phone, 
  Mail, 
  FileText, 
  ArrowRight,
  Clock,
  User,
  Building2,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";

const accentColors = {
  teal: "#2A9D8F",
  olive: "#6B8E23",
  orange: "#E76F51",
  coral: "#E07A5F",
  sky: "#4A90A4",
  lime: "#84a98c",
};

const expiringPledges = [
  {
    id: 1,
    donorName: "Margaret Thompson",
    donorId: "donor-1",
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
    donorId: "donor-2",
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
    donorId: "donor-3",
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

export default function PledgesExpiring() {
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

  return (
    <div className="p-6 space-y-6 overflow-auto">
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
                          <div 
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-lg border hover-elevate transition-all cursor-pointer"
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
                          </div>
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

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  Wand2, 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Mail, 
  Users, 
  Target,
  TrendingUp,
  UserPlus,
  RefreshCw,
  CheckCircle2,
  Clock,
  User
} from "lucide-react";

interface WeeklyConstraints {
  meetings: number;
  calls: number;
  emails: number;
}

interface ActionableMove {
  id: string;
  donorName: string;
  currentQuadrant: "Partner" | "Friend" | "Colleague" | "Acquaintance";
  targetQuadrant: "Partner" | "Friend" | "Colleague";
  suggestedAction: string;
  recommendedOwner: string;
  targetDate: string;
  actionType: "meeting" | "call" | "email";
  priority: number;
}

type FocusArea = 
  | "grow-partners" 
  | "strengthen-partners" 
  | "activate-friends" 
  | "reengage-colleagues" 
  | "surface-acquaintances";

const focusOptions = [
  {
    value: "grow-partners",
    label: "Grow number of Partners",
    description: "Focus on moving Friends and Colleagues to Partner status",
    icon: UserPlus,
  },
  {
    value: "strengthen-partners",
    label: "Strengthen current Partners",
    description: "Deepen relationships with existing Partners",
    icon: TrendingUp,
  },
  {
    value: "activate-friends",
    label: "Activate high-capacity Friends",
    description: "Engage Friends with strong giving potential",
    icon: Target,
  },
  {
    value: "reengage-colleagues",
    label: "Re-engage drifting Colleagues",
    description: "Reconnect with Colleagues showing reduced engagement",
    icon: RefreshCw,
  },
  {
    value: "surface-acquaintances",
    label: "Surface hidden Acquaintances worth upgrading",
    description: "Identify promising Acquaintances for cultivation",
    icon: Users,
  },
];

// Mock data generator based on focus
const generateActionPlan = (
  constraints: WeeklyConstraints,
  focus: FocusArea
): ActionableMove[] => {
  const baseMoves: Record<FocusArea, ActionableMove[]> = {
    "grow-partners": [
      {
        id: "1",
        donorName: "Evelyn Moore",
        currentQuadrant: "Friend",
        targetQuadrant: "Partner",
        suggestedAction: "Schedule 90-minute vision lunch to discuss long-term partnership opportunities",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-20",
        actionType: "meeting",
        priority: 1,
      },
      {
        id: "2",
        donorName: "Brandon Cole",
        currentQuadrant: "Colleague",
        targetQuadrant: "Partner",
        suggestedAction: "Share draft 3-year commitment concept and follow up with strategic call",
        recommendedOwner: "Ben Davis",
        targetDate: "2025-11-21",
        actionType: "email",
        priority: 2,
      },
      {
        id: "3",
        donorName: "Daniel King",
        currentQuadrant: "Colleague",
        targetQuadrant: "Partner",
        suggestedAction: "Invite to small strategy dinner with board members Thompson and Wu",
        recommendedOwner: "Maria Garcia",
        targetDate: "2025-11-22",
        actionType: "call",
        priority: 3,
      },
    ],
    "strengthen-partners": [
      {
        id: "4",
        donorName: "Patricia Chen",
        currentQuadrant: "Partner",
        targetQuadrant: "Partner",
        suggestedAction: "Quarterly impact review meeting - share program outcomes they funded",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-19",
        actionType: "meeting",
        priority: 1,
      },
      {
        id: "5",
        donorName: "Michael Thompson",
        currentQuadrant: "Partner",
        targetQuadrant: "Partner",
        suggestedAction: "Personal thank you call for recent major gift and discuss legacy planning",
        recommendedOwner: "Ben Davis",
        targetDate: "2025-11-20",
        actionType: "call",
        priority: 2,
      },
    ],
    "activate-friends": [
      {
        id: "6",
        donorName: "Alice Hart",
        currentQuadrant: "Friend",
        targetQuadrant: "Partner",
        suggestedAction: "60-minute coffee to explore specific project alignment with their interests",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-21",
        actionType: "meeting",
        priority: 1,
      },
      {
        id: "7",
        donorName: "Amanda Foster",
        currentQuadrant: "Friend",
        targetQuadrant: "Partner",
        suggestedAction: "Invite to join development committee - capitalize on their advocacy",
        recommendedOwner: "Maria Garcia",
        targetDate: "2025-11-22",
        actionType: "email",
        priority: 2,
      },
    ],
    "reengage-colleagues": [
      {
        id: "8",
        donorName: "Robert Morrison",
        currentQuadrant: "Colleague",
        targetQuadrant: "Partner",
        suggestedAction: "Follow up on capital campaign inquiry from gala with case for support",
        recommendedOwner: "Ben Davis",
        targetDate: "2025-11-20",
        actionType: "call",
        priority: 1,
      },
      {
        id: "9",
        donorName: "Jennifer Wu",
        currentQuadrant: "Colleague",
        targetQuadrant: "Partner",
        suggestedAction: "Explore beyond-match giving opportunity - they maxed corporate match",
        recommendedOwner: "Sarah Chen",
        targetDate: "2025-11-21",
        actionType: "email",
        priority: 2,
      },
    ],
    "surface-acquaintances": [
      {
        id: "10",
        donorName: "Lisa Rodriguez",
        currentQuadrant: "Acquaintance",
        targetQuadrant: "Colleague",
        suggestedAction: "Phone call to gauge interest - high email engagement signals",
        recommendedOwner: "James Wilson",
        targetDate: "2025-11-22",
        actionType: "call",
        priority: 1,
      },
      {
        id: "11",
        donorName: "David Patel",
        currentQuadrant: "Acquaintance",
        targetQuadrant: "Colleague",
        suggestedAction: "Follow-up thank you call after first event attendance last week",
        recommendedOwner: "Maria Garcia",
        targetDate: "2025-11-23",
        actionType: "call",
        priority: 2,
      },
    ],
  };

  // Filter based on constraints
  const allMoves = baseMoves[focus];
  let selectedMoves: ActionableMove[] = [];
  let meetingsCount = 0;
  let callsCount = 0;
  let emailsCount = 0;

  for (const move of allMoves) {
    if (move.actionType === "meeting" && meetingsCount < constraints.meetings) {
      selectedMoves.push(move);
      meetingsCount++;
    } else if (move.actionType === "call" && callsCount < constraints.calls) {
      selectedMoves.push(move);
      callsCount++;
    } else if (move.actionType === "email" && emailsCount < constraints.emails) {
      selectedMoves.push(move);
      emailsCount++;
    }
  }

  return selectedMoves;
};

export default function PartnerPathwayWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [constraints, setConstraints] = useState<WeeklyConstraints>({
    meetings: 3,
    calls: 5,
    emails: 10,
  });
  const [focus, setFocus] = useState<FocusArea>("grow-partners");
  const [actionPlan, setActionPlan] = useState<ActionableMove[]>([]);
  
  // Track raw input values and validation errors
  const [inputValues, setInputValues] = useState({
    meetings: "3",
    calls: "5",
    emails: "10",
  });
  const [errors, setErrors] = useState({
    meetings: "",
    calls: "",
    emails: "",
  });

  // Validate constraints
  const isStep1Valid = () => {
    return (
      !isNaN(constraints.meetings) &&
      !isNaN(constraints.calls) &&
      !isNaN(constraints.emails) &&
      constraints.meetings >= 0 &&
      constraints.calls >= 0 &&
      constraints.emails >= 0 &&
      constraints.meetings > 0 ||
      constraints.calls > 0 ||
      constraints.emails > 0
    );
  };

  const validateField = (field: keyof WeeklyConstraints, value: string): string => {
    if (value === "") {
      return "This field is required";
    }
    const numValue = parseInt(value);
    if (isNaN(numValue)) {
      return "Please enter a valid number";
    }
    if (numValue < 0) {
      return "Value must be 0 or greater";
    }
    return "";
  };

  const handleConstraintChange = (field: keyof WeeklyConstraints, value: string) => {
    // Update raw input value
    setInputValues({
      ...inputValues,
      [field]: value,
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const handleConstraintBlur = (field: keyof WeeklyConstraints) => {
    const value = inputValues[field];
    const error = validateField(field, value);
    
    setErrors({
      ...errors,
      [field]: error,
    });
    
    // Update constraints if valid
    if (!error) {
      const numValue = parseInt(value);
      setConstraints({
        ...constraints,
        [field]: numValue,
      });
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      // Generate action plan
      const plan = generateActionPlan(constraints, focus);
      setActionPlan(plan);
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setConstraints({ meetings: 3, calls: 5, emails: 10 });
    setInputValues({ meetings: "3", calls: "5", emails: "10" });
    setErrors({ meetings: "", calls: "", emails: "" });
    setFocus("grow-partners");
    setActionPlan([]);
  };

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case "Partner":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "Friend":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      case "Colleague":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "Acquaintance":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "meeting":
        return Calendar;
      case "call":
        return Phone;
      case "email":
        return Mail;
      default:
        return Target;
    }
  };

  return (
    <Card>
      <CardHeader 
        className="p-6 pb-4 flex items-start justify-between"
        style={{ backgroundColor: "rgba(222, 235, 247, 0.5)" }}
      >
        <div className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-primary" />
          <div>
            <CardTitle>PARTNER PATHWAY WIZARD</CardTitle>
            <CardDescription className="mt-1">
              A Guided Workflow to Generate Your Top 5-10 Actionable Moves for the Week
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Step Indicators */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                    currentStep >= step
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }`}
                  data-testid={`step-indicator-${step}`}
                >
                  {currentStep > step ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
                {step < 4 && (
                  <div
                    className={`h-1 w-20 ${
                      currentStep > step ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span className={currentStep === 1 ? "text-blue-600" : ""}>Constraints</span>
            <span className={currentStep === 2 ? "text-blue-600" : ""}>Focus</span>
            <span className={currentStep === 3 ? "text-blue-600" : ""}>Review</span>
            <span className={currentStep === 4 ? "text-blue-600" : ""}>Action Plan</span>
          </div>
        </div>

        {/* Step 1: Weekly Constraints */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Set This Week's Constraints</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Help us understand your capacity so we don't suggest more than you can realistically accomplish.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meetings" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  How many 1:1 meetings can you take this week?
                </Label>
                <Input
                  id="meetings"
                  type="number"
                  min="0"
                  max="20"
                  value={inputValues.meetings}
                  onChange={(e) => handleConstraintChange("meetings", e.target.value)}
                  onBlur={() => handleConstraintBlur("meetings")}
                  data-testid="input-meetings"
                  className={errors.meetings ? "border-red-500" : ""}
                />
                {errors.meetings && (
                  <p className="text-sm text-red-500" data-testid="error-meetings">
                    {errors.meetings}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="calls" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  How many warm calls can you make?
                </Label>
                <Input
                  id="calls"
                  type="number"
                  min="0"
                  max="50"
                  value={inputValues.calls}
                  onChange={(e) => handleConstraintChange("calls", e.target.value)}
                  onBlur={() => handleConstraintBlur("calls")}
                  data-testid="input-calls"
                  className={errors.calls ? "border-red-500" : ""}
                />
                {errors.calls && (
                  <p className="text-sm text-red-500" data-testid="error-calls">
                    {errors.calls}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emails" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  How many personalized emails/proposals can you send?
                </Label>
                <Input
                  id="emails"
                  type="number"
                  min="0"
                  max="100"
                  value={inputValues.emails}
                  onChange={(e) => handleConstraintChange("emails", e.target.value)}
                  onBlur={() => handleConstraintBlur("emails")}
                  data-testid="input-emails"
                  className={errors.emails ? "border-red-500" : ""}
                />
                {errors.emails && (
                  <p className="text-sm text-red-500" data-testid="error-emails">
                    {errors.emails}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Choose Focus */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Your Focus</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Select the primary goal for this week's donor engagement efforts.
              </p>
            </div>

            <RadioGroup value={focus} onValueChange={(v) => setFocus(v as FocusArea)}>
              <div className="space-y-3">
                {focusOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.value}
                      className={`flex items-start space-x-3 rounded-lg border-2 p-4 transition-colors hover-elevate ${
                        focus === option.value
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/20"
                          : "border-gray-200"
                      }`}
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={option.value}
                        className="mt-1"
                        data-testid={`radio-${option.value}`}
                      />
                      <label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4" />
                          <span className="font-semibold">{option.label}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Review Your Selections</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Confirm your capacity and focus before we generate your action plan.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border p-4 space-y-3" data-testid="capacity-summary">
                <h4 className="font-semibold text-sm">Weekly Capacity</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center" data-testid="summary-meetings">
                    <Calendar className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                    <div className="text-2xl font-bold">{constraints.meetings}</div>
                    <div className="text-xs text-muted-foreground">Meetings</div>
                  </div>
                  <div className="text-center" data-testid="summary-calls">
                    <Phone className="h-5 w-5 mx-auto mb-1 text-green-600" />
                    <div className="text-2xl font-bold">{constraints.calls}</div>
                    <div className="text-xs text-muted-foreground">Calls</div>
                  </div>
                  <div className="text-center" data-testid="summary-emails">
                    <Mail className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                    <div className="text-2xl font-bold">{constraints.emails}</div>
                    <div className="text-xs text-muted-foreground">Emails</div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4" data-testid="focus-summary">
                <h4 className="font-semibold text-sm mb-2">Focus Area</h4>
                <div className="flex items-center gap-2">
                  {(() => {
                    const selectedOption = focusOptions.find(opt => opt.value === focus);
                    const Icon = selectedOption?.icon || Target;
                    return (
                      <>
                        <Icon className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{selectedOption?.label}</span>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Action Plan */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Weekly Action Plan</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Here are your top {actionPlan.length} recommended moves for this week, optimized for your capacity and focus.
              </p>
            </div>

            {actionPlan.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No actions match your current constraints. Try adjusting your capacity.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {actionPlan.map((move, index) => {
                  const ActionIcon = getActionIcon(move.actionType);
                  return (
                    <div
                      key={move.id}
                      className="rounded-lg border p-4 space-y-3"
                      data-testid={`action-plan-${move.id}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                              {index + 1}
                            </div>
                            <h4 className="font-semibold">{move.donorName}</h4>
                            <Badge variant="outline" className={getQuadrantColor(move.currentQuadrant)}>
                              {move.currentQuadrant}
                            </Badge>
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <Badge variant="outline" className={getQuadrantColor(move.targetQuadrant)}>
                              {move.targetQuadrant}
                            </Badge>
                          </div>
                          <p className="text-sm">{move.suggestedAction}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {move.recommendedOwner}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(move.targetDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <ActionIcon className="h-3 w-3" />
                              {move.actionType}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" data-testid={`button-assign-${move.id}`}>
                          Assign
                        </Button>
                        <Button size="sm" variant="outline" data-testid={`button-calendar-${move.id}`}>
                          <Calendar className="h-3 w-3 mr-1" />
                          Add to Calendar
                        </Button>
                        <Button size="sm" variant="outline" data-testid={`button-complete-${move.id}`}>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Mark Complete
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {currentStep > 1 && currentStep < 4 && (
            <Button variant="outline" onClick={handleBack} data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          {currentStep === 4 && (
            <Button variant="outline" onClick={handleReset} data-testid="button-start-over">
              <RefreshCw className="h-4 w-4 mr-2" />
              Start Over
            </Button>
          )}
        </div>
        <div>
          {currentStep < 4 && (
            <Button 
              onClick={handleNext} 
              data-testid="button-next"
              disabled={currentStep === 1 && !isStep1Valid()}
            >
              {currentStep === 3 ? "Generate Action Plan" : "Next"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

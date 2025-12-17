import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Sparkles, 
  Send, 
  Heart, 
  Users, 
  Home, 
  TrendingUp,
  Calendar,
  BookOpen,
  Quote,
  Target,
  Award,
  Clock,
  Filter,
  Search,
  Bookmark,
  BookmarkCheck,
  Share2,
  Copy,
  CheckCircle2,
  Loader2,
  Bot,
  User,
  Building2,
  Star,
  ArrowRight
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";

const impactTabs: SectionTab[] = [
  {
    label: "AI Assistant",
    value: "chat",
    icon: MessageSquare,
    path: "/reporting/impact-intelligence",
  },
  {
    label: "Impact Feed",
    value: "feed",
    icon: Sparkles,
    path: "/reporting/impact-intelligence/feed",
  },
];

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ImpactStory {
  id: string;
  title: string;
  summary: string;
  fullStory: string;
  category: "resident" | "program" | "community" | "staff";
  programArea: string;
  metrics?: { label: string; value: string }[];
  date: string;
  location: string;
  saved: boolean;
  tags: string[];
}

interface ImpactMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  programArea: string;
  period: string;
}

const sampleStories: ImpactStory[] = [
  {
    id: "1",
    title: "Margaret's Journey to Independence",
    summary: "After hip replacement surgery, 82-year-old Margaret regained her independence through our Home Health program.",
    fullStory: "Margaret Thompson, an 82-year-old resident of our Columbus community, faced significant challenges after her hip replacement surgery. Through our dedicated Home Health program, she received in-home physical therapy three times weekly. Within 8 weeks, Margaret was walking independently and even returned to her beloved garden club. 'The therapists didn't just help me walk again,' Margaret says, 'they gave me my life back.'",
    category: "resident",
    programArea: "Home Health",
    metrics: [
      { label: "Recovery Time", value: "8 weeks" },
      { label: "Therapy Sessions", value: "24" },
      { label: "Independence Score", value: "95%" }
    ],
    date: "2025-12-10",
    location: "Columbus, OH",
    saved: false,
    tags: ["success story", "home health", "rehabilitation", "senior care"]
  },
  {
    id: "2", 
    title: "Memory Care Music Therapy Success",
    summary: "Our innovative music therapy program showed remarkable results with 78% of participants showing improved cognitive engagement.",
    fullStory: "Our Memory Care communities launched an innovative music therapy program in Q3 2025, partnering with the Columbus School of Music. Residents participate in twice-weekly sessions featuring familiar songs from their youth. Results have exceeded expectations: 78% of participants showed improved cognitive engagement, 65% demonstrated better mood regulation, and family members report more meaningful visits. The program now serves 340 residents across 12 communities.",
    category: "program",
    programArea: "Memory Care",
    metrics: [
      { label: "Participants", value: "340" },
      { label: "Improved Engagement", value: "78%" },
      { label: "Communities", value: "12" }
    ],
    date: "2025-12-08",
    location: "Multiple Locations",
    saved: true,
    tags: ["memory care", "music therapy", "innovation", "outcomes"]
  },
  {
    id: "3",
    title: "Affordable Housing Expansion Impact",
    summary: "New 120-unit development provided homes for 280 seniors, with 40% previously experiencing housing insecurity.",
    fullStory: "The Riverside Commons development, completed in October 2025, represents NCR's commitment to affordable senior housing. This 120-unit community now houses 280 seniors, 40% of whom were previously experiencing housing insecurity. Average resident income is $18,400/year, and 100% of units are rented at or below 60% AMI. The development includes a community garden, wellness center, and on-site care coordination services.",
    category: "community",
    programArea: "Affordable Housing",
    metrics: [
      { label: "Units", value: "120" },
      { label: "Residents Served", value: "280" },
      { label: "Previously Housing Insecure", value: "40%" }
    ],
    date: "2025-12-05",
    location: "Riverside, OH",
    saved: false,
    tags: ["affordable housing", "community development", "housing security"]
  },
  {
    id: "4",
    title: "Volunteer Hours Milestone",
    summary: "Community volunteers contributed over 15,000 hours in Q4, equivalent to $435,000 in value.",
    fullStory: "NCR's volunteer program reached a significant milestone in Q4 2025, with 842 active volunteers contributing 15,234 hours of service. This represents a 23% increase over Q4 2024. Volunteers supported meal delivery, companionship visits, activity programming, and administrative tasks. Using Independent Sector's value of $28.54/hour, this volunteer service represents $434,778 in contributed value to our mission.",
    category: "community",
    programArea: "Volunteer Services",
    metrics: [
      { label: "Volunteer Hours", value: "15,234" },
      { label: "Active Volunteers", value: "842" },
      { label: "Contributed Value", value: "$434,778" }
    ],
    date: "2025-12-01",
    location: "All Communities",
    saved: false,
    tags: ["volunteers", "community engagement", "milestone"]
  },
  {
    id: "5",
    title: "Chaplaincy Grief Support Groups",
    summary: "New grief support program served 156 participants with 92% reporting improved coping abilities.",
    fullStory: "Our Chaplaincy Services launched dedicated grief support groups in 2025, recognizing the profound loss many seniors experience. The 8-week program, led by trained chaplains and counselors, served 156 participants across 18 groups. Post-program surveys showed 92% of participants reported improved coping abilities, and 87% said they felt less isolated in their grief. The program has been so successful that we're expanding to all communities in 2026.",
    category: "program",
    programArea: "Chaplaincy",
    metrics: [
      { label: "Participants", value: "156" },
      { label: "Improved Coping", value: "92%" },
      { label: "Groups Held", value: "18" }
    ],
    date: "2025-11-28",
    location: "Multiple Locations",
    saved: true,
    tags: ["chaplaincy", "grief support", "mental health", "spiritual care"]
  }
];

const sampleMetrics: ImpactMetric[] = [
  { id: "1", label: "Residents Served", value: "12,847", change: "+8%", trend: "up", programArea: "All Programs", period: "YTD 2025" },
  { id: "2", label: "Home Health Visits", value: "48,234", change: "+12%", trend: "up", programArea: "Home Health", period: "YTD 2025" },
  { id: "3", label: "Volunteer Hours", value: "52,341", change: "+23%", trend: "up", programArea: "Volunteer Services", period: "YTD 2025" },
  { id: "4", label: "Affordable Units", value: "4,200", change: "+180", trend: "up", programArea: "Affordable Housing", period: "Current" },
  { id: "5", label: "Resident Satisfaction", value: "94%", change: "+2%", trend: "up", programArea: "All Programs", period: "Q4 2025" },
  { id: "6", label: "Staff Retention", value: "87%", change: "+5%", trend: "up", programArea: "All Programs", period: "2025" },
];

const suggestedQuestions = [
  "What were our top outcomes in Memory Care this year?",
  "Give me 3 resident success stories for a donor report",
  "How many seniors did we serve through Home Health in Q4?",
  "What's our volunteer engagement data for 2025?",
  "Summarize our affordable housing impact for a grant proposal",
];

export function AIChatTab() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/impact-intelligence/chat", { 
        message: inputValue,
        context: "philanthropy_reporting"
      });
      const data = await response.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.reply || "I apologize, but I couldn't process that request. Please try again.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Impact Intelligence Assistant</h1>
        <p className="text-muted-foreground">
          Ask any question about program outcomes, resident stories, and impact metrics for your donor reports.
        </p>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-3 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl">Impact Assistant</CardTitle>
                <CardDescription className="text-primary-foreground/70">Powered by AI to help you find the right stories and data</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Welcome to Impact Intelligence</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  I can help you find impact stories, outcomes data, and metrics for your donor communications and grant reports.
                </p>
                <div className="grid gap-2 w-full max-w-lg">
                  {suggestedQuestions.map((question, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="text-left justify-start h-auto py-3 px-4"
                      onClick={() => handleSuggestedQuestion(question)}
                      data-testid={`suggested-question-${idx}`}
                    >
                      <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{question}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  data-testid={`chat-message-${idx}`}
                >
                  {msg.role === "assistant" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/10">
                        <Bot className="w-4 h-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.role === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-secondary">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10">
                    <Bot className="w-4 h-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about impact stories, metrics, or outcomes..."
                disabled={isLoading}
                className="flex-1"
                data-testid="chat-input"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputValue.trim() || isLoading}
                data-testid="send-message-btn"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Stats Sidebar */}
        <div className="w-80 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sampleMetrics.slice(0, 4).map((metric) => (
                <div key={metric.id} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <div className="text-right">
                    <span className="font-semibold">{metric.value}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Recent Stories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sampleStories.slice(0, 3).map((story) => (
                <div key={story.id} className="border-b pb-2 last:border-0 last:pb-0">
                  <p className="text-sm font-medium line-clamp-1">{story.title}</p>
                  <p className="text-xs text-muted-foreground">{story.programArea}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function ImpactFeedTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterProgram, setFilterProgram] = useState<string>("all");
  const [savedStories, setSavedStories] = useState<Set<string>>(new Set(["2", "5"]));
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categoryIcons: Record<string, typeof Heart> = {
    resident: Heart,
    program: Target,
    community: Users,
    staff: Award,
  };

  const filteredStories = sampleStories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === "all" || story.category === filterCategory;
    const matchesProgram = filterProgram === "all" || story.programArea === filterProgram;
    return matchesSearch && matchesCategory && matchesProgram;
  });

  const toggleSave = (id: string) => {
    setSavedStories(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const copyToClipboard = async (story: ImpactStory) => {
    const text = `${story.title}\n\n${story.fullStory}\n\nKey Metrics:\n${story.metrics?.map(m => `• ${m.label}: ${m.value}`).join('\n') || 'N/A'}\n\nProgram: ${story.programArea}\nLocation: ${story.location}`;
    await navigator.clipboard.writeText(text);
    setCopiedId(story.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const programAreas = [...new Set(sampleStories.map(s => s.programArea))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Impact Feed</h1>
        <p className="text-muted-foreground">
          Browse and discover impact stories, outcomes, and metrics for your donor communications.
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sampleMetrics.map((metric) => (
          <Card key={metric.id} className="hover-elevate cursor-pointer" data-testid={`metric-card-${metric.id}`}>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="text-3xl font-bold">{metric.value}</p>
              <Badge 
                variant={metric.trend === "up" ? "default" : "secondary"}
                className="mt-1"
              >
                {metric.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories, tags, or keywords..."
            className="pl-10"
            data-testid="search-stories"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[160px]" data-testid="filter-category">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="resident">Resident Stories</SelectItem>
            <SelectItem value="program">Program Outcomes</SelectItem>
            <SelectItem value="community">Community Impact</SelectItem>
            <SelectItem value="staff">Staff Excellence</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterProgram} onValueChange={setFilterProgram}>
          <SelectTrigger className="w-[180px]" data-testid="filter-program">
            <SelectValue placeholder="Program Area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            {programAreas.map(area => (
              <SelectItem key={area} value={area}>{area}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <BookmarkCheck className="w-4 h-4" />
          Saved ({savedStories.size})
        </Button>
      </div>

      {/* Story Feed */}
      <div className="grid gap-6">
        {filteredStories.map((story) => {
          const CategoryIcon = categoryIcons[story.category] || Heart;
          const isSaved = savedStories.has(story.id);
          
          return (
            <Card key={story.id} className="hover-elevate overflow-hidden" data-testid={`story-card-${story.id}`}>
              <CardHeader className="bg-[#7BC4DC] text-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{story.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="secondary">{story.programArea}</Badge>
                        <span className="text-xs text-primary-foreground/80 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(story.date).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-primary-foreground/80 flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {story.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary-foreground/20"
                      onClick={() => toggleSave(story.id)}
                      data-testid={`save-story-${story.id}`}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary-foreground/20"
                      onClick={() => copyToClipboard(story)}
                      data-testid={`copy-story-${story.id}`}
                    >
                      {copiedId === story.id ? (
                        <CheckCircle2 className="w-4 h-4 text-green-300" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <p className="text-muted-foreground">{story.summary}</p>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                    <p className="text-sm italic">{story.fullStory}</p>
                  </div>
                </div>

                {story.metrics && story.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    {story.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-3xl font-bold text-primary">{metric.value}</p>
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1 pt-2">
                  {story.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredStories.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold">No Stories Found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function ImpactIntelligence() {
  const [location] = useLocation();

  const isFeedTab = location.includes("/feed");

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={impactTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        {isFeedTab ? <ImpactFeedTab /> : <AIChatTab />}
      </div>
    </div>
  );
}

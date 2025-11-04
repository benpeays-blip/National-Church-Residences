import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Clock, AlertTriangle, Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";

// Dummy tasks data
const tasksData = {
  stats: {
    total: 24,
    completed: 17,
    thisWeek: 8,
    overdue: 3,
  },
  tasksByPriority: [
    { priority: "Critical", count: 2, completed: 0, color: "bg-red-500" },
    { priority: "High", count: 5, completed: 3, color: "bg-orange-500" },
    { priority: "Medium", count: 10, completed: 8, color: "bg-blue-500" },
    { priority: "Low", count: 7, completed: 6, color: "bg-gray-500" },
  ],
  tasks: [
    { id: 1, title: "Present naming opportunity to Christopher Davis", donor: "Christopher Davis", dueDate: "2024-11-08", priority: "Critical", status: "pending", category: "Ask", estimatedTime: "2 hours", notes: "Prepare comprehensive proposal with facility tour options" },
    { id: 2, title: "Follow up on capital campaign with David Thompson", donor: "David Thompson", dueDate: "2024-11-09", priority: "Critical", status: "pending", category: "Cultivation", estimatedTime: "1 hour", notes: "Schedule meeting to discuss $350K opportunity" },
    { id: 3, title: "Send thank you letter to Sarah Chen", donor: "Sarah Chen", dueDate: "2024-11-05", priority: "High", status: "overdue", category: "Stewardship", estimatedTime: "30 min", notes: "Acknowledge recent $430K commitment" },
    { id: 4, title: "Schedule board networking event with Lisa Anderson", donor: "Lisa Anderson", dueDate: "2024-11-10", priority: "High", status: "pending", category: "Cultivation", estimatedTime: "45 min", notes: "Coordinate with events team for December date" },
    { id: 5, title: "Share Q3 impact report with Michael Roberts", donor: "Michael Roberts", dueDate: "2024-11-07", priority: "High", status: "overdue", category: "Stewardship", estimatedTime: "15 min", notes: "Include personalized cover letter" },
    { id: 6, title: "Arrange facility tour for Jennifer Liu", donor: "Jennifer Liu", dueDate: "2024-11-12", priority: "Medium", status: "pending", category: "Cultivation", estimatedTime: "1 hour", notes: "Show community center renovation project" },
    { id: 7, title: "Send quarterly newsletter to James Wilson", donor: "James Wilson", dueDate: "2024-11-06", priority: "Medium", status: "overdue", category: "Stewardship", estimatedTime: "10 min", notes: "Re-engagement attempt" },
    { id: 8, title: "Initial qualification call with Amanda Foster", donor: "Amanda Foster", dueDate: "2024-11-15", priority: "Low", status: "pending", category: "Prospect", estimatedTime: "30 min", notes: "Assess interest in healthcare initiatives" },
    { id: 9, title: "Schedule 1:1 coffee with Robert Martinez", donor: "Robert Martinez", dueDate: "2024-11-14", priority: "Medium", status: "pending", category: "Cultivation", estimatedTime: "45 min", notes: "Discuss volunteer opportunities" },
    { id: 10, title: "Invite Patricia Lee to donor appreciation event", donor: "Patricia Lee", dueDate: "2024-11-11", priority: "Medium", status: "pending", category: "Stewardship", estimatedTime: "15 min", notes: "Annual gala invitation" },
    { id: 11, title: "Research donor interests for Emily Johnson", donor: "Emily Johnson", dueDate: "2024-11-20", priority: "Low", status: "pending", category: "Prospect", estimatedTime: "1 hour", notes: "Review LinkedIn and wealth screening data" },
    { id: 12, title: "Follow up on planned giving with Daniel Brown", donor: "Daniel Brown", dueDate: "2024-11-18", priority: "Medium", status: "pending", category: "Cultivation", estimatedTime: "45 min", notes: "Discuss estate planning options" },
  ],
  completedTasks: [
    { id: 101, title: "Completed cultivation dinner with Sarah Chen", donor: "Sarah Chen", completedDate: "2024-11-03", priority: "High", category: "Ask" },
    { id: 102, title: "Sent impact report to Lisa Anderson", donor: "Lisa Anderson", completedDate: "2024-11-02", priority: "Medium", category: "Stewardship" },
    { id: 103, title: "Scheduled meeting with David Thompson", donor: "David Thompson", completedDate: "2024-11-01", priority: "High", category: "Cultivation" },
    { id: 104, title: "Sent thank you note to Christopher Davis", donor: "Christopher Davis", completedDate: "2024-10-30", priority: "Medium", category: "Stewardship" },
    { id: 105, title: "Facility tour completed for Michael Roberts", donor: "Michael Roberts", completedDate: "2024-10-28", priority: "High", category: "Cultivation" },
  ],
};

export default function MGOTasksDetail() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);

  const filteredTasks = tasksData.tasks.filter(task => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "overdue") return task.status === "overdue";
    if (selectedFilter === "today") {
      const today = new Date().toISOString().split("T")[0];
      return task.dueDate <= today && task.status !== "overdue";
    }
    return task.priority.toLowerCase() === selectedFilter;
  });

  const completionRate = Math.round((tasksData.stats.completed / tasksData.stats.total) * 100);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Track and manage your donor engagement activities
        </p>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-3xl font-bold text-primary mt-1">{tasksData.stats.total}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-primary mt-1">{tasksData.stats.completed}</p>
                <p className="text-xs text-muted-foreground mt-1">{completionRate}% completion rate</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-3xl font-bold text-primary mt-1">{tasksData.stats.thisWeek}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-3xl font-bold text-destructive mt-1">{tasksData.stats.overdue}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks by Priority</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {tasksData.tasksByPriority.map((item) => (
              <div key={item.priority} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="font-medium">{item.priority}</span>
                </div>
                <p className="text-2xl font-bold">{item.count}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.completed} completed
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedFilter === "all" ? "default" : "outline"}
          onClick={() => setSelectedFilter("all")}
          data-testid="filter-all"
        >
          All Tasks ({tasksData.tasks.length})
        </Button>
        <Button
          variant={selectedFilter === "overdue" ? "default" : "outline"}
          onClick={() => setSelectedFilter("overdue")}
          data-testid="filter-overdue"
        >
          Overdue ({tasksData.stats.overdue})
        </Button>
        <Button
          variant={selectedFilter === "today" ? "default" : "outline"}
          onClick={() => setSelectedFilter("today")}
          data-testid="filter-today"
        >
          Due Today
        </Button>
        <Button
          variant={selectedFilter === "critical" ? "default" : "outline"}
          onClick={() => setSelectedFilter("critical")}
          data-testid="filter-critical"
        >
          Critical
        </Button>
        <Button
          variant={selectedFilter === "high" ? "default" : "outline"}
          onClick={() => setSelectedFilter("high")}
          data-testid="filter-high"
        >
          High Priority
        </Button>
      </div>

      {/* Active Tasks */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Active Tasks</CardTitle>
            {checkedTasks.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => setCheckedTasks([])}>
                Mark {checkedTasks.length} as Complete
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`border rounded-lg p-4 ${task.status === "overdue" ? "border-destructive" : ""}`}
                data-testid={`task-${task.id}`}
              >
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={checkedTasks.includes(task.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCheckedTasks([...checkedTasks, task.id]);
                      } else {
                        setCheckedTasks(checkedTasks.filter(id => id !== task.id));
                      }
                    }}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{task.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{task.notes}</p>
                      </div>
                      <Badge
                        variant={
                          task.priority === "Critical" ? "destructive" :
                          task.priority === "High" ? "default" :
                          "outline"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {task.dueDate}</span>
                        {task.status === "overdue" && (
                          <Badge variant="destructive" className="ml-2">Overdue</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{task.estimatedTime}</span>
                      </div>
                      <Badge variant="secondary">{task.category}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recently Completed */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tasksData.completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                data-testid={`completed-task-${task.id}`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.donor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{task.completedDate}</p>
                  <Badge variant="outline" className="mt-1">{task.category}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

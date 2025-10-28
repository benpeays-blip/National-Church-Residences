import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@shared/schema";

interface TaskItemProps {
  task: Task & {
    person?: {
      firstName: string;
      lastName: string;
    };
  };
  onToggle?: (taskId: string, completed: boolean) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const priorityColors = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-chart-4/20 text-chart-4",
    high: "bg-chart-3/20 text-chart-3",
    urgent: "bg-destructive/20 text-destructive",
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 py-2 group",
        task.completed && "opacity-60"
      )}
      data-testid={`task-${task.id}`}
    >
      <Checkbox
        checked={!!task.completed}
        onCheckedChange={(checked) =>
          onToggle?.(task.id, checked as boolean)
        }
        className="mt-1"
        data-testid={`checkbox-task-${task.id}`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 mb-1">
          <p
            className={cn(
              "text-sm font-medium flex-1",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </p>
          <Badge className={cn("shrink-0", priorityColors[task.priority])}>
            {task.priority}
          </Badge>
        </div>
        {task.description && (
          <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
            {task.description}
          </p>
        )}
        {task.reason && (
          <p className="text-xs text-muted-foreground/80 italic mb-1">
            {task.reason}
          </p>
        )}
        <div className="flex items-center gap-2 mt-2">
          {task.person && (
            <span className="text-xs text-muted-foreground">
              {task.person.firstName} {task.person.lastName}
            </span>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1">
              {isOverdue ? (
                <AlertCircle className="w-3 h-3 text-destructive" />
              ) : (
                <Clock className="w-3 h-3" />
              )}
              <span
                className={cn(
                  "text-xs",
                  isOverdue ? "text-destructive font-medium" : "text-muted-foreground"
                )}
              >
                {formatDate(task.dueDate)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
import { NCR_BRAND_COLORS, AccentColor } from "./accent-card"

export const ACCENT_TAB_COLORS: AccentColor[] = ["teal", "sky", "orange", "coral", "olive", "lime"];

interface AccentTabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  children: React.ReactNode;
}

const AccentTabs = TabsPrimitive.Root

const AccentTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  AccentTabsListProps
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 bg-transparent p-0 mb-4",
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.List>
))
AccentTabsList.displayName = "AccentTabsList"

interface AccentTabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  accent: AccentColor;
}

const AccentTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  AccentTabsTriggerProps
>(({ className, accent, children, ...props }, ref) => {
  const color = NCR_BRAND_COLORS[accent];
  
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-2 text-sm font-medium text-white transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      style={{ backgroundColor: color }}
      {...props}
    >
      {children}
      <span 
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] opacity-0 group-data-[state=active]:opacity-100 transition-opacity"
        style={{ borderTopColor: color }}
      />
    </TabsPrimitive.Trigger>
  )
})
AccentTabsTrigger.displayName = "AccentTabsTrigger"

const AccentTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
AccentTabsContent.displayName = "AccentTabsContent"

export { AccentTabs, AccentTabsList, AccentTabsTrigger, AccentTabsContent }

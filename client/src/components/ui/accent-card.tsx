import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./card"

export const NCR_BRAND_COLORS = {
  teal: "#7FA3A1",
  olive: "#A5A033", 
  orange: "#E8923A",
  coral: "#D5636C",
  sky: "#7BC4DC",
  lime: "#B5C942",
  tealDark: "#5A8280",
  oliveDark: "#7D7A28",
  orangeDark: "#C47520",
  coralDark: "#B84A52",
  skyDark: "#5BA8C4",
  limeDark: "#95A832",
} as const;

export type AccentColor = keyof typeof NCR_BRAND_COLORS;

const accentColorClasses: Record<AccentColor, string> = {
  teal: "border-l-[#7FA3A1]",
  olive: "border-l-[#A5A033]",
  orange: "border-l-[#E8923A]",
  coral: "border-l-[#D5636C]",
  sky: "border-l-[#7BC4DC]",
  lime: "border-l-[#B5C942]",
  tealDark: "border-l-[#5A8280]",
  oliveDark: "border-l-[#7D7A28]",
  orangeDark: "border-l-[#C47520]",
  coralDark: "border-l-[#B84A52]",
  skyDark: "border-l-[#5BA8C4]",
  limeDark: "border-l-[#95A832]",
};

const accentBgClasses: Record<AccentColor, string> = {
  teal: "bg-[#7FA3A1]",
  olive: "bg-[#A5A033]",
  orange: "bg-[#E8923A]",
  coral: "bg-[#D5636C]",
  sky: "bg-[#7BC4DC]",
  lime: "bg-[#B5C942]",
  tealDark: "bg-[#5A8280]",
  oliveDark: "bg-[#7D7A28]",
  orangeDark: "bg-[#C47520]",
  coralDark: "bg-[#B84A52]",
  skyDark: "bg-[#5BA8C4]",
  limeDark: "bg-[#95A832]",
};

const accentTextClasses: Record<AccentColor, string> = {
  teal: "text-[#7FA3A1]",
  olive: "text-[#A5A033]",
  orange: "text-[#E8923A]",
  coral: "text-[#D5636C]",
  sky: "text-[#7BC4DC]",
  lime: "text-[#B5C942]",
  tealDark: "text-[#5A8280]",
  oliveDark: "text-[#7D7A28]",
  orangeDark: "text-[#C47520]",
  coralDark: "text-[#B84A52]",
  skyDark: "text-[#5BA8C4]",
  limeDark: "text-[#95A832]",
};

interface AccentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: AccentColor;
  children: React.ReactNode;
}

const AccentCard = React.forwardRef<HTMLDivElement, AccentCardProps>(
  ({ className, accent = "teal", children, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn("border-l-4", accentColorClasses[accent], className)}
      {...props}
    >
      {children}
    </Card>
  )
);
AccentCard.displayName = "AccentCard";

export function getAccentBgClass(accent: AccentColor): string {
  return accentBgClasses[accent];
}

export function getAccentTextClass(accent: AccentColor): string {
  return accentTextClasses[accent];
}

export function getAccentBorderClass(accent: AccentColor): string {
  return accentColorClasses[accent];
}

export function getAccentColor(accent: AccentColor): string {
  return NCR_BRAND_COLORS[accent];
}

export {
  AccentCard,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
};

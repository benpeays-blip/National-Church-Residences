import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { DollarSign, TrendingUp, Repeat, FileText, GiftIcon } from "lucide-react";
import Gifts from "@/pages/gifts";

const giftTabs: SectionTab[] = [
  {
    label: "All Gifts",
    value: "all",
    icon: DollarSign,
    path: "/gifts",
  },
  {
    label: "Major Gifts",
    value: "major",
    icon: TrendingUp,
    path: "/gifts?tab=major",
  },
  {
    label: "Recurring",
    value: "recurring",
    icon: Repeat,
    path: "/gifts?tab=recurring",
  },
  {
    label: "Planned",
    value: "planned",
    icon: FileText,
    path: "/gifts?tab=planned",
  },
  {
    label: "Gift Types",
    value: "types",
    icon: GiftIcon,
    path: "/gifts?tab=types",
  },
];

export default function GiftsWithTabs() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={giftTabs} currentPath={location} />
      <div className="flex-1 overflow-auto">
        <Gifts />
      </div>
    </div>
  );
}

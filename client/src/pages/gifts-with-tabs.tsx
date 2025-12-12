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
    path: "/gifts/major",
  },
  {
    label: "Recurring",
    value: "recurring",
    icon: Repeat,
    path: "/gifts/recurring",
  },
  {
    label: "Planned",
    value: "planned",
    icon: FileText,
    path: "/gifts/planned",
  },
  {
    label: "Gift Types",
    value: "types",
    icon: GiftIcon,
    path: "/gifts/types",
  },
];

export default function GiftsWithTabs() {
  const [location] = useLocation();

  // Determine active tab from the URL path
  const getActiveTab = (): string => {
    if (location === "/gifts/major") return "major";
    if (location === "/gifts/recurring") return "recurring";
    if (location === "/gifts/planned") return "planned";
    if (location === "/gifts/types") return "types";
    return "all";
  };

  const activeTab = getActiveTab();

  return (
    <div className="flex flex-col h-full" key={`gifts-${activeTab}`}>
      <SectionTabs tabs={giftTabs} currentPath={location} />
      <div className="flex-1 overflow-auto">
        <Gifts activeTab={activeTab} />
      </div>
    </div>
  );
}

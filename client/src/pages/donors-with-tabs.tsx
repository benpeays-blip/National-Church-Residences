import { useLocation } from "wouter";
import { SectionTabs, SectionTab } from "@/components/section-tabs";
import { Users, AlertCircle, Clock, UserPlus } from "lucide-react";
import Donors from "@/pages/donors";
import LYBUNTDonors from "@/pages/analytics-lybunt-donors";
import SYBUNTDonors from "@/pages/analytics-sybunt-donors";

const donorTabs: SectionTab[] = [
  {
    label: "All Donors",
    value: "all",
    icon: Users,
    path: "/donors",
  },
  {
    label: "LYBUNT",
    value: "lybunt",
    icon: AlertCircle,
    path: "/donors/lybunt",
  },
  {
    label: "SYBUNT",
    value: "sybunt",
    icon: Clock,
    path: "/donors/sybunt",
  },
  {
    label: "Prospects",
    value: "prospects",
    icon: UserPlus,
    path: "/donors/prospects",
  },
];

export default function DonorsWithTabs() {
  const [location] = useLocation();

  let DonorComponent = Donors;
  if (location === "/donors/lybunt") {
    DonorComponent = LYBUNTDonors;
  } else if (location === "/donors/sybunt") {
    DonorComponent = SYBUNTDonors;
  } else if (location === "/donors/prospects") {
    // For now, use the main Donors component - we'll filter later
    DonorComponent = Donors;
  }

  return (
    <div className="flex flex-col h-full">
      <SectionTabs tabs={donorTabs} currentPath={location} />
      <div className="flex-1 overflow-auto p-6">
        <DonorComponent />
      </div>
    </div>
  );
}

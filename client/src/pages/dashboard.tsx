import DashboardDevDirector from "@/pages/dashboard-dev-director";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <DashboardDevDirector />
      </div>
    </div>
  );
}

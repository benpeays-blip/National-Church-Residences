import DonorQuadrantMapper from "@/components/donor-quadrant-mapper";

export default function DonorQuadrant() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 p-6">
        <DonorQuadrantMapper />
      </div>
    </div>
  );
}

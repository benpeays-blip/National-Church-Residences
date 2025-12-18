import DonorQuadrantMapper from "@/components/donor-quadrant-mapper";

export default function DonorQuadrant() {
  return (
    <div className="p-6 h-full">
      <DonorQuadrantMapper showEducationalContent={true} />
    </div>
  );
}

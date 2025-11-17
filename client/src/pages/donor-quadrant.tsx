import DonorQuadrantMapper from "@/components/donor-quadrant-mapper";

export default function DonorQuadrant() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Donor Relationship Quadrant</h1>
        <p className="text-muted-foreground mt-2">
          Visualize and analyze donor relationships across four strategic quadrants
        </p>
      </div>
      
      <DonorQuadrantMapper />
    </div>
  );
}

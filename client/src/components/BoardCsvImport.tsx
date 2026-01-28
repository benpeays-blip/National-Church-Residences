import Papa from "papaparse";
import { useBoardMap } from "@/lib/boardMapStore";
import type { BoardRow } from "@/lib/boardMapTypes";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function BoardCsvImport() {
  const importRows = useBoardMap((s) => s.importRows);
  const compute = useBoardMap((s) => s.compute);
  const { toast } = useToast();

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    Papa.parse(f, {
      header: true,
      skipEmptyLines: true,
      complete: async (res) => {
        const rows = (res.data as any[]).map((r) => ({
          person_name: String(r.person_name || r.Person || r.person || "").trim(),
          person_email: r.person_email ? String(r.person_email).trim() : undefined,
          org_name: String(r.org_name || r.Organization || r.org || "").trim(),
          role: r.role ? String(r.role).trim() : undefined,
          start_year: r.start_year ? Number(r.start_year) : undefined,
          end_year: r.end_year ? Number(r.end_year) : undefined,
        })) as BoardRow[];

        // Import to frontend state
        importRows(rows);
        compute();

        // Also send to backend for persistence
        try {
          const memberships = rows.map((r) => ({
            personName: r.person_name,
            personEmail: r.person_email,
            orgName: r.org_name,
            role: r.role,
            startYear: r.start_year,
            endYear: r.end_year,
          }));

          await apiRequest("POST", "/api/board-network/import", { memberships });

          toast({
            title: "CSV Imported",
            description: `Successfully imported ${rows.length} board memberships`,
          });
        } catch (error) {
          console.error("Error persisting to backend:", error);
          toast({
            title: "Warning",
            description: "Data loaded locally but failed to save to server",
            variant: "destructive",
          });
        }
      },
    });
  }

  const sampleCsvData =
    "person_name,person_email,org_name,role,start_year,end_year\n" +
    "Alice Smith,alice@example.org,Hope Foundation,Director,2021,\n" +
    "Bob Lee,,Hope Foundation,Treasurer,2020,\n" +
    "Alice Smith,alice@example.org,Water Now,Director,2022,\n" +
    "Chris Young,,Water Now,Director,2022,\n" +
    "Bob Lee,,TechReach,Director,2023,\n" +
    "Diana Ross,diana@example.org,Hope Foundation,Chair,2019,\n" +
    "Diana Ross,diana@example.org,Green Earth Coalition,Director,2021,\n" +
    "Elena Martinez,,TechReach,Secretary,2022,\n" +
    "Elena Martinez,,Green Earth Coalition,Director,2020,\n" +
    "Frank Chen,frank@example.org,Water Now,Treasurer,2021,";

  const downloadSample = () => {
    const blob = new Blob([sampleCsvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_board_roles.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-3">
      <input
        type="file"
        accept=".csv"
        onChange={onFile}
        className="hidden"
        id="csv-upload"
        data-testid="input-csv-upload"
      />
      <label htmlFor="csv-upload">
        <Button asChild variant="default" size="sm" data-testid="button-upload-csv">
          <span className="cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Upload CSV
          </span>
        </Button>
      </label>
      <Button
        variant="outline"
        size="sm"
        onClick={downloadSample}
        data-testid="button-download-sample"
      >
        <Download className="w-4 h-4 mr-2" />
        Download Sample
      </Button>
    </div>
  );
}

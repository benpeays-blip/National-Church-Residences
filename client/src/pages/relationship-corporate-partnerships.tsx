import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Users, DollarSign, TrendingUp } from "lucide-react";
import type { CorporatePartnership } from "@shared/schema";

export default function CorporatePartnerships() {
  const { data: partnerships, isLoading } = useQuery<CorporatePartnership[]>({
    queryKey: ["/api/relationship/corporate-partnerships"],
  });

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold ">Corporate Partnership Intelligence</h1>
        <p className="text-sm text-muted-foreground">
          Track employee donors, matching gift programs, and corporate foundation opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Building2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partnerships?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Matching</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {partnerships?.filter((p) => p.hasMatchingProgram === 1).length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {partnerships?.reduce((sum, p) => sum + (p.employeeCount || 0), 0) || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matching Potential</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${partnerships?.reduce((sum, p) => sum + Number(p.estimatedMatchingPotential || 0), 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : partnerships && partnerships.length > 0 ? (
        <Card>
          <CardHeader className="rounded-t-xl" style={{ backgroundColor: '#1B3A5A' }}>
            <CardTitle className="text-white">Corporate Partnerships</CardTitle>
            <CardDescription className="text-white/80">Companies with employee donors and matching gift programs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partnerships.map((partnership) => (
                <div key={partnership.id} className="border-b pb-4 last:border-0" data-testid={`partnership-${partnership.id}`}>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        {partnership.domain ? (
                          <img 
                            src={`https://img.brandfetch.io/${partnership.domain}/logo`}
                            alt={`${partnership.companyName} logo`}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              // Fallback to Building2 icon if logo fails to load
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                            data-testid={`logo-${partnership.companyName.toLowerCase()}`}
                          />
                        ) : null}
                        <Building2 className={`w-5 h-5 text-muted-foreground ${partnership.domain ? 'hidden' : ''}`} />
                        <h4 className="font-semibold text-lg">{partnership.companyName}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <span className="text-muted-foreground">Employee Donors:</span>
                          <span className="ml-2 font-medium">{partnership.employeeCount || 0}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-muted-foreground">Employee Giving:</span>
                          <span className="ml-2 font-medium">
                            ${Number(partnership.totalEmployeeGiving || 0).toLocaleString()}
                          </span>
                        </div>
                        {partnership.matchingRatio && (
                          <div className="space-y-1">
                            <span className="text-muted-foreground">Match Ratio:</span>
                            <span className="ml-2 font-medium">{partnership.matchingRatio}</span>
                          </div>
                        )}
                        {partnership.estimatedMatchingPotential && (
                          <div className="space-y-1">
                            <span className="text-muted-foreground">Match Potential:</span>
                            <span className="ml-2 font-medium text-green-600">
                              ${Number(partnership.estimatedMatchingPotential).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                      {partnership.notes && (
                        <p className="text-sm text-muted-foreground mt-2">{partnership.notes}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      {partnership.hasMatchingProgram === 1 && (
                        <Badge variant="default">Matching Program</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold ">No Corporate Partnerships</h3>
            <p className="text-sm text-muted-foreground">Employee donor data will appear here once analyzed</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

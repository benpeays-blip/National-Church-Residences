import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  Heart, 
  Building2,
  Stethoscope,
  TrendingUp,
  Globe,
  HandHelping,
  Brain,
  Activity,
  Star,
  Clock
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ComposedChart
} from "recharts";

const BRAND_COLORS = {
  teal: "#7FA3A1",
  olive: "#C1B46F", 
  orange: "#EA9B52",
  coral: "#D5636C",
  sky: "#7FB5CC",
  lime: "#B5C942",
  ncrBlue: "#084594",
  ncrLightBlue: "#2171b5"
};

export default function ReportingVisuals() {
  const housingDistribution = [
    { name: "Section 8 / PRAC", value: 11250, color: BRAND_COLORS.teal },
    { name: "LIHTC", value: 8750, color: BRAND_COLORS.sky },
    { name: "Mixed-Income", value: 5000, color: BRAND_COLORS.lime },
  ];

  const monthlyGrowth = [
    { month: "Jan", residents: 24200, carePatients: 8100, volunteers: 420 },
    { month: "Feb", residents: 24350, carePatients: 8250, volunteers: 435 },
    { month: "Mar", residents: 24500, carePatients: 8400, volunteers: 450 },
    { month: "Apr", residents: 24650, carePatients: 8550, volunteers: 468 },
    { month: "May", residents: 24800, carePatients: 8700, volunteers: 485 },
    { month: "Jun", residents: 24950, carePatients: 8850, volunteers: 502 },
    { month: "Jul", residents: 25100, carePatients: 9000, volunteers: 520 },
    { month: "Aug", residents: 25250, carePatients: 9150, volunteers: 538 },
    { month: "Sep", residents: 25400, carePatients: 9300, volunteers: 555 },
    { month: "Oct", residents: 25550, carePatients: 9450, volunteers: 572 },
    { month: "Nov", residents: 25700, carePatients: 9600, volunteers: 590 },
    { month: "Dec", residents: 25850, carePatients: 9750, volunteers: 608 },
  ];

  const careServicesByType = [
    { name: "Primary Care", patients: 8500, satisfaction: 4.8, color: BRAND_COLORS.ncrBlue },
    { name: "Home Health", patients: 3200, satisfaction: 4.7, color: BRAND_COLORS.teal },
    { name: "Home Health Aide", patients: 2800, satisfaction: 4.9, color: BRAND_COLORS.sky },
    { name: "Hospice", patients: 850, satisfaction: 4.9, color: BRAND_COLORS.coral },
    { name: "Chaplaincy", patients: 1500, satisfaction: 4.8, color: BRAND_COLORS.olive },
  ];

  const statesData = [
    { state: "OH", units: 6500 },
    { state: "TX", units: 3200 },
    { state: "FL", units: 2800 },
    { state: "CA", units: 2400 },
    { state: "PA", units: 2100 },
    { state: "NY", units: 1900 },
    { state: "GA", units: 1600 },
    { state: "NC", units: 1400 },
    { state: "Other", units: 3100 },
  ];

  const livingTypesComparison = [
    { type: "Affordable Housing", units: 25000, communities: 340, avgOccupancy: 97 },
    { type: "Independent Living", units: 545, communities: 4, avgOccupancy: 94 },
    { type: "Assisted Living", units: 180, communities: 3, avgOccupancy: 92 },
    { type: "Memory Care", units: 85, communities: 2, avgOccupancy: 88 },
    { type: "CCRC", units: 420, communities: 2, avgOccupancy: 95 },
  ];

  const radarData = [
    { metric: "Housing Units", value: 95 },
    { metric: "Care Quality", value: 98 },
    { metric: "Resident Satisfaction", value: 96 },
    { metric: "Staff Retention", value: 88 },
    { metric: "Community Programs", value: 92 },
    { metric: "Financial Health", value: 90 },
  ];

  const impactHighlights = [
    { label: "Senior Homes", value: "25,000+", icon: Home, color: BRAND_COLORS.teal, description: "Safe, affordable housing units" },
    { label: "States Served", value: "23", icon: Globe, color: BRAND_COLORS.sky, description: "Coast-to-coast presence" },
    { label: "Team Members", value: "2,300+", icon: Users, color: BRAND_COLORS.lime, description: "Dedicated professionals" },
    { label: "Years of Service", value: "60+", icon: Clock, color: BRAND_COLORS.olive, description: "Since 1961" },
    { label: "Patients Served", value: "16,850+", icon: Stethoscope, color: BRAND_COLORS.orange, description: "Annual care recipients" },
    { label: "Satisfaction Rate", value: "4.8/5", icon: Star, color: BRAND_COLORS.coral, description: "Resident & family ratings" },
  ];

  const yearOverYearGrowth = [
    { year: "2019", housing: 22000, care: 12000 },
    { year: "2020", housing: 22800, care: 13500 },
    { year: "2021", housing: 23600, care: 14800 },
    { year: "2022", housing: 24200, care: 15600 },
    { year: "2023", housing: 24800, care: 16200 },
    { year: "2024", housing: 25000, care: 16850 },
  ];

  const occupancyTrend = [
    { month: "Q1 2023", affordable: 96.5, independent: 93.2, assisted: 91.8 },
    { month: "Q2 2023", affordable: 96.8, independent: 93.8, assisted: 92.1 },
    { month: "Q3 2023", affordable: 97.1, independent: 94.2, assisted: 92.5 },
    { month: "Q4 2023", affordable: 97.3, independent: 94.5, assisted: 92.8 },
    { month: "Q1 2024", affordable: 97.5, independent: 94.8, assisted: 93.0 },
    { month: "Q2 2024", affordable: 97.8, independent: 95.0, assisted: 93.2 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: BRAND_COLORS.ncrBlue }} data-testid="page-title">
            Impact Visuals Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Stunning visualizations showcasing NCR's mission impact across housing and care services
          </p>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1" style={{ borderColor: BRAND_COLORS.ncrBlue, color: BRAND_COLORS.ncrBlue }}>
          Live Data
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {impactHighlights.map((item) => (
          <Card key={item.label} className="overflow-hidden" data-testid={`card-stat-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className="h-1.5" style={{ backgroundColor: item.color }} />
            <CardContent className="p-4 text-center">
              <item.icon className="w-8 h-8 mx-auto mb-2" style={{ color: item.color }} />
              <div className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</div>
              <div className="text-xs font-medium mt-1">{item.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
            <CardTitle className="text-lg flex items-center gap-2" style={{ color: BRAND_COLORS.ncrBlue }}>
              <TrendingUp className="w-5 h-5" />
              Year-over-Year Growth
            </CardTitle>
            <CardDescription>Housing units and care patients served (2019-2024)</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={yearOverYearGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="housing" fill={BRAND_COLORS.teal} name="Housing Units" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="care" stroke={BRAND_COLORS.coral} strokeWidth={3} name="Care Patients" dot={{ fill: BRAND_COLORS.coral, r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
            <CardTitle className="text-lg flex items-center gap-2" style={{ color: BRAND_COLORS.ncrBlue }}>
              <Home className="w-5 h-5" />
              Housing Program Distribution
            </CardTitle>
            <CardDescription>25,000+ units across three program types</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-8">
              <ResponsiveContainer width="50%" height={220}>
                <PieChart>
                  <Pie
                    data={housingDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {housingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => value.toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {housingDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.value.toLocaleString()} units</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="overflow-hidden lg:col-span-2">
          <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
            <CardTitle className="text-lg flex items-center gap-2" style={{ color: BRAND_COLORS.ncrBlue }}>
              <Activity className="w-5 h-5" />
              Monthly Growth Trends
            </CardTitle>
            <CardDescription>Residents, care patients, and volunteer hours</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="residents" stackId="1" stroke={BRAND_COLORS.teal} fill={BRAND_COLORS.teal} fillOpacity={0.6} name="Residents" />
                <Area type="monotone" dataKey="carePatients" stackId="2" stroke={BRAND_COLORS.sky} fill={BRAND_COLORS.sky} fillOpacity={0.6} name="Care Patients" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
            <CardTitle className="text-lg flex items-center gap-2" style={{ color: BRAND_COLORS.ncrBlue }}>
              <Star className="w-5 h-5" />
              Performance Radar
            </CardTitle>
            <CardDescription>Key organizational metrics</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Performance" dataKey="value" stroke={BRAND_COLORS.ncrBlue} fill={BRAND_COLORS.ncrBlue} fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
            <CardTitle className="text-lg flex items-center gap-2" style={{ color: BRAND_COLORS.ncrBlue }}>
              <Stethoscope className="w-5 h-5" />
              Care Services by Type
            </CardTitle>
            <CardDescription>Annual patients served across all care programs</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={careServicesByType} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                  formatter={(value: number) => value.toLocaleString()}
                />
                <Bar dataKey="patients" radius={[0, 4, 4, 0]}>
                  {careServicesByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
            <CardTitle className="text-lg flex items-center gap-2" style={{ color: BRAND_COLORS.ncrBlue }}>
              <Globe className="w-5 h-5" />
              Geographic Distribution
            </CardTitle>
            <CardDescription>Housing units by state</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={statesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="state" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                  formatter={(value: number) => value.toLocaleString()}
                />
                <Bar dataKey="units" fill={BRAND_COLORS.lime} radius={[4, 4, 0, 0]} name="Housing Units" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader style={{ backgroundColor: 'rgba(222, 235, 247, 0.5)' }}>
          <CardTitle className="text-lg flex items-center gap-2" style={{ color: BRAND_COLORS.ncrBlue }}>
            <Building2 className="w-5 h-5" />
            Occupancy Trends by Housing Type
          </CardTitle>
          <CardDescription>Quarterly occupancy rates across housing categories</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={occupancyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[85, 100]} tick={{ fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                formatter={(value: number) => `${value}%`}
              />
              <Legend />
              <Line type="monotone" dataKey="affordable" stroke={BRAND_COLORS.teal} strokeWidth={3} name="Affordable Housing" dot={{ fill: BRAND_COLORS.teal, r: 4 }} />
              <Line type="monotone" dataKey="independent" stroke={BRAND_COLORS.sky} strokeWidth={3} name="Independent Living" dot={{ fill: BRAND_COLORS.sky, r: 4 }} />
              <Line type="monotone" dataKey="assisted" stroke={BRAND_COLORS.orange} strokeWidth={3} name="Assisted Living" dot={{ fill: BRAND_COLORS.orange, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <CardHeader style={{ backgroundColor: BRAND_COLORS.teal }}>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Home className="w-5 h-5" />
              Senior Housing
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Units</span>
                <span className="font-bold" style={{ color: BRAND_COLORS.teal }}>25,000+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Communities</span>
                <span className="font-bold" style={{ color: BRAND_COLORS.teal }}>340+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Occupancy Rate</span>
                <span className="font-bold" style={{ color: BRAND_COLORS.teal }}>97%+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">States</span>
                <span className="font-bold" style={{ color: BRAND_COLORS.teal }}>23</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader style={{ backgroundColor: BRAND_COLORS.sky }}>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Care Services
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Patients Served</span>
                <span className="font-bold" style={{ color: BRAND_COLORS.sky }}>16,850+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Health Centers</span>
                <span className="font-bold" style={{ color: BRAND_COLORS.sky }}>12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Clinical Team</span>
                <span className="font-bold" style={{ color: BRAND_COLORS.sky }}>200+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Satisfaction</span>
                <span className="font-bold" style={{ color: BRAND_COLORS.sky }}>4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader style={{ backgroundColor: BRAND_COLORS.coral }}>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Mission Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Years Serving</span>
                <span className="font-bold" style={{ color: BRAND_COLORS.coral }}>60+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Team Members</span>
                <span className="font-bold" style={{ color: BRAND_COLORS.coral }}>2,300+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Lives Touched</span>
                <span className="font-bold" style={{ color: BRAND_COLORS.coral }}>41,850+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Volunteers</span>
                <span className="font-bold" style={{ color: BRAND_COLORS.coral }}>600+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

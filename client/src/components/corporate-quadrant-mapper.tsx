import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Building2, Users, Lightbulb, Phone, Mail, DollarSign, Briefcase, HandHeart, Eye, Sparkles, MapPin } from 'lucide-react';
import { Link } from 'wouter';

type QuadrantType = 'partner' | 'volunteering' | 'donor' | 'acquaintance';

interface Corporation {
  id: string;
  name: string;
  domain: string;
  industry: string;
  description: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  totalContributions: number;
  employeeCount: number;
  volunteerHours: number;
  matchingGiftAmount: number;
  energy: number;
  structure: number;
  quadrant: QuadrantType;
  city: string;
  state: string;
}

const generateCorporations = (): Corporation[] => {
  const companies = [
    { name: "Acme Industries", domain: "acme.com", industry: "Manufacturing", city: "Columbus", state: "OH" },
    { name: "TechForward Solutions", domain: "techforward.com", industry: "Technology", city: "San Francisco", state: "CA" },
    { name: "Green Valley Bank", domain: "greenvalleybank.com", industry: "Financial Services", city: "Cleveland", state: "OH" },
    { name: "Midwest Healthcare Group", domain: "midwesthealthcare.org", industry: "Healthcare", city: "Cincinnati", state: "OH" },
    { name: "Cardinal Construction", domain: "cardinalconstruction.com", industry: "Construction", city: "Dayton", state: "OH" },
    { name: "Buckeye Energy Corp", domain: "buckeyeenergy.com", industry: "Energy", city: "Toledo", state: "OH" },
    { name: "Heritage Insurance", domain: "heritageins.com", industry: "Insurance", city: "Columbus", state: "OH" },
    { name: "Lakefront Properties", domain: "lakefrontprops.com", industry: "Real Estate", city: "Cleveland", state: "OH" },
    { name: "Summit Logistics", domain: "summitlogistics.com", industry: "Transportation", city: "Akron", state: "OH" },
    { name: "Pioneer Manufacturing", domain: "pioneermfg.com", industry: "Manufacturing", city: "Youngstown", state: "OH" },
    { name: "Horizon Pharmaceuticals", domain: "horizonpharma.com", industry: "Pharmaceutical", city: "Cincinnati", state: "OH" },
    { name: "Riverdale Foods", domain: "riverdalefoods.com", industry: "Food & Beverage", city: "Columbus", state: "OH" },
    { name: "Metro Communications", domain: "metrocomm.net", industry: "Telecommunications", city: "Dayton", state: "OH" },
    { name: "Oakwood Financial", domain: "oakwoodfinancial.com", industry: "Financial Services", city: "Cleveland", state: "OH" },
    { name: "Central Ohio Power", domain: "centralohiopower.com", industry: "Utilities", city: "Columbus", state: "OH" },
    { name: "Midwest Auto Group", domain: "midwestauto.com", industry: "Automotive", city: "Toledo", state: "OH" },
    { name: "Heartland Retail", domain: "heartlandretail.com", industry: "Retail", city: "Cincinnati", state: "OH" },
    { name: "Valley Tech Partners", domain: "valleytech.io", industry: "Technology", city: "Columbus", state: "OH" },
    { name: "Great Lakes Steel", domain: "greatlakessteel.com", industry: "Manufacturing", city: "Cleveland", state: "OH" },
    { name: "Cornerstone Legal Group", domain: "cornerstonelegal.com", industry: "Legal", city: "Columbus", state: "OH" },
    { name: "Midwest Medical Center", domain: "midwestmedical.org", industry: "Healthcare", city: "Dayton", state: "OH" },
    { name: "Keystone Engineering", domain: "keystoneeng.com", industry: "Engineering", city: "Akron", state: "OH" },
    { name: "Prairie Wind Energy", domain: "prairiewind.com", industry: "Energy", city: "Toledo", state: "OH" },
    { name: "Gateway Consulting", domain: "gatewayconsulting.com", industry: "Consulting", city: "Columbus", state: "OH" },
    { name: "Northstar Aviation", domain: "northstaraviation.com", industry: "Aerospace", city: "Cleveland", state: "OH" },
    { name: "Buckeye Breweries", domain: "buckeyebreweries.com", industry: "Food & Beverage", city: "Cincinnati", state: "OH" },
    { name: "Ohio Valley Insurance", domain: "ohiovalleyins.com", industry: "Insurance", city: "Columbus", state: "OH" },
    { name: "Midwest Agribusiness", domain: "midwestagri.com", industry: "Agriculture", city: "Dayton", state: "OH" },
    { name: "Capital City Bank", domain: "capitalcitybank.com", industry: "Financial Services", city: "Columbus", state: "OH" },
    { name: "Heartland Distribution", domain: "heartlanddist.com", industry: "Logistics", city: "Cleveland", state: "OH" },
    { name: "Summit Software", domain: "summitsoftware.io", industry: "Technology", city: "Columbus", state: "OH" },
    { name: "Pioneer Healthcare", domain: "pioneerhealthcare.org", industry: "Healthcare", city: "Cincinnati", state: "OH" },
    { name: "Lakeshore Properties", domain: "lakeshoreprops.com", industry: "Real Estate", city: "Toledo", state: "OH" },
    { name: "Central Manufacturing", domain: "centralmfg.com", industry: "Manufacturing", city: "Youngstown", state: "OH" },
    { name: "Ohio Energy Solutions", domain: "ohioenergy.com", industry: "Energy", city: "Columbus", state: "OH" },
    { name: "Midwest Telecom", domain: "midwesttelecom.net", industry: "Telecommunications", city: "Cleveland", state: "OH" },
    { name: "Heritage Financial", domain: "heritagefinancial.com", industry: "Financial Services", city: "Dayton", state: "OH" },
    { name: "Buckeye Construction", domain: "buckeyeconstruction.com", industry: "Construction", city: "Akron", state: "OH" },
    { name: "Valley Medical Group", domain: "valleymedical.org", industry: "Healthcare", city: "Columbus", state: "OH" },
    { name: "Great Plains Logistics", domain: "greatplainslogistics.com", industry: "Transportation", city: "Toledo", state: "OH" },
    { name: "Riverfront Development", domain: "riverfrontdev.com", industry: "Real Estate", city: "Cincinnati", state: "OH" },
    { name: "Midwest Power Corp", domain: "midwestpower.com", industry: "Utilities", city: "Cleveland", state: "OH" },
    { name: "Cardinal Financial", domain: "cardinalfinancial.com", industry: "Financial Services", city: "Columbus", state: "OH" },
    { name: "Horizon Manufacturing", domain: "horizonmfg.com", industry: "Manufacturing", city: "Dayton", state: "OH" },
    { name: "Oakwood Healthcare", domain: "oakwoodhealthcare.org", industry: "Healthcare", city: "Akron", state: "OH" },
    { name: "Summit Energy", domain: "summitenergy.com", industry: "Energy", city: "Columbus", state: "OH" },
    { name: "Metro Properties", domain: "metroproperties.com", industry: "Real Estate", city: "Cleveland", state: "OH" },
    { name: "Keystone Insurance", domain: "keystoneins.com", industry: "Insurance", city: "Cincinnati", state: "OH" },
    { name: "Prairie Pharmaceuticals", domain: "prairiepharma.com", industry: "Pharmaceutical", city: "Toledo", state: "OH" },
    { name: "Gateway Tech", domain: "gatewaytech.io", industry: "Technology", city: "Columbus", state: "OH" },
    { name: "Northshore Banking", domain: "northshorebank.com", industry: "Financial Services", city: "Cleveland", state: "OH" },
    { name: "Buckeye Retail Group", domain: "buckeyeretail.com", industry: "Retail", city: "Dayton", state: "OH" },
    { name: "Central Consulting", domain: "centralconsulting.com", industry: "Consulting", city: "Columbus", state: "OH" },
    { name: "Midwest Engineering", domain: "midwesteng.com", industry: "Engineering", city: "Akron", state: "OH" },
    { name: "Heartland Healthcare", domain: "heartlandhealthcare.org", industry: "Healthcare", city: "Cincinnati", state: "OH" },
    { name: "Valley Energy Corp", domain: "valleyenergy.com", industry: "Energy", city: "Toledo", state: "OH" },
    { name: "Pioneer Logistics", domain: "pioneerlogistics.com", industry: "Transportation", city: "Youngstown", state: "OH" },
    { name: "Ohio Tech Partners", domain: "ohiotechpartners.io", industry: "Technology", city: "Columbus", state: "OH" },
    { name: "Lakeview Financial", domain: "lakeviewfinancial.com", industry: "Financial Services", city: "Cleveland", state: "OH" },
    { name: "Summit Construction", domain: "summitconstruction.com", industry: "Construction", city: "Dayton", state: "OH" },
    { name: "Cardinal Healthcare", domain: "cardinalhealthcare.org", industry: "Healthcare", city: "Columbus", state: "OH" },
    { name: "Heritage Manufacturing", domain: "heritagemfg.com", industry: "Manufacturing", city: "Akron", state: "OH" },
    { name: "Midwest Properties", domain: "midwestprops.com", industry: "Real Estate", city: "Cincinnati", state: "OH" },
    { name: "Riverdale Energy", domain: "riverdaleenergy.com", industry: "Energy", city: "Toledo", state: "OH" },
    { name: "Oakwood Insurance", domain: "oakwoodins.com", industry: "Insurance", city: "Columbus", state: "OH" },
    { name: "Metro Healthcare", domain: "metrohealthcare.org", industry: "Healthcare", city: "Cleveland", state: "OH" },
    { name: "Keystone Financial", domain: "keystonefinancial.com", industry: "Financial Services", city: "Dayton", state: "OH" },
    { name: "Great Lakes Energy", domain: "greatlakesenergy.com", industry: "Energy", city: "Toledo", state: "OH" },
    { name: "Horizon Consulting", domain: "horizonconsulting.com", industry: "Consulting", city: "Columbus", state: "OH" },
    { name: "Buckeye Tech", domain: "buckeyetech.io", industry: "Technology", city: "Cincinnati", state: "OH" },
    { name: "Valley Construction", domain: "valleyconstruction.com", industry: "Construction", city: "Cleveland", state: "OH" },
    { name: "Central Healthcare", domain: "centralhealthcare.org", industry: "Healthcare", city: "Dayton", state: "OH" },
    { name: "Pioneer Financial", domain: "pioneerfinancial.com", industry: "Financial Services", city: "Columbus", state: "OH" },
    { name: "Midwest Insurance", domain: "midwestins.com", industry: "Insurance", city: "Akron", state: "OH" },
    { name: "Heartland Energy", domain: "heartlandenergy.com", industry: "Energy", city: "Toledo", state: "OH" },
    { name: "Summit Healthcare", domain: "summithealthcare.org", industry: "Healthcare", city: "Cincinnati", state: "OH" },
    { name: "Cardinal Properties", domain: "cardinalprops.com", industry: "Real Estate", city: "Columbus", state: "OH" },
    { name: "Ohio Manufacturing", domain: "ohiomfg.com", industry: "Manufacturing", city: "Cleveland", state: "OH" },
    { name: "Gateway Financial", domain: "gatewayfinancial.com", industry: "Financial Services", city: "Dayton", state: "OH" },
    { name: "Northstar Energy", domain: "northstarenergy.com", industry: "Energy", city: "Toledo", state: "OH" },
    { name: "Lakeshore Healthcare", domain: "lakeshorehealthcare.org", industry: "Healthcare", city: "Columbus", state: "OH" },
    { name: "Heritage Consulting", domain: "heritageconsulting.com", industry: "Consulting", city: "Cincinnati", state: "OH" },
    { name: "Metro Financial", domain: "metrofinancial.com", industry: "Financial Services", city: "Cleveland", state: "OH" },
    { name: "Keystone Healthcare", domain: "keystonehealthcare.org", industry: "Healthcare", city: "Dayton", state: "OH" },
    { name: "Prairie Construction", domain: "prairieconstruction.com", industry: "Construction", city: "Akron", state: "OH" },
    { name: "Great Plains Energy", domain: "greatplainsenergy.com", industry: "Energy", city: "Toledo", state: "OH" },
    { name: "Riverfront Financial", domain: "riverfrontfinancial.com", industry: "Financial Services", city: "Columbus", state: "OH" },
    { name: "Oakwood Tech", domain: "oakwoodtech.io", industry: "Technology", city: "Cincinnati", state: "OH" },
    { name: "Valley Insurance", domain: "valleyins.com", industry: "Insurance", city: "Cleveland", state: "OH" },
    { name: "Central Energy", domain: "centralenergy.com", industry: "Energy", city: "Dayton", state: "OH" },
    { name: "Pioneer Healthcare Systems", domain: "pioneerhealthsys.org", industry: "Healthcare", city: "Columbus", state: "OH" },
    { name: "Midwest Financial Group", domain: "midwestfingroup.com", industry: "Financial Services", city: "Akron", state: "OH" },
    { name: "Heartland Construction", domain: "heartlandconstruction.com", industry: "Construction", city: "Toledo", state: "OH" },
    { name: "Summit Financial", domain: "summitfinancial.com", industry: "Financial Services", city: "Cincinnati", state: "OH" },
    { name: "Cardinal Energy", domain: "cardinalenergy.com", industry: "Energy", city: "Columbus", state: "OH" },
    { name: "Ohio Healthcare Group", domain: "ohiohealthcare.org", industry: "Healthcare", city: "Cleveland", state: "OH" },
    { name: "Gateway Construction", domain: "gatewayconstruction.com", industry: "Construction", city: "Dayton", state: "OH" },
    { name: "Northshore Properties", domain: "northshoreprops.com", industry: "Real Estate", city: "Toledo", state: "OH" },
    { name: "Buckeye Financial", domain: "buckeyefinancial.com", industry: "Financial Services", city: "Columbus", state: "OH" },
  ];

  const quadrants: QuadrantType[] = ['partner', 'volunteering', 'donor', 'acquaintance'];
  const contactFirstNames = ['Michael', 'Sarah', 'David', 'Jennifer', 'Robert', 'Emily', 'James', 'Amanda', 'William', 'Jessica'];
  const contactLastNames = ['Thompson', 'Martinez', 'Anderson', 'Wilson', 'Taylor', 'Brown', 'Garcia', 'Miller', 'Davis', 'Johnson'];

  return companies.slice(0, 100).map((company, index) => {
    const quadrant = quadrants[index % 4];
    let energy: number, structure: number;
    
    switch (quadrant) {
      case 'partner': // top-right
        energy = 55 + Math.random() * 45;
        structure = 55 + Math.random() * 45;
        break;
      case 'volunteering': // top-left
        energy = 55 + Math.random() * 45;
        structure = 5 + Math.random() * 40;
        break;
      case 'donor': // bottom-right
        energy = 5 + Math.random() * 40;
        structure = 55 + Math.random() * 45;
        break;
      case 'acquaintance': // bottom-left
      default:
        energy = 5 + Math.random() * 40;
        structure = 5 + Math.random() * 40;
        break;
    }

    const firstName = contactFirstNames[Math.floor(Math.random() * contactFirstNames.length)];
    const lastName = contactLastNames[Math.floor(Math.random() * contactLastNames.length)];

    return {
      id: `corp-${index + 1}`,
      name: company.name,
      domain: company.domain,
      industry: company.industry,
      description: `${company.name} is a leading ${company.industry.toLowerCase()} company based in ${company.city}, ${company.state}, committed to community development and senior housing initiatives.`,
      contactName: `${firstName} ${lastName}`,
      contactEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.domain}`,
      contactPhone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      totalContributions: Math.floor(Math.random() * 500000) + 10000,
      employeeCount: Math.floor(Math.random() * 5000) + 50,
      volunteerHours: Math.floor(Math.random() * 2000) + 100,
      matchingGiftAmount: Math.floor(Math.random() * 100000) + 5000,
      energy: Math.round(energy),
      structure: Math.round(structure),
      quadrant,
      city: company.city,
      state: company.state,
    };
  });
};

const corporations = generateCorporations();

export default function CorporateQuadrantMapper() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<QuadrantType>('partner');
  const [draggedCorp, setDraggedCorp] = useState<Corporation | null>(null);
  const [isPartnerHovered, setIsPartnerHovered] = useState(false);
  const [movedToPartner, setMovedToPartner] = useState<Set<string>>(new Set());
  const [, navigate] = useLocation();

  const handleDragStart = (e: React.DragEvent, corp: Corporation) => {
    if (corp.quadrant === 'partner' || movedToPartner.has(corp.id)) {
      e.preventDefault();
      return;
    }
    setDraggedCorp(corp);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', corp.id);
    
    const dragImage = document.createElement('div');
    dragImage.innerHTML = `<div style="padding: 8px 16px; background: #EA580C; color: white; border-radius: 8px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">${corp.name}</div>`;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 50, 20);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragEnd = () => {
    setDraggedCorp(null);
    setIsPartnerHovered(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPartnerHovered(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsPartnerHovered(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPartnerHovered(false);
    
    if (draggedCorp && draggedCorp.quadrant !== 'partner' && !movedToPartner.has(draggedCorp.id)) {
      setMovedToPartner(prev => new Set(Array.from(prev).concat(draggedCorp.id)));
      // Navigate to action plan page
      navigate(`/corporate-partnerships/${draggedCorp.id}/action-plan`);
    }
    setDraggedCorp(null);
  };

  const quadrantConfig = {
    partner: { label: 'Partner', description: 'High Engagement, High Giving' },
    volunteering: { label: 'Volunteering', description: 'High Engagement, Low Giving' },
    donor: { label: 'Donor', description: 'Low Engagement, High Giving' },
    acquaintance: { label: 'Acquaintance', description: 'Low Engagement, Low Giving' },
  };

  const counts = {
    partner: corporations.filter(c => c.quadrant === 'partner' || movedToPartner.has(c.id)).length,
    volunteering: corporations.filter(c => c.quadrant === 'volunteering' && !movedToPartner.has(c.id)).length,
    donor: corporations.filter(c => c.quadrant === 'donor' && !movedToPartner.has(c.id)).length,
    acquaintance: corporations.filter(c => c.quadrant === 'acquaintance' && !movedToPartner.has(c.id)).length,
  };

  const selectedCorporations = corporations
    .filter(c => {
      if (selectedQuadrant === 'partner') {
        return c.quadrant === 'partner' || movedToPartner.has(c.id);
      }
      return c.quadrant === selectedQuadrant && !movedToPartner.has(c.id);
    })
    .sort((a, b) => (b.energy + b.structure) - (a.energy + a.structure));

  const playbooks: Record<QuadrantType, string[]> = {
    partner: [
      "Steward the relationship with quarterly executive updates",
      "Invite to exclusive foundation events and recognition ceremonies",
      "Explore multi-year partnership commitments",
    ],
    volunteering: [
      "Identify giving capacity through wealth screening",
      "Share impact stories that demonstrate giving outcomes",
      "Propose matching gift program participation",
    ],
    donor: [
      "Invite employees to volunteer days at facilities",
      "Offer employee engagement opportunities",
      "Connect with CSR/community relations team",
    ],
    acquaintance: [
      "Schedule introductory meeting with decision-makers",
      "Share organization overview and mission alignment",
      "Identify potential areas of partnership interest",
    ],
  };

  return (
    <div className="flex flex-row gap-6 items-stretch" data-testid="corporate-quadrant-container">
      <Card className="flex-[2.5] flex flex-col overflow-visible shadow-lg" style={{ minHeight: '600px' }} data-testid="card-quadrant-visualization">
        <CardHeader className="border-b py-4" style={{ backgroundColor: '#395174' }}>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-white text-xl" data-testid="title-corporate-quadrant">
                <Building2 className="w-6 h-6" style={{ color: '#e1c47d' }} />
                Corporate Relationship Quadrant
              </CardTitle>
              <CardDescription className="mt-1 text-white/80">
                Engagement increases upward; giving increases to the right. Goal: Move every corporation toward Partner.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-base px-3 py-1" style={{ backgroundColor: '#e1c47d', color: '#000000' }} data-testid="badge-total-corporations">
              {corporations.length} Corporations
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-8" style={{ backgroundColor: '#f4f4f4' }}>
          <div className="relative pb-10 pl-12">
            <div className="relative w-full overflow-hidden bg-background rounded-lg" style={{ border: '3px solid #395174', aspectRatio: '1/1' }}>
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
              <div className="absolute left-0 right-0 top-1/2 h-px bg-border" />

              <div
                className={`absolute top-0 right-0 w-1/2 h-1/2 transition-all duration-200 ${
                  isPartnerHovered 
                    ? 'bg-emerald-200/60 border-2 border-emerald-500' 
                    : ''
                }`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                data-testid="drop-zone-partner"
              />

              {corporations.map((corp) => {
                const isInPartner = corp.quadrant === 'partner' || movedToPartner.has(corp.id);
                const isDraggable = !isInPartner;
                const isBeingDragged = draggedCorp?.id === corp.id;
                const isGreen = movedToPartner.has(corp.id);
                
                let adjustedTop: string;
                const effectiveQuadrant = isInPartner ? 'partner' : corp.quadrant;
                
                if (effectiveQuadrant === 'partner' || effectiveQuadrant === 'volunteering') {
                  const energyInRange = (corp.energy - 50) / 50;
                  const usableStart = 16;
                  const usableEnd = 46;
                  const topPercent = usableEnd - (energyInRange * (usableEnd - usableStart));
                  adjustedTop = `${topPercent}%`;
                } else {
                  const energyInRange = corp.energy / 50;
                  const usableStart = 54;
                  const usableEnd = 84;
                  const topPercent = usableStart + ((1 - energyInRange) * (usableEnd - usableStart));
                  adjustedTop = `${topPercent}%`;
                }

                let leftPosition = corp.structure;
                if (isInPartner && corp.quadrant !== 'partner') {
                  leftPosition = 55 + Math.random() * 40;
                }
                
                return (
                  <HoverCard key={corp.id} openDelay={150} closeDelay={50} open={draggedCorp ? false : undefined}>
                    <HoverCardTrigger asChild>
                      <button
                        draggable={isDraggable}
                        onDragStart={(e) => handleDragStart(e, corp)}
                        onDragEnd={handleDragEnd}
                        onClick={() => navigate(`/corporate-partnerships/${corp.id}`)}
                        className={`absolute w-2.5 h-2.5 rounded-full shadow-sm transition-all border-0 p-0 z-5 pointer-events-auto ${
                          isDraggable 
                            ? 'cursor-grab active:cursor-grabbing hover:scale-150' 
                            : 'cursor-pointer hover:scale-150'
                        } ${isBeingDragged ? 'opacity-50 scale-125' : ''} ${isGreen ? '' : 'bg-primary/80'}`}
                        style={{
                          left: `calc(${leftPosition}% - 5px)`,
                          top: adjustedTop,
                          zIndex: 5,
                          ...(isGreen ? { backgroundColor: '#22C55E' } : {}),
                        }}
                        data-testid={`dot-corp-${corp.id}`}
                        aria-label={isDraggable 
                          ? `Drag ${corp.name} to Partner quadrant`
                          : `View profile for ${corp.name}`
                        }
                        title={isDraggable ? 'Drag to Partner quadrant' : undefined}
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96 p-0 overflow-hidden z-50" side="right" align="start" sideOffset={10}>
                      <div className="space-y-0">
                        <div className="p-4 bg-card border-b">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-16 h-16 border-2 border-primary/10">
                              <AvatarFallback className="bg-orange-100 text-orange-700 text-lg font-semibold">
                                {corp.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg truncate" data-testid={`hovercard-name-${corp.id}`}>
                                {corp.name}
                              </h3>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                                <Briefcase className="w-3 h-3" />
                                <span>{corp.industry}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                                <MapPin className="w-3 h-3" />
                                <span>{corp.city}, {corp.state}</span>
                              </div>
                              <div className="flex flex-col gap-1.5 mt-2">
                                <div className="flex items-center gap-1.5 text-xs">
                                  <Badge variant="secondary" className="px-1.5 py-0.5 bg-orange-500 text-white hover:bg-orange-600 no-default-hover-elevate">
                                    <Phone className="w-3 h-3 mr-1" />
                                    PHONE
                                  </Badge>
                                  <span className="text-orange-600 dark:text-orange-400 font-medium">{corp.contactPhone}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs">
                                  <Badge variant="secondary" className="px-1.5 py-0.5 bg-orange-500 text-white hover:bg-orange-600 no-default-hover-elevate">
                                    <Mail className="w-3 h-3 mr-1" />
                                    EMAIL
                                  </Badge>
                                  <span className="text-orange-600 dark:text-orange-400 font-medium truncate">{corp.contactEmail}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="border-t mt-3 pt-3">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {corp.description}{' '}
                              <Link 
                                href={`/corporate-partnerships/${corp.id}`} 
                                className="text-orange-500 hover:text-orange-600 hover:underline"
                              >
                                View More
                              </Link>
                            </p>
                            <div className="mt-3 flex gap-2">
                              <Link href={`/corporate-partnerships/${corp.id}/action-plan`}>
                                <Button 
                                  variant="default"
                                  size="sm"
                                  className="h-7 text-xs"
                                  data-testid={`button-action-plan-${corp.id}`}
                                >
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  Generate Action Plan
                                </Button>
                              </Link>
                              <Link href={`/corporate-partnerships/${corp.id}`}>
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs"
                                  data-testid={`button-view-corp-${corp.id}`}
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  View
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 divide-x bg-muted/30">
                          <div className="p-4 text-center">
                            <div className="text-2xl font-bold text-orange-600">
                              ${corp.totalContributions.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">Total Contributions</div>
                          </div>
                          <div className="p-4 text-center">
                            <div className="text-2xl font-bold text-orange-600">{corp.volunteerHours.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground mt-1">Volunteer Hours</div>
                          </div>
                        </div>

                        <div className="p-4 border-t space-y-3 bg-white dark:bg-card">
                          <div className="flex items-start gap-3">
                            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-8 h-8 text-orange-600" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2 text-sm font-medium">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span><strong>{corp.employeeCount.toLocaleString()}</strong> employees</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <DollarSign className="w-4 h-4 text-green-500" />
                                <span>${corp.matchingGiftAmount.toLocaleString()} matching gift potential</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <HandHeart className="w-4 h-4 text-purple-500" />
                                <span>Contact: {corp.contactName}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                );
              })}

              {/* Centered Quadrant Labels */}
              {/* Volunteering - Top Left */}
              <button
                onClick={() => setSelectedQuadrant('volunteering')}
                className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 z-30 px-4 py-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-[#395174] rounded-lg shadow-md"
                data-testid="quadrant-volunteering"
              >
                <span className="font-semibold text-sm text-white">Volunteering</span>
                <span className="text-xs text-[#e1c47d] font-medium" data-testid="count-volunteering">{counts.volunteering} Corps</span>
              </button>

              {/* Partner - Top Right */}
              <button
                onClick={() => setSelectedQuadrant('partner')}
                className="absolute left-3/4 top-1/4 -translate-x-1/2 -translate-y-1/2 z-30 px-4 py-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-[#395174] rounded-lg shadow-md"
                data-testid="quadrant-partner"
              >
                <span className="font-semibold text-sm text-white">Partner</span>
                <span className="text-xs text-[#e1c47d] font-medium" data-testid="count-partner">{counts.partner} Corps</span>
              </button>
              {isPartnerHovered && draggedCorp && (
                <div className="absolute left-3/4 top-1/4 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded shadow z-40">
                  Drop to generate action plan
                </div>
              )}

              {/* Acquaintance - Bottom Left */}
              <button
                onClick={() => setSelectedQuadrant('acquaintance')}
                className="absolute left-1/4 top-3/4 -translate-x-1/2 -translate-y-1/2 z-30 px-4 py-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-[#395174] rounded-lg shadow-md"
                data-testid="quadrant-acquaintance"
              >
                <span className="font-semibold text-sm text-white">Acquaintance</span>
                <span className="text-xs text-[#e1c47d] font-medium" data-testid="count-acquaintance">{counts.acquaintance} Corps</span>
              </button>

              {/* Donor - Bottom Right */}
              <button
                onClick={() => setSelectedQuadrant('donor')}
                className="absolute left-3/4 top-3/4 -translate-x-1/2 -translate-y-1/2 z-30 px-4 py-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-[#395174] rounded-lg shadow-md"
                data-testid="quadrant-donor"
              >
                <span className="font-semibold text-sm text-white">Donor</span>
                <span className="text-xs text-[#e1c47d] font-medium" data-testid="count-donor">{counts.donor} Corps</span>
              </button>
            </div>

            <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Engagement →
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Giving →
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-lg" style={{ minWidth: '320px', maxWidth: '400px', minHeight: '600px' }} data-testid="card-quadrant-details">
        <div className="flex border-b bg-muted/30 shrink-0" data-testid="quadrant-tabs-container">
          {(['partner', 'volunteering', 'donor', 'acquaintance'] as QuadrantType[]).map((q) => {
            const isSelected = selectedQuadrant === q;
            const count = q === 'partner' ? counts.partner : 
                         q === 'volunteering' ? counts.volunteering :
                         q === 'donor' ? counts.donor : counts.acquaintance;
            return (
              <button
                key={q}
                onClick={() => setSelectedQuadrant(q)}
                className={`
                  flex-1 px-3 py-3 text-center transition-all relative border-r last:border-r-0
                  ${isSelected 
                    ? 'font-semibold shadow-sm z-10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
                style={{ 
                  ...(isSelected ? { backgroundColor: '#395174' } : {}),
                  borderRightColor: 'rgba(57, 81, 116, 0.25)'
                }}
                data-testid={`tab-${q}`}
              >
                <div className="text-sm font-bold" style={isSelected ? { color: 'white' } : {}}>{quadrantConfig[q].label}</div>
                <div 
                  className={`text-xs mt-0.5 ${!isSelected ? 'text-muted-foreground' : ''}`}
                  style={isSelected ? { color: '#e1c47d' } : {}}
                >
                  {count} {count === 1 ? 'corp' : 'corps'}
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="px-4 py-2 bg-muted/20 border-b text-sm text-muted-foreground shrink-0">
          {quadrantConfig[selectedQuadrant].description}
        </div>
        
        <CardContent className="p-4 pt-4 flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="flex-1 space-y-2 overflow-y-auto min-h-0">
            {selectedCorporations.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">
                No corporations in this quadrant yet.
              </div>
            ) : (
              selectedCorporations.map((corp) => {
                const summaries: Record<QuadrantType, string> = {
                  partner: 'Strong engagement and giving commitment',
                  volunteering: 'Active volunteer participation, growing giving potential',
                  donor: 'Consistent giving, opportunity for deeper engagement',
                  acquaintance: 'New relationship with partnership potential',
                };
                const isGreen = movedToPartner.has(corp.id);
                return (
                  <div
                    key={corp.id}
                    className="p-3 border rounded-lg hover-elevate text-sm"
                    data-testid={`corp-item-${corp.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: isGreen ? '#22C55E' : '#EA580C' }}
                          />
                          <div className="font-medium truncate">
                            {corp.name}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground ml-4.5">
                          {corp.industry} • {corp.city}, {corp.state}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 italic ml-4.5">
                          {summaries[selectedQuadrant]}
                        </div>
                      </div>
                      <Link href={`/corporate-partnerships/${corp.id}`}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs shrink-0"
                          data-testid={`view-corp-${corp.id}`}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
        
        <div className="bg-muted/30 border-t px-4 py-4 shrink-0">
          <div className="flex items-center gap-2 text-sm font-semibold mb-3">
            <Lightbulb className="w-4 h-4 text-orange-500" />
            <span>AI Playbook to Move towards Partner:</span>
          </div>
          <ol className="space-y-2 text-sm">
            {playbooks[selectedQuadrant].map((step, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-muted-foreground">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Card>
    </div>
  );
}

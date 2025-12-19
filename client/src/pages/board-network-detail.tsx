import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronLeft,
  Users,
  Network,
  Search,
  Building2,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  ExternalLink,
  Sparkles,
  Target,
  ArrowRight,
  Star,
  DollarSign,
  UserPlus,
  MessageSquare,
  Share2,
  Filter,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap
} from 'lucide-react';

interface BoardMember {
  id: string;
  name: string;
  title: string;
  organization: string;
  connectionPaths: number;
  connectionStrength: 'strong' | 'moderate' | 'weak';
  wealthIndicator: 'high' | 'medium' | 'low';
  email: string;
  phone: string;
  location: string;
  tenure: string;
  committees: string[];
  giftCapacity: string;
  lastContact: string;
  connections: {
    name: string;
    relationship: string;
    strength: number;
  }[];
  aiInsights: string[];
}

const boardData: Record<string, { 
  name: string; 
  description: string; 
  color: string; 
  members: BoardMember[];
  stats: {
    totalPaths: number;
    avgStrength: number;
    topIndustry: string;
    totalCapacity: string;
  };
}> = {
  'board-of-directors': {
    name: 'Board of Directors',
    description: 'Senior leadership and governance members with extensive networks',
    color: '#7FA3A1',
    stats: {
      totalPaths: 156,
      avgStrength: 78,
      topIndustry: 'Financial Services',
      totalCapacity: '$12.5M'
    },
    members: [
      {
        id: '1',
        name: 'Margaret Chen',
        title: 'Board Chair',
        organization: 'Chen Family Foundation',
        connectionPaths: 24,
        connectionStrength: 'strong',
        wealthIndicator: 'high',
        email: 'mchen@chenff.org',
        phone: '(614) 555-0101',
        location: 'Columbus, OH',
        tenure: '8 years',
        committees: ['Executive', 'Finance', 'Governance'],
        giftCapacity: '$2.5M',
        lastContact: '3 days ago',
        connections: [
          { name: 'Robert Williams', relationship: 'Former colleague at JPMorgan', strength: 95 },
          { name: 'Sarah Martinez', relationship: 'Co-board member at Arts Council', strength: 88 },
          { name: 'David Park', relationship: 'Family friend', strength: 85 }
        ],
        aiInsights: [
          'Strong advocate for senior housing initiatives',
          'Recently increased foundation giving by 40%',
          'Connected to 3 Fortune 500 executives'
        ]
      },
      {
        id: '2',
        name: 'William Foster III',
        title: 'Vice Chair',
        organization: 'Foster Industries',
        connectionPaths: 18,
        connectionStrength: 'strong',
        wealthIndicator: 'high',
        email: 'wfoster@fosterind.com',
        phone: '(614) 555-0102',
        location: 'Dublin, OH',
        tenure: '6 years',
        committees: ['Executive', 'Development'],
        giftCapacity: '$1.8M',
        lastContact: '1 week ago',
        connections: [
          { name: 'James Richardson', relationship: 'Business partner', strength: 92 },
          { name: 'Lisa Thompson', relationship: 'Country club member', strength: 78 },
          { name: 'Michael Brown', relationship: 'Investment group', strength: 82 }
        ],
        aiInsights: [
          'Manufacturing industry leader',
          'Active in economic development',
          'Potential corporate partnership opportunity'
        ]
      },
      {
        id: '3',
        name: 'Dr. Patricia Reynolds',
        title: 'Secretary',
        organization: 'Ohio State University',
        connectionPaths: 15,
        connectionStrength: 'moderate',
        wealthIndicator: 'medium',
        email: 'preynolds@osu.edu',
        phone: '(614) 555-0103',
        location: 'Columbus, OH',
        tenure: '4 years',
        committees: ['Programs', 'Research'],
        giftCapacity: '$250K',
        lastContact: '2 weeks ago',
        connections: [
          { name: 'Dr. Alan Mitchell', relationship: 'Research collaborator', strength: 90 },
          { name: 'Jennifer Walsh', relationship: 'Department colleague', strength: 75 },
          { name: 'Thomas Green', relationship: 'Grant committee', strength: 68 }
        ],
        aiInsights: [
          'Expert in gerontology research',
          'Strong academic network',
          'Grant writing expertise'
        ]
      },
      {
        id: '4',
        name: 'Richard Blackwell',
        title: 'Treasurer',
        organization: 'Blackwell Capital Partners',
        connectionPaths: 22,
        connectionStrength: 'strong',
        wealthIndicator: 'high',
        email: 'rblackwell@blackwellcp.com',
        phone: '(614) 555-0104',
        location: 'New Albany, OH',
        tenure: '5 years',
        committees: ['Finance', 'Investment'],
        giftCapacity: '$3.2M',
        lastContact: '5 days ago',
        connections: [
          { name: 'George Hamilton', relationship: 'Investment partner', strength: 94 },
          { name: 'Catherine Moore', relationship: 'Private equity network', strength: 89 },
          { name: 'Steven Clark', relationship: 'Golf club member', strength: 72 }
        ],
        aiInsights: [
          'Manages $500M in assets',
          'Strong interest in planned giving',
          'Hosts annual charity gala'
        ]
      },
      {
        id: '5',
        name: 'Sandra Mitchell',
        title: 'Director',
        organization: 'Community Health Partners',
        connectionPaths: 14,
        connectionStrength: 'moderate',
        wealthIndicator: 'medium',
        email: 'smitchell@chp.org',
        phone: '(614) 555-0105',
        location: 'Westerville, OH',
        tenure: '3 years',
        committees: ['Programs', 'Community Outreach'],
        giftCapacity: '$175K',
        lastContact: '1 month ago',
        connections: [
          { name: 'Nancy Roberts', relationship: 'Healthcare network', strength: 85 },
          { name: 'Paul Johnson', relationship: 'Non-profit alliance', strength: 79 },
          { name: 'Mary Davis', relationship: 'Community leader', strength: 73 }
        ],
        aiInsights: [
          'Healthcare sector influence',
          'Strong community ties',
          'Potential event sponsor'
        ]
      },
      {
        id: '6',
        name: 'James O\'Connor',
        title: 'Director',
        organization: 'O\'Connor Law Group',
        connectionPaths: 19,
        connectionStrength: 'strong',
        wealthIndicator: 'high',
        email: 'joconnor@oconnorlaw.com',
        phone: '(614) 555-0106',
        location: 'Upper Arlington, OH',
        tenure: '7 years',
        committees: ['Governance', 'Legal'],
        giftCapacity: '$1.2M',
        lastContact: '2 days ago',
        connections: [
          { name: 'Robert Sullivan', relationship: 'Law partner', strength: 91 },
          { name: 'Elizabeth Carter', relationship: 'Bar association', strength: 84 },
          { name: 'Charles Wilson', relationship: 'Estate planning client', strength: 77 }
        ],
        aiInsights: [
          'Estate planning expertise',
          'Refers high-net-worth clients',
          'Active in planned giving education'
        ]
      },
      {
        id: '7',
        name: 'Helen Rodriguez',
        title: 'Director',
        organization: 'Rodriguez Family Office',
        connectionPaths: 16,
        connectionStrength: 'moderate',
        wealthIndicator: 'high',
        email: 'hrodriguez@rodriguezfo.com',
        phone: '(614) 555-0107',
        location: 'Bexley, OH',
        tenure: '2 years',
        committees: ['Development', 'Events'],
        giftCapacity: '$2.1M',
        lastContact: '3 weeks ago',
        connections: [
          { name: 'Maria Gonzalez', relationship: 'Family office network', strength: 88 },
          { name: 'Carlos Mendez', relationship: 'Philanthropic advisor', strength: 82 },
          { name: 'Ana Torres', relationship: 'Cultural foundation', strength: 76 }
        ],
        aiInsights: [
          'First-generation wealth',
          'Interested in education initiatives',
          'Bilingual community connections'
        ]
      },
      {
        id: '8',
        name: 'Thomas Anderson',
        title: 'Director',
        organization: 'Anderson Consulting Group',
        connectionPaths: 11,
        connectionStrength: 'moderate',
        wealthIndicator: 'medium',
        email: 'tanderson@acg.com',
        phone: '(614) 555-0108',
        location: 'Grandview Heights, OH',
        tenure: '4 years',
        committees: ['Strategic Planning'],
        giftCapacity: '$350K',
        lastContact: '2 weeks ago',
        connections: [
          { name: 'Kevin Murphy', relationship: 'Client relationship', strength: 80 },
          { name: 'Diana Ross', relationship: 'Business network', strength: 74 },
          { name: 'Frank Miller', relationship: 'Chamber of commerce', strength: 69 }
        ],
        aiInsights: [
          'Strategic planning expertise',
          'Corporate connections',
          'Potential board recruiter'
        ]
      },
      {
        id: '9',
        name: 'Barbara Thompson',
        title: 'Director',
        organization: 'Thompson Real Estate Holdings',
        connectionPaths: 8,
        connectionStrength: 'weak',
        wealthIndicator: 'high',
        email: 'bthompson@treh.com',
        phone: '(614) 555-0109',
        location: 'Powell, OH',
        tenure: '1 year',
        committees: ['Facilities'],
        giftCapacity: '$1.5M',
        lastContact: '6 weeks ago',
        connections: [
          { name: 'Andrew Collins', relationship: 'Real estate network', strength: 72 },
          { name: 'Susan White', relationship: 'Property investors', strength: 65 },
          { name: 'Mark Taylor', relationship: 'Development projects', strength: 58 }
        ],
        aiInsights: [
          'New board member - needs cultivation',
          'Real estate portfolio $50M+',
          'Potential naming opportunity interest'
        ]
      },
      {
        id: '10',
        name: 'Dr. Michael Kim',
        title: 'Director',
        organization: 'Kim Medical Associates',
        connectionPaths: 9,
        connectionStrength: 'weak',
        wealthIndicator: 'medium',
        email: 'mkim@kimmed.com',
        phone: '(614) 555-0110',
        location: 'Dublin, OH',
        tenure: '2 years',
        committees: ['Health & Wellness'],
        giftCapacity: '$400K',
        lastContact: '1 month ago',
        connections: [
          { name: 'Dr. Sarah Lee', relationship: 'Medical practice', strength: 78 },
          { name: 'John Park', relationship: 'Healthcare foundation', strength: 70 },
          { name: 'Amy Chen', relationship: 'Community health', strength: 64 }
        ],
        aiInsights: [
          'Healthcare provider network',
          'Interest in senior wellness',
          'Potential clinic partnership'
        ]
      },
      {
        id: '11',
        name: 'Elizabeth Warren-Hughes',
        title: 'Director',
        organization: 'Warren Foundation',
        connectionPaths: 12,
        connectionStrength: 'moderate',
        wealthIndicator: 'high',
        email: 'ewh@warrenfoundation.org',
        phone: '(614) 555-0111',
        location: 'German Village, OH',
        tenure: '3 years',
        committees: ['Grants', 'Programs'],
        giftCapacity: '$1.8M',
        lastContact: '1 week ago',
        connections: [
          { name: 'Victoria Grant', relationship: 'Foundation network', strength: 86 },
          { name: 'Harrison Wells', relationship: 'Philanthropic circle', strength: 81 },
          { name: 'Charlotte Adams', relationship: 'Arts community', strength: 75 }
        ],
        aiInsights: [
          'Multi-generational philanthropy',
          'Arts and culture focus',
          'DAF advisor influence'
        ]
      },
      {
        id: '12',
        name: 'Robert Nakamura',
        title: 'Director',
        organization: 'Nakamura Tech Ventures',
        connectionPaths: 8,
        connectionStrength: 'weak',
        wealthIndicator: 'high',
        email: 'rnakamura@ntv.com',
        phone: '(614) 555-0112',
        location: 'Short North, OH',
        tenure: '1 year',
        committees: ['Technology', 'Innovation'],
        giftCapacity: '$2.8M',
        lastContact: '2 months ago',
        connections: [
          { name: 'Hiroshi Tanaka', relationship: 'Tech investors', strength: 82 },
          { name: 'Jennifer Wu', relationship: 'Startup network', strength: 75 },
          { name: 'David Chang', relationship: 'Angel investors', strength: 68 }
        ],
        aiInsights: [
          'Tech entrepreneur - recent exit',
          'Interested in innovation programs',
          'Potential major gift prospect'
        ]
      }
    ]
  },
  'foundation-board': {
    name: 'Foundation Board',
    description: 'Foundation trustees overseeing endowment and grants',
    color: '#7BC4DC',
    stats: {
      totalPaths: 89,
      avgStrength: 72,
      topIndustry: 'Finance & Banking',
      totalCapacity: '$8.2M'
    },
    members: [
      {
        id: '1',
        name: 'Jonathan Sterling',
        title: 'Foundation Chair',
        organization: 'Sterling Family Trust',
        connectionPaths: 18,
        connectionStrength: 'strong',
        wealthIndicator: 'high',
        email: 'jsterling@sterlingtrust.org',
        phone: '(614) 555-0201',
        location: 'Bexley, OH',
        tenure: '10 years',
        committees: ['Investment', 'Grants'],
        giftCapacity: '$3.5M',
        lastContact: '1 week ago',
        connections: [
          { name: 'Victoria Banks', relationship: 'Trust co-trustee', strength: 94 },
          { name: 'Harold Morton', relationship: 'Investment advisor', strength: 88 },
          { name: 'Eleanor Hughes', relationship: 'Philanthropy circle', strength: 85 }
        ],
        aiInsights: [
          'Third-generation philanthropist',
          'Endowment growth advocate',
          'Legacy giving champion'
        ]
      },
      {
        id: '2',
        name: 'Catherine Wells',
        title: 'Vice Chair',
        organization: 'Wells Capital Management',
        connectionPaths: 14,
        connectionStrength: 'strong',
        wealthIndicator: 'high',
        email: 'cwells@wellscap.com',
        phone: '(614) 555-0202',
        location: 'New Albany, OH',
        tenure: '7 years',
        committees: ['Investment', 'Finance'],
        giftCapacity: '$2.1M',
        lastContact: '3 days ago',
        connections: [
          { name: 'Marcus Green', relationship: 'Investment partner', strength: 91 },
          { name: 'Sophia Chen', relationship: 'Wealth management', strength: 84 },
          { name: 'Daniel Ross', relationship: 'Private equity', strength: 79 }
        ],
        aiInsights: [
          'CFA with $200M AUM',
          'Impact investing focus',
          'ESG advocate'
        ]
      },
      {
        id: '3',
        name: 'Dr. Raymond Patel',
        title: 'Trustee',
        organization: 'Patel Medical Foundation',
        connectionPaths: 11,
        connectionStrength: 'moderate',
        wealthIndicator: 'high',
        email: 'rpatel@patelmedfound.org',
        phone: '(614) 555-0203',
        location: 'Dublin, OH',
        tenure: '5 years',
        committees: ['Grants', 'Programs'],
        giftCapacity: '$1.4M',
        lastContact: '2 weeks ago',
        connections: [
          { name: 'Dr. Anita Sharma', relationship: 'Medical foundation', strength: 87 },
          { name: 'Raj Kapoor', relationship: 'Healthcare network', strength: 80 },
          { name: 'Priya Mehta', relationship: 'Community leader', strength: 74 }
        ],
        aiInsights: [
          'Healthcare philanthropy leader',
          'Senior care advocate',
          'Hospital board connections'
        ]
      },
      {
        id: '4',
        name: 'Margaret O\'Brien',
        title: 'Trustee',
        organization: 'O\'Brien Charitable Trust',
        connectionPaths: 12,
        connectionStrength: 'moderate',
        wealthIndicator: 'high',
        email: 'mobrien@obrientrust.org',
        phone: '(614) 555-0204',
        location: 'Upper Arlington, OH',
        tenure: '6 years',
        committees: ['Scholarship', 'Programs'],
        giftCapacity: '$1.2M',
        lastContact: '1 week ago',
        connections: [
          { name: 'Patrick Kelly', relationship: 'Trust advisor', strength: 86 },
          { name: 'Maureen Callahan', relationship: 'DAF network', strength: 81 },
          { name: 'Sean Murphy', relationship: 'Catholic charities', strength: 77 }
        ],
        aiInsights: [
          'Education focus',
          'Catholic giving network',
          'Scholarship program interest'
        ]
      },
      {
        id: '5',
        name: 'Howard Livingston',
        title: 'Trustee',
        organization: 'Livingston Enterprises',
        connectionPaths: 9,
        connectionStrength: 'moderate',
        wealthIndicator: 'medium',
        email: 'hlivingston@livingstonent.com',
        phone: '(614) 555-0205',
        location: 'Worthington, OH',
        tenure: '4 years',
        committees: ['Operations'],
        giftCapacity: '$450K',
        lastContact: '3 weeks ago',
        connections: [
          { name: 'Carol Edwards', relationship: 'Business network', strength: 78 },
          { name: 'Timothy Grant', relationship: 'Industry association', strength: 72 },
          { name: 'Linda Morrison', relationship: 'Chamber member', strength: 66 }
        ],
        aiInsights: [
          'Small business advocate',
          'Corporate giving potential',
          'Event sponsorship interest'
        ]
      },
      {
        id: '6',
        name: 'Victoria Ashford',
        title: 'Trustee',
        organization: 'Ashford Family Office',
        connectionPaths: 15,
        connectionStrength: 'strong',
        wealthIndicator: 'high',
        email: 'vashford@ashfordfo.com',
        phone: '(614) 555-0206',
        location: 'Powell, OH',
        tenure: '3 years',
        committees: ['Investment', 'Legacy'],
        giftCapacity: '$2.8M',
        lastContact: '4 days ago',
        connections: [
          { name: 'William Bradford', relationship: 'Family office network', strength: 92 },
          { name: 'Elizabeth Monroe', relationship: 'Philanthropic advisor', strength: 87 },
          { name: 'Christopher Hayes', relationship: 'Estate attorney', strength: 83 }
        ],
        aiInsights: [
          'Multi-family office connections',
          'Next-gen philanthropy focus',
          'Impact measurement interest'
        ]
      },
      {
        id: '7',
        name: 'Charles Morrison',
        title: 'Trustee',
        organization: 'Morrison Banking Group',
        connectionPaths: 7,
        connectionStrength: 'weak',
        wealthIndicator: 'high',
        email: 'cmorrison@morrisonbank.com',
        phone: '(614) 555-0207',
        location: 'German Village, OH',
        tenure: '1 year',
        committees: ['Finance'],
        giftCapacity: '$1.6M',
        lastContact: '6 weeks ago',
        connections: [
          { name: 'Robert Sterling', relationship: 'Banking network', strength: 75 },
          { name: 'Janet Williams', relationship: 'Financial services', strength: 68 },
          { name: 'Gregory Adams', relationship: 'Wealth clients', strength: 62 }
        ],
        aiInsights: [
          'New trustee - cultivation needed',
          'Banking industry connections',
          'CRA partnership potential'
        ]
      },
      {
        id: '8',
        name: 'Susan Whitmore',
        title: 'Trustee',
        organization: 'Whitmore Consulting',
        connectionPaths: 3,
        connectionStrength: 'weak',
        wealthIndicator: 'medium',
        email: 'swhitmore@whitmoreconsult.com',
        phone: '(614) 555-0208',
        location: 'Grandview Heights, OH',
        tenure: '1 year',
        committees: ['Programs'],
        giftCapacity: '$280K',
        lastContact: '2 months ago',
        connections: [
          { name: 'Karen Phillips', relationship: 'Consulting network', strength: 70 },
          { name: 'Brian Thompson', relationship: 'Non-profit clients', strength: 64 },
          { name: 'Michelle Lee', relationship: 'Professional group', strength: 58 }
        ],
        aiInsights: [
          'Non-profit consultant',
          'Program evaluation expertise',
          'Grant writing resource'
        ]
      }
    ]
  },
  'leadership-team': {
    name: 'Leadership Team',
    description: 'Executive staff and senior leadership with professional networks',
    color: '#E8923A',
    stats: {
      totalPaths: 67,
      avgStrength: 68,
      topIndustry: 'Non-profit Management',
      totalCapacity: '$2.4M'
    },
    members: [
      {
        id: '1',
        name: 'Jennifer Morrison',
        title: 'Chief Executive Officer',
        organization: 'NCR',
        connectionPaths: 15,
        connectionStrength: 'strong',
        wealthIndicator: 'medium',
        email: 'jmorrison@ncr.org',
        phone: '(614) 555-0301',
        location: 'Columbus, OH',
        tenure: '12 years',
        committees: ['Executive'],
        giftCapacity: '$125K',
        lastContact: 'Today',
        connections: [
          { name: 'Mark Williams', relationship: 'United Way network', strength: 94 },
          { name: 'Lisa Chen', relationship: 'AFP member', strength: 89 },
          { name: 'David Brown', relationship: 'Non-profit alliance', strength: 86 }
        ],
        aiInsights: [
          'Industry thought leader',
          'Speaking engagement network',
          'Foundation relationships'
        ]
      },
      {
        id: '2',
        name: 'Michael Chen',
        title: 'Chief Development Officer',
        organization: 'NCR',
        connectionPaths: 18,
        connectionStrength: 'strong',
        wealthIndicator: 'medium',
        email: 'mchen@ncr.org',
        phone: '(614) 555-0302',
        location: 'Columbus, OH',
        tenure: '8 years',
        committees: ['Development'],
        giftCapacity: '$85K',
        lastContact: 'Today',
        connections: [
          { name: 'Sarah Johnson', relationship: 'Major donor', strength: 92 },
          { name: 'Robert Taylor', relationship: 'Foundation officer', strength: 88 },
          { name: 'Amanda White', relationship: 'Corporate partner', strength: 84 }
        ],
        aiInsights: [
          'Extensive donor relationships',
          'Foundation grant expertise',
          'Corporate partnership champion'
        ]
      },
      {
        id: '3',
        name: 'Amanda Richardson',
        title: 'Director of Major Gifts',
        organization: 'NCR',
        connectionPaths: 12,
        connectionStrength: 'moderate',
        wealthIndicator: 'low',
        email: 'arichardson@ncr.org',
        phone: '(614) 555-0303',
        location: 'Columbus, OH',
        tenure: '5 years',
        committees: ['Major Gifts'],
        giftCapacity: '$45K',
        lastContact: 'Today',
        connections: [
          { name: 'Patricia Moore', relationship: 'Major donor', strength: 90 },
          { name: 'Thomas Anderson', relationship: 'Prospect', strength: 82 },
          { name: 'Nancy Wilson', relationship: 'Legacy society', strength: 78 }
        ],
        aiInsights: [
          'Top performer in major gifts',
          'Legacy society builder',
          'Prospect research skills'
        ]
      },
      {
        id: '4',
        name: 'David Park',
        title: 'Director of Corporate Relations',
        organization: 'NCR',
        connectionPaths: 10,
        connectionStrength: 'moderate',
        wealthIndicator: 'low',
        email: 'dpark@ncr.org',
        phone: '(614) 555-0304',
        location: 'Columbus, OH',
        tenure: '4 years',
        committees: ['Corporate'],
        giftCapacity: '$35K',
        lastContact: 'Today',
        connections: [
          { name: 'James Wilson', relationship: 'Corporate sponsor', strength: 86 },
          { name: 'Karen Brown', relationship: 'CSR director', strength: 80 },
          { name: 'Steven Clark', relationship: 'Business partner', strength: 75 }
        ],
        aiInsights: [
          'Corporate partnership builder',
          'Sponsorship expertise',
          'Employee engagement programs'
        ]
      },
      {
        id: '5',
        name: 'Rachel Thompson',
        title: 'Director of Foundation Relations',
        organization: 'NCR',
        connectionPaths: 8,
        connectionStrength: 'moderate',
        wealthIndicator: 'low',
        email: 'rthompson@ncr.org',
        phone: '(614) 555-0305',
        location: 'Columbus, OH',
        tenure: '3 years',
        committees: ['Grants'],
        giftCapacity: '$40K',
        lastContact: 'Today',
        connections: [
          { name: 'Elizabeth Warren', relationship: 'Foundation officer', strength: 88 },
          { name: 'George Hamilton', relationship: 'Grant maker', strength: 83 },
          { name: 'Victoria Adams', relationship: 'DAF advisor', strength: 77 }
        ],
        aiInsights: [
          'Grant writing expert',
          'Foundation network builder',
          'Impact reporting skills'
        ]
      },
      {
        id: '6',
        name: 'Christopher Lee',
        title: 'Director of Annual Giving',
        organization: 'NCR',
        connectionPaths: 4,
        connectionStrength: 'weak',
        wealthIndicator: 'low',
        email: 'clee@ncr.org',
        phone: '(614) 555-0306',
        location: 'Columbus, OH',
        tenure: '2 years',
        committees: ['Annual Fund'],
        giftCapacity: '$25K',
        lastContact: 'Today',
        connections: [
          { name: 'Michelle Roberts', relationship: 'Donor relations', strength: 76 },
          { name: 'Brian Johnson', relationship: 'Marketing partner', strength: 70 },
          { name: 'Stephanie Davis', relationship: 'Volunteer leader', strength: 65 }
        ],
        aiInsights: [
          'Digital fundraising innovator',
          'Peer-to-peer campaign leader',
          'Retention program builder'
        ]
      }
    ]
  }
};

export default function BoardNetworkDetail() {
  const [, params] = useRoute('/relsci/network/:groupId');
  const groupId = params?.groupId || 'board-of-directors';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null);
  const [activeTab, setActiveTab] = useState('members');

  const groupData = boardData[groupId] || boardData['board-of-directors'];
  
  const filteredMembers = groupData.members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'moderate': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'weak': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getWealthColor = (wealth: string) => {
    switch (wealth) {
      case 'high': return 'bg-sky-100 text-sky-700';
      case 'medium': return 'bg-slate-100 text-slate-700';
      case 'low': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/relsci?tab=ncr-connections">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to NCR Connections
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-sky-500 hover:bg-sky-600" data-testid="button-add-member">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <Card className="overflow-hidden" data-testid="card-hero">
        <div 
          className="p-6"
          style={{ backgroundColor: `${groupData.color}15` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${groupData.color}25` }}
              >
                <Users className="w-8 h-8" style={{ color: groupData.color }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold" data-testid="text-group-name">{groupData.name}</h1>
                <p className="text-muted-foreground mt-1">{groupData.description}</p>
              </div>
            </div>
            <Badge 
              className="text-white"
              style={{ backgroundColor: groupData.color }}
            >
              <Network className="w-3 h-3 mr-1" />
              {groupData.stats.totalPaths} Connection Paths
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Users className="w-6 h-6 mx-auto mb-2 text-sky-500" />
              <p className="text-2xl font-bold" style={{ color: groupData.color }}>{groupData.members.length}</p>
              <p className="text-sm text-muted-foreground">Members Mapped</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Network className="w-6 h-6 mx-auto mb-2 text-sky-500" />
              <p className="text-2xl font-bold" style={{ color: groupData.color }}>{groupData.stats.totalPaths}</p>
              <p className="text-sm text-muted-foreground">Total Connections</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-sky-500" />
              <p className="text-2xl font-bold" style={{ color: groupData.color }}>{groupData.stats.avgStrength}%</p>
              <p className="text-sm text-muted-foreground">Avg Strength</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-sky-500" />
              <p className="text-2xl font-bold" style={{ color: groupData.color }}>{groupData.stats.totalCapacity}</p>
              <p className="text-sm text-muted-foreground">Total Capacity</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="members" data-testid="tab-members">
            <Users className="w-4 h-4 mr-2" />
            Members ({groupData.members.length})
          </TabsTrigger>
          <TabsTrigger value="connections" data-testid="tab-connections">
            <Network className="w-4 h-4 mr-2" />
            Connection Map
          </TabsTrigger>
          <TabsTrigger value="insights" data-testid="tab-insights">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="actions" data-testid="tab-actions">
            <Target className="w-4 h-4 mr-2" />
            Action Items
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6">
          <div className="flex gap-6">
            {/* Member List */}
            <div className="flex-1">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Network Members</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search members..."
                          className="pl-9 w-64"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          data-testid="input-search"
                        />
                      </div>
                      <Button variant="outline" size="icon" data-testid="button-filter">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className={`p-4 hover-elevate cursor-pointer transition-all ${selectedMember?.id === member.id ? 'bg-sky-50 dark:bg-sky-950/20' : ''}`}
                        onClick={() => setSelectedMember(member)}
                        data-testid={`member-row-${member.id}`}
                      >
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback 
                              className="text-white font-medium"
                              style={{ backgroundColor: groupData.color }}
                            >
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{member.name}</h4>
                              <Badge variant="outline" className={getStrengthColor(member.connectionStrength)}>
                                {member.connectionStrength}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{member.title}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {member.organization}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Network className="w-3 h-3" />
                                {member.connectionPaths} paths
                              </span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {member.tenure}
                              </span>
                              <Badge className={`text-xs ${getWealthColor(member.wealthIndicator)}`}>
                                <DollarSign className="w-3 h-3 mr-0.5" />
                                {member.giftCapacity}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" data-testid={`button-email-${member.id}`}>
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" data-testid={`button-phone-${member.id}`}>
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Member Detail Panel */}
            {selectedMember && (
              <div className="w-96">
                <Card className="sticky top-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Member Details</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedMember(null)}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <Avatar className="w-20 h-20 mx-auto">
                        <AvatarFallback 
                          className="text-white text-xl font-medium"
                          style={{ backgroundColor: groupData.color }}
                        >
                          {selectedMember.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg mt-3">{selectedMember.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedMember.title}</p>
                      <p className="text-sm text-muted-foreground">{selectedMember.organization}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sky-600">{selectedMember.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedMember.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedMember.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>Last contact: {selectedMember.lastContact}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Committees</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedMember.committees.map((committee) => (
                          <Badge key={committee} variant="secondary" className="text-xs">
                            {committee}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Top Connections</h4>
                      <div className="space-y-2">
                        {selectedMember.connections.slice(0, 3).map((conn, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                            <div>
                              <p className="text-sm font-medium">{conn.name}</p>
                              <p className="text-xs text-muted-foreground">{conn.relationship}</p>
                            </div>
                            <div className="text-right">
                              <Progress value={conn.strength} className="w-16 h-1.5" />
                              <p className="text-xs text-muted-foreground mt-0.5">{conn.strength}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-sky-500" />
                        AI Insights
                      </h4>
                      <div className="space-y-1">
                        {selectedMember.aiInsights.map((insight, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <Zap className="w-3 h-3 text-sky-500 shrink-0 mt-0.5" />
                            {insight}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-sky-500 hover:bg-sky-600" size="sm" data-testid="button-view-profile">
                        <Eye className="w-4 h-4 mr-2" />
                        Full Profile
                      </Button>
                      <Button variant="outline" className="flex-1" size="sm" data-testid="button-path-finder">
                        <Share2 className="w-4 h-4 mr-2" />
                        Path Finder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="connections" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5 text-sky-500" />
                Connection Network Visualization
              </CardTitle>
              <CardDescription>
                Interactive map of relationships and connection paths
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="h-[500px] rounded-lg border flex items-center justify-center"
                style={{ backgroundColor: `${groupData.color}08` }}
              >
                <div className="text-center">
                  <Network className="w-16 h-16 mx-auto mb-4" style={{ color: groupData.color }} />
                  <h3 className="text-lg font-semibold mb-2">Network Visualization</h3>
                  <p className="text-muted-foreground max-w-md">
                    Interactive network graph showing {groupData.stats.totalPaths} connection paths 
                    between {groupData.members.length} members and their extended networks.
                  </p>
                  <Button className="mt-4 bg-sky-500 hover:bg-sky-600" data-testid="button-launch-viz">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Launch Full Visualization
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="mt-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-sky-500" />
                  Key Network Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Star, title: 'Highest Connectivity', desc: `${groupData.members[0]?.name} has ${groupData.members[0]?.connectionPaths} active paths`, color: 'text-amber-500' },
                  { icon: TrendingUp, title: 'Growth Opportunity', desc: 'Foundation sector shows 40% untapped potential', color: 'text-emerald-500' },
                  { icon: AlertCircle, title: 'Attention Needed', desc: '3 members have weak connection strength', color: 'text-red-500' },
                  { icon: Target, title: 'Strategic Focus', desc: `${groupData.stats.topIndustry} is the strongest sector`, color: 'text-sky-500' },
                ].map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border hover-elevate">
                    <insight.icon className={`w-5 h-5 ${insight.color}`} />
                    <div>
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-sky-500" />
                  Industry Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { industry: 'Financial Services', count: 4, percent: 33 },
                  { industry: 'Healthcare', count: 3, percent: 25 },
                  { industry: 'Real Estate', count: 2, percent: 17 },
                  { industry: 'Technology', count: 2, percent: 17 },
                  { industry: 'Legal', count: 1, percent: 8 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.industry}</span>
                      <span className="text-muted-foreground">{item.count} members</span>
                    </div>
                    <Progress value={item.percent} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="actions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-sky-500" />
                Recommended Actions
              </CardTitle>
              <CardDescription>
                AI-generated action items to strengthen network connections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    priority: 'High',
                    action: 'Schedule coffee meeting with Barbara Thompson',
                    reason: 'New board member with weak connection strength - needs cultivation',
                    member: groupData.members.find(m => m.connectionStrength === 'weak'),
                    dueDate: 'This week',
                    status: 'pending'
                  },
                  { 
                    priority: 'High',
                    action: `Leverage ${groupData.members[0]?.name}'s network for major gift prospect`,
                    reason: 'Highest connectivity with access to Fortune 500 executives',
                    member: groupData.members[0],
                    dueDate: 'Next week',
                    status: 'pending'
                  },
                  { 
                    priority: 'Medium',
                    action: 'Request introductions to Financial Services contacts',
                    reason: 'Top industry sector with untapped potential',
                    member: groupData.members[1],
                    dueDate: 'This month',
                    status: 'in-progress'
                  },
                  { 
                    priority: 'Medium',
                    action: 'Update connection paths for 3 members',
                    reason: 'Data refresh needed for accurate relationship mapping',
                    member: null,
                    dueDate: 'This month',
                    status: 'pending'
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg border hover-elevate">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.priority === 'High' ? 'bg-red-100 dark:bg-red-950/30' : 'bg-amber-100 dark:bg-amber-950/30'
                    }`}>
                      {item.status === 'in-progress' ? (
                        <Clock className={`w-5 h-5 ${item.priority === 'High' ? 'text-red-600' : 'text-amber-600'}`} />
                      ) : (
                        <Target className={`w-5 h-5 ${item.priority === 'High' ? 'text-red-600' : 'text-amber-600'}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{item.action}</h4>
                        <Badge variant={item.priority === 'High' ? 'default' : 'secondary'} className={item.priority === 'High' ? 'bg-red-500' : ''}>
                          {item.priority}
                        </Badge>
                        {item.status === 'in-progress' && (
                          <Badge variant="outline" className="border-sky-200 text-sky-700">In Progress</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{item.reason}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Due: {item.dueDate}
                        </span>
                        {item.member && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {item.member.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" data-testid={`button-action-${idx}`}>
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Notes
                      </Button>
                      <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

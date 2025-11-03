# FundRazor

## Overview
FundRazor is an AI-powered enterprise-grade fundraising CRM designed for nonprofit development teams. It provides role-based dashboards, a comprehensive donor scoring system (Engagement, Capacity, Affinity), Kanban-style opportunity pipeline management, AI-generated "Next Best Action" recommendations, and a visual workflow builder. The platform aims to centralize fundraising intelligence, streamline donor management, and enhance data-driven decision-making, unifying disparate fundraising systems with full data provenance tracking and transparency.

## User Preferences

- **Design Philosophy**: Enterprise-grade, data-dense UI inspired by Linear and Salesforce NPSP
- **Visual Quality**: Paramount importance - must follow design_guidelines.md religiously
- **Development Approach**: Schema-first development - define data model, then build frontend, then backend
- **Font**: Inter for all text (professional, readable at all sizes)

## System Architecture

### Frontend
- **Technology**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: wouter
- **State Management**: TanStack Query v5
- **Navigation**: Hybrid navigation pattern combining persistent sidebar (global navigation) with contextual top tabs (section-specific navigation). Implemented via reusable `SectionTabs` component. Sidebar features:
  - **Collapsible Sections**: localStorage persistence for maintaining section expand/collapse preferences across sessions
  - **Sidebar Collapse**: Icon-only collapse mode (Cmd/Ctrl+B or click toggle button) that reduces sidebar to ~48px width with tooltips on hover, state persists via cookies
- **UI/UX Decisions**: Enterprise data platform aesthetic, Inter font family, primary blue color palette with specific chart and semantic colors, Tailwind spacing system, standardized component guidelines (padding, font sizes for KPIs, dense tables, two-column forms, fixed-width sidebar).
- **Design Unification**: "Clean & Modern Left-Aligned Cards" pattern applied across 40+ pages with consistent headers, loading/error states, metric card layouts, spacing, and typography.
- **Branded Data Source Badges**: Visual data provenance system using company logos (Salesforce, Mailchimp, LinkedIn) with custom tinted backgrounds and borders, including compact, default, inline, and icon variants with interactive tooltips.
- **Interactive Dashboard Metrics**: All 6 key metrics on the Dev Director dashboard link to dedicated drill-down analytics pages for Pipeline Value Analysis, 90-Day Forecast, YTD vs Goal, LYBUNT Donor Recovery, and SYBUNT Donor Recovery.

### Backend
- **Technology**: Express.js, Node.js 20
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Replit Auth (OIDC) with role-based access (ADMIN, CEO, DEV_DIRECTOR, MGO, DATA_OPS).

### Core Features & Technical Implementations
- **Role-Based Dashboards**: Customized views for different user roles.
- **Donor Scoring System**: Calculates Engagement, Capacity, and Affinity scores (0-100).
- **Pipeline Management**: Kanban-style tracking for fundraising opportunities and grants.
- **Next Best Action (NBA) System**: AI-generated task recommendations with priority badges and reasons.
- **Data Provenance Tracking**: Extended schema for `sourceSystem`, `sourceRecordId`, `syncedAt`, `dataQualityScore`.
- **Integrations Gallery**: Catalog of external integrations with search and filtering.
- **Data Health Monitoring**: Dashboard for system status, data coverage, sync activity, and quality alerts.
- **Enhanced Donor 360 View**: Comprehensive donor profiles including scores, giving summary, activity timeline, and NBAs.
- **Advanced AI Features**: Predictive Major Gift Timing, Real-Time Wealth Event Monitoring, AI Meeting Prep Assistant, Voice-to-CRM, Board Network Mapping, Corporate Partnership Intelligence, Automated Peer Discovery, Personalized Outreach Generator, Automated Grant Writing, Impact Report Personalization, Peer Benchmarking, Donor Sentiment Analysis, Portfolio Optimization Engine, AI Smart Calendar, Automated Stewardship Workflows, AI Task Prioritization, Charitable Gift Registries.
- **Visual Workflow Builder System**: "Lucidchart + Palantir Foundry for fundraising" visual builder with drag-and-drop canvas using React Flow (`@xyflow/react`). Includes 15 pre-built templates and comprehensive API routes for CRUD operations on workflows, blocks, and connections.
- **Tech Stack Mapper Page**: Displays 10 technology categories and 36 common platforms with a visual grid, interactive search, accordions, and integration priority badges.
- **Organization Mapper Page**: Visualizes 6 organizational roles across 6 workflow stages, detailing responsibilities, primary systems, workflow activities, common pain points, and automation opportunities.
- **Organization Workflow Canvas**: Interactive visual workflow builder using React Flow with drag-and-drop artifact gallery. Features 6 fundraising workflow stages (Prospect Research, Initial Contact, Cultivation, Solicitation, Processing, Stewardship) as visual nodes with animated connections and feedback loops. Supports dragging organizational roles and software platforms from gallery onto canvas, connecting nodes to visualize information flow, and deleting artifacts with hover controls. Includes minimap, zoom/pan controls (minZoom: 0.01 for bird's-eye view, maxZoom: 4), legend panel, search filtering, and artifact/connection count badges. Software tools organized by type/category (CRM, Email Marketing, Wealth Screening, Payment Processing, Event Management, Grant Management, Planned Giving, Communications, Social Media, Analytics, Project Management, Video/Calling, Accounting) in artifact gallery with 13 distinct categories. Color palette derived from Sky Blue (#0284C7) and Ice Blue (#7DD3FC) accents: stages use sky-to-indigo gradient, roles use complementary cyan-to-teal tones, software uses neutral slate with purple accent. Schema extended with organizationCanvases and organizationArtifacts tables for future persistence (currently client-side state).
- **Navigation Mockups Page**: Visual comparison of 5 navigation patterns (Focus Hubs, Command Surface, Progressive Masthead, Adaptive Matrix, Dual-Mode Ribbon) applied to the home screen, with mini screenshot-style mockups showing how each pattern would look in practice, key feature lists, and a Quick Decision Guide to help stakeholders choose the right approach.
- **Hybrid Navigation Implementation**: Production hybrid navigation pattern deployed site-wide with:
  - **Sidebar Navigation**: Persistent global navigation for main sections (Dashboard, Welcome, Solutions, Donors, Pipeline, Campaigns, Analytics, AI Intelligence, etc.). Features:
    - **Collapsible Sections**: Using Radix UI Collapsible with localStorage persistence, allowing users to collapse/expand sections (Overview, Intelligence, Operations, Network, AI Tools, Analytics, System) with state maintained across navigation and page reloads
    - **Full Sidebar Collapse**: Icon-only collapse mode (`collapsible="icon"`) accessible via toggle button in header or Cmd/Ctrl+B keyboard shortcut. Reduces sidebar from 15rem to 3rem width, shows tooltips on icon hover, persists state via cookies
  - **Contextual Tabs**: Section-specific navigation within major areas:
    - Dashboard tabs: Dev Director, MGO, CEO
    - Donors tabs: All Donors, Major Gifts, LYBUNT, SYBUNT, Prospects
    - Pipeline tabs: Opportunities, Pipeline Value, 90-Day Forecast, Analytics
    - Analytics tabs: Peer Benchmarks, Sentiment Analysis, Portfolio Optimization, YTD vs Goal
    - Campaigns tabs: Active Campaigns, Performance, Goals & Targets, Trends
    - AI tabs: Predictive Timing, Wealth Events, Meeting Briefs, Voice Notes
  - **Technical Architecture**: 
    - Reusable `SectionTabs` component in `client/src/components/section-tabs.tsx` with icon support, smooth transitions, and wouter integration
    - **Routing Architecture**: All tab-specific URLs resolve to wrapper components (Dashboard, DonorsWithTabs, PipelineWithTabs, CampaignsWithTabs, AnalyticsWithTabs, AIWithTabs) which maintain tab visibility and determine child component rendering based on current path
    - **Dashboard Links**: Metric cards on Dev Director dashboard link to correct tab routes (/pipeline/value, /pipeline/forecast, /donors/lybunt, /donors/sybunt, /analytics/ytd-vs-goal)
    - **Breadcrumbs Navigation**: Site-wide breadcrumb navigation in header showing hierarchical path with Home icon, clickable intermediate segments, and current page. Features canonical route mapping for sections without index pages, full accessibility (aria-label, aria-current, screen reader text), and hidden on root path.
- **Welcome Marketing Page**: Full marketing landing page at `/welcome` featuring hero section, feature highlights grid (6 key features), benefits section, stats showcase, and multiple CTAs. Positioned in sidebar above Solutions for easy first-time user onboarding.
- **National Church Residences Landing Page**: Branded partnership landing page at `/national-church-residences` featuring NCR logo, tailored messaging for senior living organizations, six key capability cards (360° Donor Profiles, Predictive AI Insights, Pipeline Management, Wealth Event Monitoring, Advanced Analytics, Campaign Tracking), mission-aligned impact section, and strategic CTAs. Accessible from Overview section in sidebar with Building2 icon. Responsive design with mobile-optimized stat grid (10K+ donors, 300+ communities, 60+ years).
- **FundRazor Logo Component**: Production-ready SVG logo with automatic dark/light mode support, using CSS classes for theme adaptation.
- **Comprehensive Data Population**: Seed data ensures all stages and categories are populated across opportunities, grants, wealth events, and interactions with intelligent fallback logic and zero-record guarantees.

## External Dependencies

- **Database Hosting**: Neon (for PostgreSQL)
- **Authentication**: Replit Auth (OIDC)
- **UI Components**: shadcn/ui
- **Wealth Screening Integration**: WealthEngine
- **Email Marketing Integration**: Mailchimp
- **CRM Integration**: Salesforce
- **Payment Processing/Fundraising Platform Integration**: Classy
- **Donor-Advised Fund Integration**: DAF Giving360
# FundRazor

## Overview
FundRazor is an AI-powered enterprise-grade fundraising CRM designed for nonprofit development teams. It provides role-based dashboards, a comprehensive donor scoring system (Engagement, Capacity, Affinity), Kanban-style opportunity pipeline management, AI-generated "Next Best Action" recommendations, and a visual workflow builder. The platform aims to centralize fundraising intelligence, streamline donor management, and enhance data-driven decision-making, unifying disparate fundraising systems with full data provenance tracking and transparency.

## Recent Changes

### November 17, 2025 - Salesforce-Style Navigation Redesign
- **Removed Persistent Sidebar**: Eliminated sidebar from homepage for cleaner, more modern Salesforce-inspired layout
- **Header-Only Navigation**: Redesigned top header with:
  - FundRazor logo in top-left (links to homepage)
  - Three dropdown menus: Events, Grants, Donors
  - Utility icons on right: Search, Notifications, Settings, Account
  - Blue header bar using b7 (#2171B5) from Blues-8 palette
- **New Homepage**: Created clean landing page at `/` featuring:
  - Hero section with "Welcome to FundRazor" heading
  - Quick Actions grid with 6 cards (Dashboard, Donors, Pipeline, Events, Grants, Campaigns)
  - AI Intelligence section with 3 feature cards
  - Platform Overview stats showcasing key metrics
  - CTAs for "Go to Dashboard" and "Learn More"
- **Contextual Tabs Retained**: Section-specific tabs still appear within pages when navigating to major sections (Dashboard, Donors, Pipeline, etc.)
- **Integrations Expansion**: Added 14 new integrations from FundraiseUp including HubSpot, Microsoft Dynamics 365, Bonterra EveryAction, Virtuous, Kindful, Meta Pixel, Zapier, PayPal, Gemini, 360MatchPro, Okta, Google Identity, and Microsoft Entra ID (total: 47 integrations)

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
- **Navigation**: Salesforce-style header-only navigation with no persistent sidebar on homepage. Clean, minimal top header with:
  - **Logo**: FundRazor branding in left corner linking to homepage
  - **Dropdown Menus**: Events, Grants, Donors dropdowns for quick access
  - **Utility Icons**: Search, Notifications, Settings, Account in right corner
  - **Contextual Tabs**: Section-specific tabs appear within pages when navigating to major sections
- **UI/UX Decisions**: Enterprise data platform aesthetic, Inter font family, Blues-8 gradient color system (8 shades from near-white to deep navy), Tailwind spacing system, standardized component guidelines (padding, font sizes for KPIs, dense tables, two-column forms, fixed-width sidebar).
- **Color System (Blues-8)**: Professional 8-shade gradient palette implementing industry best practices:
  - **b8** `rgba(8, 69, 148, 1)` → Deep navy blue - Headers, footers, sidebar background, brand anchor (--primary-900)
  - **b7** `rgba(33, 113, 181, 1)` → Strong blue - Hover states, section dividers, highlights (--primary-800)
  - **b6** `rgba(66, 146, 198, 1)` → Medium-dark blue - Primary buttons, links, core action color (--primary-700/--primary/--accent)
  - **b5** `rgba(107, 174, 214, 1)` → Moderate blue - Card headers, secondary accents (--primary-600)
  - **b4** `rgba(158, 202, 225, 1)` → Light steel blue - Info sections, borders, supporting tones (--primary-500)
  - **b3** `rgba(198, 219, 239, 1)` → Soft powder blue - Card backgrounds, light panels (--primary-400)
  - **b2** `rgba(222, 235, 247, 1)` → Pale sky blue - Page backgrounds, zebra rows (--primary-300/--muted)
  - **b1** `rgba(247, 251, 255, 1)` → Near-white with blue tint - Base background (--primary-100/--background)
  - Design principle: Darker shades indicate higher importance/elevation, aligning with Energy-Structure quadrant logic (Partner zone uses deepest blues)
- **Design Unification**: "Clean & Modern Left-Aligned Cards" pattern applied across 40+ pages with consistent headers, loading/error states, metric card layouts, spacing, and typography.
- **Branded Data Source Badges**: Visual data provenance system using company logos (Salesforce, Mailchimp, LinkedIn) with custom tinted backgrounds and borders, including compact, default, inline, and icon variants with interactive tooltips.
- **Interactive Dashboard Metrics**: All 6 key metrics on the Dev Director dashboard link to dedicated drill-down analytics pages for Pipeline Value Analysis, 90-Day Forecast, YTD vs Goal, LYBUNT Donor Recovery, and SYBUNT Donor Recovery. Major Gifts Officer dashboard features 4 clickable metric cards linking to dedicated detail pages:
  - **Portfolio Detail** (/mgo/portfolio): Comprehensive donor portfolio management with 12 donors across segments (Principal, Major Donor, Mid-Level), filtering by segment and status, donor scoring breakdown, and total giving analytics
  - **Pipeline Detail** (/mgo/pipeline): Opportunity pipeline visualization with 10 active opportunities, stage-by-stage breakdown (Prospect, Cultivation, Ask, Steward), weighted value calculations, 4-month forecast (pessimistic/expected/optimistic scenarios), and stalled opportunity alerts
  - **Tasks Detail** (/mgo/tasks): Task management system with 12 active tasks, priority filtering (Critical, High, Medium, Low), category breakdown (Ask, Cultivation, Stewardship, Prospect), completion tracking, overdue alerts, and recently completed task history
  - **Meetings Detail** (/mgo/meetings): Meeting calendar and analytics with 8 upcoming meetings, meeting type distribution (In-Person, Virtual, Phone), purpose categorization (Cultivation, Ask, Stewardship, Discovery), past meeting outcomes with ratings, and comprehensive meeting notes

### Backend
- **Technology**: Express.js, Node.js 20
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Replit Auth (OIDC) with role-based access (ADMIN, CEO, DEV_DIRECTOR, MAJOR_GIFTS_OFFICER, DATA_OPS).

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
- **Organization Workflow Canvas**: Interactive visual workflow builder using React Flow with drag-and-drop artifact gallery and full database persistence. Features two-view UX:
  - **Landing Page**: Grid view of all saved organization canvases with create/delete functionality, search, and canvas metadata (node/edge counts, last updated)
  - **Canvas Editor**: Full-featured editing environment with 6 default fundraising workflow stages (Prospect Research, Initial Contact, Cultivation, Solicitation, Processing, Stewardship) as visual nodes with animated connections and feedback loops
  - **Artifact Gallery**: Draggable organizational roles and software platforms organized by 13 categories (CRM, Email Marketing, Wealth Screening, Payment Processing, Event Management, Grant Management, Planned Giving, Communications, Social Media, Analytics, Project Management, Video/Calling, Accounting)
  - **Canvas Tools**: Minimap, zoom/pan controls (minZoom: 0.01 for bird's-eye view, maxZoom: 4), legend panel, search filtering, artifact/connection count badges, delete node functionality with hover controls
  - **Persistence**: Full CRUD API with organizationCanvases table storing canvas name, description, owner, and canvasData (nodes, edges, viewport) as JSONB
  - **Color Palette**: Derived from Sky Blue (#0284C7) and Ice Blue (#7DD3FC) accents - stages use sky-to-indigo gradient, roles use complementary cyan-to-teal tones, software uses neutral slate with purple accent
- **Navigation Mockups Page**: Visual comparison of 5 navigation patterns (Focus Hubs, Command Surface, Progressive Masthead, Adaptive Matrix, Dual-Mode Ribbon) applied to the home screen, with mini screenshot-style mockups showing how each pattern would look in practice, key feature lists, and a Quick Decision Guide to help stakeholders choose the right approach.
- **Header-Only Navigation**: Salesforce-inspired clean navigation with no sidebar on homepage:
  - **Top Header Bar**: Fixed blue header (b7 #2171B5) with logo, navigation dropdowns, and utility icons
  - **Navigation Dropdowns**: 
    - **Events**: All Events, Upcoming Events, Past Events
    - **Grants**: All Grants, Research, Submitted, Awarded
    - **Donors**: All Donors, Major Gifts, Prospects, LYBUNT, SYBUNT
  - **Utility Actions**: Global search (Cmd+K), Notifications, Settings, Account menu
  - **Contextual Tabs**: Section-specific tabs appear within pages when navigating to major sections:
    - Dashboard tabs: Dev Director, Major Gifts Officer, CEO
    - Donors tabs: All Donors, Major Gifts, LYBUNT, SYBUNT, Prospects
    - Pipeline tabs: Opportunities, Pipeline Value, 90-Day Forecast, Analytics
    - Analytics tabs: Peer Benchmarks, Sentiment Analysis, Portfolio Optimization, YTD vs Goal
    - Campaigns tabs: Active Campaigns, Performance, Goals & Targets, Trends
    - AI tabs: Predictive Timing, Wealth Events, Meeting Briefs, Voice Notes
  - **Technical Architecture**: 
    - Reusable `SectionTabs` component in `client/src/components/section-tabs.tsx` with icon support, smooth transitions, and wouter integration
    - **Routing Architecture**: All tab-specific URLs resolve to wrapper components (Dashboard, DonorsWithTabs, PipelineWithTabs, CampaignsWithTabs, AnalyticsWithTabs, AIWithTabs) which maintain tab visibility and determine child component rendering based on current path
    - **Dashboard Links**: Metric cards on Dev Director dashboard link to correct tab routes (/pipeline/value, /pipeline/forecast, /donors/lybunt, /donors/sybunt, /analytics/ytd-vs-goal)
- **Welcome Marketing Page**: Full marketing landing page at `/welcome` featuring hero section, feature highlights grid (6 key features), benefits section, stats showcase, and multiple CTAs. Positioned in sidebar above Solutions for easy first-time user onboarding.
- **National Church Residences Landing Page**: Branded partnership landing page at `/national-church-residences` featuring NCR logo (#E86C3C warm orange/coral branding matching NCR's official website), "Let's Thrive Together" messaging, six key capability cards (360° Donor Profiles, Predictive AI Insights, Pipeline Management, Wealth Event Monitoring, Advanced Analytics, Campaign Tracking), mission-aligned impact section, and strategic CTAs. Features custom top navigation bar with four dropdown menus (Grants, Events, Donors, Pipelines) styled in NCR orange, providing demo access to key platform sections. Accessible from Overview section in sidebar with Building2 icon. Responsive design with mobile-optimized stat grid (10K+ donors, 300+ communities, 60+ years).
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
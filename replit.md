# FundRazor

## Overview

FundRazor is an AI-powered enterprise-grade fundraising CRM designed for nonprofit development teams. It provides role-based dashboards, a comprehensive donor scoring system (Engagement, Capacity, Affinity), Kanban-style opportunity pipeline management, AI-generated "Next Best Action" recommendations, and a visual workflow builder. The platform aims to centralize fundraising intelligence, streamline donor management, and enhance data-driven decision-making, unifying disparate fundraising systems with full data provenance tracking and transparency.

## Recent Updates (Nov 2024)

**FundRazor Logo Component - NEW (Nov 2, 2024)**:
- ✅ Created production-ready SVG logo component with automatic dark/light mode support
- ✅ **Design**: "Fund" in foreground color, "Razor" + upward slash (↗) in primary accent color
- ✅ **Colors**: Sky Blue (#0284C7) in light mode, Ice Blue (#7DD3FC) in dark mode
- ✅ **Implementation**: Uses CSS classes (fill-foreground, fill-primary, stroke-primary) for theme adaptation
- ✅ **Integration**: Replaced PNG logo in sidebar with responsive SVG component
- ✅ **E2E Tested**: Logo renders correctly in both light and dark modes

**Tech Stack Mapper Page - NEW (Nov 2, 2024)**:
- ✅ Added "Tech Stack Mapper" page accessible from sidebar (beneath Proposals in Overview section)
- ✅ **10 Technology Categories**: CRM, Wealth Screening, Marketing, Events, Grants, Financial, Analytics, Collaboration, Digital Fundraising, HR/Operations
- ✅ **34 Common Platforms**: Industry-standard tools like Salesforce NPSP, Raiser's Edge NXT, Mailchimp, WealthEngine, etc.
- ✅ **Interactive Features**: Real-time search filtering, expandable accordions, integration priority badges
- ✅ **Comprehensive Data**: Each category includes platforms, pain points, and integration requirements
- ✅ **Metric Cards**: Total Categories (10), Common Platforms (34), Critical Integrations (4)
- ✅ **Navigation**: Layers icon in sidebar, accessible at /tech-stack-mapper route
- ✅ **E2E Tested**: All categories render, search filtering works, accordions expand/collapse correctly

**Engagement Timeline Proposal Page - NEW (Nov 2, 2024)**:
- ✅ Added dedicated "Proposals" page accessible from sidebar (beneath Solutions in Overview section)
- ✅ **6-Phase Visual Timeline**: Discovery & Data Foundation → System Integration → AI Prospect Intelligence → Workflow Automation → Smart Events → Optimization & Training
- ✅ **Interactive Accordion UI**: Each phase expandable to show Key Activities, Deliverables (as badges), and Wins sections
- ✅ **Visual Design**: Color-coded phase icons (Search, Database, Brain, FileText, Users, Sparkles) with unique backgrounds for each phase
- ✅ **Content Structure**: Purpose statement, timeline badges (Months 1-2, 3-4, etc.), detailed activities list, and outcome-focused wins sections
- ✅ **5 Areas of Focus**: Comprehensive business analysis sections covering:
  - AI-Powered Prospect Discovery & Prioritization
  - Advanced Relationship Mapping & Network Intelligence
  - Data-Driven Pipeline Management & Segmentation
  - AI-Enhanced Grant Proposal Crafting
  - Smart Event Planning & Donor Engagement
  - Each area includes: Goals, Current Pain Points, Tech Stack/Process, Solution, and Results
- ✅ **Navigation**: ClipboardList icon in sidebar, accessible at /proposals route
- ✅ **E2E Tested**: All 6 phases render correctly, accordions expand/collapse properly, visual consistency verified, sidebar navigation working

**Comprehensive Data Population - COMPLETE (Nov 1, 2024)**:
- ✅ Enhanced seed.ts to ensure ALL stages and categories always have data across the entire platform
- ✅ **Opportunities**: All 5 stages populated (Prospect, Cultivation, Ask, Steward, Renewal) with intelligent fallback logic
- ✅ **Grants**: All 6 stages populated (Research, LOI, Submitted, Awarded, Declined, ReportDue)
- ✅ **Wealth Events**: All 8 event types populated (ipo, stock_sale, property_sale, inheritance, promotion, business_sale, bonus, other)
- ✅ **Interactions**: All 6 types populated (email_open, email_click, meeting, call, event, note)
- ✅ Zero-record guarantee: Added validation logic to ensure missing stages are auto-populated during seeding
- ✅ Database verified: 25 distinct categories across 4 major sections, all with realistic data distribution

## Design System Updates (Nov 2024)

**Updated Color Palette - NEW (Nov 2, 2024)**:
- ✅ **Light Mode**: Primary text #0F172A (dark slate), Sky Blue accent #0284C7, white backgrounds
- ✅ **Dark Mode**: White text #FFFFFF, Ice Blue accent #7DD3FC, deep blue backgrounds (#0A1628-#1A3A5C)
- ✅ Applied throughout entire application with HSL CSS variables for proper theming
- ✅ Updated design_guidelines.md with complete color specifications
- ✅ Primary accent colors now properly differentiated: Sky Blue (light) vs Ice Blue (dark)

**Option 3 Design Unification - COMPLETE**: Applied "Clean & Modern Left-Aligned Cards" design pattern to all 40+ pages:
- ✅ Removed all `p-6` from page wrappers - pages use `space-y-6` only for consistent rhythm
- ✅ Standardized all page headers: `space-y-1` wrapper with `text-3xl font-bold` h1 and `text-sm text-muted-foreground` description
- ✅ All loading and error states follow identical header pattern for visual consistency
- ✅ Large 48px metrics (text-5xl) in MetricCards with three-tier layout (metric → label → description)
- ✅ Minimal bordered cards, left-aligned headers, accent colors reserved for CTAs and key metrics only
- ✅ Consistent spacing: gap-6 between cards, p-6 card padding (p-12 for error states), gap-4 within cards, space-y-6 for page layouts
- ✅ Typography scale enforced: Display 32px (h1), Section 20px (h2), Subsection 16px (h3), Body 14px, Caption 12px
- ✅ Applied to ALL pages: dashboards (CEO, Dev Director, MGO), core pages (Donors, Pipeline, Grants, Gifts, Campaigns), AI features, Analytics, Workflows, Settings, Solutions
- ✅ Architect-verified: Platform-wide design compliance confirmed with no regressions

**Branded Data Source Badges - NEW**: Implemented visual data provenance system with company logos:
- ✅ Replaced text-based "Data Source: Salesforce" with branded logo badges
- ✅ Company logo icons: Salesforce, Mailchimp, LinkedIn (via react-icons/si), fallback Database icon for WealthEngine, iWave, Classy, DAFGiving360
- ✅ Brand-appropriate colors: Each source system has custom tinted backgrounds and borders (Salesforce blue, Mailchimp orange, LinkedIn blue-600, etc.)
- ✅ Four badge variants: compact (logo only), default (logo + text), inline (minimal), icon (info only)
- ✅ Applied to Pipeline (compact badges in opportunity cards) and Grants (default badges with logo + text)
- ✅ Interactive tooltips show full source name and sync timestamp on hover
- ✅ E2E tested: Badges render correctly with proper colors, tooltips work, positioning is accurate

**Interactive Dashboard Metrics with Drill-Down Analytics - NEW**: Transformed static dashboard metrics into clickable navigation points:
- ✅ **Clickable Metrics**: All 6 key metrics on Dev Director dashboard now link to dedicated analytics pages
- ✅ **5 Comprehensive Drill-Down Pages**:
  - **Pipeline Value Analysis** (`/analytics/pipeline-value`): Stage breakdown with visual progress bars, dual filtering (stage + owner), weighted value calculations, full opportunities table
  - **90-Day Forecast** (`/analytics/forecast-90-days`): Time-based forecast with monthly grouping, probability-weighted projections, confidence metrics, close date sorting
  - **YTD vs Goal** (`/analytics/ytd-vs-goal`): Year-to-date progress tracking, monthly trend analysis, campaign breakdown, pace indicators (ahead/behind timeline)
  - **LYBUNT Donor Recovery** (`/analytics/lybunt-donors`): Priority segmentation (High/Medium/Low), reactivation strategy recommendations, revenue at-risk metrics, contact rate analysis
  - **SYBUNT Donor Recovery** (`/analytics/sybunt-donors`): Long-term recovery strategy, historical lifetime value analysis, recovery stage segmentation, lapsed donor insights
- ✅ **UX Features**: Back navigation to dashboard, contextual filters, data tables with donor/campaign links, strategic action recommendations
- ✅ **Option 3 Design Compliance**: Consistent spacing (space-y-6, p-6 cards), 5xl metrics, minimal borders, left-aligned headers
- ✅ **Null Safety**: Graceful handling of missing person/owner data (shows "Unknown Donor" / "Unassigned")
- ✅ **E2E Tested**: All navigation flows verified, no runtime errors, filters working correctly

## User Preferences

- **Design Philosophy**: Enterprise-grade, data-dense UI inspired by Linear and Salesforce NPSP
- **Visual Quality**: Paramount importance - must follow design_guidelines.md religiously
- **Development Approach**: Schema-first development - define data model, then build frontend, then backend
- **Font**: Inter for all text (professional, readable at all sizes)

## System Architecture

**Frontend**:
- **Technology**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: wouter
- **State Management**: TanStack Query v5
- **UI/UX Decisions**: Enterprise data platform aesthetic, Inter font family, primary blue color palette with specific chart and semantic colors, Tailwind spacing system, standardized component guidelines (padding, font sizes for KPIs, dense tables, two-column forms, fixed-width sidebar).

**Backend**:
- **Technology**: Express.js, Node.js 20
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Replit Auth (OIDC) - designed for role-based access (ADMIN, CEO, DEV_DIRECTOR, MGO, DATA_OPS).

**Core Features & Technical Implementations**:
- **Role-Based Dashboards**: Customized views for different user roles.
- **Donor Scoring System**: Calculates Engagement, Capacity, and Affinity scores (0-100).
- **Pipeline Management**: Kanban-style tracking for fundraising opportunities and grants.
- **Next Best Action (NBA) System**: AI-generated task recommendations with priority badges and reasons.
- **Data Provenance Tracking**: Extended schema for `sourceSystem`, `sourceRecordId`, `syncedAt`, `dataQualityScore`.
- **Integrations Gallery**: Catalog of external integrations with search and filtering.
- **Data Health Monitoring**: Dashboard for system status, data coverage, sync activity, and quality alerts.
- **Enhanced Donor 360 View**: Comprehensive donor profiles including scores, giving summary, activity timeline, and NBAs.
- **Advanced AI Features**:
    - Predictive Major Gift Timing, Real-Time Wealth Event Monitoring, AI Meeting Prep Assistant, Voice-to-CRM.
    - Board Network Mapping, Corporate Partnership Intelligence, Automated Peer Discovery.
    - Personalized Outreach Generator, Automated Grant Writing, Impact Report Personalization.
    - Peer Benchmarking, Donor Sentiment Analysis, Portfolio Optimization Engine.
    - AI Smart Calendar, Automated Stewardship Workflows, AI Task Prioritization, Charitable Gift Registries.
- **Visual Workflow Builder System** (✅ FULLY IMPLEMENTED):
    - "Lucidchart + Palantir Foundry for fundraising" visual builder with drag-and-drop canvas.
    - Database schema for `workflows`, `workflowBlocks`, `workflowConnections`, `workflowVersions`.
    - Six core block categories: SYSTEMS, HUMANS, DATA, ACTIONS, ORGANIZATION, LOGIC with 100+ subtypes.
    - **Technology**: React Flow (@xyflow/react) for drag-and-drop canvas.
    - **15 Pre-built Templates**: All templates seeded with actual workflow blocks and connections
      - Major Gift Pipeline, New Donor Welcome Journey, Grant Application Pipeline, Board Engagement Loop, Event Follow-up Sequence, Monthly Giving Retention, Corporate Partnership Process, Planned Giving Cultivation, Lapsed Donor Reactivation, Campaign Launch Sequence, Year-End Appeal Automation, Volunteer to Donor Pipeline, Legacy Society Stewardship, Donor Survey Loop, Stewardship Communications
    - **Canvas Features**:
      - Full drag-and-drop block creation from palette
      - Visual connection creation between blocks
      - Auto-save block positions
      - Zoom, pan, and minimap controls
      - Real-time data persistence to PostgreSQL
    - **Navigation Flow**:
      - Workflow Library → Create new workflow or edit existing
      - Template Gallery → Preview or clone templates
      - All actions auto-navigate to canvas
    - Comprehensive API routes for workflow CRUD operations (GET, POST, PATCH, DELETE for workflows, blocks, connections)
    - E2E tested and verified working

## External Dependencies

- **Database Hosting**: Neon (for PostgreSQL)
- **Authentication**: Replit Auth (OIDC)
- **UI Components**: shadcn/ui
- **Wealth Screening Integration**: WealthEngine
- **Email Marketing Integration**: Mailchimp
- **CRM Integration**: Salesforce
- **Payment Processing/Fundraising Platform Integration**: Classy
- **Donor-Advised Fund Integration**: DAF Giving360
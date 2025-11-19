# FundRazor

## Overview
FundRazor is an AI-powered, enterprise-grade fundraising CRM designed for nonprofit development teams. It centralizes fundraising intelligence, streamlines donor management, and enhances data-driven decision-making. Key capabilities include role-based dashboards, a comprehensive donor scoring system (Engagement, Capacity, Affinity), Kanban-style opportunity pipeline management, AI-generated "Next Best Action" recommendations, and a visual workflow builder. The platform aims to unify disparate fundraising systems with full data provenance tracking and transparency.

The Dashboard Home provides a unified view of the entire fundraising operation, featuring a Donor Relationship Quadrant, key performance metrics, top opportunities, AI-generated Next Best Actions, recent gifts, and an active campaigns overview.

## Recent Changes (November 19, 2025)
- **Added Pipeline Tab to Homepage**: Created dashboard-home-with-tabs.tsx with Overview (/) and Pipeline (/pipeline) tabs at the top of the homepage. Overview shows the main dashboard with donor quadrant and metrics, Pipeline shows opportunity management with sub-tabs (Opportunities, Pipeline Value, 90-Day Forecast, Analytics). **Status: ✅ WORKING**
- **Added Pipeline to Top Navigation**: Added Pipeline button to the top header navigation between Donors and Other for quick access to the opportunity pipeline management system. **Status: ✅ WORKING**
- **Fixed Other Section Navigation**: Refactored other-with-tabs.tsx to use direct routes instead of query parameters. Pages now accessible at /welcome, /tech-stack-mapper, /national-church-residences, /organization-mapper, /organization-workflow-canvas with persistent tab navigation. Removed Pipeline from Other section. **Status: ✅ WORKING**
- **Enhanced SectionTabs Component**: Added prefix matching logic to support nested routes (e.g., /pipeline/value highlights Pipeline tab). Ensures consistent tab state across parent and child routes. **Status: ✅ WORKING**
- **Fixed Campaigns Tab Filtering Bug**: Resolved React re-rendering issue where tab navigation updated URLs but didn't filter campaign cards. Solution: Added dynamic key prop (`campaigns-${activeTab}`) to force component remounting when tabs change, ensuring proper filter application across All Campaigns, Active, Planned, and Completed views. **Status: ✅ WORKING**
- **Fixed Grants Tab Navigation**: Converted grants tabs from query parameters to direct routes. Pages now accessible at /grants, /grants/research, /grants/submitted, /grants/awarded with proper filtering and content display. Stage filter dropdown automatically hidden on specific stage tabs, visible on "All Grants". **Status: ✅ WORKING**
- **Enhanced Dashboard**: Added stage-specific action descriptions and detailed task context for Top Opportunities. Converted opportunity stages to badge-styled tags using Blues-8 color system.
- **Donor Quadrant Restructure**: Extracted educational content into separate tabs (Thesis, Quadrant Explained, Movement Strategies) with dedicated pages.

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
- **Navigation**: Hybrid navigation system combining a collapsible sidebar with a Salesforce-style top header. The sidebar features role-based menus and persistent collapse state. The top header includes navigation items (Intelligence, Quadrant, Events, Grants, Campaigns, Relationships) and utility icons (Search, Notifications, Settings, Account). Major sections like Campaigns and Gifts utilize tab-based landing pages for modern navigation.
- **UI/UX Decisions**: Enterprise data platform aesthetic, Inter font family, Blues-8 gradient color system, Tailwind spacing system, standardized component guidelines (padding, font sizes for KPIs, dense tables, two-column forms, fixed-width sidebar). Design is unified with a "Clean & Modern Left-Aligned Cards" pattern.
- **Color System (Blues-8)**: A professional 8-shade gradient palette for consistent branding and UI hierarchy.
- **Branded Data Source Badges**: Visual data provenance system using company logos.
- **Interactive Dashboard Metrics**: Key metrics link to dedicated drill-down analytics pages.

### Backend
- **Technology**: Express.js, Node.js 20
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Replit Auth (OIDC) with role-based access (ADMIN, CEO, DEV_DIRECTOR, MAJOR_GIFTS_OFFICER, DATA_OPS).

### Core Features & Technical Implementations
- **Role-Based Dashboards**: Customized views for various user roles.
- **Donor Scoring System**: Calculates Engagement, Capacity, and Affinity scores (0-100).
- **Pipeline Management**: Kanban-style tracking for fundraising opportunities and grants.
- **Next Best Action (NBA) System**: AI-generated task recommendations.
- **Data Provenance Tracking**: Extended schema for `sourceSystem`, `sourceRecordId`, `syncedAt`, `dataQualityScore`.
- **Integrations Gallery**: Catalog of external integrations.
- **Data Health Monitoring**: Dashboard for system status, data coverage, sync activity, and quality alerts.
- **Enhanced Donor 360 View**: Comprehensive donor profiles.
- **Advanced AI Features**: Predictive Major Gift Timing, Real-Time Wealth Event Monitoring, AI Meeting Prep Assistant, Voice-to-CRM, Board Network Mapping.
- **Visual Workflow Builder System**: "Lucidchart + Palantir Foundry for fundraising" style visual builder with drag-and-drop canvas using React Flow, including pre-built templates and API routes. This includes an Organization Workflow Canvas for defining roles and software platforms across fundraising stages.
- **FundRazor Logo Component**: Production-ready SVG logo with automatic dark/light mode support.
- **Campaign Analytics System**: Comprehensive dashboard with Performance, Goals, and Trends tabs, featuring KPI metrics, breakdowns by campaign type, goal achievement tracking, and year-over-year analysis.
- **Peer Discovery**: Page to identify and analyze peer relationships, displaying similarity scores as percentages and highlighting opportunities.
- **Fundraising Events System**: Comprehensive event tracking with a dedicated page, including upcoming/past event views, real-time metrics, event cards, and progress bars.
- **Gift Tracking System**: Production-ready pages for All Gifts, Major Gifts, Recurring Gifts, and Planned Gifts, with educational content on various Gift Types. Features include comprehensive metrics, cadence normalization for MRR, and hybrid filtering.

## External Dependencies
- **Database Hosting**: Neon (for PostgreSQL)
- **Authentication**: Replit Auth (OIDC)
- **UI Components**: shadcn/ui
- **Wealth Screening Integration**: WealthEngine
- **Email Marketing Integration**: Mailchimp
- **CRM Integration**: Salesforce
- **Payment Processing/Fundraising Platform Integration**: Classy
- **Donor-Advised Fund Integration**: DAF Giving360
- **Fundraising Platforms**: FundraiseUp (including integrations like HubSpot, Microsoft Dynamics 365, Bonterra EveryAction, Virtuous, Kindful, Meta Pixel, Zapier, PayPal, Gemini, 360MatchPro)
- **Identity Providers**: Okta, Google Identity, Microsoft Entra ID
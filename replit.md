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
- **Organization Workflow Canvas**: Interactive visual workflow builder using React Flow with drag-and-drop artifact gallery. Features 6 fundraising workflow stages (Prospect Research, Initial Contact, Cultivation, Solicitation, Processing, Stewardship) as visual nodes with animated connections and feedback loops. Supports dragging organizational roles and software platforms from gallery onto canvas, connecting nodes to visualize information flow, and deleting artifacts with hover controls. Includes minimap, zoom/pan controls, legend panel, search filtering, and artifact/connection count badges. Color palette derived from Sky Blue (#0284C7) and Ice Blue (#7DD3FC) accents: stages use sky-to-indigo gradient, roles use complementary cyan-to-teal tones, software uses neutral slate with purple accent. Schema extended with organizationCanvases and organizationArtifacts tables for future persistence (currently client-side state).
- **Navigation Mockups Page**: Visual comparison of 5 navigation patterns (Focus Hubs, Command Surface, Progressive Masthead, Adaptive Matrix, Dual-Mode Ribbon) applied to the home screen, with mini screenshot-style mockups showing how each pattern would look in practice, key feature lists, and a Quick Decision Guide to help stakeholders choose the right approach.
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
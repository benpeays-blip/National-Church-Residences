# FundRazor

An AI-powered donor management and fundraising intelligence platform with role-based dashboards, donor scoring, opportunity pipeline management, and next best action recommendations.

## Project Overview

FundRazor is an enterprise-grade fundraising CRM designed for nonprofit development teams. The platform provides:

- **Role-Based Dashboards**: Customized views for MGO, Development Director, and CEO roles
- **Donor Scoring System**: Engagement (0-100), Capacity (0-100), and Affinity (0-100) scores
- **Pipeline Management**: Kanban-style opportunity tracking through stages (Prospect, Cultivation, Ask, Steward, Renewal)
- **Interaction Logging**: Track all donor touchpoints and moves
- **Next Best Actions**: AI-generated task recommendations based on donor data and engagement patterns
- **Data Health Monitoring**: Real-time quality metrics for Development Directors and Data Ops

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: wouter
- **State Management**: TanStack Query v5
- **Backend**: Express.js + Node.js 20
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Replit Auth (OIDC)

## Project Structure

```
client/
  src/
    components/       # Reusable UI components
      app-sidebar.tsx        # Main navigation sidebar
      donor-card.tsx         # Donor profile card
      empty-state.tsx        # Empty state component
      metric-card.tsx        # Dashboard KPI card
      opportunity-card.tsx   # Pipeline opportunity card
      score-indicator.tsx    # Circular score progress indicator
      task-item.tsx          # Task list item
      ui/                    # shadcn/ui base components
    pages/            # Route components
      dashboard-ceo.tsx          # CEO dashboard
      dashboard-dev-director.tsx # Development Director dashboard
      dashboard-mgo.tsx          # MGO dashboard
      donors.tsx                 # Donor list page
      not-found.tsx              # 404 page
    hooks/
      useAuth.ts      # Authentication hook
    lib/
      authUtils.ts    # Auth helper functions
      queryClient.ts  # TanStack Query client
      utils.ts        # Common utilities (formatCurrency, formatDate, etc.)
    App.tsx           # Main app component with auth and routing
    index.css         # Global styles and CSS variables
server/
  routes.ts           # API endpoints
  storage.ts          # Data access layer interface
  db.ts               # Database connection
  index.ts            # Express server entry point
shared/
  schema.ts           # Shared TypeScript types and Drizzle schema
```

## Database Schema

### Core Tables

- **users**: User accounts with role-based access (ADMIN, CEO, DEV_DIRECTOR, MGO, DATA_OPS)
- **persons**: Donor profiles with scoring (capacity, engagement, affinity)
- **households**: Household groupings for donors
- **gifts**: Financial contributions with campaign attribution
- **opportunities**: Pipeline opportunities with stages and probability
- **interactions**: Donor touchpoints and moves (emails, calls, meetings, events)
- **campaigns**: Fundraising campaigns and initiatives
- **portfolios**: MGO assignment groups
- **tasks**: Next best actions and to-dos

### Key Relationships

- Person → Household (many-to-one)
- Gift → Person (many-to-one)
- Gift → Campaign (many-to-one)
- Opportunity → Person (many-to-one)
- Opportunity → User (owner, many-to-one)
- Interaction → Person (many-to-one)
- Task → Person (many-to-one)
- Task → User (owner, many-to-one)

## Design System

**Design Approach**: Enterprise data platform inspired by Linear, Salesforce NPSP, and Notion. Data-dense, professional aesthetics with clarity and efficiency as core principles.

**Typography**: Inter font family (400, 500, 600, 700 weights) with tabular numbers for data

**Color Palette**:
- Primary: Professional blue (#1c63d5 - hsl(217 91% 35%))
- Chart colors: Teal, orange, yellow, purple for data visualization
- Semantic colors: Success, warning, error states

**Spacing System**: Tailwind units 2, 3, 4, 6, 8, 12, 16

**Component Guidelines**:
- Cards: p-6, rounded-lg
- Metrics: text-3xl to text-5xl for KPIs
- Tables: Dense spacing, sticky headers, sortable columns
- Forms: Two-column layout on desktop, single column on mobile
- Sidebar: Fixed 15rem width with collapsible support

See `design_guidelines.md` for comprehensive design specifications.

## Recent Changes

### October 2025 - Integrations Gallery & Grant Pipeline

**Completed**:
- ✅ **Integrations Gallery**: Comprehensive catalog of 20 nonprofit/fundraising integrations at `/integrations`:
  - Browse integrations across 9 categories: CRM, Wealth Screening, Email Marketing, Payment Processing, Grant Research, Matching Gifts, Volunteer Management, Accounting, Analytics, Donor-Advised Funds
  - Search functionality (filters by name, description, modules, features)
  - Category filter dropdown
  - Integration cards show logo, category, API type, modules, and connected status
  - Detail drawer with:
    - Full integration details (description, modules, features, use cases)
    - Readiness checklist with setup steps
    - Contextual action buttons (Connect vs Manage/Disconnect for connected integrations)
  - 5 connected integrations: Salesforce, WealthEngine, Mailchimp, Classy, DAF Giving360
  - 15 available integrations ready to connect
  - Empty state with "Clear Filters" functionality
  - All 20 integrations with proper SVG logos (no 404 errors)

- ✅ **Grant Pipeline Management**: Complete grant tracking system at `/grants`:
  - Extended database schema with `grants` table
  - Grant stages: Research, LOI, Submitted, Awarded, Declined, ReportDue
  - Multiple deadline fields: LOI due, application due, decision date, report due date
  - 10 realistic seed grants across all stages
  - Full CRUD API endpoints (GET /api/grants with stage/owner filters, POST, PATCH, DELETE)
  - Grants page UI with:
    - Stage summary dashboard (card grid showing counts per stage)
    - Search by funder name or purpose
    - Stage filter dropdown
    - Grant cards displaying funder, purpose, ask/awarded amounts, next deadline
    - Data provenance indicators (source system, sync time)
  - Integration metadata tracking (sourceSystem, sourceRecordId, syncedAt)

### October 2025 - AI Intelligence Features

**Completed**:
- ✅ **Next Best Action (NBA) System**: Intelligent task generation engine with 5 rules:
  - LYBUNT Detection: Identifies donors who gave last year but not this year
  - High Engagement Cultivation: Flags donors with high engagement but no recent gifts
  - Event Follow-up: Triggers tasks for high-capacity donors after event attendance
  - Stuck Opportunity Advancement: Identifies opportunities stalled >90 days
  - Email Engagement Prospecting: Finds high email engagement without active opportunities
  - Idempotent generation: Multiple clicks don't create duplicates
  - Tasks display with priority badges and AI-generated reasons explaining logic
  - Generated via POST /api/tasks/generate-nba

- ✅ **Enhanced Donor 360 View**: Comprehensive donor profile at /donors/:id with:
  - Contact information card (email, phone, organization)
  - All three donor scores (Engagement, Capacity, Affinity) with progress indicators
  - Giving summary (lifetime total, # of gifts, avg gift, last gift)
  - Activity timeline combining gifts, interactions, and opportunities chronologically
  - Next Best Action prominently displayed (highest priority task)
  - Active opportunities and all tasks
  - Navigation from donors list, back button to return
  - API endpoint: GET /api/persons/:id/profile returns complete profile data

- ✅ **MGO Dashboard NBA Integration**: "Top 10 Priorities Today" section shows:
  - AI-generated tasks with human-readable titles
  - Priority badges (urgent/high/medium/low)
  - Italic reasons explaining why each task was recommended
  - "Generate Next Best Actions" button for manual NBA generation

### October 2025 - Data Integration & Provenance Tracking

**Completed**:
- ✅ Extended database schema with integration metadata (sourceSystem, sourceRecordId, syncedAt, dataQualityScore)
- ✅ Created integration tracking tables (integrations, integration_sync_runs, data_quality_issues)
- ✅ Tagged all seed data with realistic source systems (Salesforce, Mailchimp, Classy, WealthEngine, DAFGiving360)
- ✅ Built Integrations & Data Health dashboard showing:
  - Connected systems status (5 integrations with real-time sync status)
  - Coverage metrics (wealth screening, engagement, email data percentages)
  - Recent sync activity (last 20 runs with success/error tracking)
  - Data quality alerts (unresolved issues by severity)
- ✅ Added data provenance indicators to donor and opportunity cards:
  - Small info icons with tooltips showing data source and sync time
  - 144 provenance indicators on donors page, 12 on pipeline
  - Color-coded by source system (Salesforce=blue, WealthEngine=emerald, etc.)
- ✅ Added Data Coverage metrics to Development Director dashboard:
  - Wealth Screening Coverage (94%)
  - Recent Engagement Coverage (73%)
  - Email Data Coverage (100%)
  - Pipeline Activity (12 opportunities synced in 90 days)
- ✅ All data now traceable to source system with quality scores

**Strategic Value**: FundRazor now demonstrates unified intelligence layer - consolidating disparate fundraising systems (CRM, wealth screening, email platforms) with full data provenance tracking and transparency. This is the "secret sauce" differentiator.

### January 2025 - Demo Data & Authentication Updates

**Completed**:
- ✅ Removed login requirement - app accessible without authentication
- ✅ Generated comprehensive dummy data (45 donors, 268 gifts, 18 opportunities, 215 interactions, 40 tasks)
- ✅ Industry-standard realistic data across all features:
  - Diverse donor profiles with realistic names, emails, wealth bands
  - Gift patterns following log-normal distribution (small to transformational gifts)
  - 10 LYBUNT donors (gave 2024, not 2025) for retention tracking
  - 8 SYBUNT donors (gave 2022-2023, not recently) for reactivation
  - 8 campaigns (Annual Fund, Gala, Giving Tuesday, Capital Campaign, etc.)
  - Portfolio assignments for 3 MGOs with 25-30 donors each
  - Weighted interaction patterns (emails, calls, meetings, events)
- ✅ App now loads Development Director dashboard by default

### December 2024 - Initial Build

**Completed (Task 1: Schema & Frontend)**:
- ✅ Complete database schema with all tables and relations
- ✅ TypeScript types and Drizzle schemas
- ✅ Design system configuration (colors, typography, spacing)
- ✅ Core UI components (AppSidebar, MetricCard, ScoreIndicator, DonorCard, OpportunityCard, TaskItem, EmptyState)
- ✅ Three role-specific dashboards (MGO, Dev Director, CEO)
- ✅ Donors list page with search
- ✅ Authentication flow with Replit Auth
- ✅ App shell with sidebar navigation
- ✅ Responsive layouts and loading states

**In Progress (Task 2: Backend)**:
- Backend API implementation
- Database storage layer
- Replit Auth integration
- Donor scoring engine
- Next best action generator

**Planned (Task 3: Integration & Polish)**:
- Connect frontend to backend APIs
- Seed demo data
- End-to-end testing
- Performance optimization

## Authentication

**Authentication has been disabled** - the app is accessible without login for demo purposes.

**⚠️ Security Note**: For demo purposes, authentication middleware has been removed from GET endpoints (`/api/persons`, `/api/opportunities`, `/api/dashboard/*`, `/api/integrations`). **This is intentional for demonstration only** and would need to be reinstated with proper session management for production deployment.

The app loads the **Development Director dashboard** by default. Users can navigate between different dashboards via the sidebar:
- **Development Director Dashboard**: `/` or `/dashboard/dev-director`
- **MGO Dashboard**: `/dashboard/mgo` (uses first MGO user from database)
- **CEO Dashboard**: `/dashboard/ceo`

Replit Auth integration remains available but is not enforced. Role-based functionality is preserved for future use:
- **ADMIN**: Full system access
- **CEO**: Executive dashboard, high-level metrics, top prospects
- **DEV_DIRECTOR**: Team management, pipeline health, data quality
- **MGO**: Portfolio management, tasks, personal pipeline
- **DATA_OPS**: Data quality, imports, system maintenance

## Development

### Running the Application

```bash
npm run dev
```

This starts both the Express backend and Vite frontend on the same port.

### Database Management

```bash
# Push schema changes
npm run db:push

# Generate migrations (if needed)
npm run db:generate

# Run migrations
npm run db:migrate
```

### Environment Variables

Required secrets:
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Express session secret
- Replit Auth variables (auto-configured by integration)

## User Preferences

- **Design Philosophy**: Enterprise-grade, data-dense UI inspired by Linear and Salesforce NPSP
- **Visual Quality**: Paramount importance - must follow design_guidelines.md religiously
- **Development Approach**: Schema-first development - define data model, then build frontend, then backend
- **Font**: Inter for all text (professional, readable at all sizes)

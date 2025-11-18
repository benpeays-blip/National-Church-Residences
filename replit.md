# FundRazor

## Overview
FundRazor is an AI-powered, enterprise-grade fundraising CRM designed for nonprofit development teams. It offers role-based dashboards, a comprehensive donor scoring system (Engagement, Capacity, Affinity), Kanban-style opportunity pipeline management, AI-generated "Next Best Action" recommendations, and a visual workflow builder. The platform aims to centralize fundraising intelligence, streamline donor management, enhance data-driven decision-making, and unify disparate fundraising systems with full data provenance tracking and transparency.

The **Dashboard Home** (new homepage at `/`) provides a unified view of the entire fundraising operation, featuring:
- Donor Relationship Quadrant visualization at the top
- Key performance metrics (YTD Progress, Pipeline Value, Monthly Donors, 90-Day Forecast)
- Top Opportunities
- AI-generated Next Best Actions
- Recent Gifts
- Active Campaigns overview

## Recent Changes (November 18, 2025)

### Peer Discovery Implementation
- Built comprehensive Peer Discovery page in Relationships section
- **Critical Bug Fix**: Fixed similarity score scaling issue
  - Scores stored as decimals (0-1 range) in database, now correctly display as percentages (0-100%)
  - Updated all score displays: `Math.round((score || 0) * 100)%`
  - Fixed high potential threshold: Changed from `>= 80` to `>= 0.8` (decimal comparison)
  - Affects: Average Match Score KPI, High Potential count, peer card badges, detail displays
- Features:
  - Real-time metrics: Total Peers Discovered, Average Match Score, High Potential Matches
  - Professional peer cards showing similarity scores, shared characteristics, programs peer supports
  - Opportunity highlighting for programs donor hasn't been asked for yet
  - Full integration with peer_donors schema fields
- Verified with architect review: All percentage calculations now accurate

### Events Section - Upcoming Count Fix
- Fixed "Upcoming Events" metric card to display correct count (now shows "2")
- Updated seed data: Changed event dates from 2025 to 2026 to ensure they're truly upcoming
  - 14th Annual Golf Classic: June 13, 2026
  - 5th Annual Ride for Hospice: September 19, 2026
- Made "Upcoming Events" card clickable to navigate to upcoming tab
- Added hover-elevate styling for better UX
- Verified with e2e tests: Card displays "2", clicking navigates to filtered view showing both events

### Navigation Modernization
Implemented tab-based landing pages replacing dropdown menus for cleaner, more direct navigation:

**Campaigns Navigation:**
- Converted from dropdown menu to clickable button
- Landing page at `/campaigns` with 4 tabs: All Campaigns, Active, Planned, Completed
- URL-based tab navigation with `?tab=` parameters for direct linking
- Campaigns component now accepts `filterStatus` prop for filtering by status

**Gift Types Educational Content:**
- Added new "Gift Types" tab to Gifts page (5 tabs total)
- Educational content about donor giving options:
  - Cash Gifts, Wills & Bequests, IRA Qualified Charitable Distribution
  - Charitable Gift Annuities, Memorial Gifts, Refundable Entrance Fees, Donor Advised Funds
- Each gift type presented in card format with icon, title, and descriptive content
- Provides donors with comprehensive information about giving methods

### Dashboard Homepage Updates
- Removed "Dashboard" title from homepage
- Removed "Donor Relationship Intelligence" section title and description
- Cleaner, more streamlined homepage with donor quadrant front and center

### Fundraising Events System
Implemented comprehensive event tracking for galas, golf tournaments, rides, and other fundraising activities:

**Schema Additions:**
- Created `fundraising_events` table with fields: name, eventType, eventDate, venue, description, goalAmount, amountRaised, attendees, sponsors (array), campaignId, status
- Added insert schema and types for FundraisingEvent

**Seed Data:**
- **Past Events**: 13th Annual Golf Classic (June 2024, $92,450 raised), 4th Annual Ride for Hospice (Sept 2024, $51,200 raised)
- **Upcoming Events**: 14th Annual Golf Classic (June 2025), 5th Annual Ride for Hospice (Sept 2025)
- All events linked to Annual Fund campaign with realistic sponsors, attendee counts, and progress tracking

**Events Page Features:**
- Three-tab interface: All Events, Upcoming, Past Events
- URL-based filtering with `?filter=all|upcoming|past` parameters
- Real-time metrics: upcoming count, this month count, total raised from completed events
- Rich event cards showing: date, venue, attendance, fundraising progress, sponsor badges
- Visual progress bars for goal tracking
- Event type badges (golf, ride, etc.) and status indicators

**API Routes:**
- `GET /api/fundraising-events` - Returns all events ordered by date (most recent first)

### Gift Tracking System
Implemented production-ready gift tracking pages with hybrid schema approach:

**Schema Enhancements:**
- Added `giftTypeEnum`: one_time, major, recurring, planned, pledge, in_kind
- Added `recurringCadenceEnum`: weekly, monthly, quarterly, annual, one_time
- Extended gifts table with structured classification fields

**Pages Implemented:**
1. **All Gifts**: Comprehensive dashboard with total raised, gift count, average gift, retention metrics
2. **Major Gifts**: $10k+ tracking with pipeline value, wealth indicators, solicitation status
3. **Recurring Gifts**: Monthly revenue (MRR) with cadence normalization, retention/churn tracking
4. **Planned Gifts**: Legacy society tracking, bequest pipeline, estate planning stages
5. **Gift Types**: Educational content about 7 different giving methods for donor guidance

**Key Features:**
- Hybrid filtering: Structured fields (primary) → Amount thresholds (secondary) → Keywords (fallback)
- Cadence normalization for MRR: weekly×4.33, monthly×1, quarterly÷3, annual÷12
- Real-time KPI calculations using full dataset for retention/churn
- CSV export functionality
- URL parameter sync for direct linking to tabs

**URL Navigation:**
- All tabs use explicit `?tab=` parameters for consistent URL sync
- Direct navigation to `/gifts?tab=major|recurring|planned` works correctly
- Browser back/forward navigation fully supported

**Known Limitations:**
- Current implementation assumes gifts with recurringCadence represent actual installment payments, not one-time pledges with cadence stamps
- Database needs reseeding to populate new structured fields on existing records
- Future enhancement: Add `isInstallment` flag or `recurringAmount` field to distinguish pledge intents from actual recurring charges

**Testing Status:**
- ✅ E2E tests passed for tab navigation and URL sync
- ✅ KPI calculations verified (structured fields + fallbacks)
- ✅ Hybrid filtering approach working correctly
- ✅ CSV export functionality implemented

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
- **Navigation**: Hybrid navigation system combining collapsible sidebar with Salesforce-style header:
  - **Sidebar**: Collapsible left navigation (16rem expanded, 3rem collapsed) with role-based menu sections
    - White header with National Church Residences logo and user role badge
    - Organized sections: Operations, Relationship Science, AI Tools, Analytics, System, Design Ideas, Other
    - Collapsible sections with chevron indicators and localStorage persistence
  - **Top Header**: White background with dark navy blue accents (#084594 - b8)
    - Sidebar toggle button (hamburger icon, dark navy blue)
    - Navigation items (semibold, no icons): **Intelligence** dropdown (Donors, Predictive Timing, Wealth Events, Meeting Briefs), **Quadrant** dropdown, Events dropdown, Grants dropdown, **Campaigns** clickable button (links to tab-based page), Relationships dropdown
    - Utility icons on right: Search, Notifications, Settings, Account (all dark navy blue)
    - Gray separator between navigation and utility icons
    - Subtle gray hover states (`hover:bg-gray-100`)
  - **Tab-Based Landing Pages**: Modern navigation pattern where major sections (Campaigns, Gifts) use tabs instead of dropdown submenus
- **UI/UX Decisions**: Enterprise data platform aesthetic, Inter font family, Blues-8 gradient color system (8 shades from near-white to deep navy), Tailwind spacing system, standardized component guidelines (padding, font sizes for KPIs, dense tables, two-column forms, fixed-width sidebar).
- **Color System (Blues-8)**: A professional 8-shade gradient palette for consistent branding and UI hierarchy, using darker shades for higher importance/elevation.
- **Design Unification**: "Clean & Modern Left-Aligned Cards" pattern applied consistently across the platform.
- **Branded Data Source Badges**: Visual data provenance system using company logos.
- **Interactive Dashboard Metrics**: Key metrics on dashboards link to dedicated drill-down analytics pages.

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
- **Integrations Gallery**: Catalog of external integrations with search and filtering.
- **Data Health Monitoring**: Dashboard for system status, data coverage, sync activity, and quality alerts.
- **Enhanced Donor 360 View**: Comprehensive donor profiles.
- **Advanced AI Features**: Includes Predictive Major Gift Timing, Real-Time Wealth Event Monitoring, AI Meeting Prep Assistant, Voice-to-CRM, Board Network Mapping, and various other AI-driven functionalities.
- **Visual Workflow Builder System**: "Lucidchart + Palantir Foundry for fundraising" visual builder with drag-and-drop canvas using React Flow, including pre-built templates and API routes for CRUD operations.
- **Organization Workflow Canvas**: Interactive visual workflow builder using React Flow for defining organizational roles and software platforms across fundraising stages, with full database persistence.
- **FundRazor Logo Component**: Production-ready SVG logo with automatic dark/light mode support.
- **Comprehensive Data Population**: Seed data ensures all stages and categories are populated with intelligent fallback logic.

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
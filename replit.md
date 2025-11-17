# FundRazor

## Overview
FundRazor is an AI-powered, enterprise-grade fundraising CRM designed for nonprofit development teams. It offers role-based dashboards, a comprehensive donor scoring system (Engagement, Capacity, Affinity), Kanban-style opportunity pipeline management, AI-generated "Next Best Action" recommendations, and a visual workflow builder. The platform aims to centralize fundraising intelligence, streamline donor management, enhance data-driven decision-making, and unify disparate fundraising systems with full data provenance tracking and transparency.

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
- **Navigation**: Salesforce-style header-only navigation with white background and dark navy blue accents (#084594 - b8). Clean top header features:
  - FundRazor logo in top-left (dark navy blue)
  - Four text-based dropdown menus (semibold, no icons): **Quadrant**, Events, Grants, Donors
  - Utility icons on right: Search, Notifications, Settings, Account (all dark navy blue)
  - Gray separator between navigation and utility icons
  - Subtle gray hover states (`hover:bg-gray-100`)
  - Contextual tabs appear within major sections
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
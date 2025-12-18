# FundRazor

## Overview
FundRazor is an AI-powered, enterprise-grade fundraising CRM designed for nonprofit development teams. It centralizes fundraising intelligence, streamlines donor management, and enhances data-driven decision-making. Key capabilities include role-based dashboards, a comprehensive donor scoring system (Engagement, Capacity, Affinity), Kanban-style opportunity pipeline management, AI-generated "Next Best Action" recommendations, and a visual workflow builder. The platform aims to unify disparate fundraising systems with full data provenance tracking and transparency, providing a unified view of the entire fundraising operation.

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
- **Navigation**: Hybrid navigation system combining a collapsible sidebar with a Salesforce-style top header. Major sections like Campaigns and Gifts utilize tab-based landing pages.
- **UI/UX Decisions**: Enterprise data platform aesthetic, Inter font family, Blues-8 gradient color system, Tailwind spacing system, standardized component guidelines (padding, font sizes for KPIs, dense tables, two-column forms, fixed-width sidebar). Design is unified with a "Clean & Modern Left-Aligned Cards" pattern. Features like the Donor Relationship Quadrant, Meeting Notes, and Impact Intelligence follow these design principles, using semantic tokens for colors and consistent typography.
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
- **Pipeline Management**: Kanban-style tracking for fundraising opportunities and grants, with enhanced column headers.
- **Next Best Action (NBA) System**: AI-generated task recommendations.
- **AI-Powered Meeting Notes**: In-browser voice recording, audio file upload, OpenAI Whisper transcription, and GPT-4o extraction of meeting insights.
- **Impact Intelligence**: AI Assistant (chatbot) for finding impact stories and an Impact Feed for browsing stories.
- **Generate Action Plan**: AI-generated 8-week cultivation strategies for donors.
- **Data Provenance Tracking**: Extended schema for `sourceSystem`, `sourceRecordId`, `syncedAt`, `dataQualityScore`.
- **Integrations Gallery**: Catalog of external integrations.
- **Data Health Monitoring**: Dashboard for system status, data coverage, sync activity, and quality alerts.
- **Enhanced Donor 360 View**: Comprehensive donor profiles.
- **Advanced AI Features**: Predictive Major Gift Timing, Real-Time Wealth Event Monitoring, AI Meeting Prep Assistant, Voice-to-CRM, Board Network Mapping.
- **Visual Workflow Builder System**: "Lucidchart + Palantir Foundry for fundraising" style visual builder with drag-and-drop canvas using React Flow, including pre-built templates and API routes. This includes an Organization Workflow Canvas.
- **FundRazor Logo Component**: Production-ready SVG logo with automatic dark/light mode support.
- **Campaign Analytics System**: Comprehensive dashboard with Performance, Goals, and Trends tabs.
- **Peer Discovery**: Page to identify and analyze peer relationships, displaying similarity scores.
- **Fundraising Events System**: Comprehensive event tracking with upcoming/past event views, metrics, and progress bars.
- **Gift Tracking System**: Production-ready pages for All Gifts, Major Gifts, Recurring Gifts, and Planned Gifts, with educational content and hybrid filtering.
- **Corporations Section**: Comprehensive tabs for Overview, Sponsorships, Corporate Giving, Volunteering, In-Kind, Foundations, and Prospects, featuring KPI metrics, search/filter, and Clearbit logos.
- **Relationship Intelligence**: Integration of RelSci Mapping (Path Finder, Prospect Research, NCR Connections) and D&B Intelligence (Company Research, Corporate Prospects, Risk Assessment).
- **Matching Gift Automation**: Corporate match eligibility screening with employer database lookup (Double the Donation integration pattern).
- **Donor Retention Risk Scoring**: AI-powered churn prediction with at-risk donor alerts and recommended interventions.
- **Text/SMS Fundraising**: Text-to-give keywords, SMS stewardship sequences, and mobile donor engagement.
- **Peer-to-Peer Fundraising**: Personal fundraising pages for supporters with leaderboards and campaign tracking.
- **Tribute & Memorial Giving**: "In Honor Of" and "In Memory Of" donation tracking with automatic notifications.
- **Donor Portal**: Self-service access for donors to view giving history, update info, and manage recurring gifts.
- **Benchmark Comparisons**: KPI comparisons against peer organizations by size and mission type.
- **Email Engagement Tracking**: Open/click analytics for email campaigns with top engager identification.
- **Duplicate Detection**: Fuzzy matching algorithm to identify and merge potential duplicate donor records.
- **Address Verification**: USPS validation for accurate direct mail campaigns with auto-fix suggestions.
- **Giving Anniversary Alerts**: Automated milestone celebrations for donor anniversaries and giving achievements.
- **Board Member Dashboard**: Simplified prospect view for board members with assigned prospects and key metrics.
- **Data Operations Portal**: Centralized hub for data quality tools including Duplicate Detection and Address Verification, with data health metrics and issue tracking.
- **Multi-Tier Login System**: Role-based portal access with four login options: Board Member, Donor, Data Operations, and Demo mode. Features server-side session management, bcrypt password hashing, and protected routes with server-verified role authorization.

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
- **AI Services**: OpenAI (Whisper, GPT-4o)
- **Company Data**: Clearbit (for corporate logos)
- **Relationship Intelligence**: RelSci
- **Corporate Intelligence**: D&B (Dun & Bradstreet)
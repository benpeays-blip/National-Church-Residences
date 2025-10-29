# FundRazor

## Overview

FundRazor is an AI-powered enterprise-grade fundraising CRM designed for nonprofit development teams. It offers role-based dashboards, a comprehensive donor scoring system (Engagement, Capacity, Affinity), Kanban-style opportunity pipeline management, and AI-generated "Next Best Action" recommendations. The platform aims to provide fundraising intelligence, streamline donor management, and enhance data-driven decision-making for development teams. FundRazor unifies disparate fundraising systems, providing a single intelligence layer with full data provenance tracking and transparency, positioning it as a key differentiator in the market.

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
- **UI/UX Decisions**:
    - **Design Approach**: Enterprise data platform inspired by Linear, Salesforce NPSP, and Notion. Emphasizes data density, professional aesthetics, clarity, and efficiency.
    - **Typography**: Inter font family (400, 500, 600, 700 weights) with tabular numbers for data.
    - **Color Palette**: Primary blue (`#1c63d5`), with specific colors for charts (Teal, orange, yellow, purple) and semantic states (success, warning, error).
    - **Spacing System**: Utilizes Tailwind units (2, 3, 4, 6, 8, 12, 16).
    - **Component Guidelines**: Standardized padding for cards (`p-6`, `rounded-lg`), large font sizes for KPIs (`text-3xl` to `text-5xl`), dense tables with sticky headers, two-column forms on desktop, and a fixed-width sidebar (15rem) with collapsible support.

**Backend**:
- **Technology**: Express.js, Node.js 20
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Replit Auth (OIDC), currently disabled for demo purposes but designed for role-based access (ADMIN, CEO, DEV_DIRECTOR, MGO, DATA_OPS).

**Core Features & Technical Implementations**:
- **Role-Based Dashboards**: Customized views for CEO, Development Director, and MGO.
- **Donor Scoring System**: Calculates Engagement, Capacity, and Affinity scores (0-100).
- **Pipeline Management**: Kanban-style opportunity tracking with stages (Prospect, Cultivation, Ask, Steward, Renewal).
- **Next Best Action (NBA) System**: AI-generated task recommendations based on donor data and predefined rules (e.g., LYBUNT detection, high engagement cultivation, event follow-up, stalled opportunity advancement, email engagement prospecting). Tasks include priority badges and AI-generated reasons.
- **Grant Pipeline Management**: Dedicated system for tracking grants through stages (Research, LOI, Submitted, Awarded, Declined, ReportDue), with full CRUD API.
- **Data Provenance Tracking**: Extended database schema to track `sourceSystem`, `sourceRecordId`, `syncedAt`, and `dataQualityScore` for all data, with visual indicators in the UI.
- **Integrations Gallery**: A comprehensive catalog of external integrations with search, filtering, and detailed views.
- **Data Health Monitoring**: Dashboard showing connected systems status, data coverage metrics (e.g., wealth screening, engagement, email data), recent sync activity, and data quality alerts.
- **Enhanced Donor 360 View**: Comprehensive donor profiles displaying contact info, all three donor scores, giving summary, chronological activity timeline, and prominent display of Next Best Actions.
- **Solutions Page**: Sales/demo tool mapping 5 AI integration priorities (Prospect Discovery, Relationship Mapping, Pipeline Management, Grant Proposals, Event Planning) to FundRazor capabilities with clear distinction between "Available Now" vs "Coming Soon" features. Architect-verified to accurately represent implemented functionality without misrepresentation.

## External Dependencies

- **Database Hosting**: Neon (for PostgreSQL)
- **Authentication**: Replit Auth (OIDC)
- **UI Components**: shadcn/ui
- **Wealth Screening Integration (Example)**: WealthEngine (as indicated in seed data)
- **Email Marketing Integration (Example)**: Mailchimp (as indicated in seed data)
- **CRM Integration (Example)**: Salesforce (as indicated in seed data)
- **Payment Processing/Fundraising Platform Integration (Example)**: Classy (as indicated in seed data)
- **Donor-Advised Fund Integration (Example)**: DAF Giving360 (as indicated in seed data)
```
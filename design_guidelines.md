# FundRazor Design Guidelines

## Design Approach

**Selected Approach:** Design System Foundation with Enterprise Data Platform Inspiration

**Reference Points:** Linear (clean data hierarchy), Salesforce NPSP (fundraising domain patterns), Notion (information density with clarity), modern enterprise dashboards

**Core Principle:** This is a professional, data-dense application where clarity, efficiency, and information hierarchy are paramount. Design should fade into the background, letting fundraising professionals focus on relationships and data insights.

---

## Typography System

**Font Stack:** Inter (primary) via Google Fonts CDN
- **Display/Headers:** Inter 600-700 weight
- **Body/Data:** Inter 400-500 weight  
- **Numeric Data:** Inter 500 weight, tabular numbers enabled

**STRICT Typography Scale - USE EXACTLY THESE SIZES:**
- **Display (32px):** `text-3xl font-bold` - Page titles ONLY. Only ONE per page.
- **Section (20px):** `text-xl font-semibold` - Card headers, major section headings.
- **Subsection (16px):** `text-base font-medium` - Card sub-sections, table headers.
- **Body (14px):** `text-sm font-normal` - Main content, descriptions, table cells.
- **Caption (12px):** `text-xs font-medium` - Metadata, labels, badges, timestamps.
- **Large Metrics (48px):** `text-5xl font-bold` - Dashboard KPIs only.

**Rules:**
1. **Never use** `text-2xl`, `text-4xl`, `text-lg` - stick to the 5 defined sizes above
2. **One Display per page** - Establishes clear hierarchy
3. **Card headers are Section** - Not Display, not Subsection
4. **No text-xl in cards** - Use Section (text-xl) for card headers, Subsection (text-base) for content within
5. **Uppercase + tracking-wide** - Only for Caption size labels/categories

---

## Icon & Feature Card System

**Standard Icon Container Pattern:**
All feature cards, capability cards, and icon containers across the site MUST use this exact pattern for visual consistency:

**Container:**
```tsx
<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
  <IconComponent className="w-6 h-6 text-primary" />
</div>
```

**Rules:**
1. **Fixed size:** Always `w-12 h-12` (48px × 48px)
2. **Shape:** Always `rounded-lg` (NOT rounded-full or other radii)
3. **Background:** Always `bg-primary/10` (10% opacity primary color)
4. **Icon size:** Always `w-6 h-6` (24px × 24px)
5. **Icon color:** Always `text-primary`
6. **Centered:** Always include `flex items-center justify-center`
7. **Margin:** Always `mb-4` for spacing below

**DO NOT:**
- ❌ Use circular containers (`rounded-full`)
- ❌ Use chart colors (`bg-chart-1/10`, `text-chart-2`)
- ❌ Use different sizes (`w-16`, `w-10`, etc.)
- ❌ Use different opacity levels (`bg-primary/15`, `bg-primary/20`)

**Branded Exceptions:**
For branded pages (e.g., National Church Residences), use the brand color instead of primary:
```tsx
<div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${brandColor}10` }}>
  <IconComponent className="w-6 h-6" style={{ color: brandColor }} />
</div>
```

---

## Layout System

**STRICT Spacing System - ENFORCE CONSISTENCY:**

**Padding Standards:**
- **Cards:** `p-6` (ALWAYS - no p-4, p-8, or other values)
- **Table cells:** `px-4 py-3` (ALWAYS for consistent alignment)
- **Page container:** `p-6` (ALWAYS - already applied in App.tsx main)
- **Small components (badges, pills):** `px-2 py-1` or `px-3 py-1.5`

**Gap Standards:**
- **Between cards in grid:** `gap-6`
- **Between sections:** `space-y-6` or `gap-6`
- **Within cards (vertical):** `space-y-4` or `gap-4`
- **Within cards (horizontal):** `gap-3`

**Rules:**
1. **Never mix padding** - All cards must be `p-6`, all tables `px-4 py-3`
2. **No custom spacing** - Use only: 1, 1.5, 2, 3, 4, 6, 8, 12, 16
3. **Remove `px-6 py-6` from pages** - Main container already has `p-6`

**Grid Structure:**
- Dashboard layouts: 12-column grid system
- Responsive breakpoints: mobile (1 col), tablet (2 col), desktop (3-4 col)
- Data tables: full-width with horizontal scroll on mobile

**Container Strategy:**
- App shell: Full viewport height with fixed sidebar
- Content area: max-w-7xl with consistent px-6 to px-8
- Modals/Drawers: max-w-2xl for forms, max-w-4xl for donor 360 views

---

## Application Shell

**Layout Pattern:** Fixed left sidebar + top navigation bar + scrollable content area

**Sidebar (Fixed, ~240px desktop):**
- Logo/Org name at top (h-16)
- Primary navigation items with icons (Lucide React) 
- Role indicator badge
- Collapsible on tablet/mobile to icon-only or hamburger
- Subtle dividers between nav sections

**Top Bar (Fixed, h-16):**
- Global search (prominent, ⌘K shortcut hint)
- Breadcrumb trail for deep navigation
- User profile dropdown (right aligned)
- Notification bell with badge count
- Quick action button (+ New Interaction, + New Donor)

**Content Area:**
- Starts below top bar, right of sidebar
- Padding: px-6 py-6 to px-8 py-8
- Page title with action buttons in flex justify-between layout

---

## Component Library

### Data Display Components

**Metric Cards:**
- Compact cards in grid layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- Structure: Label (text-sm), Value (text-3xl font-bold), Change indicator (text-xs with ↑/↓), Sparkline (optional)
- Padding: p-6
- Rounded corners: rounded-lg

**Data Tables:**
- Sticky header row
- Zebra striping for rows
- Sortable columns with arrow indicators
- Row actions on hover (icon buttons)
- Dense spacing: py-3 px-4
- Status badges inline with data

**Donor Profile Cards:**
- Avatar/Initials circle (w-12 h-12)
- Name (text-base font-semibold)
- Key metrics in horizontal layout (Capacity, Engagement, Last Gift)
- Score indicators (small circular progress or numeric badges)
- Quick action icons (email, phone, notes)

**Score Indicators:**
- Circular progress rings for 0-100 scores
- Size variants: w-16 h-16 (large dashboard), w-10 h-10 (cards)
- Label below or inline
- Visual segments: 0-33 (low), 34-66 (medium), 67-100 (high)

### Interactive Components

**Pipeline Kanban Board:**
- Horizontal columns for stages (Prospect, Cultivation, Ask, Steward, Renewal)
- Drag-and-drop cards within scrollable columns
- Card structure: Donor name, Ask amount, Probability %, Days in stage, Owner avatar
- Column headers: Stage name, Count, Total $ value
- Card padding: p-4, gap-3, min-height for consistency

**Task Lists:**
- Checkbox + Task description + Priority badge + Due date
- Expandable row for task details/notes
- Grouping by priority or date
- Compact spacing: py-2

**Filters & Search:**
- Filter pills with X to remove
- Multi-select dropdowns with checkboxes
- Search with instant results dropdown
- Clear all filters button
- Filter count badges

**Forms:**
- Two-column layout on desktop (grid-cols-2 gap-6)
- Single column on mobile
- Label above input (text-sm font-medium mb-2)
- Input height: h-10 to h-11
- Textarea: min-h-32
- Inline validation messages
- Form sections with dividers and headings

### Navigation Components

**Tabs (for switching views):**
- Horizontal tab bar with underline indicator
- Text-base, padding px-4 py-3
- Icons optional before label

**Breadcrumbs:**
- Text-sm with / separator
- Clickable trail
- Last item non-clickable

**Dropdown Menus:**
- Attach to buttons/icons
- Rounded dropdown: rounded-md
- Menu items: px-4 py-2
- Dividers between groups
- Icons before labels

### Overlays

**Modals:**
- Centered overlay with backdrop blur
- Sizes: sm (max-w-md), md (max-w-2xl), lg (max-w-4xl)
- Header: Title + Close button (top-right X)
- Body: p-6
- Footer: Action buttons right-aligned

**Slide-over Panels (Donor 360):**
- Right-side panel, full height
- Width: w-full max-w-2xl
- Sticky header with close
- Scrollable content sections (Profile, Gifts, Interactions, Notes)
- Sectioned with dividers and clear headings

**Toast Notifications:**
- Top-right positioned
- Auto-dismiss after 5s
- Success, Error, Info variants
- Icon + Message + Dismiss button
- Padding: p-4, rounded-lg

---

## Dashboard-Specific Layouts

### Major Gifts Officer Dashboard
- Top section: "Today's Priorities" (max-h-96, overflow-scroll, task list)
- Middle: Portfolio summary metrics (4-col grid)
- Bottom: Split view - Pipeline Kanban (left 2/3) + Upcoming interactions calendar (right 1/3)

### Development Director Dashboard
- Top row: Key metrics (YTD vs Goal, Pipeline Value, Forecast, Data Health) - 4-col grid
- Pipeline health table: grouped by owner, stage distribution, velocity metrics
- Team activity feed: scrollable list of recent interactions by team members

### CEO Dashboard
- Hero metrics: Large KPI cards (text-5xl values) - YTD Raised, 90-day Forecast, Monthly Donors
- Top 25 prospects: compact table with Name, Capacity, Stage, Owner, Ask Amount
- Trend charts: Line charts for acquisition/retention over 12 months

---

## Data Visualization

**Charts (Recharts library):**
- Line charts: Trend data (giving over time)
- Bar charts: Comparative data (campaign performance)
- Pie/Donut: Distribution (capacity mix, stage breakdown)
- Consistent sizing: h-64 to h-80 for dashboard charts
- Minimal gridlines, clear axis labels
- Tooltips on hover with formatted values

---

## Color Palette

**Light Mode Colors:**
- **Primary Text:** #0F172A (Dark Slate)
- **Accent (Sky Blue):** #0284C7
- **Background:** #FFFFFF (White)
- **Card Backgrounds:** Subtle off-white (#FAFAFA-#F8F9FA)

**Dark Mode Colors:**
- **Primary Text:** #FFFFFF (White)
- **Accent (Ice Blue):** #7DD3FC
- **Background:** #0A1628 (Deep Blue)
- **Card Backgrounds:** #1A3A5C (Medium Blue)

**CSS Variables (HSL format):**
- Light Primary: `199 98% 39%` (Sky Blue)
- Dark Primary: `199 93% 74%` (Ice Blue)
- Light Foreground: `222 47% 11%` (Dark Slate)
- Dark Foreground: `0 0% 100%` (White)
- Dark Background: `210 63% 10%` (Deep Blue)
- Dark Card: `210 54% 23%` (Medium Blue)

---

## STRICT Color Usage Guidelines

**Primary Accent Color:** Reserve for CTAs and key metrics ONLY

**✅ CORRECT Uses of Primary:**
- Call-to-action buttons (Save, Submit, Create)
- Key metrics/KPIs that need emphasis
- Active navigation states
- Critical alerts

**❌ INCORRECT Uses of Primary:**
- Every card icon background
- Decorative elements
- Section headers that don't need emphasis
- Multiple items on same page (dilutes focus)

**Chart Colors (chart-1 through chart-5):**
- Use ONLY in data visualizations (charts, graphs)
- NOT for card backgrounds or decorative purposes
- Keep consistent across application (chart-1 always same meaning)

**Semantic Colors:**
- Success (green): Positive metrics, completed states
- Destructive (red): Errors, warnings, negative trends
- Muted: Secondary information, disabled states
- Foreground: Main text color

**Rules:**
1. **Maximum 1-2 primary accents per page** - Don't overuse
2. **Chart colors stay in charts** - Not for UI decoration
3. **Semantic meaning** - Color should convey information, not just prettiness

**Progress Bars:**
- Goal vs Actual: horizontal bars with percentage overlay
- Height: h-2 to h-4
- Background track visible

---

## Icons & Visual Elements

**Icon Library:** Heroicons (outline for navigation, solid for actions)
- Navigation: 20x20 or 24x24
- Buttons: 16x16 or 20x20
- Inline with text: 16x16

**Avatars:**
- Initials fallback when no photo
- Sizes: w-8 h-8 (small), w-10 h-10 (medium), w-12 h-12 (large)
- Rounded-full

**Badges:**
- Status indicators: rounded-full px-2.5 py-0.5 text-xs
- Count badges: absolute positioning, rounded-full, min-w-5

---

## Responsive Behavior

- **Mobile (<768px):** Single column, hamburger menu, stacked cards, simplified tables (hide non-essential columns)
- **Tablet (768-1024px):** 2-column grids, persistent sidebar (icon-only or hidden)
- **Desktop (>1024px):** Full multi-column layouts, persistent sidebar with labels

---

## Accessibility

- All interactive elements: min-h-10 touch targets
- Form inputs: Clear labels, proper aria-labels
- Keyboard navigation: Visible focus states (ring-2)
- Screen reader text for icon-only buttons
- Sufficient contrast ratios throughout
- Skip navigation link for keyboard users

---

## Animation Guidelines

**Use Sparingly:**
- Sidebar collapse/expand: transition-all duration-200
- Dropdown/modal appear: fade-in with slight scale (scale-95 to scale-100)
- Hover states: Simple opacity or border changes, no complex animations
- Loading states: Simple spinner, no elaborate effects
- **Avoid:** Page transitions, scroll animations, decorative animations

---

This design prioritizes data clarity, professional aesthetics, and efficient workflows for fundraising professionals managing complex donor relationships and portfolios.
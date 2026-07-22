# PROJECT 1: CUBO - Google Stitch UI/UX Design

## Google Stitch Design Specifications

### Overview
This document contains complete design prompts for Google Stitch to generate the CUBO frontend UI. Use these prompts at **stitch.withgoogle.com** to create production-ready React components.

---

## DESIGN SYSTEM

### Color Palette
```json
{
  "primary": "#2563EB",      // Bright Blue
  "secondary": "#10B981",     // Emerald Green
  "danger": "#EF4444",        // Red
  "warning": "#F59E0B",       // Amber
  "success": "#10B981",       // Green
  "background": "#F9FAFB",    // Light Gray
  "card": "#FFFFFF",          // White
  "border": "#E5E7EB",        // Medium Gray
  "text_primary": "#111827",  // Dark Gray
  "text_secondary": "#6B7280" // Gray
}
```

### Typography
```
Headings (Inter Bold):
- H1: 32px, line-height 1.2
- H2: 24px, line-height 1.3
- H3: 20px, line-height 1.4

Body Text (Inter Regular):
- Body-16: 16px, line-height 1.5
- Body-14: 14px, line-height 1.5
- Caption: 12px, line-height 1.4
```

---

## STITCH PROMPT 1: Search Dashboard Page

### Prompt for Google Stitch:
```
Create a modern, professional search interface for a document intelligence system called CUBO.

The page should include:

1. Top Navigation Bar:
   - Left: CUBO logo with icon (blue circle with "C")
   - Center: Breadcrumb navigation
   - Right: User profile dropdown, notification bell, settings gear

2. Main Search Section (centered on page):
   - Large search input box (height: 56px)
   - Placeholder text: "Search documents, ask questions..."
   - Search button on the right (blue background, white text)
   - Suggestions: "Advanced Search", "Filters", "Recent Searches"

3. Results Section (appears after search):
   - Result cards in list view:
     * Document title as heading
     * Relevance score (percentage, 0-100%)
     * Matched text snippet (2-3 lines)
     * Document metadata: date, size, type
     * Three icons: preview, download, share

4. Right Sidebar:
   - "AI-Generated Answer" box
   - White card with blue border
   - Streaming text animation effect
   - Copy and thumbs up/down buttons

5. Footer:
   - Quick stats: Documents indexed, Search latency (P50), Users active
   - Links: Privacy, Settings, Compliance Report

Color scheme: Blue primary (#2563EB), white cards, gray text
Responsive: Mobile-first approach
Modern feel: Subtle shadows, rounded corners (8px), smooth transitions
```

---

## STITCH PROMPT 2: Document Upload Manager

### Prompt for Google Stitch:
```
Create a document upload and management interface for CUBO.

Include:

1. Header Section:
   - Title: "Document Manager"
   - Subtitle: "Manage your document corpus"

2. Upload Zone (prominent):
   - Dashed border box, 200px height
   - "Drag files here or click to browse"
   - Accepted formats shown: PDF, DOCX, CSV, XLSX, TXT
   - Upload button with up arrow icon

3. Storage Status:
   - Progress bar showing storage used
   - Text: "45.2 GB / 100 GB (45%)"
   - Color bar: Green for <50%, Yellow for 50-80%, Red for >80%

4. Recent Uploads Table:
   - Columns: Filename, Type, Size, Status, Chunks Created, Upload Time
   - Each row is clickable
   - Status badges: "Indexing", "Complete" (green checkmark), "Error" (red X)
   - Actions: preview, delete, view chunks

5. Bulk Actions:
   - Checkboxes for multi-select
   - Bulk delete button (red)
   - Export metadata button

6. Filters & Sort:
   - Filter by type: All, PDF, DOCX, CSV, etc.
   - Sort by: Name, Date, Size

Colors: Green for success, red for danger
Minimalist table design with hover effects
Loading skeletons while uploading
Progress indicators for each file
```

---

## STITCH PROMPT 3: Settings & Configuration Page

### Prompt for Google Stitch:
```
Create a settings and configuration dashboard for CUBO.

Structure:

1. Left Sidebar Menu (fixed):
   - Menu items: Retrieval, Generation, Compliance, Users, System
   - Active item highlighted in blue
   - Icons for each section

2. Main Content Area:

   A) Retrieval Configuration Section:
   - Heading: "Retrieval Settings"
   - Cards with controls:
     * BM25 Weight slider (0.3 to 0.7, default 0.4)
     * FAISS Nprobe slider (4 to 32, default 8)
     * Top-K Results dropdown: 5, 10, 20, 50
     * Reranking toggle with info icon
   - Blue info box: "These settings affect search speed and accuracy"

   B) Generation Configuration Section:
   - Heading: "LLM Generation Settings"
   - Temperature slider (0.1 to 1.0, default 0.7)
   - Max tokens dropdown: 256, 512, 1024, 2048
   - Top-P sampling slider (0.5 to 1.0)
   - Frequency penalty slider

   C) GDPR Compliance Section:
   - Data Retention dropdown: 7 days, 30 days, 90 days
   - Audit Logging toggle (enabled)
   - Encryption toggle (enabled with lock icon)
   - Generate Audit Report button (blue)
   - Red warning box: "Changing retention policy affects stored data"

   D) System Configuration:
   - GPU selection dropdown
   - Memory limits display (read-only)
   - Model selection: Llama-3.2-3B, Qwen-3.5-4B (radio buttons)

3. Bottom Actions:
   - "Save Settings" button (blue, prominent)
   - "Reset to Defaults" button (gray)
   - "Export Configuration" button

Design: Clean tabs, toggle switches, color-coded sections
Responsive: Sidebar collapses on mobile
Form validation: Show errors in red, success in green
```

---

## STITCH PROMPT 4: Compliance Report Dashboard

### Prompt for Google Stitch:
```
Create a GDPR compliance report dashboard for CUBO.

Layout:

1. Header:
   - Title: "Compliance Reports"
   - Date range selector: From date → To date (calendar pickers)
   - Export report button (PDF, CSV options)

2. Summary Cards (4 columns):
   - Card 1: "Total Queries" - Large number (2,543), green indicator
   - Card 2: "Data Compliant" - Percentage (100%), green checkmark
   - Card 3: "Audit Events" - Large number (8,932), blue indicator
   - Card 4: "Retention Status" - "On Schedule", green checkmark

3. Timeline/Events Section:
   - Heading: "Recent Audit Events"
   - Event list with:
     * Timestamp (left side, faded)
     * Event type icon (colored)
     * Action description
     * User ID
     * Affected resources count
   - Events: Document upload, Search query, Data deletion, User login

4. Data Retention Chart:
   - Title: "Data Retention Over Time"
   - Line chart showing: Documents stored, Date range policy
   - X-axis: Date, Y-axis: Document count
   - Red zone: Documents approaching deletion date

5. Access Log Table:
   - Columns: Timestamp, User ID, Action, Resource, IP Address, Status
   - Sortable columns
   - Filter button for action type

6. Footer:
   - "Certification Status: GDPR Compliant ✓"
   - "Last Audit: 2024-07-02"
   - "Next Audit: 2024-08-02"

Colors: Green for compliant, red for warnings, blue for info
Charts: Simple, clean line graphs with legend
Professional tone: Suitable for regulatory reviews
Export functionality: PDF reports with timestamp
```

---

## STITCH PROMPT 5: Search Results & Answer Page

### Prompt for Google Stitch:
```
Create a detailed search results page with AI-generated answer for CUBO.

Layout:

1. Search Bar at Top:
   - Shows current query
   - Edit button to modify search
   - Filters button (number badge showing active filters)
   - Sort dropdown: Relevance, Date, Type

2. Left Panel - Filters:
   - "Refine Search"
   - Checkboxes:
     * Document Type: PDF, DOCX, CSV, etc.
     * Date Range: Last 24h, Last 7d, Last 30d, Custom
     * Author/Source: Dropdown list
     * Relevance: Slider 50-100%
   - "Clear All Filters" button

3. Main Panel - AI Answer Box (at top):
   - Blue border, white background
   - Heading: "AI-Generated Answer"
   - Answer text (streaming animation effect if generating)
   - Buttons: Copy, Cite Sources, Thumbs Up/Down
   - "Show Sources" expandable section

4. Search Results (below AI answer):
   - Each result card:
     * Relevance badge (top right): "92% Match"
     * Document title (blue, clickable)
     * Document type icon + name
     * Matched text snippet highlighted in yellow
     * Document metadata: Date, Size, Source
     * Bottom actions: Preview, Download, Add to Collection

5. Pagination:
   - "Showing 1-10 of 247 results"
   - Previous/Next buttons
   - Jump to page input

6. Right Panel - Sidebar:
   - "Result Statistics"
   - Cards showing:
     * Total results found
     * Search time (ms)
     * Documents searched
     * Average relevance
   - "Related Searches" suggestions
   - "Save Search" button

Colors: Blue for primary actions, yellow for highlights, green for success
Responsive: Sidebar hides on mobile, full-width results
Animations: Smooth expand/collapse, loading spinners
Accessibility: ARIA labels, keyboard navigation
```

---

## STITCH PROMPT 6: Mobile Responsive Search App

### Prompt for Google Stitch:
```
Create a mobile-optimized search interface for CUBO (for iOS/Android).

Design Requirements:

1. Header (Mobile):
   - Small CUBO logo on left
   - Three-line menu button on right
   - Hamburger menu collapses navigation

2. Search Interface:
   - Full-width search bar at top
   - Mic button for voice search
   - Camera button for image upload
   - Voice/Image icon animations

3. Mobile Results:
   - Stack-view layout (single column)
   - Result cards with:
     * Title (bold, large tap area)
     * Relevance score
     * 1-line snippet
     * "View More" expander
   - Swipe left to delete/archive

4. Floating Action Button (FAB):
   - Blue circle bottom-right
   - "+" icon for new search
   - Bottom sheet menu on tap:
     * New Search
     * Upload Document
     * Saved Searches
     * Settings

5. AI Answer Box (Mobile):
   - Floats as card
   - Tap to expand full-screen
   - Swipe down to dismiss

6. Settings Menu:
   - Full-screen overlay
   - Switches for: Dark mode, Notifications, Offline mode
   - Quick links to: Compliance, Help, Logout

7. Performance:
   - Optimized loading screens
   - Skeleton placeholders
   - Lazy loading for results
   - Bottom-sheet dialogs instead of modals

Interaction patterns: Mobile-first gestures (swipe, tap, long-press)
Colors: High contrast for readability on small screens
Safe area: Respect notches and home indicators
```

---

## IMPLEMENTATION STEPS

### Step 1: Generate Individual Components
Use these prompts one by one in Google Stitch to generate React components.

### Step 2: Export Generated Code
For each design:
1. Go to stitch.withgoogle.com
2. Paste the prompt
3. Review the generated design
4. Click "Export Frontend Code"
5. Copy the React/HTML/CSS code

### Step 3: Integration
```bash
# After exporting from Stitch:
1. Copy component to your React project
2. Install dependencies
3. Update API endpoints to your FastAPI backend
4. Test in browser
```

### Step 4: Customization
After Stitch generates the UI:
- Connect to FastAPI `/api/search` endpoint
- Add real-time search with debouncing
- Implement file upload with progress tracking
- Add WebSocket for streaming AI responses

---

## CSS VARIABLES (for Stitch-Generated Code)

```css
:root {
  --color-primary: #2563EB;
  --color-secondary: #10B981;
  --color-danger: #EF4444;
  --color-warning: #F59E0B;
  --color-success: #10B981;
  --color-background: #F9FAFB;
  --color-card: #FFFFFF;
  --color-border: #E5E7EB;
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  
  --radius-small: 4px;
  --radius-medium: 8px;
  --radius-large: 12px;
  
  --shadow-small: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-medium: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-large: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  --font-family: "Inter", sans-serif;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
}
```

---

## INTERACTIVE COMPONENTS

### Search Bar with Real-time Suggestions
```jsx
<input
  type="text"
  placeholder="Search documents, ask questions..."
  onChange={(e) => fetchSuggestions(e.target.value)}
  onKeyPress={(e) => e.key === 'Enter' && performSearch()}
  style={{
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '2px solid #E5E7EB',
    fontSize: '16px',
    fontFamily: 'Inter',
  }}
/>
```

### Result Card Component
```jsx
function ResultCard({ result }) {
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      cursor: 'pointer',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
      }}>
        <h3 style={{ color: '#2563EB', margin: '0 0 8px 0' }}>
          {result.title}
        </h3>
        <span style={{
          background: '#10B981',
          color: '#FFFFFF',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
        }}>
          {result.relevance_score}% Match
        </span>
      </div>
      <p style={{ color: '#6B7280', fontSize: '14px', margin: '0' }}>
        {result.text.substring(0, 150)}...
      </p>
    </div>
  );
}
```

---

## DEPLOYMENT WITH STITCH & ANTIGRAVITY

### Using Google Antigravity to Deploy:
1. Generate UI with Google Stitch
2. Export React code
3. Open Google Antigravity IDE
4. Create new project: `antigravity create cubo-frontend`
5. Paste Stitch-generated code into `App.jsx`
6. Create agent task: "Connect this UI to FastAPI backend"
7. Configure API endpoints in environment variables
8. Test with Antigravity's browser-in-the-loop agent
9. Deploy to production

---

## ACCESSIBILITY REQUIREMENTS

All Stitch-generated components must include:
- ARIA labels for screen readers
- Keyboard navigation (Tab, Enter, Escape)
- Color contrast ratio >4.5:1
- Focus indicators (blue outline)
- Alt text for images
- Semantic HTML (button, input, nav, etc.)

---

## STITCH PROMPT QUICK REFERENCE

| Component | Prompt File |
|-----------|------------|
| Search Dashboard | STITCH_PROMPT_1 |
| Upload Manager | STITCH_PROMPT_2 |
| Settings Page | STITCH_PROMPT_3 |
| Compliance Report | STITCH_PROMPT_4 |
| Search Results | STITCH_PROMPT_5 |
| Mobile App | STITCH_PROMPT_6 |

Use at: **stitch.withgoogle.com**

---

**Document Version:** 1.0  
**Last Updated:** July 2026  
**Status:** Ready for Stitch Implementation

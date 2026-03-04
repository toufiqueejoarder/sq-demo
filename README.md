# SQ Industrial Demo - Industrial Equipment Platform

A fully functional demo website for SQ Industrial's B2B Industrial Equipment Distribution Platform, showcasing power transformers, distribution systems, cables, and protection equipment across Bangladesh.

## Features

### Public Website
- Modern landing page with hero, industry solutions, and product categories
- Product catalog with category filters and search functionality
- Product detail pages with technical specifications
- Distributor locator map with interactive markers across 8 divisions
- RFQ (Request for Quote) lead generation system
- AI-powered chat widget for product inquiries

### Distributor Portal
- Dashboard with assigned leads and inventory overview
- Lead management with status tracking (Assigned → Contacted → Qualified → Converted)
- Inventory toggle for product availability
- Profile switching between multiple distributor accounts
- Coverage area display

### Admin Panel
- KPI dashboard with charts and statistics
- Product management (Add, Edit, Delete products)
- Distributor management with coverage tracking
- Lead management with filtering and assignment
- Analytics dashboard with Recharts visualizations
- Demand heatmap visualization using Leaflet

### Demo Control Panel
Access via `/demo-controls` or by clicking the settings icon on the Demo Environment indicator.

- **Role Switching**: Toggle between Public, Distributor, and Admin views
- **Distributor Selection**: Switch between different distributor accounts
- **Demand Level Toggle**: Control High/Medium/Low demand simulation
- **Lead Generator**: Create random leads for demonstration
- **Data Reset**: Restore all data to initial state

### Interactive Elements
- AI-powered chat widget (simulated responses for products and distributors)
- Toast notifications for actions
- RFQ modal with form submission
- Real-time data consistency across all pages
- Distributor switching with immediate data updates

## Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Maps**: Leaflet + React-Leaflet
- **Icons**: Lucide React
- **State Management**: React Context + useReducer + localStorage
- **Routing**: React Router DOM

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── layout/           # Navbar, Footer, Layouts, Sidebars
│   ├── demo/             # Demo indicator and controls
│   └── ChatWidget.tsx    # AI chat component
├── contexts/
│   └── DemoStateContext.tsx  # Centralized state management
├── lib/
│   └── mock-data.ts      # Mock data for products, distributors, leads
├── pages/
│   ├── admin/            # Admin panel pages
│   ├── distributor/      # Distributor portal pages
│   ├── HomePage.tsx      # Landing page
│   ├── ProductsPage.tsx  # Product catalog
│   ├── ProductDetailPage.tsx
│   ├── DistributorsPage.tsx
│   └── ...
├── types/
│   └── index.ts          # TypeScript type definitions
└── App.tsx               # Main routing configuration
```

## Demo Data

The demo includes realistic mock data for:
- 20 products across 6 categories (Power Transformers, Distribution Transformers, Industrial Cables, Control Cables, Switchgear, Protection Systems)
- 8 distributors across all Bangladesh divisions (Dhaka, Chittagong, Khulna, Sylhet, Rajshahi, Barisal, Rangpur, Mymensingh)
- 20 leads with various statuses and priorities
- Demand heatmap data for regional analysis

## Key URLs

| Page | URL |
|------|-----|
| Landing Page | `/` |
| Products Catalog | `/products` |
| Product Detail | `/products/[id]` |
| Distributor Map | `/distributors` |
| RFQ Form | `/rfq` |
| Distributor Dashboard | `/distributor` |
| Distributor Leads | `/distributor/leads` |
| Distributor Inventory | `/distributor/inventory` |
| Admin Dashboard | `/admin` |
| Admin Products | `/admin/products` |
| Admin Distributors | `/admin/distributors` |
| Admin Leads | `/admin/leads` |
| Admin Analytics | `/admin/analytics` |
| Admin Heatmap | `/admin/heatmap` |
| Demo Controls | `/demo-controls` |

## Notes

- All data is stored in localStorage and persists between sessions
- Use the Demo Control Panel to reset data or simulate scenarios
- The "Demo Environment" indicator reminds users that all data is simulated
- The AI chat widget provides simulated responses for common questions about products and distributors
- Distributor switching in the sidebar immediately updates all portal data

## License

Private - For demonstration purposes only.

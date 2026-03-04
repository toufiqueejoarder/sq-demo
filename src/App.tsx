import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, PortalLayout, DistributorLayout } from './components/layout';
import {
  HomePage,
  ProductsPage,
  ProductDetailPage,
  DistributorsPage,
  RFQPage,
  AdminDashboard,
  DistributorDashboard,
  DemoControlsPage,
} from './pages';
import { DistributorLeadsPage, DistributorInventoryPage } from './pages/distributor';
import { AdminProductsPage, AdminLeadsPage, AdminDistributorsPage, AdminAnalyticsPage, AdminHeatmapPage } from './pages/admin';
import { ChatWidget } from './components/ChatWidget';
import { DemoIndicator } from './components/demo/DemoIndicator';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/distributors" element={<DistributorsPage />} />
          <Route path="/rfq" element={<RFQPage />} />
        </Route>

        {/* Distributor Portal */}
        <Route element={<DistributorLayout />}>
          <Route path="/distributor" element={<DistributorDashboard />} />
          <Route path="/distributor/leads" element={<DistributorLeadsPage />} />
          <Route path="/distributor/inventory" element={<DistributorInventoryPage />} />
        </Route>

        {/* Admin Portal */}
        <Route element={<PortalLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/distributors" element={<AdminDistributorsPage />} />
          <Route path="/admin/leads" element={<AdminLeadsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/heatmap" element={<AdminHeatmapPage />} />
        </Route>

        {/* Demo Controls */}
        <Route element={<PortalLayout />}>
          <Route path="/demo-controls" element={<DemoControlsPage />} />
        </Route>
      </Routes>
      
      {/* Global Chat Widget */}
      <ChatWidget />
      
      {/* Demo Environment Indicator */}
      <DemoIndicator />
    </BrowserRouter>
  );
}
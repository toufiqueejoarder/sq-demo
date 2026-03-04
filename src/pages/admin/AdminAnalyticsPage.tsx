import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ArrowLeft, TrendingUp, Users, Package, FileText } from 'lucide-react';
import { useLeads, useProducts, useDistributors } from '../../contexts/DemoStateContext';
import { divisionList, categoryList } from '../../lib/mock-data';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const STATUS_COLORS: Record<string, string> = {
  new: '#3b82f6',
  assigned: '#f59e0b',
  contacted: '#8b5cf6',
  qualified: '#6366f1',
  converted: '#10b981',
  lost: '#ef4444',
};

export function AdminAnalyticsPage() {
  const { leads, getLeadStats, getLeadsByDivision } = useLeads();
  const { products, getProductsByCategory } = useProducts();
  const { distributors } = useDistributors();

  const stats = getLeadStats();

  const leadsByDivisionData = useMemo(() => {
    return divisionList.map((division) => ({
      name: division,
      leads: getLeadsByDivision(division).length,
    }));
  }, [getLeadsByDivision]);

  const leadsByStatusData = useMemo(() => {
    return Object.entries(stats.byStatus).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      color: STATUS_COLORS[status],
    }));
  }, [stats.byStatus]);

  const productsByCategoryData = useMemo(() => {
    return categoryList.map((category, index) => ({
      name: category.split(' ')[0],
      fullName: category,
      products: getProductsByCategory(category).length,
      color: COLORS[index % COLORS.length],
    }));
  }, [getProductsByCategory]);

  const conversionFunnelData = useMemo(() => {
    const total = leads.length;
    const assigned = leads.filter((l) => l.status !== 'new').length;
    const contacted = leads.filter((l) => ['contacted', 'qualified', 'converted'].includes(l.status)).length;
    const qualified = leads.filter((l) => ['qualified', 'converted'].includes(l.status)).length;
    const converted = leads.filter((l) => l.status === 'converted').length;

    return [
      { stage: 'Total Leads', count: total, percentage: 100 },
      { stage: 'Assigned', count: assigned, percentage: total > 0 ? Math.round((assigned / total) * 100) : 0 },
      { stage: 'Contacted', count: contacted, percentage: total > 0 ? Math.round((contacted / total) * 100) : 0 },
      { stage: 'Qualified', count: qualified, percentage: total > 0 ? Math.round((qualified / total) * 100) : 0 },
      { stage: 'Converted', count: converted, percentage: total > 0 ? Math.round((converted / total) * 100) : 0 },
    ];
  }, [leads]);

  const distributorPerformanceData = useMemo(() => {
    return distributors.map((distributor) => {
      const assignedLeads = leads.filter((l) => l.assignedDistributorId === distributor.id);
      const converted = assignedLeads.filter((l) => l.status === 'converted').length;
      const conversionRate = assignedLeads.length > 0 
        ? Math.round((converted / assignedLeads.length) * 100) 
        : 0;

      return {
        name: distributor.name.split(' ')[0],
        fullName: distributor.name,
        division: distributor.division,
        leads: assignedLeads.length,
        converted,
        conversionRate,
      };
    }).sort((a, b) => b.leads - a.leads);
  }, [distributors, leads]);

  const leadTrendData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map((date) => {
      const dayLeads = leads.filter((l) => l.createdAt.startsWith(date));
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        leads: dayLeads.length,
        converted: dayLeads.filter((l) => l.status === 'converted').length,
      };
    });
  }, [leads]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          to="/admin"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Insights into leads, products, and distributor performance</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
          </div>
          <p className="text-sm text-gray-500">Total Leads</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">
              {stats.total > 0 ? Math.round((stats.byStatus.converted / stats.total) * 100) : 0}%
            </span>
          </div>
          <p className="text-sm text-gray-500">Conversion Rate</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold text-gray-900">{products.length}</span>
          </div>
          <p className="text-sm text-gray-500">Products</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">{distributors.length}</span>
          </div>
          <p className="text-sm text-gray-500">Distributors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Lead Distribution by Division */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Leads by Division</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadsByDivisionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Status Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadsByStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {leadsByStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Product Demand by Category */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Products by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productsByCategoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
              <Tooltip 
                formatter={(value, _name, props) => [value, props.payload.fullName]}
              />
              <Bar dataKey="products" radius={[0, 4, 4, 0]}>
                {productsByCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">RFQ Conversion Funnel</h3>
          <div className="space-y-4">
            {conversionFunnelData.map((stage, index) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{stage.stage}</span>
                  <span className="text-sm font-semibold text-gray-900">{stage.count} ({stage.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      width: `${stage.percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Trend (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={leadTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="leads" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              <Area type="monotone" dataKey="converted" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Distributor Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Distributor Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-semibold text-gray-900">Distributor</th>
                  <th className="text-center py-3 text-sm font-semibold text-gray-900">Leads</th>
                  <th className="text-center py-3 text-sm font-semibold text-gray-900">Converted</th>
                  <th className="text-center py-3 text-sm font-semibold text-gray-900">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {distributorPerformanceData.slice(0, 5).map((dist) => (
                  <tr key={dist.fullName}>
                    <td className="py-3">
                      <p className="text-sm font-medium text-gray-900">{dist.name}</p>
                      <p className="text-xs text-gray-500">{dist.division}</p>
                    </td>
                    <td className="py-3 text-center text-sm text-gray-600">{dist.leads}</td>
                    <td className="py-3 text-center text-sm text-gray-600">{dist.converted}</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        dist.conversionRate >= 50 ? 'bg-green-100 text-green-700' :
                        dist.conversionRate >= 25 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {dist.conversionRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

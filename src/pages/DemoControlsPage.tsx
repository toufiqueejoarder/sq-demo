import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Settings,
  RefreshCw,
  Plus,
  Thermometer,
  Users,
  Package,
  FileText,
  Zap,
  AlertTriangle,
  CheckCircle,
  Home,
  Eye,
  EyeOff,
  TrendingUp,
  Target,
  Play,
  RotateCcw,
  Shield,
  User,
  Building2,
} from 'lucide-react';
import { useDemoControls, useLeads, useProducts, useDistributors, useDemoState } from '../contexts/DemoStateContext';
import type { DemandLevel, UserRole } from '../types';

export function DemoControlsPage() {
  const { state, actions } = useDemoState();
  const { demandLevel, currentRole, setDemandLevel, setRole, resetDemo, generateRandomLead } = useDemoControls();
  const { leads, getLeadStats } = useLeads();
  const { products } = useProducts();
  const { distributors } = useDistributors();

  const [generatedLeads, setGeneratedLeads] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const stats = getLeadStats();

  const handleGenerateLead = () => {
    generateRandomLead();
    setGeneratedLeads((prev) => prev + 1);
  };

  const handleBulkGenerate = (count: number) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        generateRandomLead();
        setGeneratedLeads((prev) => prev + 1);
      }, i * 100);
    }
  };

  const handleReset = () => {
    resetDemo();
    setShowResetConfirm(false);
    setResetSuccess(true);
    setGeneratedLeads(0);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  const roleIcons = {
    admin: Shield,
    distributor: Building2,
    public: User,
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Demo Control Panel</h1>
              <p className="text-xs text-slate-400">Internal use only • SQ Industrial</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-emerald-600 text-white text-sm font-medium rounded-full">
              Role: {currentRole.toUpperCase()}
            </span>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-transparent border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {resetSuccess && (
        <div className="container mx-auto px-4 pt-4">
          <div className="p-4 bg-emerald-900/50 border border-emerald-700 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-200 font-medium">Demo state has been reset to defaults!</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Column 1: Role & Settings */}
          <div className="space-y-6">
            {/* Role Switching */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-700">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-400" />
                  Role Switching
                </h2>
                <p className="text-sm text-slate-400 mt-1">Change the active user role</p>
              </div>
              <div className="p-5 space-y-3">
                {(['admin', 'distributor', 'public'] as UserRole[]).map((role) => {
                  const Icon = roleIcons[role];
                  return (
                    <button
                      key={role}
                      onClick={() => setRole(role)}
                      className={`w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-between ${
                        currentRole === role
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="capitalize">{role}</span>
                      </span>
                      {currentRole === role && <CheckCircle className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Display Settings */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-700">
                <h2 className="text-white font-semibold">Display Settings</h2>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Show Demo Indicator</span>
                  <button
                    onClick={() => actions.toggleDemoIndicator()}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      state.showDemoIndicator ? 'bg-emerald-600' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        state.showDemoIndicator ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {state.showDemoIndicator ? (
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> Indicator visible</span>
                  ) : (
                    <span className="flex items-center gap-1"><EyeOff className="w-3 h-3" /> Indicator hidden</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: State Toggles */}
          <div className="space-y-6">
            {/* Demand Level */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-700">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-slate-400" />
                  Demand Level Control
                </h2>
                <p className="text-sm text-slate-400 mt-1">Affects heatmap and analytics</p>
              </div>
              <div className="p-5 space-y-3">
                {(['low', 'medium', 'high'] as DemandLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDemandLevel(level)}
                    className={`w-full px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-between ${
                      demandLevel === level
                        ? level === 'high'
                          ? 'bg-red-600 text-white'
                          : level === 'medium'
                          ? 'bg-amber-600 text-white'
                          : 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      {level.charAt(0).toUpperCase() + level.slice(1)} Demand
                    </span>
                    {demandLevel === level && <CheckCircle className="w-4 h-4" />}
                  </button>
                ))}
                <Link
                  to="/admin/heatmap"
                  className="block text-sm text-blue-400 hover:text-blue-300 mt-4"
                >
                  View Demand Heatmap →
                </Link>
              </div>
            </div>

            {/* Current State */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-700">
                <h2 className="text-white font-semibold">Current State Summary</h2>
              </div>
              <div className="p-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Products</span>
                  <span className="text-white font-medium">{products.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Distributors</span>
                  <span className="text-white font-medium">{distributors.length}</span>
                </div>
                <div className="h-px bg-slate-700 my-3" />
                <div className="flex justify-between">
                  <span className="text-slate-400">New Leads</span>
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded">{stats.byStatus.new}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned Leads</span>
                  <span className="px-2 py-0.5 bg-amber-600 text-white text-xs font-medium rounded">{stats.byStatus.assigned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Converted Leads</span>
                  <span className="px-2 py-0.5 bg-emerald-600 text-white text-xs font-medium rounded">{stats.byStatus.converted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Event Triggers */}
          <div className="space-y-6">
            {/* Lead Generator */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-700">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <Play className="w-5 h-5 text-slate-400" />
                  Lead Generator
                </h2>
                <p className="text-sm text-slate-400 mt-1">Simulate lead creation</p>
              </div>
              <div className="p-5 space-y-3">
                <button
                  onClick={handleGenerateLead}
                  className="w-full px-4 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Generate 1 Lead
                </button>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleBulkGenerate(5)}
                    className="px-3 py-2 bg-slate-700 text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    +5 Leads
                  </button>
                  <button
                    onClick={() => handleBulkGenerate(10)}
                    className="px-3 py-2 bg-slate-700 text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    +10 Leads
                  </button>
                  <button
                    onClick={() => handleBulkGenerate(20)}
                    className="px-3 py-2 bg-slate-700 text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    +20 Leads
                  </button>
                </div>
                {generatedLeads > 0 && (
                  <p className="text-xs text-emerald-400">+{generatedLeads} leads generated this session</p>
                )}
              </div>
            </div>

            {/* Reset Demo */}
            <div className="bg-slate-800 border border-red-900/50 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-700">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-slate-400" />
                  Reset Demo
                </h2>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-400 mb-4">
                  Reset all data to the initial state. This cannot be undone.
                </p>
                {showResetConfirm ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-300">This will reset all products, distributors, and leads.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Yes, Reset
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-4 py-2 bg-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="w-full px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset All Data
                  </button>
                )}
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-700">
                <h2 className="text-white font-semibold">Quick Navigation</h2>
              </div>
              <div className="p-5 grid grid-cols-2 gap-3">
                <Link
                  to="/admin"
                  className="p-3 bg-slate-700 rounded-lg text-center hover:bg-slate-600 transition-colors"
                >
                  <Shield className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                  <span className="text-xs text-slate-300">Admin Portal</span>
                </Link>
                <Link
                  to="/distributor"
                  className="p-3 bg-slate-700 rounded-lg text-center hover:bg-slate-600 transition-colors"
                >
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                  <span className="text-xs text-slate-300">Distributor</span>
                </Link>
                <Link
                  to="/admin/analytics"
                  className="p-3 bg-slate-700 rounded-lg text-center hover:bg-slate-600 transition-colors"
                >
                  <Target className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                  <span className="text-xs text-slate-300">Analytics</span>
                </Link>
                <Link
                  to="/"
                  className="p-3 bg-slate-700 rounded-lg text-center hover:bg-slate-600 transition-colors"
                >
                  <Home className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                  <span className="text-xs text-slate-300">Public Site</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

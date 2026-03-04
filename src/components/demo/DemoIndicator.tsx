import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemoState } from '../../contexts/DemoStateContext';

export function DemoIndicator() {
  const { state } = useDemoState();

  if (!state.showDemoIndicator) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-amber-100 border border-amber-300 rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Demo Environment
            </p>
            <p className="text-xs text-amber-600">
              All data is simulated
            </p>
          </div>
        </div>
        <Link
          to="/demo-controls"
          className="p-1.5 hover:bg-amber-200 rounded-md transition-colors"
          title="Open Demo Controls"
        >
          <Settings className="w-4 h-4 text-amber-700" />
        </Link>
      </div>
    </div>
  );
}

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
  type Dispatch,
} from 'react';
import type {
  Product,
  Distributor,
  Lead,
  DemoState,
  DemandLevel,
  UserRole,
  LeadStatus,
  BangladeshDivision,
} from '../types';
import {
  mockProducts,
  mockDistributors,
  mockLeads,
  mockUsers,
} from '../lib/mock-data';

const STORAGE_KEY = 'sq-demo-state';
const STORAGE_VERSION = '6.0.0'; // Increment this when mock data structure changes

type DemoAction =
  | { type: 'CREATE_LEAD'; payload: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_LEAD_STATUS'; payload: { leadId: string; status: LeadStatus; assignedDistributorId?: string } }
  | { type: 'TOGGLE_INVENTORY'; payload: { distributorId: string; productId: string } }
  | { type: 'ADD_PRODUCT'; payload: Omit<Product, 'id' | 'createdAt'> }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'UPDATE_DISTRIBUTOR'; payload: Distributor }
  | { type: 'SET_DEMAND_LEVEL'; payload: DemandLevel }
  | { type: 'SET_ROLE'; payload: UserRole }
  | { type: 'SET_DISTRIBUTOR'; payload: string }
  | { type: 'TOGGLE_DEMO_INDICATOR' }
  | { type: 'RESET_DEMO' }
  | { type: 'LOAD_STATE'; payload: DemoState };

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getInitialState(): DemoState {
  return {
    products: mockProducts,
    distributors: mockDistributors,
    leads: mockLeads,
    currentRole: 'public',
    currentUser: mockUsers.public,
    currentDistributorId: mockDistributors[0]?.id || null,
    demandLevel: 'medium',
    showDemoIndicator: true,
  };
}

interface StoredState {
  version: string;
  state: DemoState;
}

function loadStateFromStorage(): DemoState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as StoredState;
      // Check version - if outdated or missing, return null to force fresh data
      if (parsed.version !== STORAGE_VERSION) {
        console.log(`Storage version mismatch (${parsed.version} vs ${STORAGE_VERSION}), loading fresh data`);
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      if (parsed.state?.products && parsed.state?.distributors && parsed.state?.leads) {
        return parsed.state;
      }
    }
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
    localStorage.removeItem(STORAGE_KEY);
  }
  return null;
}

function saveStateToStorage(state: DemoState): void {
  try {
    const storageData: StoredState = {
      version: STORAGE_VERSION,
      state: state,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  } catch (e) {
    console.warn('Failed to save state to localStorage:', e);
  }
}

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'CREATE_LEAD': {
      const now = new Date().toISOString();
      const newLead: Lead = {
        ...action.payload,
        id: generateId('lead'),
        createdAt: now,
        updatedAt: now,
      };
      return {
        ...state,
        leads: [...state.leads, newLead],
      };
    }

    case 'UPDATE_LEAD_STATUS': {
      const { leadId, status, assignedDistributorId } = action.payload;
      return {
        ...state,
        leads: state.leads.map((lead) =>
          lead.id === leadId
            ? {
                ...lead,
                status,
                assignedDistributorId: assignedDistributorId ?? lead.assignedDistributorId,
                updatedAt: new Date().toISOString(),
              }
            : lead
        ),
      };
    }

    case 'TOGGLE_INVENTORY': {
      const { distributorId, productId } = action.payload;
      return {
        ...state,
        distributors: state.distributors.map((dist) =>
          dist.id === distributorId
            ? {
                ...dist,
                inventory: dist.inventory.map((item) =>
                  item.productId === productId
                    ? { ...item, available: !item.available }
                    : item
                ),
              }
            : dist
        ),
      };
    }

    case 'ADD_PRODUCT': {
      const newProduct: Product = {
        ...action.payload,
        id: generateId('prod'),
        createdAt: new Date().toISOString(),
      };
      const updatedDistributors = state.distributors.map((dist) => ({
        ...dist,
        inventory: [
          ...dist.inventory,
          { productId: newProduct.id, available: newProduct.inStock },
        ],
      }));
      return {
        ...state,
        products: [...state.products, newProduct],
        distributors: updatedDistributors,
      };
    }

    case 'UPDATE_PRODUCT': {
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    }

    case 'DELETE_PRODUCT': {
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
        distributors: state.distributors.map((dist) => ({
          ...dist,
          inventory: dist.inventory.filter((item) => item.productId !== action.payload),
        })),
      };
    }

    case 'UPDATE_DISTRIBUTOR': {
      return {
        ...state,
        distributors: state.distributors.map((d) =>
          d.id === action.payload.id ? action.payload : d
        ),
      };
    }

    case 'SET_DEMAND_LEVEL': {
      return {
        ...state,
        demandLevel: action.payload,
      };
    }

    case 'SET_ROLE': {
      const user = mockUsers[action.payload] || mockUsers.public;
      return {
        ...state,
        currentRole: action.payload,
        currentUser: user,
      };
    }

    case 'SET_DISTRIBUTOR': {
      return {
        ...state,
        currentDistributorId: action.payload,
      };
    }

    case 'TOGGLE_DEMO_INDICATOR': {
      return {
        ...state,
        showDemoIndicator: !state.showDemoIndicator,
      };
    }

    case 'RESET_DEMO': {
      return getInitialState();
    }

    case 'LOAD_STATE': {
      return action.payload;
    }

    default:
      return state;
  }
}

interface DemoContextValue {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
  actions: {
    createLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateLeadStatus: (leadId: string, status: LeadStatus, assignedDistributorId?: string) => void;
    toggleInventory: (distributorId: string, productId: string) => void;
    addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (productId: string) => void;
    updateDistributor: (distributor: Distributor) => void;
    setDemandLevel: (level: DemandLevel) => void;
    setRole: (role: UserRole) => void;
    setDistributor: (distributorId: string) => void;
    toggleDemoIndicator: () => void;
    resetDemo: () => void;
    generateRandomLead: () => void;
  };
  selectors: {
    getProductById: (id: string) => Product | undefined;
    getDistributorById: (id: string) => Distributor | undefined;
    getCurrentDistributor: () => Distributor | undefined;
    getLeadById: (id: string) => Lead | undefined;
    getLeadsByStatus: (status: LeadStatus) => Lead[];
    getLeadsByDistributor: (distributorId: string) => Lead[];
    getLeadsByDivision: (division: BangladeshDivision) => Lead[];
    getDistributorsByDivision: (division: BangladeshDivision) => Distributor[];
    getProductsByCategory: (category: string) => Product[];
    getFeaturedProducts: () => Product[];
    getLeadStats: () => { total: number; byStatus: Record<LeadStatus, number> };
  };
}

const DemoContext = createContext<DemoContextValue | null>(null);

interface DemoProviderProps {
  children: ReactNode;
}

export function DemoProvider({ children }: DemoProviderProps) {
  const [state, dispatch] = useReducer(
    demoReducer,
    null,
    () => loadStateFromStorage() || getInitialState()
  );

  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  const createLead = useCallback(
    (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
      dispatch({ type: 'CREATE_LEAD', payload: lead });
    },
    []
  );

  const updateLeadStatus = useCallback(
    (leadId: string, status: LeadStatus, assignedDistributorId?: string) => {
      dispatch({ type: 'UPDATE_LEAD_STATUS', payload: { leadId, status, assignedDistributorId } });
    },
    []
  );

  const toggleInventory = useCallback(
    (distributorId: string, productId: string) => {
      dispatch({ type: 'TOGGLE_INVENTORY', payload: { distributorId, productId } });
    },
    []
  );

  const addProduct = useCallback(
    (product: Omit<Product, 'id' | 'createdAt'>) => {
      dispatch({ type: 'ADD_PRODUCT', payload: product });
    },
    []
  );

  const updateProduct = useCallback((product: Product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: productId });
  }, []);

  const updateDistributor = useCallback((distributor: Distributor) => {
    dispatch({ type: 'UPDATE_DISTRIBUTOR', payload: distributor });
  }, []);

  const setDemandLevel = useCallback((level: DemandLevel) => {
    dispatch({ type: 'SET_DEMAND_LEVEL', payload: level });
  }, []);

  const setRole = useCallback((role: UserRole) => {
    dispatch({ type: 'SET_ROLE', payload: role });
  }, []);

  const setDistributor = useCallback((distributorId: string) => {
    dispatch({ type: 'SET_DISTRIBUTOR', payload: distributorId });
  }, []);

  const toggleDemoIndicator = useCallback(() => {
    dispatch({ type: 'TOGGLE_DEMO_INDICATOR' });
  }, []);

  const resetDemo = useCallback(() => {
    dispatch({ type: 'RESET_DEMO' });
  }, []);

  const generateRandomLead = useCallback(() => {
    const divisions: BangladeshDivision[] = [
      'Dhaka', 'Chittagong', 'Khulna', 'Sylhet',
      'Rajshahi', 'Barisal', 'Rangpur', 'Mymensingh',
    ];
    const randomProduct = state.products[Math.floor(Math.random() * state.products.length)];
    const randomDivision = divisions[Math.floor(Math.random() * divisions.length)];
    const priorities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
    const demandMultiplier = state.demandLevel === 'high' ? 2 : state.demandLevel === 'low' ? 0.5 : 1;

    const lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'> = {
      productId: randomProduct.id,
      customerName: `Customer ${Math.floor(Math.random() * 1000)}`,
      companyName: `Company ${Math.floor(Math.random() * 100)} Ltd`,
      email: `customer${Math.floor(Math.random() * 1000)}@example.com`,
      phone: `+880-1${Math.floor(Math.random() * 9) + 1}-${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`,
      division: randomDivision,
      district: randomDivision,
      quantity: Math.ceil(Math.random() * 5 * demandMultiplier),
      message: `Auto-generated lead for ${randomProduct.name}`,
      status: 'new',
      assignedDistributorId: null,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
    };

    createLead(lead);
  }, [state.products, state.demandLevel, createLead]);

  const getProductById = useCallback(
    (id: string) => state.products.find((p) => p.id === id),
    [state.products]
  );

  const getDistributorById = useCallback(
    (id: string) => state.distributors.find((d) => d.id === id),
    [state.distributors]
  );

  const getCurrentDistributor = useCallback(
    () => state.distributors.find((d) => d.id === state.currentDistributorId),
    [state.distributors, state.currentDistributorId]
  );

  const getLeadById = useCallback(
    (id: string) => state.leads.find((l) => l.id === id),
    [state.leads]
  );

  const getLeadsByStatus = useCallback(
    (status: LeadStatus) => state.leads.filter((l) => l.status === status),
    [state.leads]
  );

  const getLeadsByDistributor = useCallback(
    (distributorId: string) => state.leads.filter((l) => l.assignedDistributorId === distributorId),
    [state.leads]
  );

  const getLeadsByDivision = useCallback(
    (division: BangladeshDivision) => state.leads.filter((l) => l.division === division),
    [state.leads]
  );

  const getDistributorsByDivision = useCallback(
    (division: BangladeshDivision) => state.distributors.filter((d) => d.division === division),
    [state.distributors]
  );

  const getProductsByCategory = useCallback(
    (category: string) => state.products.filter((p) => p.category === category),
    [state.products]
  );

  const getFeaturedProducts = useCallback(
    () => state.products.filter((p) => p.featured),
    [state.products]
  );

  const getLeadStats = useCallback(() => {
    const byStatus: Record<LeadStatus, number> = {
      new: 0,
      assigned: 0,
      contacted: 0,
      qualified: 0,
      converted: 0,
      lost: 0,
    };
    state.leads.forEach((lead) => {
      byStatus[lead.status]++;
    });
    return { total: state.leads.length, byStatus };
  }, [state.leads]);

  const value: DemoContextValue = {
    state,
    dispatch,
    actions: {
      createLead,
      updateLeadStatus,
      toggleInventory,
      addProduct,
      updateProduct,
      deleteProduct,
      updateDistributor,
      setDemandLevel,
      setRole,
      setDistributor,
      toggleDemoIndicator,
      resetDemo,
      generateRandomLead,
    },
    selectors: {
      getProductById,
      getDistributorById,
      getCurrentDistributor,
      getLeadById,
      getLeadsByStatus,
      getLeadsByDistributor,
      getLeadsByDivision,
      getDistributorsByDivision,
      getProductsByCategory,
      getFeaturedProducts,
      getLeadStats,
    },
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemoState(): DemoContextValue {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoState must be used within a DemoProvider');
  }
  return context;
}

export function useProducts() {
  const { state, selectors, actions } = useDemoState();
  return {
    products: state.products,
    getProductById: selectors.getProductById,
    getProductsByCategory: selectors.getProductsByCategory,
    getFeaturedProducts: selectors.getFeaturedProducts,
    addProduct: actions.addProduct,
    updateProduct: actions.updateProduct,
    deleteProduct: actions.deleteProduct,
  };
}

export function useDistributors() {
  const { state, selectors, actions } = useDemoState();
  return {
    distributors: state.distributors,
    currentDistributorId: state.currentDistributorId,
    getDistributorById: selectors.getDistributorById,
    getCurrentDistributor: selectors.getCurrentDistributor,
    getDistributorsByDivision: selectors.getDistributorsByDivision,
    toggleInventory: actions.toggleInventory,
    updateDistributor: actions.updateDistributor,
    setDistributor: actions.setDistributor,
  };
}

export function useLeads() {
  const { state, selectors, actions } = useDemoState();
  return {
    leads: state.leads,
    getLeadById: selectors.getLeadById,
    getLeadsByStatus: selectors.getLeadsByStatus,
    getLeadsByDistributor: selectors.getLeadsByDistributor,
    getLeadsByDivision: selectors.getLeadsByDivision,
    getLeadStats: selectors.getLeadStats,
    createLead: actions.createLead,
    updateLeadStatus: actions.updateLeadStatus,
    generateRandomLead: actions.generateRandomLead,
  };
}

export function useDemoControls() {
  const { state, actions } = useDemoState();
  return {
    currentRole: state.currentRole,
    currentUser: state.currentUser,
    demandLevel: state.demandLevel,
    setRole: actions.setRole,
    setDemandLevel: actions.setDemandLevel,
    resetDemo: actions.resetDemo,
    generateRandomLead: actions.generateRandomLead,
  };
}

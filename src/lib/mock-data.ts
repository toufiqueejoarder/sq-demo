import type {
  Product,
  Distributor,
  Lead,
  Category,
  BangladeshDivision,
  LeadStatus,
  User,
} from '../types';

const categories: Category[] = [
  'Power Transformers',
  'Distribution Transformers',
  'Industrial Cables',
  'Control Cables',
  'Switchgear',
  'Protection Systems',
];

const productImages: Record<string, string[]> = {
  'Power Transformers': [
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    'https://images.unsplash.com/photo-1413882353314-73389f63b6fd?w=800',
    'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800',
  ],
  'Distribution Transformers': [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=800',
    'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800',
  ],
  'Industrial Cables': [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    'https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?w=800',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
  ],
  'Control Cables': [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
  ],
  'Switchgear': [
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
    'https://images.unsplash.com/photo-1558346547-4439467bd1d5?w=800',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
  ],
  'Protection Systems': [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800',
  ],
};

export const mockProducts: Product[] = [
  // Power Transformers (4)
  {
    id: 'prod-001',
    name: 'PT-5000 Power Transformer',
    sku: 'PT-5000-A',
    category: 'Power Transformers',
    description: 'High-capacity power transformer designed for industrial substations. Features oil-immersed cooling and robust fault protection.',
    specifications: {
      'Capacity': '5 MVA',
      'Primary Voltage': '33 kV',
      'Secondary Voltage': '11 kV',
      'Cooling Type': 'ONAN/ONAF',
      'Frequency': '50 Hz',
      'Impedance': '6.5%',
    },
    images: [productImages['Power Transformers'][0]],
    priceRange: { min: 2500000, max: 3200000 },
    inStock: true,
    featured: true,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'prod-002',
    name: 'PT-10000 Heavy Duty Transformer',
    sku: 'PT-10000-B',
    category: 'Power Transformers',
    description: 'Ultra-high capacity transformer for large-scale power distribution networks and heavy industrial applications.',
    specifications: {
      'Capacity': '10 MVA',
      'Primary Voltage': '66 kV',
      'Secondary Voltage': '11 kV',
      'Cooling Type': 'ONAN/ONAF/OFAF',
      'Frequency': '50 Hz',
      'Impedance': '7.5%',
    },
    images: [productImages['Power Transformers'][1]],
    priceRange: { min: 4500000, max: 5800000 },
    inStock: true,
    featured: true,
    createdAt: '2024-02-10T00:00:00Z',
  },
  {
    id: 'prod-003',
    name: 'PT-2500 Compact Power Transformer',
    sku: 'PT-2500-C',
    category: 'Power Transformers',
    description: 'Compact design power transformer ideal for space-constrained installations with full protection features.',
    specifications: {
      'Capacity': '2.5 MVA',
      'Primary Voltage': '33 kV',
      'Secondary Voltage': '6.6 kV',
      'Cooling Type': 'ONAN',
      'Frequency': '50 Hz',
      'Impedance': '5.5%',
    },
    images: [productImages['Power Transformers'][2]],
    priceRange: { min: 1800000, max: 2200000 },
    inStock: false,
    featured: false,
    createdAt: '2024-03-05T00:00:00Z',
  },
  {
    id: 'prod-004',
    name: 'PT-7500 Industrial Transformer',
    sku: 'PT-7500-D',
    category: 'Power Transformers',
    description: 'Medium-high capacity transformer with advanced monitoring systems for industrial power requirements.',
    specifications: {
      'Capacity': '7.5 MVA',
      'Primary Voltage': '33 kV',
      'Secondary Voltage': '11 kV',
      'Cooling Type': 'ONAN/ONAF',
      'Frequency': '50 Hz',
      'Impedance': '7%',
    },
    images: [productImages['Power Transformers'][3]],
    priceRange: { min: 3500000, max: 4200000 },
    inStock: true,
    featured: false,
    createdAt: '2024-01-20T00:00:00Z',
  },

  // Distribution Transformers (4)
  {
    id: 'prod-005',
    name: 'DT-500 Distribution Transformer',
    sku: 'DT-500-A',
    category: 'Distribution Transformers',
    description: 'Reliable pole-mounted distribution transformer for urban and rural electrification projects.',
    specifications: {
      'Capacity': '500 kVA',
      'Primary Voltage': '11 kV',
      'Secondary Voltage': '400 V',
      'Cooling Type': 'ONAN',
      'Frequency': '50 Hz',
      'Vector Group': 'Dyn11',
    },
    images: [productImages['Distribution Transformers'][0]],
    priceRange: { min: 350000, max: 450000 },
    inStock: true,
    featured: true,
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'prod-006',
    name: 'DT-1000 High Capacity Distribution',
    sku: 'DT-1000-B',
    category: 'Distribution Transformers',
    description: 'Ground-mounted distribution transformer for commercial complexes and industrial estates.',
    specifications: {
      'Capacity': '1000 kVA',
      'Primary Voltage': '11 kV',
      'Secondary Voltage': '400 V',
      'Cooling Type': 'ONAN',
      'Frequency': '50 Hz',
      'Vector Group': 'Dyn11',
    },
    images: [productImages['Distribution Transformers'][1]],
    priceRange: { min: 550000, max: 700000 },
    inStock: true,
    featured: false,
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'prod-007',
    name: 'DT-250 Compact Distribution',
    sku: 'DT-250-C',
    category: 'Distribution Transformers',
    description: 'Compact pole-mounted transformer for residential areas and light commercial use.',
    specifications: {
      'Capacity': '250 kVA',
      'Primary Voltage': '11 kV',
      'Secondary Voltage': '400 V',
      'Cooling Type': 'ONAN',
      'Frequency': '50 Hz',
      'Vector Group': 'Dyn11',
    },
    images: [productImages['Distribution Transformers'][2]],
    priceRange: { min: 200000, max: 280000 },
    inStock: true,
    featured: false,
    createdAt: '2024-03-10T00:00:00Z',
  },
  {
    id: 'prod-008',
    name: 'DT-2000 Heavy Distribution',
    sku: 'DT-2000-D',
    category: 'Distribution Transformers',
    description: 'High-capacity distribution transformer for industrial zones and large commercial facilities.',
    specifications: {
      'Capacity': '2000 kVA',
      'Primary Voltage': '11 kV',
      'Secondary Voltage': '400 V',
      'Cooling Type': 'ONAN/ONAF',
      'Frequency': '50 Hz',
      'Vector Group': 'Dyn11',
    },
    images: [productImages['Distribution Transformers'][3]],
    priceRange: { min: 850000, max: 1100000 },
    inStock: false,
    featured: false,
    createdAt: '2024-01-25T00:00:00Z',
  },

  // Industrial Cables (3)
  {
    id: 'prod-009',
    name: 'IC-HV33 High Voltage Cable',
    sku: 'IC-HV33-A',
    category: 'Industrial Cables',
    description: 'XLPE insulated high voltage power cable for underground transmission networks.',
    specifications: {
      'Voltage Rating': '33 kV',
      'Conductor': 'Copper/Aluminum',
      'Insulation': 'XLPE',
      'Cross Section': '185-630 sq.mm',
      'Standard': 'IEC 60502-2',
    },
    images: [productImages['Industrial Cables'][0]],
    priceRange: { min: 2500, max: 8500 },
    inStock: true,
    featured: false,
    createdAt: '2024-02-20T00:00:00Z',
  },
  {
    id: 'prod-010',
    name: 'IC-MV11 Medium Voltage Cable',
    sku: 'IC-MV11-B',
    category: 'Industrial Cables',
    description: 'Medium voltage power cable with robust armoring for industrial installations.',
    specifications: {
      'Voltage Rating': '11 kV',
      'Conductor': 'Copper/Aluminum',
      'Insulation': 'XLPE',
      'Cross Section': '25-400 sq.mm',
      'Standard': 'IEC 60502-2',
    },
    images: [productImages['Industrial Cables'][1]],
    priceRange: { min: 800, max: 3500 },
    inStock: true,
    featured: true,
    createdAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'prod-011',
    name: 'IC-LV Multi-Core Power Cable',
    sku: 'IC-LV-C',
    category: 'Industrial Cables',
    description: 'Low voltage multi-core armored cable for industrial power distribution.',
    specifications: {
      'Voltage Rating': '0.6/1 kV',
      'Conductor': 'Copper',
      'Insulation': 'PVC/XLPE',
      'Cores': '2-5 Core',
      'Standard': 'IEC 60502-1',
    },
    images: [productImages['Industrial Cables'][2]],
    priceRange: { min: 150, max: 1200 },
    inStock: true,
    featured: false,
    createdAt: '2024-02-25T00:00:00Z',
  },

  // Control Cables (3)
  {
    id: 'prod-012',
    name: 'CC-INST Instrumentation Cable',
    sku: 'CC-INST-A',
    category: 'Control Cables',
    description: 'Shielded instrumentation cable for process control and SCADA systems.',
    specifications: {
      'Voltage Rating': '300/500 V',
      'Conductor': 'Copper',
      'Shielding': 'Individual & Overall',
      'Pairs': '1-24 Pairs',
      'Standard': 'IEC 60227',
    },
    images: [productImages['Control Cables'][0]],
    priceRange: { min: 120, max: 850 },
    inStock: true,
    featured: false,
    createdAt: '2024-01-30T00:00:00Z',
  },
  {
    id: 'prod-013',
    name: 'CC-CTRL Multi-Core Control Cable',
    sku: 'CC-CTRL-B',
    category: 'Control Cables',
    description: 'Multi-core control cable for relay protection and motor control circuits.',
    specifications: {
      'Voltage Rating': '0.6/1 kV',
      'Conductor': 'Copper',
      'Insulation': 'PVC',
      'Cores': '2-37 Core',
      'Standard': 'IEC 60502-1',
    },
    images: [productImages['Control Cables'][1]],
    priceRange: { min: 80, max: 600 },
    inStock: true,
    featured: false,
    createdAt: '2024-02-05T00:00:00Z',
  },
  {
    id: 'prod-014',
    name: 'CC-FIRE Fire Resistant Control Cable',
    sku: 'CC-FIRE-C',
    category: 'Control Cables',
    description: 'Fire-resistant control cable for emergency systems and critical applications.',
    specifications: {
      'Voltage Rating': '0.6/1 kV',
      'Conductor': 'Copper',
      'Insulation': 'Mica + XLPE',
      'Fire Rating': 'IEC 60331',
      'Cores': '2-19 Core',
    },
    images: [productImages['Control Cables'][2]],
    priceRange: { min: 250, max: 1500 },
    inStock: false,
    featured: false,
    createdAt: '2024-03-15T00:00:00Z',
  },

  // Switchgear (3)
  {
    id: 'prod-015',
    name: 'SG-MV11 Medium Voltage Switchgear',
    sku: 'SG-MV11-A',
    category: 'Switchgear',
    description: 'Metal-clad medium voltage switchgear panel for industrial and utility substations.',
    specifications: {
      'Voltage Rating': '11 kV',
      'Current Rating': '630-2500 A',
      'Breaking Capacity': '25 kA',
      'Type': 'Vacuum/SF6',
      'Standard': 'IEC 62271',
    },
    images: [productImages['Switchgear'][0]],
    priceRange: { min: 1200000, max: 1800000 },
    inStock: true,
    featured: true,
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'prod-016',
    name: 'SG-LV Main Distribution Board',
    sku: 'SG-LV-B',
    category: 'Switchgear',
    description: 'Low voltage main distribution board with comprehensive protection features.',
    specifications: {
      'Voltage Rating': '415 V',
      'Current Rating': '400-4000 A',
      'Short Circuit': '50-100 kA',
      'IP Rating': 'IP54',
      'Standard': 'IEC 61439',
    },
    images: [productImages['Switchgear'][1]],
    priceRange: { min: 180000, max: 450000 },
    inStock: true,
    featured: false,
    createdAt: '2024-02-08T00:00:00Z',
  },
  {
    id: 'prod-017',
    name: 'SG-RMU Ring Main Unit',
    sku: 'SG-RMU-C',
    category: 'Switchgear',
    description: 'Compact ring main unit for underground distribution network applications.',
    specifications: {
      'Voltage Rating': '11-33 kV',
      'Current Rating': '630 A',
      'Configuration': '3-way/4-way',
      'Insulation': 'SF6/Solid',
      'Standard': 'IEC 62271-200',
    },
    images: [productImages['Switchgear'][2]],
    priceRange: { min: 650000, max: 950000 },
    inStock: true,
    featured: false,
    createdAt: '2024-03-08T00:00:00Z',
  },

  // Protection Systems (3)
  {
    id: 'prod-018',
    name: 'PS-REL Numerical Protection Relay',
    sku: 'PS-REL-A',
    category: 'Protection Systems',
    description: 'Multi-function numerical protection relay for transformer and feeder protection.',
    specifications: {
      'Functions': 'OC/EF/Differential',
      'Communication': 'IEC 61850',
      'Inputs': '8 CT, 4 VT',
      'Outputs': '8 Trip, 4 Alarm',
      'Display': 'LCD with LED indicators',
    },
    images: [productImages['Protection Systems'][0]],
    priceRange: { min: 85000, max: 150000 },
    inStock: true,
    featured: false,
    createdAt: '2024-01-18T00:00:00Z',
  },
  {
    id: 'prod-019',
    name: 'PS-SCADA RTU Controller',
    sku: 'PS-SCADA-B',
    category: 'Protection Systems',
    description: 'Remote terminal unit for substation automation and SCADA integration.',
    specifications: {
      'Protocol': 'IEC 60870-5-104/DNP3',
      'I/O Points': '64 DI, 32 DO, 16 AI',
      'Communication': 'Ethernet, Serial',
      'Power Supply': '24-220 VDC',
      'Operating Temp': '-25 to 70°C',
    },
    images: [productImages['Protection Systems'][1]],
    priceRange: { min: 120000, max: 220000 },
    inStock: true,
    featured: true,
    createdAt: '2024-02-12T00:00:00Z',
  },
  {
    id: 'prod-020',
    name: 'PS-ARC Arc Flash Protection',
    sku: 'PS-ARC-C',
    category: 'Protection Systems',
    description: 'High-speed arc flash detection and protection system for switchgear safety.',
    specifications: {
      'Detection Time': '<1 ms',
      'Trip Time': '<50 ms total',
      'Sensors': 'Optical + Current',
      'Zones': 'Up to 8',
      'Standard': 'IEEE 1584',
    },
    images: [productImages['Protection Systems'][2]],
    priceRange: { min: 180000, max: 280000 },
    inStock: false,
    featured: false,
    createdAt: '2024-03-12T00:00:00Z',
  },
];

export const mockDistributors: Distributor[] = [
  {
    id: 'dist-001',
    name: 'PowerTech Solutions Ltd',
    contactPerson: 'Mohammad Rahman',
    email: 'info@powertech-bd.com',
    phone: '+880-2-8123456',
    address: '45 Motijheel Commercial Area, Dhaka 1000',
    division: 'Dhaka',
    district: 'Dhaka',
    location: { lat: 23.8103, lng: 90.4125 },
    coverageArea: ['Dhaka', 'Gazipur', 'Narayanganj', 'Manikganj'],
    inventory: mockProducts.map((p) => ({ productId: p.id, available: p.inStock })),
    isActive: true,
    createdAt: '2023-06-15T00:00:00Z',
  },
  {
    id: 'dist-002',
    name: 'Chittagong Electrical Corp',
    contactPerson: 'Anisur Haque',
    email: 'sales@ctgelectric.com',
    phone: '+880-31-2567890',
    address: '78 Agrabad Commercial Area, Chittagong 4100',
    division: 'Chittagong',
    district: 'Chittagong',
    location: { lat: 22.3569, lng: 91.7832 },
    coverageArea: ['Chittagong', "Cox's Bazar", 'Comilla', 'Feni'],
    inventory: mockProducts.map((p) => ({ productId: p.id, available: Math.random() > 0.3 })),
    isActive: true,
    createdAt: '2023-07-20T00:00:00Z',
  },
  {
    id: 'dist-003',
    name: 'Southern Power Distribution',
    contactPerson: 'Khalid Hassan',
    email: 'contact@southernpower.com.bd',
    phone: '+880-41-2345678',
    address: '23 KDA Avenue, Khulna 9100',
    division: 'Khulna',
    district: 'Khulna',
    location: { lat: 22.8456, lng: 89.5403 },
    coverageArea: ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat'],
    inventory: mockProducts.map((p) => ({ productId: p.id, available: Math.random() > 0.4 })),
    isActive: true,
    createdAt: '2023-08-10T00:00:00Z',
  },
  {
    id: 'dist-004',
    name: 'Sylhet Energy Systems',
    contactPerson: 'Rafiqul Islam',
    email: 'info@sylhetenergy.com',
    phone: '+880-821-2789012',
    address: '56 Zindabazar, Sylhet 3100',
    division: 'Sylhet',
    district: 'Sylhet',
    location: { lat: 24.8949, lng: 91.8687 },
    coverageArea: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
    inventory: mockProducts.map((p) => ({ productId: p.id, available: Math.random() > 0.35 })),
    isActive: true,
    createdAt: '2023-09-05T00:00:00Z',
  },
  {
    id: 'dist-005',
    name: 'Rajshahi Industrial Suppliers',
    contactPerson: 'Nurul Amin',
    email: 'sales@rajshahiindustrial.com',
    phone: '+880-721-2456789',
    address: '89 Saheb Bazar, Rajshahi 6000',
    division: 'Rajshahi',
    district: 'Rajshahi',
    location: { lat: 24.3745, lng: 88.6042 },
    coverageArea: ['Rajshahi', 'Natore', 'Naogaon', 'Chapainawabganj'],
    inventory: mockProducts.map((p) => ({ productId: p.id, available: Math.random() > 0.45 })),
    isActive: true,
    createdAt: '2023-10-12T00:00:00Z',
  },
  {
    id: 'dist-006',
    name: 'Barisal Power & Cable Co',
    contactPerson: 'Fazlul Karim',
    email: 'info@barisalpower.com',
    phone: '+880-431-2567123',
    address: '34 Sadar Road, Barisal 8200',
    division: 'Barisal',
    district: 'Barisal',
    location: { lat: 22.7010, lng: 90.3535 },
    coverageArea: ['Barisal', 'Patuakhali', 'Bhola', 'Pirojpur'],
    inventory: mockProducts.map((p) => ({ productId: p.id, available: Math.random() > 0.5 })),
    isActive: true,
    createdAt: '2023-11-08T00:00:00Z',
  },
  {
    id: 'dist-007',
    name: 'Northern Electrical Trading',
    contactPerson: 'Shahidul Alam',
    email: 'contact@northernelectrical.com.bd',
    phone: '+880-521-2678901',
    address: '67 Station Road, Rangpur 5400',
    division: 'Rangpur',
    district: 'Rangpur',
    location: { lat: 25.7439, lng: 89.2752 },
    coverageArea: ['Rangpur', 'Dinajpur', 'Kurigram', 'Lalmonirhat'],
    inventory: mockProducts.map((p) => ({ productId: p.id, available: Math.random() > 0.4 })),
    isActive: true,
    createdAt: '2023-12-01T00:00:00Z',
  },
  {
    id: 'dist-008',
    name: 'Mymensingh Power Solutions',
    contactPerson: 'Aminul Haque',
    email: 'sales@mymensinghpower.com',
    phone: '+880-91-2345678',
    address: '12 Town Hall Road, Mymensingh 2200',
    division: 'Mymensingh',
    district: 'Mymensingh',
    location: { lat: 24.7471, lng: 90.4203 },
    coverageArea: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'],
    inventory: mockProducts.map((p) => ({ productId: p.id, available: Math.random() > 0.35 })),
    isActive: true,
    createdAt: '2024-01-05T00:00:00Z',
  },
];

const divisions: BangladeshDivision[] = [
  'Dhaka',
  'Chittagong',
  'Khulna',
  'Sylhet',
  'Rajshahi',
  'Barisal',
  'Rangpur',
  'Mymensingh',
];

const leadStatuses: LeadStatus[] = ['new', 'assigned', 'contacted', 'qualified', 'converted', 'lost'];

const companyNames = [
  'Bengal Industries Ltd',
  'Delta Textiles',
  'Grameen Steel Works',
  'Meghna Cement',
  'Padma Oil Company',
  'Rupayan Housing',
  'Navana Group',
  'BSRM Steel',
  'Bashundhara Group',
  'Akij Group',
  'Partex Group',
  'PHP Group',
  'City Group',
  'Ha-Meem Group',
  'Pran-RFL Group',
  'Square Group',
  'Beximco',
  'Walton Group',
  'ACI Limited',
  'Transcom Group',
];

const customerNames = [
  'Kamal Hossain',
  'Fatima Begum',
  'Abdul Karim',
  'Nasreen Akhter',
  'Jahangir Alam',
  'Sultana Razia',
  'Mizanur Rahman',
  'Tahmina Islam',
  'Shafiqul Haque',
  'Ayesha Siddika',
  'Mahbubur Rahman',
  'Sharmin Sultana',
  'Golam Mostafa',
  'Roksana Parvin',
  'Zahirul Islam',
  'Monira Khatun',
  'Shamsul Alam',
  'Nasima Begum',
  'Delwar Hossain',
  'Sabina Yasmin',
];

function generateLeads(): Lead[] {
  const leads: Lead[] = [];
  const now = new Date();

  for (let i = 0; i < 20; i++) {
    const division = divisions[i % divisions.length];
    const product = mockProducts[i % mockProducts.length];
    const status = leadStatuses[Math.floor(Math.random() * leadStatuses.length)];
    const assignedDistributor = status !== 'new' 
      ? mockDistributors.find((d) => d.division === division)?.id || null
      : null;

    const createdDate = new Date(now);
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30));

    const updatedDate = new Date(createdDate);
    updatedDate.setDate(updatedDate.getDate() + Math.floor(Math.random() * 5));

    leads.push({
      id: `lead-${String(i + 1).padStart(3, '0')}`,
      productId: product.id,
      customerName: customerNames[i],
      companyName: companyNames[i],
      email: `${customerNames[i].toLowerCase().replace(' ', '.')}@${companyNames[i].toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+880-1${Math.floor(Math.random() * 9) + 1}-${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`,
      division,
      district: division,
      quantity: Math.floor(Math.random() * 10) + 1,
      message: `Interested in ${product.name} for our ${['new project', 'expansion', 'upgrade', 'replacement'][Math.floor(Math.random() * 4)]}. Please provide quotation and delivery timeline.`,
      status,
      assignedDistributorId: assignedDistributor,
      priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as Lead['priority'],
      createdAt: createdDate.toISOString(),
      updatedAt: updatedDate.toISOString(),
    });
  }

  return leads;
}

export const mockLeads: Lead[] = generateLeads();

export const mockUsers: Record<string, User> = {
  admin: {
    id: 'user-admin',
    name: 'Admin User',
    email: 'admin@sq-demo.com',
    role: 'admin',
  },
  distributor: {
    id: 'user-dist',
    name: 'Distributor User',
    email: 'distributor@powertech-bd.com',
    role: 'distributor',
    distributorId: 'dist-001',
  },
  public: {
    id: 'user-public',
    name: 'Guest User',
    email: 'guest@example.com',
    role: 'public',
  },
};

export const categoryList: Category[] = categories;

export const divisionList: BangladeshDivision[] = divisions;

export interface DemandHeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

export const demandHeatmapData: DemandHeatmapPoint[] = [
  // Dhaka Division - High industrial activity
  { lat: 23.8103, lng: 90.4125, intensity: 0.95 },
  { lat: 23.7806, lng: 90.3492, intensity: 0.88 },
  { lat: 23.8728, lng: 90.3984, intensity: 0.82 },
  { lat: 23.9322, lng: 90.2876, intensity: 0.75 },
  { lat: 23.7509, lng: 90.4018, intensity: 0.91 },
  { lat: 23.8654, lng: 90.4012, intensity: 0.85 },
  { lat: 23.7283, lng: 90.4186, intensity: 0.78 },
  { lat: 23.9001, lng: 90.4213, intensity: 0.72 },
  // Gazipur industrial zone
  { lat: 23.9908, lng: 90.4272, intensity: 0.89 },
  { lat: 24.0023, lng: 90.4156, intensity: 0.84 },
  { lat: 23.9756, lng: 90.3892, intensity: 0.79 },
  // Narayanganj industrial hub
  { lat: 23.6238, lng: 90.5000, intensity: 0.92 },
  { lat: 23.6145, lng: 90.4876, intensity: 0.86 },
  { lat: 23.6312, lng: 90.5123, intensity: 0.81 },

  // Chittagong Division - Major port and industrial zone
  { lat: 22.3569, lng: 91.7832, intensity: 0.90 },
  { lat: 22.3475, lng: 91.8125, intensity: 0.85 },
  { lat: 22.3678, lng: 91.7654, intensity: 0.82 },
  { lat: 22.3245, lng: 91.8034, intensity: 0.78 },
  { lat: 22.2876, lng: 91.7912, intensity: 0.74 },
  // Chittagong EPZ
  { lat: 22.4123, lng: 91.7689, intensity: 0.88 },
  { lat: 22.4256, lng: 91.7823, intensity: 0.83 },
  // Comilla industrial area
  { lat: 23.4607, lng: 91.1809, intensity: 0.65 },
  { lat: 23.4512, lng: 91.1923, intensity: 0.58 },

  // Khulna Division - Moderate industrial activity
  { lat: 22.8456, lng: 89.5403, intensity: 0.68 },
  { lat: 22.8234, lng: 89.5567, intensity: 0.62 },
  { lat: 22.8678, lng: 89.5234, intensity: 0.58 },
  // Mongla port area
  { lat: 22.4876, lng: 89.5912, intensity: 0.55 },
  { lat: 22.4723, lng: 89.6034, intensity: 0.48 },
  // Jessore industrial
  { lat: 23.1634, lng: 89.2128, intensity: 0.52 },

  // Sylhet Division - Tea and gas industries
  { lat: 24.8949, lng: 91.8687, intensity: 0.58 },
  { lat: 24.8756, lng: 91.8512, intensity: 0.52 },
  { lat: 24.9123, lng: 91.8823, intensity: 0.48 },
  // Habiganj gas field area
  { lat: 24.3750, lng: 91.4167, intensity: 0.62 },
  { lat: 24.3623, lng: 91.4312, intensity: 0.55 },

  // Rajshahi Division - Agricultural and light industry
  { lat: 24.3745, lng: 88.6042, intensity: 0.55 },
  { lat: 24.3612, lng: 88.5876, intensity: 0.48 },
  { lat: 24.3923, lng: 88.6178, intensity: 0.45 },
  // Bogra industrial zone
  { lat: 24.8510, lng: 89.3697, intensity: 0.52 },
  { lat: 24.8623, lng: 89.3812, intensity: 0.46 },

  // Barisal Division - Lower industrial activity
  { lat: 22.7010, lng: 90.3535, intensity: 0.42 },
  { lat: 22.6876, lng: 90.3678, intensity: 0.38 },
  { lat: 22.7145, lng: 90.3412, intensity: 0.35 },
  // Patuakhali
  { lat: 22.3596, lng: 90.3298, intensity: 0.32 },

  // Rangpur Division - Agricultural region
  { lat: 25.7439, lng: 89.2752, intensity: 0.45 },
  { lat: 25.7312, lng: 89.2623, intensity: 0.40 },
  { lat: 25.7567, lng: 89.2889, intensity: 0.38 },
  // Dinajpur
  { lat: 25.6217, lng: 88.6354, intensity: 0.42 },
  { lat: 25.6089, lng: 88.6478, intensity: 0.36 },

  // Mymensingh Division - Emerging industrial zone
  { lat: 24.7471, lng: 90.4203, intensity: 0.55 },
  { lat: 24.7312, lng: 90.4089, intensity: 0.48 },
  { lat: 24.7623, lng: 90.4312, intensity: 0.45 },
  // Jamalpur
  { lat: 24.9375, lng: 89.9376, intensity: 0.42 },
  { lat: 24.9234, lng: 89.9512, intensity: 0.38 },

  // Additional industrial clusters
  // Tongi industrial area
  { lat: 23.8817, lng: 90.4044, intensity: 0.87 },
  { lat: 23.8923, lng: 90.3912, intensity: 0.82 },
  // Savar EPZ
  { lat: 23.8585, lng: 90.2665, intensity: 0.85 },
  { lat: 23.8467, lng: 90.2789, intensity: 0.79 },
  // Ashulia garment hub
  { lat: 23.8967, lng: 90.3489, intensity: 0.83 },
  { lat: 23.9078, lng: 90.3367, intensity: 0.77 },
  // Kaliakair industrial
  { lat: 24.0742, lng: 90.2209, intensity: 0.72 },
  { lat: 24.0856, lng: 90.2345, intensity: 0.65 },
  // Munshiganj industrial
  { lat: 23.5422, lng: 90.5305, intensity: 0.68 },
  { lat: 23.5534, lng: 90.5423, intensity: 0.62 },
];

export function getDemandHeatmapByLevel(level: 'low' | 'medium' | 'high'): DemandHeatmapPoint[] {
  const multiplier = level === 'high' ? 1.2 : level === 'low' ? 0.6 : 1;
  return demandHeatmapData.map((point) => ({
    ...point,
    intensity: Math.min(1, point.intensity * multiplier),
  }));
}

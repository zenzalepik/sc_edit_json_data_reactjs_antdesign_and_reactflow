// src/nodes-edges.js

export const nodes = [
  { id: '197', data: { name: 'Andi Baik Hati', position: 'CEO' }, position: { x: 250, y: 0 }, type: 'custom' },
  { id: '2', data: { name: 'Budi Pengertian', position: 'CTO' }, position: { x: 100, y: 160 }, type: 'custom' },
  { id: '3', data: { name: 'Bayu Pemberani', position: 'CFO' }, position: { x: 400, y: 160 }, type: 'custom' },
  { id: '4', data: { name: 'Jono Rendah Hati', position: 'Dev Team' }, position: { x: 100, y: 320 }, type: 'custom' },
  { id: '5', data: { name: 'Rudi Tidak Banyak Bicara', position: 'Finance Team' }, position: { x: 400, y: 320 }, type: 'custom' },
  { id: '6', data: { name: 'Kaka Ja', position: 'CEO' }, position: { x: 250, y: 0 }, type: 'custom' },
  { id: '7', data: { name: 'Banu', position: 'CTO' }, position: { x: 100, y: 160 }, type: 'custom' },
  { id: '8', data: { name: 'Pambudi', position: 'CFO' }, position: { x: 400, y: 160 }, type: 'custom' },
  { id: '9', data: { name: 'Irfan', position: 'Dev Team' }, position: { x: 100, y: 320 }, type: 'custom' },
  { id: '10', data: { name: 'Parmudi', position: 'Finance Team' }, position: { x: 400, y: 320 }, type: 'custom' },
];

export const edges = [
  { id: 'e197-2', source: '197', target: '2', type: 'smoothstep' },  // CEO -> CTO
  { id: 'e1-3', source: '197', target: '3', type: 'smoothstep' },  // CEO -> CFO
  { id: 'e3-4', source: '3', target: '4', type: 'smoothstep' },  // CFO -> Dev Team (mengubah dari e2-4 menjadi e3-4)
  { id: 'e3-5', source: '3', target: '5', type: 'smoothstep' },  // CFO -> Finance Team
  { id: 'e197-6', source: '197', target: '6', type: 'smoothstep' },  // CEO -> CFO
  { id: 'e3-7', source: '3', target: '7', type: 'smoothstep' },  // CFO -> Dev Team (mengubah dari e2-4 menjadi e3-4)
  { id: 'e3-8', source: '3', target: '8', type: 'smoothstep' },  // CFO -> Finance Team
  { id: 'e197-9', source: '197', target: '9', type: 'smoothstep' },  // CEO -> CFO
  { id: 'e3-10', source: '3', target: '10', type: 'smoothstep' },  // CFO -> Dev Team (mengubah dari e2-4 menjadi e3-4)
];

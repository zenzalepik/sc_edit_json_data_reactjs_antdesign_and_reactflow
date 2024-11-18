// OrgChart.js
import React from 'react';
import { ReactFlow, MiniMap, Controls, Background } from '@xyflow/react';
import { nodes, edges } from '../nodes-edges'; // Menggunakan data nodes dan edges dari file yang sama

const OrgChart = () => {
  // Nodes dan edges diambil langsung dari data yang sudah ada
  const flowNodes = nodes.map((node) => ({
    id: node.id,
    data: { label: `${node.data.name} (${node.data.position})` },
    position: { x: Math.random() * 300, y: Math.random() * 300 }, // Mengacak posisi awal
    style: {
      padding: 10,
      borderRadius: 5,
      background: '#fff',
      border: '1px solid #ddd',
      width: 200,
    },
  }));

  const flowEdges = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: true,
    style: { stroke: '#777' },
  }));

  return (
    <div style={{ height: '500px', border: '1px solid #ddd', marginTop: '20px' }}>
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={{}} // Anda bisa menambahkan tipe node khusus di sini jika perlu
        style={{ width: '100%', height: '100%' }}
      >
        {/* MiniMap */}
        <MiniMap />
        {/* Controls */}
        <Controls />
        {/* Background */}
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default OrgChart;

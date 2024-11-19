//src/form/OrgChartApp.js
import React, { useState, useEffect } from 'react';
import { ReactFlowProvider, ReactFlow, MiniMap, Controls, Handle, Background } from '@xyflow/react'; // Import komponen dari @xyflow/react
import { nodes as initialNodes, edges as initialEdges } from '../nodes-edges'; // Import data nodes dan edges
import { Button, message } from 'antd';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre'; // Import dagre untuk auto-layout

// Fungsi untuk menerapkan auto-layout menggunakan dagre
const getLayoutedElements = (nodes, edges) => {
  const graph = new dagre.graphlib.Graph();

  graph.setGraph({});
  graph.setDefaultEdgeLabel(() => ({}));

  // Menambahkan node ke graph
  nodes.forEach((node) => {
    graph.setNode(node.id, { width: 172, height: 120 }); // Tentukan ukuran node
  });

  // Menambahkan edges ke graph
  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  // Mengatur layout otomatis menggunakan dagre
  dagre.layout(graph);

  // Menata ulang posisi nodes berdasarkan layout yang dihitung
  nodes = nodes.map((node) => {
    const nodeWithPosition = graph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - 172 / 2, // Menggeser agar node di tengah
      y: nodeWithPosition.y - 36 / 2,
    };
    return node;
  });

  return { nodes, edges };
};

const OrgChartApp = () => {
  const [nodes, setNodes] = useState(initialNodes); // State untuk nodes
  const [edges, setEdges] = useState(initialEdges); // State untuk edges
  
  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [nodes, edges]); // Setiap kali nodes atau edges berubah, jalankan layout ulang

  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh', width: '100vw' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{ custom: CustomNode }} // Menggunakan custom node
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

// Komponen custom node dengan handle
const CustomNode = ({ data, isConnectable }) => {
  return (
    <div style={{
      padding: '10px',
      border: '2px solid black',
      borderRadius: '5px',
      backgroundColor: '#f0f0f0',
      textAlign: 'center',
      position: 'relative'
    }}>
      <strong>{data.name}</strong>
      <div>{data.position}</div>

      {/* Handle untuk koneksi (atas) */}
      <Handle
        type="target" // Handle sebagai source (untuk memulai koneksi)
        position="top" // Tempatkan handle di atas node
        style={{
          left: '50%', // Menempatkan handle di tengah horizontal
          // transform: 'translateX(-50%)', // Mengubah posisi agar berada tepat di tengah
          background: '#555',
        }}
        isConnectable={isConnectable} // Mengaktifkan koneksi
      />
      
      {/* Handle untuk koneksi (bawah) */}
      <Handle
        type="source" // Handle sebagai target (untuk menerima koneksi)
        position="bottom" // Tempatkan handle di bawah node
        style={{
          left: '50%', // Menempatkan handle di tengah horizontal
          // transform: 'translateX(-50%)', // Mengubah posisi agar berada tepat di tengah
          background: '#555',
        }}
        isConnectable={isConnectable} // Mengaktifkan koneksi
      />
    </div>
  );
};

export default OrgChartApp;

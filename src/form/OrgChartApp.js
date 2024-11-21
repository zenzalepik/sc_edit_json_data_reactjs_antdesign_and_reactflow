//src/form/OrgChartApp.js
import React, { useState, useEffect, useRef } from 'react';
import { ReactFlowProvider, ReactFlow, MiniMap, Controls, Handle, Background } from '@xyflow/react'; // Import komponen dari @xyflow/react
// import { nodes as initialNodes, edges as initialEdges } from '../data/nodes-edges'; // Import data nodes dan edges
import { Button, message, Slider } from 'antd';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre'; // Import dagre untuk auto-layout
import {getLayoutedElements} from './Layout';
import AddEmployeeModal from './AddEmployeeModal'; // Import modal
import html2canvas from 'html2canvas'; // Import html2canvas
import { useOrgChartContext } from '../state/OrgChartContext'; // Impor context

const OrgChartApp = ({   }) => {
  const {reactFlowWrapper,nodes, edges, setNodes, setEdges, onAddEmployee}= useOrgChartContext();
  // const [nodes, setNodes] = useState(initialNodes); // State untuk nodes
  // const [edges, setEdges] = useState(initialEdges); // State untuk edges
  const layoutApplied = useRef(false); // Ref untuk menyimpan apakah layout sudah diterapkan
  // const reactFlowWrapper = useRef(null);  // Referensi wrapper untuk ReactFlow

  const [scale, setScale] = useState(1);  // State untuk mengatur skala gambar

  // Fungsi untuk menangani penambahan karyawan
  const handleAddEmployee = (newEmployeeNode, newEdge) => {
    const updatedNodes = [...nodes, newEmployeeNode]; // Menambahkan node baru
    const updatedEdges = newEdge ? [...edges, newEdge] : edges; // Menambahkan edge jika ada
    
    // Update state nodes dan edges
    setNodes(updatedNodes);
    setEdges(updatedEdges);

    // Menjalankan auto layout setelah penambahan karyawan
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(updatedNodes, updatedEdges);
    setNodes(layoutedNodes); // Update posisi nodes
    setEdges(layoutedEdges); // Update posisi edges

    // Menjalankan auto layout hanya sekali setelah penambahan
    if (!layoutApplied.current) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(updatedNodes, updatedEdges);
      setNodes(layoutedNodes); // Update posisi nodes
      setEdges(layoutedEdges); // Update posisi edges
      layoutApplied.current = true; // Tandai bahwa layout telah diterapkan
    }
  };

  useEffect(() => {
    // Layouting otomatis hanya jika belum diterapkan
    if (!layoutApplied.current) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      layoutApplied.current = true; // Tandai bahwa layout telah diterapkan
    }
  }, [nodes, edges]);
  
  // Fungsi untuk mengekspor gambar menggunakan html2canvas
  const downloadImage = () => {
    if (!reactFlowWrapper.current) return;
  
    // Gunakan html2canvas untuk menangkap konten dengan peningkatan resolusi
    html2canvas(reactFlowWrapper.current, {
      scale: 2, // Menetapkan skala 2x untuk meningkatkan resolusi
    }).then((canvas) => {
      // Konversi canvas menjadi data URL (PNG)
      const image = canvas.toDataURL('image/png');
  
      // Buat elemen anchor untuk mengunduh gambar
      const link = document.createElement('a');
      link.href = image;
      link.download = 'org-chart.png'; // Nama file yang akan diunduh
      link.click();
    }).catch((err) => {
      message.error('Gagal mengekspor gambar');
    });
  };
  

  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh', width: '100vw' }} ref={reactFlowWrapper}>
        {/* Komponen AddEmployeeModal yang menampilkan tombol dan modal */}
        <AddEmployeeModal onAddEmployee={handleAddEmployee} />
        <div>
        {/* Slider untuk memilih skala (resolusi) gambar */}
        <Slider
          min={1}
          max={4}
          step={0.1}
          value={scale}
          onChange={setScale}
          tooltipVisible
          style={{ width: 200 }}
        />
        <span>Scale: {scale}x</span>
      </div>
        <Button
          type="primary"
          onClick={downloadImage}
          style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}
        >
          Download Image
        </Button>
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
  console.log('Rendering CustomNode:', data.name); // Cek render node
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
          transform: 'translateX(-50%)', // Mengubah posisi agar berada tepat di tengah
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
          transform: 'translateX(-50%)', // Mengubah posisi agar berada tepat di tengah
          background: '#555',
        }}
        isConnectable={isConnectable} // Mengaktifkan koneksi
      />
    </div>
  );
};

export default OrgChartApp;

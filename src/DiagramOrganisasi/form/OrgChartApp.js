//src/form/OrgChartApp.js
import React, { useState, useEffect, useRef } from "react";
import {
  ReactFlowProvider,
  ReactFlow,
  MiniMap,
  Controls,
  Handle,
  Background,
} from "@xyflow/react"; // Import komponen dari @xyflow/react
// import { nodes as initialNodes, edges as initialEdges } from '../data/nodes-edges'; // Import data nodes dan edges
import { Button, message, Slider } from "antd";
import "@xyflow/react/dist/style.css";
import dagre from "dagre"; // Import dagre untuk auto-layout
import { getLayoutedElements } from "./Layout";
import AddEmployeeModal from "./ButtonAddEmployeeModal"; // Import modal
import html2canvas from "html2canvas"; // Import html2canvas
import { useOrgChartContext } from "../state/OrgChartContext"; // Impor context
import ButtonDownload from "./ButtonDownload"; // Import tombol download

const OrgChartApp = ({}) => {
  const { reactFlowWrapper, nodes, edges, setNodes, setEdges, onAddEmployee } =
    useOrgChartContext();
  const layoutApplied = useRef(false); // Ref untuk menyimpan apakah layout sudah diterapkan

  // Fungsi untuk menangani penambahan karyawan
  const handleAddEmployee = (newEmployeeNode, newEdge) => {
    const updatedNodes = [...nodes, newEmployeeNode]; // Menambahkan node baru
    const updatedEdges = newEdge ? [...edges, newEdge] : edges; // Menambahkan edge jika ada

    // Update state nodes dan edges
    setNodes(updatedNodes);
    setEdges(updatedEdges);

    // Menjalankan auto layout setelah penambahan karyawan
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      updatedNodes,
      updatedEdges
    );
    setNodes(layoutedNodes); // Update posisi nodes
    setEdges(layoutedEdges); // Update posisi edges

    // Menjalankan auto layout hanya sekali setelah penambahan
    if (!layoutApplied.current) {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(updatedNodes, updatedEdges);
      setNodes(layoutedNodes); // Update posisi nodes
      setEdges(layoutedEdges); // Update posisi edges
      layoutApplied.current = true; // Tandai bahwa layout telah diterapkan
    }
  };

  useEffect(() => {
    // Layouting otomatis hanya jika belum diterapkan
    if (!layoutApplied.current) {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      layoutApplied.current = true; // Tandai bahwa layout telah diterapkan
    }
  }, [nodes, edges]);

  return (
    <ReactFlowProvider>
      <div style={{ height: "100vh", width: "100vw" }} ref={reactFlowWrapper}>
        <AddEmployeeModal onAddEmployee={handleAddEmployee} />
        <ButtonDownload reactFlowWrapper={reactFlowWrapper} />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{ custom: CustomNode }} // Menggunakan custom node
          className="c_diagram_struktur_organisasi"
        >
          <Controls className="c_no_download" />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

// Komponen custom node dengan handle
const CustomNode = ({ data, isConnectable }) => {
  console.log("Rendering CustomNode:", data.name); // Cek render node
  return (
    <div
      style={{
        padding: "10px",
        border: "2px solid black",
        borderRadius: "5px",
        backgroundColor: "#f0f0f0",
        textAlign: "center",
        position: "relative",
      }}
    >
      <strong>{data.name}</strong>
      <div>{data.position}</div>

      {/* Handle untuk koneksi (atas) */}
      <Handle
        type="target" // Handle sebagai source (untuk memulai koneksi)
        position="top" // Tempatkan handle di atas node
        style={{
          left: "50%", // Menempatkan handle di tengah horizontal
          transform: "translateX(-50%)", // Mengubah posisi agar berada tepat di tengah
          background: "#555",
        }}
        isConnectable={isConnectable} // Mengaktifkan koneksi
      />

      {/* Handle untuk koneksi (bawah) */}
      <Handle
        type="source" // Handle sebagai target (untuk menerima koneksi)
        position="bottom" // Tempatkan handle di bawah node
        style={{
          left: "50%", // Menempatkan handle di tengah horizontal
          transform: "translateX(-50%)", // Mengubah posisi agar berada tepat di tengah
          background: "#555",
        }}
        isConnectable={isConnectable} // Mengaktifkan koneksi
      />
    </div>
  );
};

export default OrgChartApp;

import React, { useState } from "react";
import OrgChartApp from "./form/OrgChartApp";
import EmployeeTable from "./form/EmployeeTable";
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./data/NodesEdges"; // Import data nodes dan edges
import { OrgChartProvider } from "./state/OrgChartContext";

const StrukturOrganisasiPage = () => {
  const [nodes, setNodes] = useState(initialNodes); // State nodes
  const [edges, setEdges] = useState(initialEdges); // State edges
  // Fungsi untuk menambahkan karyawan baru
  const handleAddEmployee = (newEmployeeNode, newEdge) => {
    const updatedNodes = [...nodes, newEmployeeNode];
    const updatedEdges = newEdge ? [...edges, newEdge] : edges;

    setNodes(updatedNodes); // Update nodes
    setEdges(updatedEdges); // Update edges
  };

  return (
    <OrgChartProvider>
      <div
        className="flex flex-row"
        style={{ width: "100%", minHeight: "100vh" }}
      >
        <EmployeeTable
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
          onAddEmployee={handleAddEmployee}
        />
        <OrgChartApp
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
          onAddEmployee={handleAddEmployee}
        />
      </div>
    </OrgChartProvider>
  );
};

export default StrukturOrganisasiPage;

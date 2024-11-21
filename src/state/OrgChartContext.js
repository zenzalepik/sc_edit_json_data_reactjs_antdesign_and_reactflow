// src/contexts/OrgChartContext.js
import React, { createContext, useContext, useRef, useState } from 'react';
import { nodes as initialNodes, edges as initialEdges } from '../data/nodes-edges'; // Import data nodes dan edges

const OrgChartContext = createContext();

export const useOrgChartContext = () => {
  return useContext(OrgChartContext);
};

export const OrgChartProvider = ({ children }) => {
  const reactFlowWrapper = useRef(null); // Membuat ref untuk ReactFlow
  const [nodes, setNodes] = useState(initialNodes); // State untuk nodes
  const [edges, setEdges] = useState(initialEdges); // State untuk edges

  return (
    <OrgChartContext.Provider
      value={{
        reactFlowWrapper,
        nodes,
        setNodes,
        edges,
        setEdges,
      }}
    >
      {children}
    </OrgChartContext.Provider>
  );
};

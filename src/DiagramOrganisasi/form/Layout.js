import dagre from 'dagre'; // Import dagre untuk auto-layout

// Fungsi untuk menerapkan auto-layout menggunakan dagre
export const getLayoutedElements = (nodes, edges) => {
    const graph = new dagre.graphlib.Graph();
  
    graph.setGraph({
      rankdir: "TB", // Mengatur arah layout (Top-Bottom)
      marginx: 20,   // Margin horizontal antar nodes
      marginy: 20,   // Margin vertikal antar nodes
    });
    graph.setDefaultEdgeLabel(() => ({}));
  
    // Menambahkan node ke graph dengan estimasi ukuran otomatis
    nodes.forEach((node) => {
      // Estimasi ukuran node berdasarkan panjang nama atau atribut lain
      const label = node.label || ""; // Asumsi ada label di setiap node
      const width = Math.max(172, label.length * 8); // Menyesuaikan lebar dengan panjang label
      const height = 120; // Tinggi bisa tetap tetap atau disesuaikan dengan konten
  
      graph.setNode(node.id, { width, height });
    });
  
    // Menambahkan edges ke graph
    edges.forEach((edge) => {
      graph.setEdge(edge.source, edge.target);
    });
  
    // Mengatur layout otomatis menggunakan dagre
    dagre.layout(graph);
  
    // Menata ulang posisi nodes berdasarkan layout yang dihitung
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = graph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
      width: nodeWithPosition.width,
      height: nodeWithPosition.height
    };
  });

  return { nodes: layoutedNodes, edges };
  };
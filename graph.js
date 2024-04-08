// Sample data
const hosts = [
    { name: "iris", tags: ["iris"] },
    { name: "dbproxy", tags: ["dbproxy"] },
    { name: "postgres", tags: ["postgres"] }
];

const connections = [
    ["iris", "dbproxy"],
    ["iris", "postgres"],
    ["dbproxy", "iris"]
];

// Initialize nodes and edges arrays for vis.js
let nodes = [];
let edges = [];

// Create nodes for each vertex
hosts.forEach(vertex => {
    // Calculate position on a circle
    const radius = 100;
    const angle = (Math.PI * 2) / hosts.length * nodes.length;
    const x = 300 + radius * Math.cos(angle);
    const y = 200 + radius * Math.sin(angle);

    // Add node to vis.js nodes array
    nodes.push({
        id: vertex.name,
        label: `${vertex.name}\nTags: ${vertex.tags.join(", ")}`,
        x: x,
        y: y,
        shape: "box"
    });
});

// Create edges for each connection
connections.forEach(pair => {
    // Find corresponding nodes
    const fromNode = nodes.find(node => node.label.includes(pair[0]));
    const toNode = nodes.find(node => node.label.includes(pair[1]));

    // Add edge to vis.js edges array
    edges.push({
        from: fromNode.id,
        to: toNode.id
    });
});

// Create a network
const container = document.getElementById("network");
const data = {
    nodes: nodes,
    edges: edges
};
const options = {};
const network = new vis.Network(container, data, options);

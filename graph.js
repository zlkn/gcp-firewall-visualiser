// Sample data

const connections = [
    {
        "sourceRanges": null,
        "sourceTags": [
            "dbproxy-us15",
        ],
        "targetTags": [
            "postgres-us15-master"
        ],
        "allowed": [
            {
                "IPProtocol": "tcp"
            }
        ]
    },
    {
        "sourceRanges": null,
        "sourceTags": [
            "iris-us15",
        ],
        "targetTags": [
            "dbproxy-us15"
        ],
        "allowed": [
            {
                "IPProtocol": "tcp"
            }
        ]
    },
]

var hosts = []
let hostsPromise = fetch('http://localhost:8080/hosts.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Process the data here before returning it
        return data;
    })
    .catch(error => {
        console.error('Error fetching data from hosts.json:', error);
    });

// Outside of the fetch call, you can wait for the promise to resolve
hostsPromise.then(hosts => {
    // Access and use the hosts data here
    console.log('Array of hosts:', hosts);
});


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

// // Create connections between each pair of source and target tags
// connections.forEach(connection => {
//     if (Array.isArray(connection.sourceTags)) {
//         connection.sourceTags.forEach(sourceTag => {
//             connection.targetTags.forEach(targetTag => {
//                 // Find corresponding nodes by their IDs (names)
//                 const fromNode = nodes.find(node => node.label.includes(sourceTag));
//                 const toNode = nodes.find(node => node.label.includes(targetTag));
//
//                 // Add connection to vis.js edges array with arrows
//                 if (fromNode && toNode) {
//                     edges.push({
//                         from: fromNode.id,
//                         to: toNode.id,
//                         arrows: {
//                             to: {
//                                 enabled: true,
//                                 scaleFactor: 0.5
//                             }
//                         }
//                     });
//                 } else {
//                     console.error(`One or both nodes not found for connection: ${sourceTag} -> ${targetTag}`);
//                 }
//             });
//         });
//     }
// });

// Create a network
const container = document.getElementById("network");
const data = {
    nodes: nodes,
    edges: edges
};
const options = {};
const network = new vis.Network(container, data, options);

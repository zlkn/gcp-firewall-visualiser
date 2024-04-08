class NetworkVisualizer {
    constructor(containerId, hostsUrl, ConnectionsUrl) {
        this.container = document.getElementById(containerId);
        this.hostsUrl = hostsUrl;
        this.connectionsUrl = ConnectionsUrl;
        this.hosts = [];
        this.nodes = [];
        this.edges = [];

        this.init();
    }

    init() {
        this.fetchHostsData()
            .then(() => {
                this.createNodes();
                this.createEdges();
                this.renderNetwork();
            })
            .catch(error => {
                console.error('Error fetching hosts data:', error);
            });
    }

    fetchHostsData() {
        return fetch(this.hostsUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.hosts = data;
                console.log('Array of hosts:', this.hosts);
            });
    }

    fetchConnectionsData() {
        return fetch(this.hostsUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.hosts = data;
                console.log('Array of hosts:', this.hosts);
            });
    }

    createNodes() {
        // Logic for creating nodes from hosts data
        this.hosts.forEach(vertex => {
            // Calculate position on a circle
            const radius = 100;
            const angle = (Math.PI * 2) / this.hosts.length * this.nodes.length;
            const x = 300 + radius * Math.cos(angle);
            const y = 200 + radius * Math.sin(angle);

            // Add node to vis.js nodes array
            this.nodes.push({
                id: vertex.name,
                label: `${vertex.name}\nTags: ${vertex.tags.join(", ")}`,
                x: x,
                y: y,
                shape: "box"
            });
        });
    }

    createEdges() {
        // Logic for creating edges from connections data
        const connections = [
            // Your connections data here
        ];
        connections.forEach(connection => {
            if (Array.isArray(connection.sourceTags)) {
                connection.sourceTags.forEach(sourceTag => {
                    connection.targetTags.forEach(targetTag => {
                        // Find corresponding nodes by their IDs (names)
                        const fromNode = this.nodes.find(node => node.id === sourceTag);
                        const toNode = this.nodes.find(node => node.id === targetTag);

                        // Add connection to vis.js edges array with arrows
                        if (fromNode && toNode) {
                            this.edges.push({
                                from: fromNode.id,
                                to: toNode.id,
                                arrows: {
                                    to: {
                                        enabled: true,
                                        scaleFactor: 0.5
                                    }
                                }
                            });
                        } else {
                            console.error(`One or both nodes not found for connection: ${sourceTag} -> ${targetTag}`);
                        }
                    });
                });
            }
        });
    }

    renderNetwork() {
        // Render the network using vis.js
        const data = {
            nodes: this.nodes,
            edges: this.edges
        };
        const options = {};
        const network = new vis.Network(this.container, data, options);
    }
}

// Usage example
const visualizer = new NetworkVisualizer("network", "http://localhost:8080/hosts.json", http://localhost:8080/firewall.json);

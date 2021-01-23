class Graph {
    constructor() {
       this.edges = {};
       this.vertices = [];
    }
 
    addVertex(vertex) {
       this.vertices.push(vertex);
       this.edges[vertex] = [];
    }
 
    addEdge(vertex1, vertex2, weight = 1) {
       this.edges[vertex1].push({ vertex: vertex2, weight });
       this.edges[vertex2].push({ vertex: vertex1, weight });
    }
 
    addDirectedEdge(vertex1, vertex2, weight = 1) {
       this.edges[vertex1].push({ vertex: vertex2, weight });
    }
 
    display() {
       let graph = "";
       this.vertices.forEach(vertex => {
          graph += vertex + "->" + this.edges[vertex].map(v => `${v.vertex}(${v.weight})`).join(", ") + "\n";
       });
       console.log(graph);
    }
}

 class PriorityQueue {
    constructor(maxSize) {
       this.maxSize = maxSize;
       this.queue = [];
    }
   
    display() {
       console.log(this.queue);
    }

    isEmpty() {
       return this.queue.length === 0;
    }

    isFull() {
       return this.queue.length >= this.maxSize;
    }

    enqueue(data, priority) {

        if (this.isFull()) {
          console.log("Queue is full!");
          return;
       }
       let currElem = { data, priority }
       let addedFlag = false;
       for (let i = 0; i < this.queue.length; i++) {
          if (currElem.priority > this.queue[i].priority) {
             this.queue.splice(i, 0, currElem);
             addedFlag = true; 
             break;
          }
       }
       if (!addedFlag) {
          this.queue.push(currElem);
       }
    }

    dequeue() {
        if (this.isEmpty()) {
            console.log("Queue Underflow!");
            return;
        }

        return this.queue.pop();
    }

    peek() {
        if (isEmpty()) {
            console.log("Queue Underflow!");
            return;
        }

        return this.queue[this.queue.length - 1];
    }

    clear() {
        this.queue = [];
    }
}


// Exercise 1
function primsMST(g) {
    const MST = new Graph();
    if (g.vertices.length === 0) {
       return MST;
    }

    let s = g.vertices[0];
    let edgeQueue = new PriorityQueue(g.vertices.length * g.vertices.length);
    let explored = new Set();
    explored.add(s);
    MST.addVertex(s);

    g.edges[s].forEach(edge => {
        edgeQueue.enqueue([s, edge.vertex], edge.weight);
    });
    

    let currentMinEdge = edgeQueue.dequeue();
    while (!edgeQueue.isEmpty()) {
        while (!edgeQueue.isEmpty() && explored.has(currentMinEdge.data[1])) {
            currentMinEdge = edgeQueue.dequeue();
        }

        let nextVertex = currentMinEdge.data[1];
        if (!explored.has(nextVertex)) {
            MST.addVertex(nextVertex);
            MST.addEdge(currentMinEdge.data[0], nextVertex, currentMinEdge.priority);

            g.edges[nextVertex].forEach(edge => {
                edgeQueue.enqueue([nextVertex, edge.vertex], edge.weight);
            });

            explored.add(nextVertex);
            s = nextVertex;
        }
    }
    
    return MST;
}

function BFSShortestPath(g, v1, v2) {
    let arr = [];
    let explored = new Set();
    let distances = { [v1]: 0 };
    arr.push(v1);
    explored.add(v1);
    while (arr.length) {
       let t = arr.shift();
       g.edges[t].filter(v => !explored.has(v.vertex)).forEach(v => {
          explored.add(v.vertex);
          if (!distances[v.vertex]) {
              distances[v.vertex] = {}
              distances[v.vertex].maxEdgeWeight = 0
          }

          if (distances[v.vertex].maxEdgeWeight < v.weight) {
            distances[v.vertex].maxEdgeWeight = v.weight
            distances[v.vertex].maxVertexConnected = t
          }
          
          arr.push(v.vertex);
       });
    }

    return distances[v2];
 }


function addNewEdgeToMst(g, vertex1, vertex2, weight) {
    const longestEdge = BFSShortestPath(g, vertex1, vertex2);
    if (longestEdge.maxEdgeWeight > weight) {
        g.edges[longestEdge.maxVertexConnected] = g.edges[longestEdge.maxVertexConnected].filter((v) => v.vertex != vertex2)
        g.edges[vertex2] = g.edges[vertex2].filter((v) => v.vertex != longestEdge.maxVertexConnected)
        g.addEdge(vertex1, vertex2, weight);
    }
}

let g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");
g.addVertex("G");
g.addVertex("H");
g.addVertex("I");
g.addVertex("J");
g.addVertex("K");
g.addVertex("L");
g.addVertex("M");
g.addVertex("N");
g.addVertex("O");
g.addVertex("P");
g.addVertex("Q");
g.addVertex("R");
g.addVertex("S");
g.addVertex("T");

g.addEdge("A", "C", 5);
g.addEdge("Q", "T", 3);
g.addEdge("A", "D", 4);
g.addEdge("R", "T", 8);
g.addEdge("L", "E", 9);
g.addEdge("I", "F", 2);
g.addEdge("B", "S", 5);
g.addEdge("O", "C", 3);
g.addEdge("T", "B", 10);
g.addEdge("M", "D", 2);
g.addEdge("K", "L", 15);
g.addEdge("L", "N", 13);
g.addEdge("E", "O", 6);
g.addEdge("B", "P", 10);
g.addEdge("M", "C", 7);
g.addEdge("J", "B", 5);
g.addEdge("A", "K", 6);
g.addEdge("I", "H", 4);
g.addEdge("Q", "E", 11);
g.addEdge("L", "F", 6);
g.addEdge("B", "I", 2);
g.addEdge("H", "C", 3);
g.addEdge("O", "B", 3);
g.addEdge("N", "P", 6);
g.addEdge("C", "D", 3);
g.addEdge("D", "E", 8);
g.addEdge("E", "H", 10);
g.addEdge("K", "J", 9);
g.addEdge("P", "M", 14);
g.addEdge("A", "B", 3);
g.addEdge("K", "D", 15);
g.addEdge("C", "P", 3);
g.addEdge("G", "N", 11);
g.addEdge("E", "F", 9);
g.addEdge("D", "I", 4);
g.addEdge("T", "L", 5);
g.addEdge("E", "B", 3);
g.addEdge("P", "J", 4);
g.addEdge("R", "O", 3);
g.addEdge("N", "J", 8);
g.addEdge("A", "E", 10);
g.addEdge("B", "G", 9);
g.addEdge("N", "C", 2);
g.addEdge("T", "F", 3);
g.addEdge("A", "L", 4);
g.addEdge("C", "T", 3);
g.addEdge("M", "E", 6);
g.addEdge("E", "N", 10);
g.addEdge("O", "K", 9);
g.addEdge("A", "T", 12);
g.addEdge("M", "B", 7);
g.addEdge("J", "D", 4);
g.addEdge("C", "S", 14);
g.addEdge("S", "E", 15);
g.addEdge("R", "F", 10);
g.addEdge("N", "Q", 9);
g.addEdge("A", "R", 5);
g.addEdge("H", "B", 2);
g.addEdge("F", "D", 4);
g.addEdge("R", "S", 3);

console.log("Original graph: ")
g.display()

const mst = primsMST(g)
console.log("MST graph: ")
mst.display()

// Doesn't change the MST
addNewEdgeToMst(mst, "A", "F", 100)
console.log("New Edge: A -> F(100)")
mst.display()

// Changes the MST
addNewEdgeToMst(mst, "A", "F", 1)
console.log("New Edge: A -> F(1)")
mst.display()

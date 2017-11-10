/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/

function MyGraphNode(graph, nodeID) {
    this.graph = graph;

    this.nodeID = nodeID;
    
    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);

    //TODO eventualmente dar parse das animaçoes do xml e escolher qual animaçao criar ou quais
    if(this.nodeID == "jornal"){
        this.animation = new LinearAnimation(this.graph.scene, [[0, 0, 0], [10, 0, 0], [10, 10, 0], [10, 0, 0],[10, 0, 5], [10, 0, 10], [10, 10, 10]], 1);        
    }
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}



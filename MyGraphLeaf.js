/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {
    
    this.type = graph.reader.getString(xmlelem, 'type');
    this.args = graph.reader.getString(xmlelem, 'args');
    
    switch (this.type){
        /*case 'triangle':
            let coords = this.args.split(" ");
            this.element = new Triangle(graph.scene, coords);
            break;*/
        /*case 'sphere':
            let coords = this.args.split(" ");
            this.element = new Sphere(graph.scene,coords);   
            break;*/
        case 'cylinder':
            let coords = this.args.split(" ");
            this.element = new Cylinder(graph.scene,coords);
            break;
        /*case 'patch':
           this.element = new Patch(); */ //TODO passar argumentos
        /*case 'rectangle':
            let coords = this.args.split(" ");
            this.element = new Rectangle(graph.scene, coords); 
            break;*/
        default:
            this.element = null;
            break;
    }

}

MyGraphLeaf.prototype.display = function(){
    // console.log("element " + this.element);
    
    if (this.element != null){
        this.element.display();        
    }
};


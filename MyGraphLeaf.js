/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {
    
    this.type = graph.reader.getString(xmlelem, 'type');
    this.args = graph.reader.getString(xmlelem, 'args');
    
    switch (this.type){
        /*case 'triangle':
            var coords = this.args.split(" ");
            this.element = new Triangle(graph.scene, coords);
            break;*/
        case 'sphere':
           // this.element = new Sphere();    //TODO passar argumentos
        case 'cylinder':
            //this.element = new Cylinder();  //TODO passar argumentos
        case 'patch':
           // this.element = new Patch(); //TODO passar argumentos
        case 'rectangle':
            var coords = this.args.split(" ");
            this.element = new Rectangle(graph.scene, coords); 
            break;
        default:
            this.element = null;
    }

}

MyGraphLeaf.prototype.display = function(){
    // console.log("element " + this.element);
    
    if (this.element != null){
        this.element.display();        
    }
};


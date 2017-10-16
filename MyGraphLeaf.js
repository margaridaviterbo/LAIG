/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {
    
    this.type = graph.reader.getString(xmlelem, 'type');
    this.args = graph.reader.getString(xmlelem, 'args');
    
    switch (this.type){
        case 'triangle':
            var coords = this.args.split(" ");
            this.element = new Triangle(graph.scene, coords);
            break;
       /*case 'sphere':
            var coords = this.args.split(" ");
            this.element = new Sphere(graph.scene,coords);   
            break;
        case 'cylinder':
            var coords = this.args.split(" ");
            this.element = new CompleteCylinder(graph.scene,coords);
            break;
        case 'patch':
           this.element = new Patch();  //TODO passar argumentos
        case 'rectangle':
            var coords = this.args.split(" ");
            this.element = new Rectangle(graph.scene, coords); 
            break;*/
        default:
            this.element = null;
            break;
    }

}
MyGraphLeaf.prototype.setTextCoords = function(s,t){
    
    if (this.element != null){
        this.element.setTextCoords(s,t);
    }
    
};

MyGraphLeaf.prototype.display = function(){
        
    if (this.element != null){
        this.element.display();        
    }
};


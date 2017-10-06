/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {
    
    this.type = graph.reader.getString(xmlelem, 'type');
    this.args = graph.reader.getString(xmlelem, 'args');
    
    switch (this.type){
        case 'rectangle':
           // this.element = new Rectangle(); //TODO passar argumentos
        case 'triangle':
            var coords = this.args.split(" ");
            this.element = new Triangle(graph.scene, coords);    //TODO passar argumento
        case 'sphere':
           // this.element = new Sphere();    //TODO passar argumentos
        case 'cylinder':
            //this.element = new Cylinder();  //TODO passar argumentos
        case 'patch':
           // this.element = new Patch(); //TODO passar argumentos
    }

}

MyGraphLeaf.prototype.display = function(){
    this.element.display();
};


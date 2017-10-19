/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem) {
    
    this.type = graph.reader.getString(xmlelem, 'type');
    this.args = graph.reader.getString(xmlelem, 'args');
    var coords = this.args.split(" ");
    
    switch (this.type){
        /*case 'triangle':
            this.element = new Triangle(graph.scene, coords);
            break;
        case 'sphere':
            this.element = new Sphere(graph.scene,coords);   
            break;
        case 'cylinder':
            this.element = new CompleteCylinder(graph.scene,coords);
            break;*/
        case 'patch':
            this.element = new Patch(graph.scene, coords[0], coords[1], graph.controlPoints);
            /*this.element = new Patch(graph.scene, 1, // degree on U: 2 control vertexes U
					 1, // degree on V: 2 control vertexes on V
					[	// U = 0
						[ // V = 0..1;
							 [-2.0, -2.0, 0.0, 1 ],
							 [-2.0,  2.0, 0.0, 1 ]
							
						],
						// U = 1
						[ // V = 0..1
							 [ 2.0, -2.0, 0.0, 1 ],
							 [ 2.0,  2.0, 0.0, 1 ]							 
						]
                    ]);*/
            break;
        /*case 'rectangle':
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


/**
 * Patch
 * 
 */

var surfaces=[];

class Patch extends CGFnurbsObject{
 constructor(scene, coords, cpoints) {
	//CGFobject.call(this,scene);

	//this.scene = scene;
	//this.coords = coords;
	//this.cpoints = cpoints;
	
	//this.initBuffers();

//};

//Patch.prototype = Object.create(CGFobject.prototype);
//Patch.prototype.constructor=Patch;

//Patch.prototype.initBuffers = function () {


	var getKnotsVector = function(degree) { // TODO (CGF 0.19.3): add to CGFnurbsSurface
		
		var v = new Array();
		for (var i=0; i<=degree; i++) {
			v.push(0);
		}
		for (var i=0; i<=degree; i++) {
			v.push(1);
		}
		return v;
	};
	
	
	var makeSurface = function(id, degree1, degree2, controlvertexes, translation) {
			
		var knots1 = getKnotsVector(degree1); // to be built inside webCGF in later versions ()
		var knots2 = getKnotsVector(degree2); // to be built inside webCGF in later versions
			
		var nurbsSurface = new CGFnurbsSurface(degree1, degree2, knots1, knots2, controlvertexes); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
		var getSurfacePoint = function(u, v) {
			return nurbsSurface.getPoint(u, v);
		};
	
		var obj = new CGFnurbsObject(scene, getSurfacePoint, 20, 20 );
		surfaces.push(obj);		
	};

    
    
	surfaces = [];

	makeSurface("0", 1, // degree on U: 2 control vertexes U
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
					]);

	makeSurface("1", 2, // degree on U: 3 control vertexes U
					 1, // degree on V: 2 control vertexes on V
					[	// U = 0
						[ // V = 0..1;
							 [ -1.5, -1.5, 0.0, 1 ],
							 [ -1.5,  1.5, 0.0, 1 ]
							
						],
						// U = 1
						[ // V = 0..1
							 [ 0, -1.5, 3.0, 1 ],
							 [ 0,  1.5, 3.0, 1 ]							 
						],
						// U = 2
						[ // V = 0..1							 
							[ 1.5, -1.5, 0.0, 1 ],
							[ 1.5,  1.5, 0.0, 1 ]
						]
					]);

	makeSurface("2", 2, // degree on U: 3 control vertexes U
					 3, // degree on V: 4 control vertexes on V
					[	// U = 0
						[ // V = 0..3;
							 [ -1.5, -1.5, 0.0, 1 ],
							 [ -2.0, -2.0, 2.0, 1 ],
							 [ -2.0,  2.0, 2.0, 1 ],
							 [ -1.5,  1.5, 0.0, 1 ]
							
						],
						// U = 1
						[ // V = 0..3
							 [ 0, 0, 3.0, 1 ],
							 [ 0, -2.0, 3.0, 1],
							 [ 0,  2.0, 3.0, 1 ],
							 [ 0,  0, 3.0, 1 ]							 
						],
						// U = 2
						[ // V = 0..3							 
							 [ 1.5, -1.5, 0.0, 1 ],
							 [ 2.0, -2.0, 2.0, 1 ],
							 [ 2.0,  2.0, 2.0, 1 ],
							 [ 1.5,  1.5, 0.0, 1 ]
						]
					]);

	makeSurface("3", 2, // degree on U: 3 control vertexes U
					3, // degree on V: 4 control vertexes on V
					[	// U = 0
						[ // V = 0..3;
							 [ -2.0, -2.0, 1.0, 1 ],
							 [ -2.0, -1.0, -2.0, 1 ],
							 [ -2.0, 1.0, 5.0, 1 ],
							 [ -2.0, 2.0, -1.0, 1 ]
						],
						// U = 1
						[ // V = 0..3
							 [ 0, -2.0, 0, 1 ],
							 [ 0, -1.0, -1.0, 1 ],
							 [ 0, 1.0, 1.5, 1 ],
							 [ 0, 2.0, 0, 1 ]
						],
						// U = 2
						[ // V = 0..3
							 [ 2.0, -2.0, -1.0, 1 ],
							 [ 2.0, -1.0, 2.0, 1 ],
							 [ 2.0, 1.0, -5.0, 1 ],
							 [ 2.0, 2.0, 1.0, 1 ]
						]
					]);

	//this.primitiveType=this.scene.gl.TRIANGLES;
	//this.initGLBuffers();
}
/*
display(){
	
	for (var i=0; i<this.surfaces.length; i++) {
		this.scene.pushMatrix();
	
		this.scene.translate(this.scene.translations[i][0], this.scene.translations[i][1], this.scene.translations[i][2]);

		surfaces[i].display();
		this.scene.popMatrix();
	}
}

*/



/*
setTextCoords(s,t){

    
}*/

};
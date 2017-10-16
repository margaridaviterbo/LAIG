/**
 * Sphere
 * @constructor
 */
 function Sphere(scene, coords) {
	 CGFobject.call(this,scene);
	 
	 this.slices = parseInt(coords[2]);
	 this.stacks = parseInt(coords[1]);
	 this.radius = parseInt(coords[0]);

 	this.initBuffers();
 };

 Sphere.prototype = Object.create(CGFobject.prototype);
 Sphere.prototype.constructor = Sphere;

 Sphere.prototype.initBuffers = function() {

    this.vertices = [];
    this.normals = [];
    this.indices = [];
    this.texCoords = [];

    var x,y,z;
    
	for(var i = 0; i <= this.stacks; i++){
		var s = i* Math.PI / this.stacks;

		for(var j = 0; j <= this.slices; j++){
			var t = j*2* Math.PI / this.slices;
			//x=x0 + radius*cos(w)*sin(y)
			//y=y0 + radius*cos(w)*sin(y)
			//z=z0 + radius*cos(y)
			//0<w<2pi;0<y<pi
			x = this.radius * Math.cos(t) * Math.sin(s);
			y = this.radius * Math.sin(s) * Math.sin(t);
			z = this.radius * Math.cos(s);
			
			this.vertices.push(x, y, z);
			this.normals.push(x, y, z);
			this.texCoords.push(1 - j / this.slices, 1 - i / this.stacks);
 		}
	}

	for(var i = 0; i < this.stacks; i++){
 		for(var j = 0; j < this.slices; j++){
			//http://learningwebgl.com/cookbook/index.php/How_to_draw_a_sphere
			var s1 = i * (this.slices + 1) + j;
			var s2 = s1 + this.slices + 1;

			this.indices.push(s1, s2, s1+1);
			this.indices.push(s2, s2+1, s1+1);
 		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

Sphere.prototype.setTextCoords = function(s,t){
    
    
};
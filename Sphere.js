/**
 * Sphere
 * @constructor
 */
 function Sphere(scene, coords) {
 	CGFobject.call(this,scene);

	this.slices = coords[2];
	this.stacks = coords[1];
	this.radius = coords[0];

 	this.initBuffers();
 };

 Sphere.prototype = Object.create(CGFobject.prototype);
 Sphere.prototype.constructor = Sphere;

 Sphere.prototype.initBuffers = function() {

    this.vertices = [];
    this.normals = [];
    this.indices = [];
    //this.texCoords = [];

    var ang = Math.PI*2/this.slices;
    var x, y,z;
    
	for(var j = 0; j <= this.stacks; j++){
		for(var i = 0; i <= this.slices; i++){

			//maxZ = 1
			z = j / this.stacks;

			//radius decreases with Z increase
            //radius = Math.cos(Math.asin(z));

			//x and y coordinates depend on the radius
			x = Math.cos(i * 2*Math.PI / this.slices) * this.radius;
			y = Math.sin(i * 2*Math.PI / this.slices) * this.radius;

			this.vertices.push(x, y, z);
			this.normals.push(x, y, z);
			//this.texCoords.push(1 - i / this.slices, 1 - j / this.stacks);
 		}
	}

	for(var i = 1; i <= this.stacks; i++){
 		for(var j = 1; j <= this.slices; j++)
 		{
			var stack1 = (this.slices+1) * (i - 1) + (this.slices - j);
			var stack2 = (this.slices+1) * i + (this.slices - j);

			this.indices.push(stack1, stack1 + 1, stack2+1);
			this.indices.push(stack2+1, stack2, stack1);
 		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};

/**
 * Rectangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Rectangle(scene, coords) {
	CGFobject.call(this,scene);
	
	this.coords = coords;

	this.initBuffers();

};

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor=Rectangle;

Rectangle.prototype.initBuffers = function () {
	
	this.vertices = [];
    this.vertices.push(this.coords[0], this.coords[1],0);
    this.vertices.push(this.coords[2], this.coords[1],0);
	this.vertices.push(this.coords[2], this.coords[3],0);
	this.vertices.push(this.coords[0], this.coords[3],0);
	
	
	this.indices = [
		0, 1, 2,
		2, 3, 0,
		2, 1, 0,
		0, 3, 2,
	];
		

	this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
	];

	this.minS = 0;
	this.maxS = 1;
	this.minT = 0;
	this.maxT = 1;
	
	this.texCoords = [
		0, 0,
		1, 0,
		1, 1,
		0, 1
	];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

Rectangle.prototype.setTextCoords = function(s,t){
	
	this.texCoords = [
		0, 0,
		(this.coords[2]-this.coords[0])/s, 0,
		(this.coords[2]-this.coords[0])/s, (this.coords[3]-this.coords[1])/t,
		0, (this.coords[3]-this.coords[1])/t
	];

	this.updateTexCoordsGLBuffers();
    
};
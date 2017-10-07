/**
 * Rectangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Rectangle(scene, coords/*, minS, maxS, minT, maxT*/) {
	CGFobject.call(this,scene);

	/*this.minS = minS || 0;
	this.maxS = maxS || 1;
	this.minT = minT || 0;
	this.maxT = maxT || 1;*/
	this.coords = coords;

	this.initBuffers();

};

Rectangle.prototype = Object.create(CGFobject.prototype);
Rectangle.prototype.constructor=Rectangle;

Rectangle.prototype.initBuffers = function () {
	
	this.vertices = [];
    this.vertices.push(this.coords[0], 0, this.coords[1]);
    this.vertices.push(this.coords[2], 0, this.coords[1]);
	this.vertices.push(this.coords[2], 0, this.coords[3]);
	this.vertices.push(this.coords[0], 0, this.coords[3]);
	
	this.indices = [
            2, 1, 0,
			2, 1, 3
        ];

	this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
	];

	/*this.texCoords = [
		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT
	];*/

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
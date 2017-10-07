/**
 * Triangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function Triangle(scene, coords) {
    CGFobject.call(this,scene);
    this.coords = coords;
	this.initBuffers();
};

Triangle.prototype = Object.create(CGFobject.prototype);
Triangle.prototype.constructor=Triangle;

Triangle.prototype.initBuffers = function () {

    this.vertices = [];
    this.vertices.push(this.coords[0], this.coords[1], this.coords[2]);
    this.vertices.push(this.coords[3], this.coords[4], this.coords[5]);
    this.vertices.push(this.coords[6], this.coords[7], this.coords[8]);

    this.normals = [
        0, 1, 0,    //0
        0, 1, 0,    //1
        0, 1, 0,    //3
    ];

    /*this.texCoords = [
        0, 1, 0,    //0
        0, 1, 0,    //1
        0, 1, 0,    //2
        0, -1, 0,   //3
        0, -1, 0,   //4
        0, -1, 0,   //5
        -1, 0, 0,   //0
        1, 0, 0.66, //1
        -1, 0, 0,   //2
        -1, 0, 0,   //3
        1, 0, 0.66, //4
        -1, 0, 0,   //5
        0, 0, -1,   //0
        0, 0, -1,   //1
        1, 0, 0.66, //2
        0, 0, -1,   //3
        0, 0, -1,   //4
        1, 0, 0.66  //5

    ];*/

    this.indices = [
        0, 1, 2,
    ];

	this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
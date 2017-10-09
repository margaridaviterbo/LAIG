/**
 * CylinderBase
 * @constructor
 */
function CylinderBase(scene, slices) {
 	CGFobject.call(this,scene);

	this.slices = slices;
 	this.initBuffers();
};

CylinderBase.prototype = Object.create(CGFobject.prototype);
CylinderBase.prototype.constructor = CylinderBase;

CylinderBase.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var angle = 2 * Math.PI / this.slices;
    var s, t;

    this.vertices.push(0, 0, 0);
    this.texCoords.push(0.5, 0.5);

    for (var i=0; i < this.slices; i++){
        this.vertices.push(Math.cos(i * angle), Math.sin(i * angle), 0);
        this.indices .push(0, i, i+1);
        this.normals.push(Math.cos(i * angle), Math.sin(i * angle), 1);
        this.texCoords.push((Math.cos(i * angle)+1)/2, (Math.sin(-i * angle)+1)/2);
    }

    this.normals.push(Math.cos(i * angle), Math.sin(i * angle), 1);
    this.indices.push(0, i, 1);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

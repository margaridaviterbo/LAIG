/**
 * CylinderBase
 * @constructor
 */
function CylinderBase(scene, slices, radius) {
 	CGFobject.call(this,scene);
    this.slices = slices;
    this.radius = radius;
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

    for (var i=0; i <= this.slices; i++){
        var x = Math.cos(i * angle) * this.radius;
        var y = Math.sin(i * angle) * this.radius;
        this.vertices.push(x, y, 0);
        this.normals.push(1, 0, 0);
        this.texCoords.push((Math.cos(i * angle)+1)/2, (Math.sin(-i * angle)+1)/2);
    }

    for (var i = 1; i < this.slices; i++){
        this.indices.push(0, i, i+1);
    }
    this.indices.push(0, this.slices, 1);
      

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};


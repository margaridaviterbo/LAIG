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

    this.angle = 2 * Math.PI / this.slices;
    var s, t;

    for (var i=0; i <= this.slices; i++){
        var x = Math.cos(i * this.angle) * this.radius;
        var y = Math.sin(i * this.angle) * this.radius;
        this.vertices.push(x, y, 0);
        this.normals.push(1, 0, 0);
        this.texCoords.push(Math.cos(i * this.angle), Math.sin(i * this.angle));
    }

    for (var i = 1; i < this.slices; i++){
        this.indices.push(0, i, i+1);
    }
    this.indices.push(0, this.slices, 1);


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

CylinderBase.prototype.setTextCoords = function(s,t){
    
    for (var i=0; i <= this.slices; i++){
        this.texCoords.push(Math.cos(i * this.angle)/s, Math.sin(i * this.angle)/t);
    }

    this.updateTexCoordsGLBuffers();
};

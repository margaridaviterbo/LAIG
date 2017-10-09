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
    this.normals.push(0,0,1);

    /*for (var i=0; i < this.slices; i++){
        this.vertices.push(Math.cos(i * angle), Math.sin(i * angle), 0);
        this.indices .push(0, i, i+1);
        this.normals.push(Math.cos(i * angle), Math.sin(i * angle), 1);
        this.texCoords.push((Math.cos(i * angle)+1)/2, (Math.sin(-i * angle)+1)/2);
    }

    this.normals.push(Math.cos(i * angle), Math.sin(i * angle), 1);
    this.indices.push(0, i, 1);*/

    for(var j=0; j < this.slices;j++){
        //vertices e normais
        this.vertices.push(Math.cos(angle*j)*this.radius,Math.sin(angle*j)*this.radius,0);
        this.normals.push(0,0,1);
        //this.texCoords.push(0.5 - Math.cos(angle*j)/2, 0.5 + Math.sin(angle*j)/2);
    }
    
    
    for (var j=1; j < this.slices + 1;j++){ 
       this.indices.push(0,this.slices,1);
    }
    this.indices.push(0, this.slices, 1);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};


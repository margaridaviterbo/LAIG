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

    //v1
    var x1=parseFloat(this.coords[0]);
    var y1=parseFloat(this.coords[1]);
    var z1=parseFloat(this.coords[2]);

    //v2
    var x2=parseFloat(this.coords[3]);
    var y2=parseFloat(this.coords[4]);
    var z2=parseFloat(this.coords[5]);

    //v3
    var x3=parseFloat(this.coords[6]);
    var y3=parseFloat(this.coords[7]);
    var z3=parseFloat(this.coords[8]);

    this.vertices = [];
    this.vertices.push(x1,y1,z1);
    this.vertices.push(x2,y2,z2);
    this.vertices.push(x3,y3,z3);

    this.normals = [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
    ];

    this.a=Math.sqrt(Math.pow(x1-x3,2) + Math.pow(y1-y3,2) + Math.pow(z1-z3,2));
    this.b=Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2) + Math.pow(z2-z1,2));
    this.c=Math.sqrt(Math.pow(x3-x2,2) + Math.pow(y3-y2,2) + Math.pow(z3-z2,2));
    this.h=this.a*Math.sin(this.beta);

    this.alpha=(-Math.pow(this.a,2) + Math.pow(this.b,2) + Math.pow(this.c,2))/(2*this.c*this.b);
    this.beta=(Math.pow(this.a,2) - Math.pow(this.b,2) + Math.pow(this.c,2))/(2*this.a*this.c);
    this.gama=(Math.pow(this.a,2) + Math.pow(this.b,2) - Math.pow(this.c,2))/(2*this.a*this.b);

    this.texCoords = [
       this.c-this.a*Math.cos(this.beta), this.a*Math.sin(Math.acos(this.beta)),
       0, 0,
       this.c, 0,
    ];

    this.indices = [
        0, 1, 2,
    ];

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

Triangle.prototype.setTextCoords = function(s,t){

    this.texCoords = [
        0, 0,
        this.c/s, 0,
        (this.c-this.a*this.beta)/s, (1-this.a*Math.sin(Math.acos(this.beta)))/t


     ];


    this.updateTexCoordsGLBuffers();
};

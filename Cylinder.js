/**
 * Cylinder
 * @constructor
 */
 function Cylinder(scene,coords) {
 	CGFobject.call(this,scene);


  this.height = parseInt(coords[0]);
  this.bottomRadius = parseInt(coords[1]);
  this.topRadius = parseInt(coords[2]);
  this.stacks = parseInt(coords[3]);
  this.slices = parseInt(coords[4]);
  //this.topCap = parseInt(coords[5]);
  //this.bottomCap = parseInt(coords[6]);

  //top cap
  if(coords[5] == '1'){
    this.topBase = new CylinderBase(scene, this.slices);    
  }
  //bottom cap
  if(coords[6] == '1'){
    this.bottomBase = new CylinderBase(scene, this.slices);    
  }
 	this.initBuffers();
 };

 Cylinder.prototype = Object.create(CGFobject.prototype);
 Cylinder.prototype.constructor = Cylinder;

 Cylinder.prototype.initBuffers = function() {

  this.indices = [];
  this.vertices = [];
  this.normals = [];
  this.texCoords = [];

  var angularStep = (2*Math.PI)/this.slices;
  var s = 0, t = 0;

  for (var i = 0; i <= this.stacks; i++) {
    for (var j = 0; j < this.slices; j++) {
      this.vertices.push(Math.cos(j * angularStep),
                         Math.sin(j * angularStep),
                         i / this.stacks);

      this.normals.push(Math.cos(j * angularStep),
                        Math.sin(j * angularStep),
                        0);

      //this.texCoords.push(s, t);
      s += 1 / this.slices;
    }
    s = 0;
    t += 1 / this.stacks;
  }

  for (var i = 0; i < this.stacks; i++) {
    for (var j = 0; j < this.slices; j++) {
      this.indices.push(i * this.slices + j,
                        i * this.slices + (j + 1) % this.slices,
                        i * this.slices + (j + 1) % this.slices + this.slices);
      this.indices.push(i * this.slices + j,
                        i * this.slices + (j + 1) % this.slices + this.slices,
                        i * this.slices + j + this.slices);
    }
  }

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};

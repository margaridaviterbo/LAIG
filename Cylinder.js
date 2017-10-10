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

 	this.initBuffers();
 };

 Cylinder.prototype = Object.create(CGFobject.prototype);
 Cylinder.prototype.constructor = Cylinder;

 Cylinder.prototype.initBuffers = function() {

  this.indices = [];
  this.vertices = [];
  this.normals = [];
  this.texCoords = [];

  var angle = (2*Math.PI)/this.slices;
  var radius = (this.bottomRadius - this.topRadius) / this.stacks;
  var height = this.height / this.stacks;
  var s = 0, t = 0;

  for (var i = 0; i <= this.stacks; i++) {

    var h = i*height;
    var r = this.bottomRadius-i*radius;

    for (var j = 0; j <= this.slices; j++) {

      var x = Math.cos(j * angle) * r;
      var y = Math.sin(j * angle) * r;
      
      this.vertices.push(x,y,h);
      this.normals.push(x,y,0);

      //this.texCoords.push(s, t);
      //s += 1 / this.slices;
    }
    //s = 0;
    //t += 1 / this.stacks;
  }

  for(var i = 0; i < this.stacks; i++){
    for(var j = 0; j < this.slices; j++){
     
     var s1 = i * (this.slices + 1) + j;
     var s2 = s1 + this.slices + 1;

     this.indices.push(s1, s2+1, s2);
     this.indices.push(s1, s1+1, s2+1);
    }
 }

 

  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
};


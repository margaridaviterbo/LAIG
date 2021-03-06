/**
 * CompleteCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
var degToRad = Math.PI / 180.0;

function CompleteCylinder(scene, coords){
   CGFobject.call(this,scene);

   this.height = parseFloat(coords[0]);
   this.slices = parseInt(coords[4]);
   this.topRadius = parseFloat(coords[2]);
   this.bottomRadius = parseFloat(coords[1]);
   this.topCap = parseInt(coords[5]);
   this.bottomCap = parseInt(coords[6]);

   this.cylinder = new Cylinder(this.scene, coords);
   this.circleTop = new CylinderBase(this.scene, this.slices, this.topRadius);
   this.circleBottom = new CylinderBase(this.scene, this.slices, this.bottomRadius);
};


CompleteCylinder.prototype = Object.create(CGFobject.prototype);
CompleteCylinder.prototype.constructor=CompleteCylinder;


CompleteCylinder.prototype.display = function(){
this.scene.pushMatrix();
this.scene.rotate(-Math.PI/2, 1, 0, 0);
    this.scene.pushMatrix();
    this.cylinder.display();
    this.scene.popMatrix();

   if(this.topCap==1){

    this.scene.pushMatrix()
    this.scene.translate(0,0,this.height);
    this.circleTop.display();
    this.scene.popMatrix();
    }

   if(this.bottomCap==1){

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.circleBottom.display();
    this.scene.popMatrix();
   }
this.scene.popMatrix();
}

CompleteCylinder.prototype.setTextCoords = function(s,t){
    this.circleTop.setTextCoords(s, t);
    this.circleBottom.setTextCoords(s, t);
    this.cylinder.setTextCoords(s, t);
};

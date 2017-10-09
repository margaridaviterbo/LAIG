/**
 * CompleteCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
var degToRad = Math.PI / 180.0;

function CompleteCylinder(scene, coords) {
   CGFobject.call(this,scene);
   
   this.slices = parseInt(coords[4]);
   this.topRadius = parseInt(coords[2]);
   this.bottomRadius = parseInt(coords[1]);
   this.topCap = parseInt(coords[5]);
   this.bottomCap = parseInt(coords[6]);

   this.cylinder = new Cylinder(this.scene, coords);
   this.circleTop = new CylinderBase(this.scene, this.slices, this.topRadius);
   this.circleBottom = new CylinderBase(this.scene, this.slices, this.bottomRadius);
   
};

CompleteCylinder.prototype = Object.create(CGFobject.prototype);
CompleteCylinder.prototype.constructor=CompleteCylinder;


CompleteCylinder.prototype.display = function(){
   
   this.cylinder.display();
    
   if(this.topCap==1){
       
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
    this.circleTop.display();
    this.scene.popMatrix();
   }
   
   if(this.bottomCap == 1){

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.circleBottom.display();
    this.scene.popMatrix();
   }
}
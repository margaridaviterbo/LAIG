/**
 * CircularAnimation
 * 
 */
class CircularAnimation extends Animation{
	constructor(scene, center, radius, initAngle, rotAngle, velocity) {
		super();

		var toRad = function(deg) {
			return deg*(Math.PI/180.0);
		}
		
		this.scene = scene;
		this.center = center;
		this.radius = radius;
		this.initAngle = toRad(initAngle);
		this.rotAngle = toRad(rotAngle);
		this.angle = this.initAngle;
		this.endAngle = this.initAngle + this.rotAngle;
		this.velocity = velocity;

        this.previousCurrTime = 0;

	}

	getType(){
        return "circular";
	}
	
	update(currTime){

		if(this.previousCurrTime == 0){
            this.previousCurrTime = currTime;
        }
        var dt = (currTime - this.previousCurrTime)/1000;
        this.previousCurrTime = currTime;
       
        if(this.angle < this.endAngle){
			this.angle += dt * this.velocity;
        }
    }

    push(){
		this.scene.translate(this.center[0], this.center[1], this.center[2]);
		this.scene.rotate(this.angle, 0, 1, 0);
		this.scene.translate(this.radius, 0, 0);
    }
	
}
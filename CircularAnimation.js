/**
 * CircularAnimation
 * 
 */
class CircularAnimation extends Animation{
	constructor(scene, id, type, center, radius, initAngle, rotAngle, velocity) {
		super(scene, id, type);

		var toRad = function(deg) {
			return deg*(Math.PI/180.0);
		}
		
		this.center = center;
		this.radius = radius;
		this.initAngle = toRad(initAngle);
		this.rotAngle = toRad(rotAngle);
		this.angle = this.initAngle;
		this.endAngle = this.initAngle + this.rotAngle;
		this.velocity = velocity;

        this.previousCurrTime = 0;

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
		else{
			this.finished = true;
			console.log("FINISHEDDDDDDDDDDDDDDDDDDD");
		}
    }

    push(){
		this.scene.translate(this.center[0], this.center[1], this.center[2]);
		this.scene.rotate(this.angle, 0, 1, 0);
		this.scene.translate(this.radius, 0, 0);
    }
	
}
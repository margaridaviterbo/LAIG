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
		this.angle = 0;
		this.endAngle = this.initAngle + this.rotAngle;
		this.velocity = velocity;
		this.controlVar = 0;

        this.previousCurrTime = 0;

	}

	update(currTime){

		if(this.previousCurrTime == 0){
            this.previousCurrTime = currTime;
        }
        var dt = (currTime - this.previousCurrTime)/1000;
		this.previousCurrTime = currTime;
		
		if(this.controlVar == 0){
			this.controlVar ++;
			this.angle = this.initAngle;
		}
       
        if(this.angle < this.endAngle){
			this.angle += dt * this.velocity;
		}
		else{

			if(this.controlVar == 1){
                this.controlVar ++;
                this.lastPositionX = this.positionX;
                this.lastPositionY = this.positionY;
                this.lastPositionZ = this.positionZ;
            }

			this.finished = true;
			console.log("FINISHEDDDDDDDDDDDDDDDDDDD");
		}
    }

    push(){
		if(this.controlVar != 0){
			this.scene.translate(this.center[0], this.center[1], this.center[2]);
			this.scene.rotate(this.angle, 0, 1, 0);
			this.scene.translate(this.radius, 0, 0);
		}
    }
	
}
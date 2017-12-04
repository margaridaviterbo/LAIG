/**
 * CircularAnimation
 * 
 */
class CircularAnimation extends Animation{
	constructor(scene, id, type, center, radius, initAngle, rotAngle, velocity) {
		super(scene, id, type);
		
		this.center = center;
		this.radius = radius;
		this.initAngle = initAngle;
		this.rotAngle = rotAngle;
		this.angle = 0;
		this.centerX = 0;
		this.centerY = 0;
		this.centerZ = 0;
		this.initRadius = 0;
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
			this.centerX = this.center[0];
			this.centerY = this.center[1];
			this.centerZ = this.center[2];
			this.initRadius = this.radius;
		}
       
        if(this.angle < this.endAngle){
			this.angle += dt * this.velocity;
		}
		else{
			this.finished = true;
		}
    }

    push(){
		this.scene.pushMatrix();
		this.scene.translate(this.centerX, this.centerY, this.centerZ);
		this.scene.rotate(this.angle, 0, 1, 0);
		this.scene.translate(0, 0, this.radius);
    }
	
}
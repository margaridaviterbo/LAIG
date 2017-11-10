/**
 * CircularAnimation
 * 
 */
class CircularAnimation extends Animation{
	constructor(scene, center, radius, initAngle, rotAngle, velocity) {
		super();
		
		this.scene = scene;
		this.center = center;
		this.radius = radius;
		this.initAngle = initAngle;
		this.rotAngle = rotAngle;
		this.velocity = velocity;


		this.positionX = 0;
        this.positionY = 0;
        this.positionZ = 0;

        this.controlVar = -1;
        this.previousCurrTime = 0;

        this.angle = 0;
        this.direction = [0, 0, 0];
        this.previousDirection = [0, 0, 0];

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
       
        if(this.angle < this.rotAngle){

			//TODO adaptar o movimento para ter em conta o centro da circunferencia e o angulo inicial

		   
			
			var distance = this.radius * this.rotAngle;

			this.angle += distance * dt * this.velocity;

            this.positionX = this.center[0] + Math.cos(this.angle - this.initAngle) * this.radius;
           // var y = this.direction[1];
		   this.positionZ = this.center[2] + Math.sin(this.angle - this.initAngle) * this.radius;

			//this.positionX += x*dt*this.velocity;
			//this.positionZ += z*dt*this.velocity;
			//this.positionY += y*dt*this.velocity;
             
        }
    }

    push(){
        this.scene.translate(this.positionX, 0, this.positionZ);
    }
	
}
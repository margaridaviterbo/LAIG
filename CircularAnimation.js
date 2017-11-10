/**
 * CircularAnimation
 * 
 */
class CircularAnimation extends Animation{
	constructor(scene, center, radius, initAngle, rotAngle,velocity) {
		super();
		
		this.scene = scene;
		this.center = center;
		this.radius = radius;
		this.initAngle = initAngle;
		this.rotAngle = rotAngle;
		this.velocity = velocity;


	}

	getType(){
        return "circular";
	}
	
	update(currTime){

	}

	push(){

	}
	
}
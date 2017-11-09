/**
 * BezierAnimation
 * 
 */
class BezierAnimation extends Animation{
	constructor(scene, controlPoints, velocity) {
		super();
	
		this.scene = scene;
		this.controlPoints = controlPoints;
		this.velocity = velocity;

	}

	getType(){
        return "bezier";
    }

	update(currTime){

	}

	push(){

	}

	
}
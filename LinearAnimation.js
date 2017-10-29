/**
 * LinearAnimation
 * 
 */
class LinearAnimation extends Animation{
	constructor(scene, node, controlPoints, velocity) {
		super();
        this.say();
    
        this.scene = scene;
        this.node = node;
        this.controlPoints = controlPoints;
        this.velocity = velocity;
        
        this.x = 0;
        this.y = 0;
        this.z = 0;
	}

    update(currTime){
        /*var direction = [
            this.controlPoints[1][0] - this.controlPoints[0][0],
            this.controlPoints[1][1] - this.controlPoints[0][1],
            this.controlPoints[1][2] - this.controlPoints[0][2],
        ];
    
        var x = direction[0];
        var y = direction[1];
        var z = direction[2];
    
        this.positionX += x*0.05*this.velocity;
        this.positionZ += z*0.05*this.velocity;
        this.positionY += y*0.05*this.velocity;
        */
        //aplicar os novos valores algures num display
        
        console.log("ola");
        
    }
	
}
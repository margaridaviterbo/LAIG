/**
 * BezierAnimation
 * 
 */
class BezierAnimation extends Animation{
	constructor(scene, id, type, controlPoints, velocity) {
		super(scene, id, type);
	
		this.controlPoints = controlPoints;
		this.velocity = velocity;

		this.positionX = 0;
        this.positionY = 0;
        this.positionZ = 0;
		this.previousPositionX = 0;
		this.previousPositionY = 0;
		this.previousPositionZ = 0;

		this.previousCurrTime = 0;
		this.t = 0;
		this.angle = 0;
		this.runDistance = 0;

	}

	
	middle(a, b){

		var x = (a[0] + b[0])/2;
		var y = (a[1] + b[1])/2;
		var z = (a[2] + b[2])/2;

		var point = [x, y, z];

		return point;
	}

	bezierPoint(coord1, coord2, coord3, coord4, t){
		return Math.pow((1-t),3)*coord1 + 3*t*Math.pow((1-t),2)*coord2 + 3*Math.pow(t,2)*(1-t)*coord3 +	Math.pow(t,3)*coord4;
	}

	update(currTime){

		if(this.previousCurrTime == 0){
            this.previousCurrTime = currTime;
        }
        var dt = (currTime - this.previousCurrTime)/1000;
		this.previousCurrTime = currTime;

		if(this.t < 1){

			var ab = this.middle(this.controlPoints[0], this.controlPoints[1]);
			var bc = this.middle(this.controlPoints[1], this.controlPoints[2]);
			var cd = this.middle(this.controlPoints[2], this.controlPoints[3]);
			var abbc = this.middle(ab, bc);
			var bccd = this.middle(bc, cd);
			var point = this.middle(abbc, bccd);
			var d1 = Math.sqrt(Math.pow((point[0]-this.controlPoints[0][0]), 2) + Math.pow((point[1]-this.controlPoints[0][1]), 2) + Math.pow((point[2]-this.controlPoints[0][2]), 2));
			var d2 = Math.sqrt(Math.pow((point[0]-this.controlPoints[3][0]), 2) + Math.pow((point[1]-this.controlPoints[3][1]), 2) + Math.pow((point[2]-this.controlPoints[3][2]), 2));
			var distance = d1 + d2;
			this.runDistance += dt * this.velocity;
			this.t += this.runDistance / distance;		

			this.previousPositionX = this.positionX;
			this.previousPositionY = this.positionY;
			this.previousPositionZ = this.positionZ;

			this.positionX = this.bezierPoint(this.controlPoints[0][0], this.controlPoints[1][0], this.controlPoints[2][0], this.controlPoints[3][0], this.t);
			this.positionY = this.bezierPoint(this.controlPoints[0][1], this.controlPoints[1][1], this.controlPoints[2][1], this.controlPoints[3][1], this.t);
			this.positionZ = this.bezierPoint(this.controlPoints[0][2], this.controlPoints[1][2], this.controlPoints[2][2], this.controlPoints[3][2], this.t);

			var x = this.positionX - this.previousPositionX;
			var z = this.positionZ - this.previousPositionZ;
			this.angle = Math.atan2(z, x)

		}
		else{
			this.finished = true;
		}
	}

	push(){
		this.scene.pushMatrix();
		this.scene.translate(this.positionX, this.positionY, this.positionZ);
		this.scene.rotate(this.angle, 0, 1, 0);
	}

	
}
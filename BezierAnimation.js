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

		this.positionX = 0;
		this.positionZ = 0;

		this.previousCurrTime = 0;



	
		//this.horizontalRotAngle = horizontalAngle || 0;
		//this.verticalRotAngle = verticalAngle || 0;
		this.orientation = 0;
		this.direction = this.calculateDirection();
		this.animationTime;
		this.P2;
		this.P3;
		this.P4;
		this.t = 0;
		this.timePassed;



	}

	getType(){
        return "bezier";
	}
	
	lerp(a, b, t){
		var point = [a[0] + (b[0]-a[0])*t, 0, a[2] + (b[2]-a[2])*t];

		return point;
	}

	update(currTime){

		if(this.previousCurrTime == 0){
            this.previousCurrTime = currTime;
        }
        var dt = (currTime - this.previousCurrTime)/1000;
        this.previousCurrTime = currTime;

		if(this.positionX == this.controlPoints[3][0] && this.positionZ == this.controlPoints[3][2]){

			var ab = this.lerp(this.controlPoints[0], this.controlPoints[1], dt * this.velocity);
			var bc = this.lerp(this.controlPoints[1], this.controlPoints[2], dt * this.velocity);
			var cd = this.lerp(this.controlPoints[2], this.controlPoints[3], dt * this.velocity);
			var abbc = this.lerp(ab, bc, dt * this.velocity);
			var bccd = this.lerp(bc, cd, dt * this.velocity);
			var point = this.lerp(abbc, bccd, dt * this.velocity);
			
			this.positionX = point[0];
			this.positionZ = point[2];

			console.log("X: " + this.positionX + " Z: " + this.positionZ);

		}

		/*

		this.timePassed = 0;
		var distance = this.calculateDistance();
		this.animationTime = parseInt(distance);
		this.calculateBezierPoints();



		var dif = currTime - this.timePassed;

		if(this.bezierAnimation){
			var finalAngle = this.calculateRotationAngle();
			var direction = this.direction;

			if(this.t <= 1){
				var oldPosition = [this.positionX, this.positionY, this.positionZ];
				var t = this.t;

				this.positionX = Math.pow((1-t), 3) * this.positionX + 3*Math.pow((1-t), 2) * t * this.P2[0] + 3*(1-t) * Math.pow(t, 2) * this.P3[0] + Math.pow(t, 3) * this.P4[0];
				this.positionY = Math.pow((1-t), 3) * this.positionY + 3*Math.pow((1-t), 2) * t * this.P2[1] + 3*(1-t) * Math.pow(t, 2) * this.P3[1] + Math.pow(t, 3) * this.P4[1];
				this.positionZ = Math.pow((1-t), 3) * this.positionZ + 3*Math.pow((1-t), 2) * t * this.P2[2] + 3*(1-t) * Math.pow(t, 2) * this.P3[2] + Math.pow(t, 3) * this.P4[2];

				this.t += 1/(this.animationTime * 10);
				var vector = [this.positionX - oldPosition[0], this.positionY - oldPosition[1], this.positionZ - oldPosition[2]];

				var escalar = vector[1]*direction[1] + vector[2]*direction[2];
				var n1 = Math.sqrt(vector[1]*vector[1] + vector[2]*vector[2]);
				var n2 = Math.sqrt(direction[1]*direction[1] + direction[2]*direction[2]);
				var cos = escalar / (n1*n2);
				this.orientation += finalAngle/(this.animationTime*10);

				var escalar = vector[0]*direction[0] + vector[2]*direction[2];
				var n1 = Math.sqrt(vector[0]*vector[0] + vector[2]*vector[2]);
				var n2 = Math.sqrt(direction[0]*direction[0] + direction[2]*direction[2]);
				var cos = escalar / (n1*n2);
				this.horizontalRotAngle = Math.acos(cos); //angulo com z
			}
			else{
				this.bezierAnimation = false;
				this.scene.destroy = true;
			}
		}
		this.timePassed = currTime;*/

	}




/*


	updatePosition(posX, posY, posZ){
		
			if (this.enableUpdate){
				this.positionX = posX;
				this.positionY = posY - 1.1;
				this.positionZ = posZ;
			}
	}
		
	calculateVector(){
		
			this.P4 = [this.scene.targets[0].positionX,
					   this.scene.targets[0].positionY,
					   this.scene.targets[0].positionZ];
		
			var vector = [this.P4[0] - this.positionX,
						  this.P4[1] - this.positionY,
						  this.P4[2] - this.positionZ];
		
			return vector;
	}
		
	calculateRotationAngle(){
		
			//calculate angle between vector and origin ("z")
			var vector = this.calculateVector();
		
			var n1 = Math.sqrt(vector[0]*vector[0] + vector[2] * vector[2]);
			var cos = vector[2] / n1;
			var angle = Math.acos(cos);
		
			if (vector[0] > 0)
				return angle;
			else
				return 2*Math.PI - angle;
		
	}

	calculateDistance(){
		var vector = this.calculateVector();
		return Math.sqrt(vector[0]*vector[0] + vector[2] * vector[2]);
	}
		
		
	calculateDirection(){
	
		var vectorHorizontal = [Math.sin(this.horizontalRotAngle), 0, Math.cos(this.horizontalRotAngle)];
		var vectorVertical = [0, Math.sin(-this.verticalRotAngle), Math.cos(-this.verticalRotAngle)];
	
		var final = [vectorHorizontal[0] + vectorVertical[0], vectorHorizontal[1] + vectorVertical[1], vectorHorizontal[2] + vectorVertical[2]];
		var distance = Math.sqrt(final[0]*final[0] + final[1]*final[1] + final[2]*final[2]);
		var angle = Math.PI/2+this.verticalRotAngle;
	
		var direction = [
			Math.sin(angle) * Math.sin(this.horizontalRotAngle),
			Math.cos(angle),
			Math.sin(angle) * Math.cos(this.horizontalRotAngle)
		];
	
		this.direction = direction;
	
		return direction;
	}
		
	
	calculateBezierPoints(){

		var direction = this.calculateDirection();
		var vector = this.calculateVector();

		this.P2 = [
			this.positionX + direction[0] * 6,
			this.positionY + direction[1] * 6,
			this.positionZ + direction[2] * 6,
		];

		this.P3 = [
			this.scene.targets[0].positionX,
			this.positionY + 3,
			this.scene.targets[0].positionZ
		];
	}
*/



	push(){
		this.scene.translate(this.positionX, 0, this.positionZ);
	}

	
}
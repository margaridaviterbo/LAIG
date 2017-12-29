/**
 * LinearAnimation
 * 
 */
class LinearAnimation extends Animation{
	constructor(scene, id, type, controlPoints, velocity) {
        super(scene, id, type);
        this.controlPoints = controlPoints;
        this.velocity = velocity;

        this.controlVar = -1;
        this.previousCurrTime = 0;

        this.positionX = 0;
        this.positionY = 0;
        this.positionZ = 0;

        this.angle = 0;
        this.direction = [0, 0, 0];
        this.previousDirection = [0, 0, 0];
    }
    

    dotProduct(vec1,vec2){
        return vec1[0]*vec2[0] + vec1[1]*vec2[1] + vec1[2]*vec2[2];
    }   

    length(vec){
        return Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1] + vec[2]*vec[2]);
    }

    calcAngle() {

        if(this.previousDirection != undefined){
            var prevDir = this.previousDirection;
        }
        else{
            var prevDir = [0, 0, 1];
        }

        if(this.direction != undefined){
            var dir = [this.direction[0], 0, this.direction[2]];
        }
        else{
            var dir = [0, 0, 1];
        }

        prevDir[1] = 0;
        
	    if (this.length(dir) == 0 || this.length(prevDir) == 0) {
			return 0;
		}

        return Math.acos(this.dotProduct(prevDir, dir) / (this.length(dir)*this.length(prevDir)));
        
    }

    update(currTime){

        if(this.previousCurrTime == 0){
            this.previousCurrTime = currTime;
        }
        var dt = (currTime - this.previousCurrTime)/1000;
        this.previousCurrTime = currTime;

        if(this.controlVar < this.controlPoints.length - 1){
            if(this.positionX == this.controlPoints[this.controlVar + 1][0] && this.positionY == this.controlPoints[this.controlVar + 1][1] && this.positionZ == this.controlPoints[this.controlVar + 1][2]){
                this.controlVar++;

                if(this.controlVar != this.controlPoints.length - 1){

                    if(this.direction[0] != 0 || this.direction[2] != 0){
                        this.previousDirection = this.direction;
                    }
                    
                    this.direction = [
                        this.controlPoints[this.controlVar + 1][0] - this.controlPoints[this.controlVar][0],
                        this.controlPoints[this.controlVar + 1][1] - this.controlPoints[this.controlVar][1],
                        this.controlPoints[this.controlVar + 1][2] - this.controlPoints[this.controlVar][2],
                    ];
                    
                    this.previousAngle = this.angle;
                    this.angle += this.calcAngle();
                    if(this.angle == 0){
                        this.angle = this.previousAngle;
                    }
                }
                else{
                    this.direction = [0, 0, 1];
                    this.angle = this.previousAngle;
                } 
            }
           
            var x = this.direction[0];
            var y = this.direction[1];
            var z = this.direction[2];

            var nextX = this.positionX + x*dt*this.velocity;
            var nextY = this.positionY + y*dt*this.velocity;
            var nextZ = this.positionZ + z*dt*this.velocity;

            if(this.controlVar < this.controlPoints.length - 1) {
                if(((this.positionX <= this.controlPoints[this.controlVar + 1][0] && this.controlPoints[this.controlVar + 1][0] <= nextX) || (this.positionX >= this.controlPoints[this.controlVar + 1][0] && this.controlPoints[this.controlVar + 1][0] >= nextX)) &&
                    ((this.positionY <= this.controlPoints[this.controlVar + 1][1] && this.controlPoints[this.controlVar + 1][1] <= nextY) || (this.positionY >= this.controlPoints[this.controlVar + 1][1] && this.controlPoints[this.controlVar + 1][1] >= nextY)) && 
                    ((this.positionZ <= this.controlPoints[this.controlVar + 1][2] && this.controlPoints[this.controlVar + 1][2] <= nextZ) || (this.positionZ >= this.controlPoints[this.controlVar + 1][2] && this.controlPoints[this.controlVar + 1][2] >= nextZ))){

                    this.positionX = this.controlPoints[this.controlVar + 1][0];
                    this.positionY = this.controlPoints[this.controlVar + 1][1];
                    this.positionZ = this.controlPoints[this.controlVar + 1][2];
                }
                else {
                    this.positionX += x*dt*this.velocity;
                    this.positionZ += z*dt*this.velocity;
                    this.positionY += y*dt*this.velocity;
                }
            }
        }
        else{
            this.finished = true;
            //console.log("AQUI");
        }
    }

    push(){
        this.scene.pushMatrix();
        //if(this.finished == false){           
            this.scene.translate(this.positionX, this.positionY, this.positionZ);
            this.scene.rotate(this.angle, 0, 1, 0);
        //}
        
    }
	
}
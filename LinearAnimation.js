/**
 * LinearAnimation
 * 
 */
class LinearAnimation extends Animation{
	constructor(scene, controlPoints, velocity) {
		super();
        this.say();
    
        this.scene = scene;
        //this.node = node;
        this.controlPoints = controlPoints;
        this.velocity = velocity;
        
        this.positionX = 0;
        this.positionY = 0;
        this.positionZ = 0;

        this.controlVar = -1;
        this.previousCurrTime = 0;
    }
    
    //TODO implementar as rotaçoes

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
                    this.direction = [
                        this.controlPoints[this.controlVar + 1][0] - this.controlPoints[this.controlVar][0],
                        this.controlPoints[this.controlVar + 1][1] - this.controlPoints[this.controlVar][1],
                        this.controlPoints[this.controlVar + 1][2] - this.controlPoints[this.controlVar][2],
                    ]; 
                }
                else{
                    this.direction = [0, 0, 0];
                } 
            }
           
            var x = this.direction[0];
            var y = this.direction[1];
            var z = this.direction[2];

            this.positionX += x*dt*this.velocity;
            this.positionZ += z*dt*this.velocity;
            this.positionY += y*dt*this.velocity;

            var nextX = this.positionX + x*dt*this.velocity;
            var nextY = this.positionY + y*dt*this.velocity;
            var nextZ = this.positionZ + z*dt*this.velocity;

            if(this.controlVar != this.controlPoints.length - 1){
                if(((this.positionX <= this.controlPoints[this.controlVar + 1][0] && this.controlPoints[this.controlVar + 1][0] <= nextX) || (this.positionX >= this.controlPoints[this.controlVar + 1][0] && this.controlPoints[this.controlVar + 1][0] >= nextX)) &&
                ((this.positionY <= this.controlPoints[this.controlVar + 1][1] && this.controlPoints[this.controlVar + 1][1] <= nextY) || (this.positionY >= this.controlPoints[this.controlVar + 1][1] && this.controlPoints[this.controlVar + 1][1] >= nextY)) && 
                ((this.positionZ <= this.controlPoints[this.controlVar + 1][2] && this.controlPoints[this.controlVar + 1][2] <= nextZ) || (this.positionZ >= this.controlPoints[this.controlVar + 1][2] && this.controlPoints[this.controlVar + 1][2] >= nextZ))){

                this.positionX = this.controlPoints[this.controlVar + 1][0];
                this.positionY = this.controlPoints[this.controlVar + 1][1];
                this.positionZ = this.controlPoints[this.controlVar + 1][2];
            }
            }   
        }
    }

    push(){
        this.scene.translate(this.positionX, this.positionY, this.positionZ);        
    }
	
}
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
        
        this.positionX = 0;
        this.positionY = 0;
        this.positionZ = 0;
    }
    
    //TODO transpor este codigo para funcionar com qualquer movimento linear, quantidade de controlPoints...etc
    //TODO implementar as rotaçoes

    update(currTime){
        if(this.positionX < this.controlPoints[1][0]){
            var direction = [
                this.controlPoints[1][0] - this.controlPoints[0][0],
                this.controlPoints[1][1] - this.controlPoints[0][1],
                this.controlPoints[1][2] - this.controlPoints[0][2],
            ];
        
            var x = direction[0];
            var y = direction[1];
            var z = direction[2];
        
            this.positionX += x*0.04*this.velocity;
            this.positionZ += z*0.04*this.velocity;
            this.positionY += y*0.04*this.velocity;
        }
        else{
            if(this.positionY < this.controlPoints[2][1]){
                var direction = [
                    this.controlPoints[2][0] - this.controlPoints[1][0],
                    this.controlPoints[2][1] - this.controlPoints[1][1],
                    this.controlPoints[2][2] - this.controlPoints[1][2],
                ];
            
                var x = direction[0];
                var y = direction[1];
                var z = direction[2];
            
                this.positionX += x*0.04*this.velocity;
                this.positionZ += z*0.04*this.velocity;
                this.positionY += y*0.04*this.velocity;
            }
            else{
                if(this.positionZ < this.controlPoints[3][2]){
                    var direction = [
                        this.controlPoints[3][0] - this.controlPoints[2][0],
                        this.controlPoints[3][1] - this.controlPoints[2][1],
                        this.controlPoints[3][2] - this.controlPoints[2][2],
                    ];
                
                    var x = direction[0];
                    var y = direction[1];
                    var z = direction[2];
                
                    this.positionX += x*0.04*this.velocity;
                    this.positionZ += z*0.04*this.velocity;
                    this.positionY += y*0.04*this.velocity;
                }
            }
        }        
        
    }
	
}
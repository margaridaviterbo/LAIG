function CameraAnimation(scene,camera,finalPos){
    this.scene = scene;
    this.elapsed = 0;
    this.span = 1000;
    this.initPos = null;
    this.isDone = false;
    this.initTarget = null;
    this.vecMovement = vec3.create();
     
    this.initPos = vec3.fromValues(camera[3][0],camera[3][1],camera[3][2]);
    this.initTarget = vec3.fromValues(camera[4][0],camera[4][1],camera[4][2]);
    vec3.sub(this.vecMovement,finalPos,this.initPos);
};
CameraAnimation.prototype = Object.create(CGFobject.prototype);
CameraAnimation.prototype.constructor = CameraAnimation;

CameraAnimation.prototype.getCurrentPosition = function() {
	var percentTime = this.elapsed / this.span;

    var position = [	this.initPos[0] + this.vecMovement[0] * percentTime,
                        this.initPos[1] + this.vecMovement[1] * percentTime,
						this.initPos[2] + this.vecMovement[2] * percentTime];				
	return position;
}

CameraAnimation.prototype.getTarget = function(){

    return this.initTarget;
}

CameraAnimation.prototype.update = function(time) {
	this.elapsed += time;
	if (this.elapsed >= this.span){
		this.isDone = true;
		this.elapsed = this.span;
	}
}

CameraAnimation.prototype.reset = function(){
	this.elapsed = 0;
	this.isDone = false;
}


/**
 * ComboAnimation
 * 
 */
class ComboAnimation extends Animation{
	constructor(scene, id, type, animations) {
		super(scene, id, type);
		this.animations = animations;

	}

	update(currTime){

		var auxFinish = true;
		for(var i = 0; i < this.animations.length; i++){
			auxFinish = auxFinish && this.animations[i].finished;
		}
		this.finished = auxFinish;

		if(this.finished){
			console.log("FINISHEDDDDDDDDDDDDDDDDDDD");
		}

	}

	push(){
		for(var i = 0; i < this.animations.length; i++){
			this.animations[i].push();
		}
	}
}
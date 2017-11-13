/**
 * ComboAnimation
 * 
 */
class ComboAnimation extends Animation{
	constructor(scene, animations) {
		super();
		this.animations = animations;

	}

	update(currTime){

	}

	push(){
		for(var i = 0; i < this.animations.length; i++){
			for(var j = 0; j < this.scene.graph.animations.length; j++){
				if(this.animations[i] == this.scene.graph.animations.id){
					this.scene.graph.animations.animation.push();
				}
			}
		}

	}
}
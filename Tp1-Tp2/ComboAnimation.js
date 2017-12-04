/**
 * ComboAnimation
 * 
 */
class ComboAnimation extends Animation{
	constructor(scene, id, type, animations) {
		super(scene, id, type);
		this.animations = animations;
		this.anims = [];
		this.current = 0;

		for(var i = 0; i < this.animations.length; i++){
			for(var m = 0; m < this.scene.graph.animations.length; m++){
				var anim;
				if(this.animations[i] == this.scene.graph.animations[m].id){
					switch (this.scene.graph.animations[m].type){
						case 'linear':
							anim = new LinearAnimation(this.scene, this.scene.graph.animations[m].id, this.scene.graph.animations[m].type, this.scene.graph.animations[m].controlPoints, this.scene.graph.animations[m].velocity);
							break;
						case 'bezier':
							anim = new BezierAnimation(this.scene, this.scene.graph.animations[m].id, this.scene.graph.animations[m].type, this.scene.graph.animations[m].controlPoints, this.scene.graph.animations[m].velocity);
							break;
						case 'circular':
							anim = new CircularAnimation(this.scene, this.scene.graph.animations[m].id, this.scene.graph.animations[m].type, this.scene.graph.animations[m].center, this.scene.graph.animations[m].radius, this.scene.graph.animations[m].initAngle, this.scene.graph.animations[m].rotAngle, this.scene.graph.animations[m].velocity);
							break;
						default:
							break;
					}
				}
			}
			this.anims.push(anim);
		}
	
	}

	update(currTime){
		if(this.current === this.anims.length -1 && this.anims[this.current].finished === true){
			this.finished = true;
		}
		if(!this.finished) {
			if(this.anims[this.current].finished == false){
				this.anims[this.current].update(currTime);
			}
			else if(this.current + 1 < this.anims.length){
				this.current ++;
			}
		}
	}

	push(){
		for(var i = 0; i < this.anims.length; i++){
			this.anims[i].push();
		}
	}

	pop() {
		for (var i = 0; i < this.anims.length; i++) {
			this.anims[i].pop();
		}
	}
}
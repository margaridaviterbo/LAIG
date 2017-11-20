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
			for(var j = 0; j < this.scene.graph.animations.length; j++){
				if(this.animations[i] == this.scene.graph.animations[j].id){
					auxFinish = auxFinish && this.scene.graph.animations[j].finished;
				}
			}
		}
		this.finished = auxFinish;

		if(this.finished){
			console.log("FINISHEDDDDDDDDDDDDDDDDDDD");
		}

	}

	push(){		//TODO uma animaao devia começar onde a anterior acabou mesmo que nao seja combo animation elas têm de ser sempre fluidas corrigir isto
				//JA ESTÁ FEITO?!!! VERIFICAR SE FUNCIONA PARA A COMBO TMB
		for(var i = 0; i < this.animations.length; i++){
			for(var j = 0; j < this.scene.graph.animations.length; j++){
				if(this.animations[i] == this.scene.graph.animations[j].id){
					this.scene.graph.animations[j].push();
				}
			}
		}

	}
}
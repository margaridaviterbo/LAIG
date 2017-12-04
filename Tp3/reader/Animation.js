/**
 * Animation
 * 
 */
class Animation{

    //TODO deixar o trabalho com as animaçoes dos criterios

    constructor(scene, id, type){
        this.scene = scene;
        this.id = id;
        this.type = type;
        this.finished = false;
    }

    pop() {
        this.scene.popMatrix();
    }
}
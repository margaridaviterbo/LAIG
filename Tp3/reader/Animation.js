/**
 * Animation
 * 
 */
class Animation{

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
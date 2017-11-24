/**
 * Animation
 * 
 */
class Animation{

    //TODO sempre que uma animaçao é chamada tem de ser criada uma copia dela para ter as posiçoes certas e o finished certo e o momento em que está certo
    // AFINAL SÓ VOU TER DE ATUALIZAR O FINISHED?!!!

    constructor(scene, id, type){
        this.scene = scene;
        this.id = id;
        this.type = type;
        this.finished = false;

        this.lastPositionX = 0;
        this.lastPositionY = 0;
        this.lastPositionZ = 0;
    }
       
   // update(currTime){}

   // push(){}

}
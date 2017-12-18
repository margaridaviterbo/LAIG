function Tile(scene, board, x, y){

    this.scene = scene;
    this.board = board;
    this.x = x;
    this.y = y;
    this.size= 2;
    this.coord = [x,y,x+size,y+size];
    this.tile = new Rectangle(this.scene,this.coords);
}

Tile.prototype.display = function(){
}
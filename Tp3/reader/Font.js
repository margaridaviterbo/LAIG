function Font(scene){

    this.scene = scene;
    this.numbers = [];
    this.letters = [];
    this.letterid = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','v','w','y','z'];

};
Font.prototype = Object.create(CGFobject.prototype);
Font.prototype.constructor=Font;

Font.prototype.initFont = function(){

    for (var i = 0; i < 10; i++) {
        var path = "scenes\\images\\numbers\\" + i + ".png";
        this.numbers[i] = new CGFtexture(this.scene, path);  
    }

    for(var i = 0; i < this.letterid.length; i++){
        var path = "scenes\\images\\letters\\" + this.letterid[i] + ".png";
        this.letters[this.letterid[i]] = new CGFtexture(this.scene,path);
    }
    
}
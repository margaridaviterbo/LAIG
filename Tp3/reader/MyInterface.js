 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor 
    CGFinterface.call(this);
}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);
    
    this.gui = new dat.GUI();
    
    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {


    if(this.groupLights != null){
		for(var key in lights){
			this.groupLights.remove(this.lights[key]);
    }
    }else{
        this.groupLights = this.gui.addFolder("Lights");
    }
    this.groupLights.open();
    this.lights = [];
    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            this.lights[key]=this.groupLights.add(this.scene.lightValues, key);
        }

}
}

/**
 * Adds a folder containing the IDs of the textures passed as parameter.
 */
MyInterface.prototype.addTexturesGroup = function(textures) {
    
        var group = this.gui.addFolder("Textures");
        group.open();
    
        // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
        // e.g. this.option1=true; this.option2=false;
    
        for (var key in textures) {
            if (textures.hasOwnProperty(key)) {
                this.scene.textureValues[key] = textures[key][0];
                group.add(this.scene.textureValues, key);
            }
        }
}


MyInterface.prototype.addNodesGroup = function(nodes){
   
    var group = this.gui.addFolder("Shaders");
    this.gui.add(this.scene,'selectedNode',nodes).name('Select Node');
}

MyInterface.prototype.addSettings = function(){
    
    if(this.groupSettings != null){
		for(var i = 0; i < this.settings.length;i++){
			this.groupSettings.remove(this.settings[i]);
		}
	}else{
		this.groupSettings = this.gui.addFolder("Settings");
	}
	this.groupSettings.open();
	this.settings = [];
	
    this.settings[0] = this.groupSettings.add(this.scene, 'switchScene').name('Change Scene');
    this.settings[1] = this.groupSettings.add(this.scene, 'cameraAnimation').name('Animate Camera');
    this.settings[2] = this.groupSettings.add(this.scene, 'activateTimer').name('Activate Timer');
	this.settings[3] = this.groupSettings.add(this.scene.graph.game,'maxTime',5,50).name('Max Turn Time');

    var group = this.gui.addFolder("Game Options");//type of game, difficulty
    this.gui.add(this.scene.graph.game,'mode', { Human_Human: 0, Human_Bot: 1, Bot_Bot: 2 }).name('Mode');
    this.gui.add(this.scene.graph.game, 'difficulty', {Easy: 0, Hard: 1}).name('Difficulty');
    this.gui.add(this.scene.graph.game, 'Start_Game').name('Start Game');
    this.gui.add(this.scene.graph.game, 'ReStart_Game').name ('Restart Game');
    this.gui.add(this.scene.graph.game, 'PlayGameMovie').name('Play Game Movie');
}

MyInterface.prototype.processKeyboard = function(event) {
    // call CGFinterface default code (omit if you want to override)
    // CGFinterface.prototype.processKeyboard.call(this,event);

    switch (event.keyCode){
        //d or D
        case (68):
        case (100):
            this.scene.graph.game.undo = true;
        break;
    }
};
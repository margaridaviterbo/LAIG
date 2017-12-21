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

    var group = this.gui.addFolder("Lights");
    group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
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



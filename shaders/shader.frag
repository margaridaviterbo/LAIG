#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;
varying vec4 normal;
varying vec2 vTextureCoord;

uniform vec4 selectedColour;
uniform float normScale;
uniform sampler2D uSampler;

void main() {

	vec4 textColour = texture2D(uSampler,vTextureCoord);

	if( 15.0 > normScale && normScale > -15.0){
		gl_FragColor= selectedColour*textColour;
	}
	else if (coords.x > 0.0){
		gl_FragColor = normal*textColour;
	}
	else{

		gl_FragColor.rgb = (abs(coords.xyz)/3.0)*textColour.xyz;
		gl_FragColor.a = 1.0;
	}
}
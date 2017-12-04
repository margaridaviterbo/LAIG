#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 coords;
varying vec4 normal;

uniform float d;
uniform sampler2D uSampler;

void main(){
    
	float i = 0.0;
	vec4 color;

	if(mod(vTextureCoord.x, 2.0) == 0.0){
		i = i + 1.0;
	}

	if(mod(i, 2.0) == 0.0){
		color = vec4(0.0, 0.0, 1.0, 1.0);
	}
	else{
		color = vec4(1.0, 0.0, 0.0, 1.0);
	}

	gl_FragColor = texture2D(uSampler, vTextureCoord) * color;


    /*if (mod(vTextureCoord.x, 2.0/d) < 1.0/d) {
        if (mod(vTextureCoord.y, 2.0/d) < 1.0/d) {
            gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(0.0, 0.0, 1.0, 1.0);
        } else {
            gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(1.0, 0.0, 0.0, 1.0);
        }
    } else {
        if (mod(vTextureCoord.y, 2.0/d) < 1.0/d) {
            //multiplica a cor da textura naquele ponto pela cor que quero dar (vec4) - forma de manter a textura, senao nao punha o texture2D
            gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(1.0, 0.0, 0.0, 1.0);
        } else {
            gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(0.0, 0.0, 1.0, 1.0);
        }
    }*/
}
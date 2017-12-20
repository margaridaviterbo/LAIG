attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;


void main() {

   //vec3 pos = vec3(aVertexPosition[0]+2.0,aVertexPosition[1], aVertexPosition[2]+2.0);
   gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
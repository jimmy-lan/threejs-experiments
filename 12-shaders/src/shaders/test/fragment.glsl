precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;

void main() {
  gl_FragColor = vec4(uColor, 1.0);
}

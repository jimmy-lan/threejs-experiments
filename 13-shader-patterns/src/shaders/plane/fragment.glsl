varying vec2 vUv;

void main() {
  float x = vUv.x;
  gl_FragColor = vec4(x, x, x, 1.0);
}

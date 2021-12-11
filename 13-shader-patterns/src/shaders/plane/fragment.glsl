varying vec2 vUv;

void main() {
  // Pattern 1
  // gl_FragColor = vec4(vUv, 1.0, 1.0);

  // Pattern 2
  // float x = vUv.x;
  // gl_FragColor = vec4(x, x, x, 1.0);

  // Pattern 3
  float strength = vUv.x;

}

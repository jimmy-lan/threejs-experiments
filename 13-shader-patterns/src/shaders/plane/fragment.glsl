varying vec2 vUv;

void main() {
  // Pattern 1
  // gl_FragColor = vec4(vUv, 1.0, 1.0);

  // Pattern 2
  // float strength = vUv.x;

  // Pattern 3
  // float strength = vUv.y;

  // Pattern 4
  float strength = 1.0 - vUv.y;

  gl_FragColor = vec4(strength, strength, strength, 1.0);  

}

varying vec2 vUv;

void main() {
  // Pattern 1
  // gl_FragColor = vec4(vUv, 1.0, 1.0);

  // Pattern 2
  // float strength = vUv.x;

  // Pattern 3
  // float strength = vUv.y;

  // Pattern 4
  // float strength = 1.0 - vUv.y;

  // Pattern 5
  // If strength goes above 1, it will be treated as 1.
  // float strength = vUv.y * 12.0;

  // Pattern 6
  float strength = mod(vUv.y, 0.1) * 10.0;

  gl_FragColor = vec4(strength, strength, strength, 1.0);  

}

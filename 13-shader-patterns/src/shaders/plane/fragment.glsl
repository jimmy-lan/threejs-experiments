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
  // float strength = mod(vUv.y, 0.1) * 10.0;

  // Pattern 7
  // float strength = round(mod(vUv.y, 0.1) * 10.0);
  // NOTE: float strength = step(0.5, mod(vUv.y, 0.1) * 10.0); would yield the same result.

  // Pattern 8
  // float strength = step(0.8, mod(vUv.y, 0.1) * 10.0);

  // Pattern 9
  // float strength = step(0.8, mod(vUv.x, 0.1) * 10.0);

  // Pattern 10
  // float xStrength = step(0.8, mod(vUv.x, 0.1) * 10.0);
  // float yStrength = step(0.8, mod(vUv.y, 0.1) * 10.0);
  // float strength = xStrength + yStrength;

  // Pattern 11
  // float xStrength = step(0.8, mod(vUv.x, 0.1) * 10.0);
  // float yStrength = step(0.8, mod(vUv.y, 0.1) * 10.0);
  // float strength = step(1.1, xStrength + yStrength);
  // NOTE: float strength = xStrength * yStrength; would yield the same result.

  // Pattern 12
  // float xStrength = step(0.4, mod(vUv.x, 0.1) * 10.0);
  // float yStrength = step(0.8, mod(vUv.y, 0.1) * 10.0);
  // float strength = step(1.1, xStrength + yStrength);

  // Pattern 13
  // float xBar = step(0.4, mod(vUv.x, 0.1) * 10.0) * step(0.8, mod(vUv.y, 0.1) * 10.0);
  // float yBar = step(0.8, mod(vUv.x, 0.1) * 10.0) * step(0.4, mod(vUv.y, 0.1) * 10.0);
  // float strength = xBar + yBar;

  // Pattern 14
  // float xBar = step(0.4, mod(vUv.x, 0.1) * 10.0) * step(0.8, mod(vUv.y + 0.02, 0.1) * 10.0);
  // float yBar = step(0.8, mod(vUv.x + 0.02, 0.1) * 10.0) * step(0.4, mod(vUv.y, 0.1) * 10.0);
  // float strength = xBar + yBar;

  // Pattern 15
  float strength = abs(0.5 - vUv.x);

  gl_FragColor = vec4(strength, strength, strength, 1.0);  

}

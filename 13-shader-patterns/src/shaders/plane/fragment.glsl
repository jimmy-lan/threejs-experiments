varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

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
  // float strength = abs(0.5 - vUv.x);

  // Pattern 16
  // float xStrength = abs(0.5 - vUv.x);
  // float yStrength = abs(0.5 - vUv.y);
  // float strength = min(xStrength, yStrength);

  // Pattern 17
  // float xStrength = abs(0.5 - vUv.x);
  // float yStrength = abs(0.5 - vUv.y);
  // float strength = max(xStrength, yStrength);

  // Pattern 18
  // float xStrength = abs(0.5 - vUv.x);
  // float yStrength = abs(0.5 - vUv.y);
  // float strength = max(xStrength, yStrength);

  // Pattern 19
  // float xStrength = abs(0.5 - vUv.x);
  // float yStrength = abs(0.5 - vUv.y);
  // float strength = step(0.25, max(xStrength, yStrength));

  // Pattern 20
  // float xStrength = abs(0.5 - vUv.x);
  // float yStrength = abs(0.5 - vUv.y);
  // float strength = step(0.42, max(xStrength, yStrength));

  // Pattern 21
  // float strength = round((vUv.x - 0.05) * 10.0) / 10.0;

  // Pattern 22
  // float xStrength = round((vUv.x - 0.05) * 10.0) / 10.0;
  // float yStrength = round((vUv.y - 0.05) * 10.0) / 10.0;
  // float strength = xStrength * yStrength;

  // Pattern 23
  // float strength = random(vUv);

  // Pattern 24
  // vec2 gridUv = vec2(
  //   floor(vUv.x * 10.0) / 10.0,
  //   floor(vUv.y * 10.0) / 10.0
  // );
  // float strength = random(gridUv);

  // Pattern 25
  // vec2 gridUv = vec2(
  //   floor(vUv.x * 10.0) / 10.0,
  //   floor(vUv.y * 10.0 + vUv.x * 5.0) / 10.0
  // );
  // float strength = random(gridUv);

  // Pattern 26
  // float strength = length(vUv); 
  // NOTE: float strength = sqrt(pow(vUv.x, 2.0) + pow(vUv.y, 2.0)); would yield the same result.

  // Pattern 27
  // float strength = distance(vUv, vec2(0.3, 0.5));

  // Pattern 27
  // float strength = 1.0 - distance(vUv, vec2(0.5));

  // Pattern 28
  // float strength = 0.015 / distance(vUv, vec2(0.5));

  // Pattern 29
  // vec2 lightUv = vec2(
  //   vUv.x * 0.1 + 0.45,
  //   vUv.y * 0.5 + 0.25
  // );
  // float strength = 0.015 / distance(lightUv, vec2(0.5));

  // Pattern 30
  vec2 center = vec2(0.5);
  vec2 lightX = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
  float strengthX = 0.015 / distance(lightX, center);
  vec2 lightY = vec2(vUv.x * 0.5 + 0.25, vUv.y * 0.1 + 0.45);
  float strengthY = 0.015 / distance(lightY, center);
  float strength = lightX * lightY;
  gl_FragColor = vec4(strength, strength, strength, 1.0);  
}

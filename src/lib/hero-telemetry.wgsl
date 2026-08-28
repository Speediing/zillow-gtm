struct Params {
  time: f32,
  texel: vec2f,
}

@group(0) @binding(0) var<uniform> params: Params;

fn sdSegment(p: vec2f, a: vec2f, b: vec2f) -> f32 {
  let pa = p - a;
  let ba = b - a;
  let h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

fn hash21(p: vec2f) -> f32 {
  return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453);
}

fn roofLine(p: vec2f) -> f32 {
  let peak = vec2f(0.0, -0.12);
  let left = vec2f(-0.22, 0.05);
  let right = vec2f(0.22, 0.05);
  let eaveL = vec2f(-0.16, 0.05);
  let eaveR = vec2f(0.16, 0.05);
  let footL = vec2f(-0.16, 0.20);
  let footR = vec2f(0.16, 0.20);
  var d = sdSegment(p, left, peak);
  d = min(d, sdSegment(p, peak, right));
  d = min(d, sdSegment(p, eaveL, footL));
  d = min(d, sdSegment(p, eaveR, footR));
  d = min(d, sdSegment(p, footL, footR));
  return d;
}

fn contours(p: vec2f, t: f32) -> f32 {
  var acc = 0.0;
  for (var i = 0; i < 5; i = i + 1) {
    let fi = f32(i);
    let y0 = -0.30 + fi * 0.135;
    let amp = 0.028 + fi * 0.006;
    let freq = 4.8 + fi * 1.35;
    let speed = 0.22 + fi * 0.07;
    let y = y0 + amp * sin(p.x * freq + t * speed + fi * 1.1);
    let d = abs(p.y - y);
    acc += (1.0 - smoothstep(0.0, 0.0034, d)) * (0.24 - fi * 0.028);
    let tick = abs(fract(p.x * 2.2 + t * 0.06 + fi * 0.16) - 0.5);
    acc += (1.0 - smoothstep(0.0, 0.002, abs(d - 0.016)))
      * (1.0 - smoothstep(0.45, 0.5, tick))
      * 0.07;
  }
  return acc;
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.texel.y / max(params.texel.x, 1.0e-6);
  let p = (uv - vec2f(0.5)) * vec2f(aspect, 1.0);
  let t = params.time;

  let breathe = 1.0 + 0.018 * sin(t * 0.75);
  let roofP = (p - vec2f(0.42, -0.08)) / breathe;
  let dRoof = roofLine(roofP);
  let line = 1.0 - smoothstep(0.0, 0.0048, dRoof);
  let glow = exp(-max(dRoof, 0.0) * 18.0);

  let traces = contours(p, t);
  let cell = floor(uv * vec2f(32.0, 18.0));
  let h = hash21(cell);
  let spark = step(0.974, h) * (0.4 + 0.6 * sin(t * 1.6 + h * 36.0));

  let blue = vec3f(0.0, 0.415686, 1.0);
  let paper = vec3f(0.960784, 0.945098, 0.909804);
  let leftClear = smoothstep(0.34, 0.62, uv.x);
  var a = line * 0.26 + glow * 0.07 + traces * 0.30 + spark * 0.05;
  a *= 0.55 * leftClear;
  a = clamp(a, 0.0, 0.32);
  let col = mix(blue, paper, spark * 0.4 + line * 0.06);
  return vec4f(col * a, a);
}

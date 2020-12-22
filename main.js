function smoothstep(edge0, edge1, x) {
  x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return x * x * (3 - 2 * x);
}

function clamp(x, lowerlimit, upperlimit) {
  if (x < lowerlimit) x = lowerlimit;
  if (x > upperlimit) x = upperlimit;
  return x;
}

function componentToHex(c) {
  var hex = Math.floor(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function noise(x, y) {
        let k = simplex(x * 0.004, y * 0.004) * 1 +
                //simplex(x * 0.008, y * 0.008) * 0.5 +
                //simplex(x * 0.016, y * 0.016) * 0.25 +
                //simplex(x * 0.032, y * 0.032) * 0.175 +
                //simplex(x * 0.064, y * 0.064) * 0.0875 +
                simplex(x * 0.128, y * 0.128) * 0.04375 +
                //simplex(x * 0.256, y * 0.256) * 0.021875 +
                //simplex(x * 0.512, y * 0.512) * 0.0109375 +
                simplex(x * 1.024, y * 1.024) * 0.0109375 / 2 +
                simplex(x * 2.048, y * 2.048) * 0.0109375 / 4 +
                0;
        return Math.min(k, 1.0);
}

function draw_pixel(ctx, x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
}

let c = document.getElementById('map');
let ctx = c.getContext('2d');
ctx.fillStyle = '#77AA77';
ctx.fillRect(0, 0, c.width, c.height);

let noise_x_offset = Math.random() * 1000000;
let noise_y_offset = Math.random() * 1000000;

// map gen
for (let i = 0; i < c.width; i++) {
        for (let j = 0; j < c.height; j++) {
                /*
                let n = (noise(i + noise_x_offset, j + noise_y_offset) + 1.0) / 2.0 * 255.0;
                draw_pixel(ctx, i, j, rgbToHex(0, n, 0));
                */

                let n = noise(i + noise_x_offset, j + noise_y_offset) + 0.1;
                if (n > 0.8) {
                        draw_pixel(ctx, i, j, rgbToHex(255, 255, 110));
                } else if (n > -0.35) {
                        draw_pixel(ctx, i, j, rgbToHex(0, 255, 0));
                } else if (n > -0.45) {
                        draw_pixel(ctx, i, j, rgbToHex(255, 255, 110));
                } else {
                        draw_pixel(ctx, i, j, rgbToHex(0, 0, 255));
                }
        }
}

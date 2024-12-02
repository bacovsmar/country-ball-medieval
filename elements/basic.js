import { enemyRadius, playerRadius } from "constants";

let lastTime = Date.now();
let elapsedTime = 0;
let timePeriod = 5000.0;
let isGrowing = true;

function linearGradient(canvas, ctx) {
    elapsedTime += ((isGrowing) ? 1.0 : (-1.0)) * (Date.now() - lastTime) / timePeriod;
    lastTime = Date.now();

    const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, 'red');
    grd.addColorStop(elapsedTime, 'darkgreen');
    grd.addColorStop(1, '#000');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (elapsedTime >= 0.98) {isGrowing = false; elapsedTime = 0.95;}
    if (elapsedTime <= 0.05) {isGrowing = true; elapsedTime = 0.06;}
}

function clear(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(ctx, sx, sy, radius, width, color) {
    const oldWidth = ctx.lineWidth;
    const oldColor = ctx.strokeStyle;

    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = oldWidth;
    ctx.strokeStyle = oldColor;
}

export function drawPlayer(ctx, sx, sy) {
    drawCircle(ctx, sx - 2, sy - 2, playerRadius, 5, "#0A0");
    drawCircle(ctx, sx, sy, playerRadius, 3, "#0E0");
}

export function drawEnemy(ctx, sx, sy) {
    drawCircle(ctx, sx + 2, sy + 2, enemyRadius,5, '#A00');
    drawCircle(ctx, sx, sy, enemyRadius,2, '#D00');
}

export {drawCircle, linearGradient, clear};

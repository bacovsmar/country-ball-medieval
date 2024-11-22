import { enemyRadius, playerRadius } from "constants";

function linearGradient(canvas, ctx) {
    const grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, 'red');
    grd.addColorStop(0.5, 'darkgreen');
    grd.addColorStop(1, 'black');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    drawCircle(ctx, sx, sy, playerRadius, 3, "lightgreen");
}

export function drawEnemy(ctx, sx, sy) {
    drawCircle(ctx, sx, sy, enemyRadius,2, 'red');
}

export {drawCircle, linearGradient, clear};

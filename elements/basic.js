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

function drawCircle(ctx, sx, sy) {
    ctx.beginPath();
    ctx.arc(sx, sy, 40, 0, Math.PI * 2);
    ctx.stroke();
}

export {drawCircle, linearGradient, clear};

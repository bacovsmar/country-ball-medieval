import { clear, linearGradient, drawCircle } from "basicElements";
import { updateMovement } from "playerMovement";

const canvas = document.getElementById('main');
const ctx = canvas.getContext('2d');

let x = 0;
let y = 0;

const subscription = setInterval(() => {
    clear(canvas, ctx);
    linearGradient(canvas, ctx);
    [x, y] = updateMovement({x, y}, true);
    drawCircle(ctx, x, y);
}, 25);

ctx.fillStyle = 'gray';
ctx.fillRect(0, 0, canvas.width, canvas.height);

var oldLineWidth = ctx.lineWidth;

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(canvas.width, canvas.height);
ctx.lineWidth = 20;
ctx.strokeStyle = "lightgreen";
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0, canvas.height);
ctx.lineTo(canvas.width, 0);
ctx.lineWidth = 40;
ctx.strokeStyle = "orange";
ctx.stroke();
ctx.strokeStyle = 'black';
ctx.lineWidth = oldLineWidth;



import { clear, linearGradient, drawPlayer} from "basicElements";
import { drawEnemies, canPlayerMove, moveEnemies } from "enemy";
import { updateMovement } from "playerMovement";
import {playerRadius} from "constants";

const canvas = document.getElementById('main');
const ctx = canvas.getContext('2d');

let player = {x: playerRadius, y: playerRadius};

const subscription = setInterval(() => {
    clear(canvas, ctx);
    linearGradient(canvas, ctx);
    drawPlayer(ctx, player.x, player.y);
    let x, y;
    [x, y] = updateMovement({x: player.x, y: player.y}, true);
    if (canPlayerMove(x, y)) {
        player.x = x;
        player.y = y;
    }
    moveEnemies(player);
    drawEnemies(ctx);
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
ctx.strokeStyle = '#000';
ctx.lineWidth = oldLineWidth;



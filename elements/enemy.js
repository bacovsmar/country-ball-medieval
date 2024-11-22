import { drawEnemy } from "basicElements";
import { playerRadius, enemyRadius, enemyMaxVelocity, canvasWidth, canvasHeight } from "constants";

var lastTime = Date.now();
var lastActionTime = 0;

const enemies = [
    {id: 1, x: 50, y: 100, alive: true, moveDir: {x: 0, y: 0}},
    {id: 2 ,x: 150, y: 50, alive: true, moveDir: {x: 0, y: 0}},
    {id: 3 ,x: 200, y: 150, alive: true, moveDir: {x: 0, y: 0}},
];

const  enemyPlayerMinimalDistance = (playerRadius + enemyRadius) * (playerRadius + enemyRadius);
const  enemyEnemyMinimalDistance = 4 * enemyRadius * enemyRadius;

function doCirclesPass(a, b, isPlayer) {
    let xDiff = a.x - b.x;
    let yDiff = a.y - b.y;

    return ((xDiff * xDiff) + (yDiff * yDiff)) >= ((isPlayer) ? enemyPlayerMinimalDistance : enemyEnemyMinimalDistance);
}

function canEnemyMove(player, enemy) {
  let canMove = enemies
      .filter(e => (e.id !== enemy.id))
      .reduce((s, e) => s && doCirclesPass(e, enemy, false), true);
  return canMove && doCirclesPass(player, enemy, true);
}

export function moveEnemies(player) {
    const timeDiff = Date.now() - lastTime;
    lastActionTime += timeDiff;
    lastTime = Date.now();
    if (lastActionTime > 500) {
        enemies.forEach((enemy) => enemy.moveDir = {x: 2.0 * Math.random() - 1.0, y: 2.0 * Math.random() - 1.0});
        lastActionTime = 0;
    }

    enemies.forEach(enemy => {
        const generalVelocity = enemyMaxVelocity * timeDiff / 25.0;
        const possibleMove = {
            x: Math.min(canvasWidth - enemyRadius, Math.max(enemyRadius, enemy.x + enemy.moveDir.x * generalVelocity)),
            y: Math.min(canvasHeight - enemyRadius, Math.max(enemyRadius, enemy.y + enemy.moveDir.y * generalVelocity)),
            id: enemy.id,
        }
        if (canEnemyMove(player, possibleMove)) {
            enemy.x = possibleMove.x;
            enemy.y = possibleMove.y;
        }
    });
}


export function drawEnemies(ctx) {
    enemies.forEach(enemy => {
        drawEnemy(ctx, enemy.x, enemy.y);
    })
}

export function canPlayerMove(x, y) {
    let canMove = true;

    enemies.forEach(enemy => {
       let xDiff = x - enemy.x;
       let yDiff = y - enemy.y;

        canMove &= doCirclesPass({x, y}, enemy, true);
    });

    return canMove;
}

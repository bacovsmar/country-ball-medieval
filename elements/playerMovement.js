import {canvasHeight, canvasWidth, playerMaxVelocity, playerRadius} from 'constants';
let lastTimeMeasure = Date.now();

let movement = {
    up: {active: false, velocity: 0, period: 0},
    down: {active: false, velocity: 0, period: 0},
    left: {active: false, velocity: 0, period: 0},
    right: {active: false, velocity: 0, period: 0},
};

const firstEasyStep = 400.0;
const secondEasyStep = 1000.0;

function easyFunction(time) {
    if (time < firstEasyStep) {
        return 0.5 * (time / firstEasyStep) * playerMaxVelocity;
    }
    if (time < secondEasyStep) {
        const delta = secondEasyStep - firstEasyStep;
        return 0.5 * (1.0 + (time - firstEasyStep) / delta) * playerMaxVelocity;
    }
    return playerMaxVelocity;
}

function setOrUnsetMovement(key, isSet) {
    const setInit = (isSet) => {
        return {active: isSet, period: 0, velocity: 0};
    };

    switch (key) {
        case "ArrowDown":
            if (isSet !== movement.down.active)
                movement.down = setInit(isSet);
            break;
        case "ArrowLeft":
            if (isSet !== movement.left.active)
                movement.left = setInit(isSet);
            break;
        case "ArrowRight":
            if (isSet !== movement.right.active)
                movement.right = setInit(isSet);
            break;
        case "ArrowUp":
            if (isSet !== movement.up.active)
                movement.up = setInit(isSet);
            break;
    }
}

document.addEventListener('keydown', (e) => {
    setOrUnsetMovement(e.key, true);
});

document.addEventListener('keyup', (e) => {
    setOrUnsetMovement(e.key, false);
});

function updatePeriods(diffTime) {
    for (let key in movement) {
        const prop = movement[key];
        if (prop.active) {
            prop.period += diffTime;
            prop.velocity = easyFunction(prop.period);
        }
    }
}

export function updateMovement(pos) {
    const diffTime = Date.now() - lastTimeMeasure;
    lastTimeMeasure = Date.now();

    updatePeriods(diffTime);

    pos.x +=
        (movement.left.active) ? - movement.left.velocity : 0
        + (movement.right.active) ? movement.right.velocity : 0;
    pos.y +=
        (movement.up.active) ? - movement.up.velocity : 0
        + (movement.down.active) ? movement.down.velocity : 0;

    pos.x = Math.min(canvasWidth - playerRadius, Math.max(playerRadius, pos.x));
    pos.y = Math.min(canvasHeight - playerRadius, Math.max(playerRadius, pos.y));

    return [pos.x, pos.y];
}

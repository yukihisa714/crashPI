const can = document.getElementById("canvas");
const con = can.getContext("2d");
can.width = 300;
can.height = 300;
can.style.background = "#aaa";

const FPS = 1000000;

let crashCount = 0;

class Block {
    constructor(x, y, size, speed, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.size2 = this.size / 2;
        this.speed = speed;
        this.speed2 = this.speed / FPS;
        this.weight = weight;
    }

    move() {
        this.speed2 = this.speed / FPS;

        this.x += this.speed2;
    }

    draw() {
        con.fillStyle = "#f00";
        con.fillRect(this.x - this.size2, this.y, this.size, -this.size);

        con.fillStyle = "#000";
        con.fillText(this.weight, this.x, this.y - this.size2);
        // con.fillText(this.speed, this.x, this.y - this.size2);
    }
}

function getSpeed(m1, v1, m2, v2) {
    return {
        v1: (m2 * (-v1 + 2 * v2) + v1 * m1) / (m1 + m2),
        v2: (m1 * (2 * v1 - v2) + v2 * m2) / (m1 + m2)
    };
}


const block1 = new Block(100, 300, 20, 0, 1);
const block2 = new Block(200, 300, 80, -200, 1000000);

function crashCalcultion() {
    if (block1.x - block1.size2 + block1.speed2 < 0) {
        block1.speed *= -1;

        crashCount++;
    }

    else if (block2.x - block2.size2 + block2.speed2 < block1.x + block1.size2 + block1.speed2) {
        const p = getSpeed(block1.weight, block1.speed, block2.weight, block2.speed);
        block1.speed = p.v1;
        block2.speed = p.v2;

        crashCount++;
    }

    block1.move();
    block2.move();
}

function mainLoop() {
    con.clearRect(0, 0, can.width, can.height);

    for (let i = 0; i < 10000; i++) {
        crashCalcultion();
    }

    block2.draw();
    block1.draw();

    con.fillStyle = "#000";
    con.fillText(crashCount, 10, 10);
}

setInterval(mainLoop, 1000 / 16);
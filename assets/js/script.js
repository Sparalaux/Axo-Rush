console.log("JS chargé");

// ===== MODALS =====
const modal = document.getElementById("myModal");
const modal2 = document.getElementById("myModal2");
const span = document.getElementsByClassName("close")[0];


// ===== UI =====
const scoreText = document.querySelector(".score h3");
const timeText = document.querySelector(".timer");

// ===== GAME ELEMENTS =====
const joueur = document.querySelector(".joueur");
const danger = document.querySelector(".danger");
const finalScoreText = document.getElementById("finalScore");
const finalTimeText = document.getElementById("finalTime");
const replayBtn = document.getElementById("replayBtn");
const gameArea = document.getElementById("gameArea");

// ===== GAME STATE =====
let score = 0;
let time = 0;
let gameOver = false;
let gameStarted = false;
const areaWidth = gameArea.clientWidth;
const areaHeight = gameArea.clientHeight;


// ===== POISSONS =====
let poissons = [];
const maxPoissons = 5;
const poissonLifetime = 4000;

// ===== DANGER =====
let dangerSpeed = 4;

// ===== TIMERS =====
let chronoInterval;
let poissonSpawnInterval;
let gameLoopInterval;

// ================== MODALS ==================

span.onclick = () => {
    modal.style.display = "none";
    startGame();
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        startGame();
    }
};

function start() {
    modal.style.display = "block";
}

document.addEventListener("DOMContentLoaded", start);

// ================== INPUT ==================

document.addEventListener("keydown", (e) => {
    if (!gameStarted || gameOver) return;

    const change = 15;
    const cs = getComputedStyle(joueur);
    let left = parseInt(cs.left);
    let top = parseInt(cs.top);

    const maxX = areaWidth - 100;
    const maxY = areaHeight - 120;

    switch (e.code) {
        case "ArrowLeft":
            if (left > 0) joueur.style.left = left - change + "px";
            break;
        case "ArrowRight":
            if (left < maxX) joueur.style.left = left + change + "px";
            break;
        case "ArrowUp":
            if (top > 0) joueur.style.top = top - change + "px";
            break;
        case "ArrowDown":
            if (top < maxY) joueur.style.top = top + change + "px";
            break;
    }
});

// ================== GAME FUNCTIONS ==================

function startGame() {
    resetGame();
    gameStarted = true;

    startChrono();
    startPoissonSpawn();
    spawnDanger();

    gameLoopInterval = setInterval(gameLoop, 30);
}

function resetGame() {
    // reset state
    score = 0;
    time = 0;
    gameOver = false;

    scoreText.innerHTML = "score: 0";
    timeText.innerHTML = "temps: 0";

    // reset player
    joueur.style.left = "50%";
    joueur.style.top = "50%";

    // clear poissons
    poissons.forEach(p => p.remove());
    poissons = [];

    // clear intervals
    clearInterval(chronoInterval);
    clearInterval(poissonSpawnInterval);
    clearInterval(gameLoopInterval);

    modal2.style.display = "none";
}

// ================== CHRONO ==================

function startChrono() {
    chronoInterval = setInterval(() => {
        time++;
        timeText.innerHTML = "temps: " + time;
    }, 1000);
}

// ================== POISSONS ==================

function startPoissonSpawn() {
    poissonSpawnInterval = setInterval(() => {
        if (poissons.length < maxPoissons && !gameOver) {
            createPoisson();
        }
    }, 800);
}

function createPoisson() {
    const poisson = document.createElement("img");
    poisson.src = "./assets/images/poisson.png";
    poisson.classList.add("poisson");

    poisson.style.left = Math.random() * (areaWidth - 40) + "px";
    poisson.style.top = Math.random() * (areaHeight - 40) + "px";

    gameArea.appendChild(poisson);
    poissons.push(poisson);

    setTimeout(() => {
        if (poissons.includes(poisson)) {
            poisson.remove();
            poissons = poissons.filter(p => p !== poisson);
        }
    }, poissonLifetime);
}

// ================== DANGER ==================

function spawnDanger() {
    danger.style.left = "-60px";
    danger.style.top = Math.random() * (areaHeight - 60) + "px";
}

function moveDanger() {
    let x = parseInt(danger.style.left);
    x += dangerSpeed;
    danger.style.left = x + "px";

    if (x > window.innerWidth) spawnDanger();
}

// ================== COLLISIONS ==================

function isColliding(a, b) {
    const r1 = a.getBoundingClientRect();
    const r2 = b.getBoundingClientRect();

    return !(
        r1.right < r2.left ||
        r1.left > r2.right ||
        r1.bottom < r2.top ||
        r1.top > r2.bottom
    );
}

// ================== GAME LOOP ==================

function gameLoop() {
    if (gameOver) return;

    // Danger
    moveDanger();
    if (isColliding(joueur, danger)) {
        endGame();
        return;
    }

    // Poissons
    poissons.forEach((poisson, index) => {
        if (isColliding(joueur, poisson)) {
            score++;
            scoreText.innerHTML = "score: " + score;
            poisson.remove();
            poissons.splice(index, 1);
        }
    });
}

// ================== GAME OVER ==================

function endGame() {
    gameOver = true;

    finalScoreText.innerHTML = "Score : " + score;
    finalTimeText.innerHTML = "Temps survécu : " + time + " s";

    modal2.style.display = "block";

    clearInterval(chronoInterval);
    clearInterval(poissonSpawnInterval);
}

replayBtn.addEventListener("click", () => {
    modal2.style.display = "none";
    startGame();
});





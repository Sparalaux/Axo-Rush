console.log("Js chargé")

// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
let score = 0;
const scoreText = document.querySelector(".score h3");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    jeu();
}
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      jeu();
    }
}


function start(){
    modal.style.display = "block";
}

document.addEventListener("onload", start());

const time = document.querySelector(".timer");
// console.log(time);

function chronometre(){
    var sec = 1;
    setInterval(function(){
        time.innerHTML ="temps: "+sec;
        sec++;
        // console.log(sec);
    }, 1000);
}

const holdfish = document.querySelector(".holdfish");

function spawnPoisson() {
    const posx = Math.random() * (window.innerWidth - 50);
    const posy = Math.random() * (window.innerHeight - 50);

    holdfish.style.left = posx + "px";
    holdfish.style.top = posy + "px";
    holdfish.innerHTML = `<img class="poisson" src="./assets/images/poisson.png">`;
}

function isColliding(a, b) {
    const rect1 = a.getBoundingClientRect();
    const rect2 = b.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

function addScore() {
    score++;
    scoreText.innerHTML = "score: " + score;
}

function jeu(){
    const joueur = document.querySelector(".joueur");
    pos = joueur.getBoundingClientRect();
    console.log(pos.top, pos.left, pos.bottom, pos.right);

    const hautecran = window.innerHeight;
    const largeecran = window.innerWidth;
    console.log(hautecran, largeecran);


    document.addEventListener("keydown", (e) => {
        const key = e.code;
        console.log(key);
        const cs = getComputedStyle(joueur);

        e.preventDefault();
    
        const change = 10;
        const regex = /[\d\.]*/;
    
        let left = parseInt(cs.left);
        let top = parseInt(cs.top);
    
        // LEFT key pressed
        if (key === "ArrowLeft" && left > 0) {
            joueur.style.left = (left - change) + "px";
        }
        // TOP key pressed
        if (key === "ArrowUp" && top>0) {
            joueur.style.top = (top - change)+'px';
        }
        // RIGHT key pressed
        if (key === "ArrowRight" && left < largeecran - 100) {
            joueur.style.left = (left + change) + "px";
        }
        // DOWN key pressed
        if (key === "ArrowDown" && top<hautecran-120) {
            joueur.style.top = (top + change)+"px";
        }
    });
    
    chronometre();

    spawnPoisson();

    setInterval(() => {
        const joueur = document.querySelector(".joueur");
        const poissonImg = document.querySelector(".poisson");

        if (poissonImg && isColliding(joueur, poissonImg)) {
            addScore();
            spawnPoisson();
        }
    }, 50);
}




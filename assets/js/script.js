console.log("Js chargé")

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
  
    const left = cs.left;
    const top = cs.top;
    const leftNumber = left.match(regex);
    const topNumber = top.match(regex);
  
    // LEFT key pressed
    if (key === "ArrowLeft" && leftNumber[0]>0) {
      joueur.style.left = `${parseFloat(leftNumber[0]) - change}px`;
    }
    // TOP key pressed
    if (key === "ArrowUp" && topNumber[0]>30) {
        joueur.style.top = `${parseFloat(topNumber[0]) - change}px`;
    }
    // RIGHT key pressed
    if (key === "ArrowRight" && leftNumber[0]<largeecran-100) {
        joueur.style.left = `${parseFloat(leftNumber[0]) + change}px`;
    }
    // DOWN key pressed
    if (key === "ArrowDown" && topNumber[0]<hautecran-120) {
        joueur.style.top = `${parseFloat(topNumber[0]) + change}px`;
    }
  });

const time = document.querySelector(".timer");
console.log(time);

function chronometre(){
    var sec = 1;
    setInterval(function(){
        time.innerHTML ="temps: "+sec;
        sec++;
        // console.log(sec);
    }, 1000);
}

document.addEventListener("onload",chronometre());
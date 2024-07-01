console.log("Js chargé")

// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

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

function poisson(posx,posy){
    holdfish.style.left = posx+"px";
    holdfish.style.top = posy+"px";
    holdfish.innerHTML = `<img class="poisson" src="./assets/images/poisson.png">`
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
    
    chronometre();

    poisson(0,50);

// setInterval(() =>{
//     var posx = Math.floor(Math.random() * largeecran);
//     var posy = Math.floor(Math.random() * hautecran);
//     // console.log(posx, posy);
//     poisson(posx,posy);
// },1000);
}




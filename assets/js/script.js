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
    if (key === "ArrowRight" && leftNumber[0]<1820) {
        joueur.style.left = `${parseFloat(leftNumber[0]) + change}px`;
    }
    // DOWN key pressed
    if (key === "ArrowDown" && topNumber[0]<840) {
        joueur.style.top = `${parseFloat(topNumber[0]) + change}px`;
    }
  });

// document.addEventListener("keydown", (ev) => {

//   const dir = (ev.key.match(/(?<=^Arrow)\w+/)||[])[0];
//   if (!dir) return; // Not an arrow key.
  
//   ev.preventDefault(); // Prevent Browser scroll if overflow

//   ({
//     Left:  () => pos.x -= 5,
//     Right: () => pos.x += 5,
//     Up:    () => pos.y -= 5,
//     Down:  () => pos.y += 5,
//   }[dir])(); 
  
//   joueur.style.transform = `translate(${pos.x}px, ${pos.y}px)`
// });
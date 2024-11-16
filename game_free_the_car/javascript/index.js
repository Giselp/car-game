const startBtn = document.getElementById("start-btn")
startBtn.addEventListener("click", resetGame)

function resetGame() {
  const rec = levels[currentLevel];
  rec.forEach((rectangle) => {
    rectangle.resetPosition();
  })
}

const popupNextLevel = document.getElementById("popup-nextlevel")
const popupWinner = document.getElementById("popup-winner");
const popupGameOver = document.getElementById("popup-gameover");

const infoContainer = document.getElementById("info-container")
const exitBtn = document.getElementById("exit-btn");

const continueBtn = document.getElementById("continue");
continueBtn.addEventListener("click", nextLevel, resetGame)

const levelNum = document.getElementById("level");

function nextLevel() {
   if (currentLevel < levels.length - 1) {
     currentLevel++;
      popupNextLevel.style.display = "none"
      infoContainer.style.display = "block"
      exitBtn.style.display = "block"
      canvas.elt.style.display = "block"
      

     console.log("nivel 2")
   } else {
     console.log("nivel 3")
   }
}



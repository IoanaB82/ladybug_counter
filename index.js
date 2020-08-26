//randomly draw 
let r = 15; //r is radius of circle
let randomNumber;
let clicks = 3;

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
const startBtn = document.querySelector("#start");

const msg = document.querySelector("#message");

startBtn.addEventListener("click", resetGame);


const answer = document.getElementById("answer");
const allNumbers = answer.childNodes;

const tries = document.getElementById("tries");
const ladybug = document.querySelector("#background");


function drawCircles() {
    
    randomNumber = getRandomNumber();
 
    let protection = 0;
    let drawnCircles = [];
    
    
   
    while(drawnCircles.length<randomNumber) {
        let { randomX, randomY } = randomCoordinates();
        class Circle {
            constructor(){
                this.x = randomX,
                this.y = randomY,
                this.r = 15
            }
        }
            let overlapping = false;
            let proposal = new Circle();
           
            for(let j = 0; j<drawnCircles.length; j++){
                let existing = drawnCircles[j];
                
                let d = dist(existing.x, existing.y, proposal.x, proposal.y);
              
              
                 if (d < existing.r+proposal.r) {
                    overlapping = true;
                    break;
                    }        
            }
           
        if (!overlapping) {
            drawnCircles.push(proposal);
           
            ctx.beginPath();
            ctx.arc(proposal.x, proposal.y, proposal.r, 0, 2 * Math.PI);
            ctx.fillStyle = "yellow";
            ctx.fill();
        }
        protection++;

        if (protection > 5000) {
            break;
        }  
    }

}




function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}



function resetGame() {
    answer.addEventListener("click", compareResult);
    msg.classList.add('hidden');
    ladybug.classList.remove("win");
    clearCanvas();
    clicks = 3;
    tries.innerText = `Tries left: ${clicks}`;
    drawCircles();
    removeClass();
}


function randomCoordinates() {
    const width = canvas.width;
    const height = canvas.height;
    let randomX = Math.floor(Math.random() * (width));
    let randomY = Math.floor(Math.random() * (height));
    //adjust coordinates to not cross over canvas margin
    if (randomX < r) { randomX = randomX + (r + 1 - randomX); }
    if (randomX > (width - r)) { randomX = -(r + 1 - randomX); }
    if (randomY < r) { randomY = randomY + (r + 1 - randomY); }
    if (randomY > (height - r)) { randomY = -(r + 1 - randomY); }

    return { randomX, randomY };

}

function getRandomNumber() {
    randomNumber = Math.floor(Math.random() * 10 + 1);
   
    return randomNumber;
}


function compareResult() {

    const element = event.target;

    let value = parseInt(element.innerHTML);
 
    if(clicks >= 1) {
        checkValues(value);
        clicks--;
        tries.innerText = `Tries left: ${clicks}`;
    }

    if(clicks == 0) {
        msg.innerHTML = "End game";
        answer.removeEventListener("click", compareResult);
    }

}



function checkValues(value) {

    msg.classList.add('hidden');
    if (value === randomNumber) {
        msg.classList.remove('hidden');
        msg.innerHTML = "Great!<br> Click on start button for a new game";
        answer.removeEventListener("click", compareResult);

        ladybug.classList.add("win");

        clearCanvas();
        animateDivs();
    }
    else {
        msg.classList.remove('hidden');
        msg.innerHTML = "Wrong! Try again!";
    }
}

function startAnimation() {
   
    ladybug.classList.add("win");
  
    animateDivs();
    clearCanvas();


}

function animateDivs() {

    let box = document.querySelectorAll("div.box");
    for (let i = 0; i < box.length; i++) {
        setTimeout(function () {
            box[i].classList.add("light")
        }, 50 * i);
    }
}

function removeClass() {
    let box = document.querySelectorAll("div.box");
    for (let i = 0; i < box.length; i++) {
          box[i].classList.remove("light");
     
    }
}


function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
}
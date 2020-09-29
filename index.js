//randomly draw 
let r = 15; //r is radius of circle

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const startBtn = document.getElementById("start");
const msg = document.getElementById("message");
const answer = document.getElementById("answer");
const allNumbers = answer.childNodes;
//answer.addEventListener("click", compareResult);
const tries = document.getElementById("tries");
let box = document.querySelectorAll("div.box");
const ladybug = document.getElementById("background");
//const colors = ["salmon", "green", "grey", "black", "#344ceb", "#eb34cf", "34e2eb", "yellow",
//    "orange", "brown", "aqua", "#34eb93", "#34eb4c", "#7deb34"];
startBtn.addEventListener("click", resetGame);
//checkBtn.addEventListener("click", compareResult);

let randomNumber;
let clicks = 3;



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
           
            //let color = colors[Math.floor(Math.random() * colors.length)];
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
    tries.classList.remove('hidden');
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
    // theRandomNumber = randomNumber;
    return randomNumber;
}


function compareResult() {

    const element = event.target;

    let value = parseInt(element.innerHTML);
 
    if(value != randomNumber){
        clicks--;
        msg.classList.remove('hidden');
        tries.innerText = `Tries left: ${clicks}`;
        msg.innerHTML = "Wrong! Try again!";
        
        if(clicks === 0) {
            msg.innerHTML = "End game";
            answer.removeEventListener("click", compareResult);
        }
    }

    else {
        msg.classList.remove('hidden');
        msg.innerHTML = "Great!<br> Click on start button for a new game";
        tries.classList.add('hidden');
        answer.removeEventListener("click", compareResult);

        startAnimation();
    }
    

}





function startAnimation() {
    
 

    ladybug.classList.add("win");
  
    animateDivs();

    clearCanvas();


}

function animateDivs() {

   
    for (let i = 0; i < box.length; i++) {
        setTimeout(function () {
            box[i].classList.add("win")
        }, 50 * i);
    }
}
function removeClass() {
    
    for (let i = 0; i < box.length; i++) {
        //setTimeout(function(){
        box[i].classList.remove("win");
        //},50*i);
    }
}




function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
}



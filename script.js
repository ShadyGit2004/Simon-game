let body = document.querySelector('#simon-game');
let span = document.querySelector("h2 span");
let h3 = document.querySelector("h3");
let btns = document.querySelectorAll(".btn");
let startBtn = document.querySelector("#start");

let started = false;
let level = 0;
let highestScore = 0;
span.innerHTML = `<b>${localStorage.getItem("highestScore")}</b>`;

let colorArr = ['red','green', 'blue', 'yellow'];
let gameSeq = [];
let userSeq = [];

function showStartBtn(started) {
    started ? 
    startBtn.style.display = "none": 
    startBtn.style.display = "block";
}

document.addEventListener("keypress",()=>{
    if (!started) {
        started = true;
        levelUp();
        randomFlash();
    }
    showStartBtn(started);
});

startBtn.addEventListener("click",()=>{
    if (!started) {
        started = true;
        levelUp();
        randomFlash();
    }
    showStartBtn(started);
});

function levelUp() {
    level++;
    h3.innerText = `level ${level}`;

    userSeq = []; 
}

function randomFlash() {
    let randomBtn = Math.floor(Math.random() * 4);
    let btn = document.querySelector(`#${colorArr[randomBtn]}`);

    // console.log(randomBtn, colorArr[randomBtn]);        
    // console.log(btn);
        
    gameSeq.push(colorArr[randomBtn]);
    // console.log('game : '+ gameSeq);           
    flash(btn);   
}

function checkSequence(){    
    if (userSeq[gameSeq.length-1] === gameSeq[gameSeq.length-1]) {
        levelUp();
        setTimeout(() => {
            randomFlash(); 
        }, 1000);          
    }           
} 

for (let btn of btns) {
    btn.addEventListener("click",(e)=>{
        // console.log(e.target.id);
        let color = e.target.id;
        userSeq.push(color);
        // console.log('user : '+ userSeq);
        
        flash(btn);    
        if (color === gameSeq[userSeq.length-1]) {
            checkSequence(); 
        }else{           
            body.style.backgroundColor = 'red';
            setTimeout(() => {
                body.style.backgroundColor = 'rgb(236, 236, 236)';
            }, 170);
            h3.innerHTML = `<b>Game Over</b> &nbsp <i>your score was : ${level} <br><br> Press F5 to play again</i>`; 
            checkHighestScore(level)           
            reset();
        }                   
    })
}

function flash(btn) {

    btn.classList.add('flash');    
    // console.log(btn);    
    setTimeout(() => {
        btn.classList.remove('flash');
    }, 170);
}

function checkHighestScore(levelscore) {
    if(levelscore > localStorage.getItem("highestScore")){
        localStorage.setItem("highestScore", levelscore); 
        span.innerHTML = `<b>${localStorage.getItem("highestScore")}</b>`;      
    }
}

function reset() {
    started = false;    
    checkHighestScore(level);
    showStartBtn(started);
    level = 0;
    gameSeq = [];
    userSeq = [];
    startBtn.innerHTML = "Replay";
}

// localStorage.removeItem("highestScore");
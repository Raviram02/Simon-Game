let gameSeq=[];
let userSeq=[];

let btns = ["red", "orange", "blue", "purple"];

let started = false;
let level = 0;
let maxScore = 0;

let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");
let hint = document.querySelector("#hint");
let h4 = document.querySelector("h4");


document.addEventListener("keydown", function() {
    if(started == false){
        started = true;
        hint.innerText = "";

        levelUp();
    }
})

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //choose random button
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function() {
        btn.classList.remove("gameflash")
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash")
    }, 250);
}


let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    if(gameSeq.length > 0){
        checkAns(userSeq.length-1);
    }
}

function checkAns(idx) {
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level-1}</b> <br>Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        maxScore = Math.max(maxScore, level-1);
        h4.innerText = `high score : ${maxScore}`;
        reset();
    }
}

function reset() {
    started = false;
    hint.innerHTML = "[ <b>Hint:</b> Match the white flash sequence ]";
    gameSeq = [];
    userSeq = [];
    level = 0;
}
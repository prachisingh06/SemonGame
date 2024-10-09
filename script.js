
let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "blue"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("click", function () {
    if (!started) {
        console.log("game is started");
        started = true;
        levelUp();
        let allBtns = document.querySelectorAll(".btn");
        for (btn of allBtns) {
            btn.addEventListener("click", btnPress);
        }
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 400);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 400);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`.${randomColor}`);

    //random btn chose
    gameSeq.push(randomColor);
    console.log(gameSeq);

    gameflash(randombtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b> ${level}</b><br>Press any key to start.`;
        document.querySelector("body").style.background = "red";
        setTimeout(function () {
            document.querySelector("body").style.background = "white";
            reset();
        }, 300);
    }
}

function btnPress() {
    console.log("btn was pressed");
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    console.log(userColor);

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

function reset() {
    console.log("game end");

    started = false;
    gameSeq = [];
    userSeq = []; 
    level = 0;

    // Add this line to remove the event listener from the buttons
    document.querySelectorAll(".btn").forEach(btn => btn.removeEventListener("click", btnPress))
}

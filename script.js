console.clear();
let Dice1 = document.getElementById('Dice-1');
let Dice2 = document.getElementById('Dice-2');
let Play1 = document.getElementById('Player-1');
let Play2 = document.getElementById('Player-2');
let buttons = document.getElementsByTagName('button');
let Popup = document.getElementById('popup');
let Overlay = document.getElementById('Over');
let inputNum = document.getElementById('inputnum');
let HelpWin = document.getElementById('Help');
let Limit = 50; // Default Winning Score Limit
let P1 = Play1.children;
let P2 = Play2.children;

function reset() {
    Popup.classList.replace('hidden', 'flex');
    Overlay.classList.remove('hidden');
}

function How(val) {
    if (val === 0) {
        HelpWin.classList.replace('flex', 'hidden');
    } else {
        HelpWin.classList.replace('hidden', 'flex');
    }
}


function SetValue() {
    Limit = inputNum.value;
    if (Limit < 50 || Limit > 200) {
        Limit = 50;
        document.getElementsByTagName('label')[0].textContent.textContent = 'Enter Number within Limit';
    } else {
        Popup.classList.replace('flex', 'hidden');
        Overlay.classList.add('hidden');
    }
}

let rand1, rand2, Total = 0;
// Gets Called When Roll Dice Button is Triggered
function RollDice() {
    rand1 = Math.ceil(Math.random() * 6);
    rand2 = Math.ceil(Math.random() * 6);
    Dice1.src = `Dice/dice-${rand1}.png`;
    Dice2.src = `Dice/dice-${rand2}.png`;
    if (rand1 === 1 || rand2 === 1) {
        Total = 0; // Changing The temporary Score to 0
        ScoreChg(1); // Changes The temporary Score
        PlayerToggle();
    } else if (rand1 === rand2 === 2) {
        Total = 0;
        document.querySelector('.active').children[0].children[1].textContent = Total;
        document.querySelector('.active').children[1].children[1].textContent = Total;
        PlayerToggle();
    }
    Total += rand1 + rand2;
    ScoreChg(1); // Changes The temporary Score
}

// Function to hold the value as Score for the Active Player
function HoldScore() {
    ScoreChg(0); // Changes The permanent Score
    Total = 0; // Changing The temporary Score to 0
    ScoreChg(1); // Changes The Temporary Score
    WinnerCheck();
}

// Function To change Current Score and Score of Active Player
function ScoreChg(val) {
    const winner = document.querySelector('.active');
    if (val === 0) {
        Total += parseInt(winner.children[val].children[1].textContent);
    }
    winner.children[val].children[1].textContent = Total;
}

// Changes The Active Player
function PlayerToggle() {
    Play1.classList.toggle('active');
    Play1.classList.toggle('opacity-80');
    Play1.classList.toggle('font-semibold');
    Play2.classList.toggle('active');
    Play2.classList.toggle('opacity-80');
    Play2.classList.toggle('font-semibold');
    rand1 = rand2 = 0;
}

// Functioon To check The Status of Win and Declaring Winner
function WinnerCheck() {
    const winner = document.querySelector('.active');
    let winchild = winner.children[0].children;
    let winscore = parseInt(winchild[1].textContent);
    let winHeading = winchild[0];
    if (winscore >= Limit) {
        winHeading.textContent = 'WINNER';
        winHeading.classList.add('text-rose-700');
        winner.classList.replace('bg-rose-200', 'bg-stone-900');
        ButDisToggle(true);
    } else {
        PlayerToggle();
    }
}

// Initializes New Game Start
function NewGame() {
    reset();
    let winner = document.querySelector('.active');
    let winHeading = winner.children[0].children[0];
    winHeading.classList.remove('text-rose-700');
    winner.classList.replace('bg-stone-900', 'bg-rose-200');
    winner.classList.remove('active');

    P1[0].children[0].textContent = 'Player 1';
    P1[0].children[1].textContent = '0';
    P1[1].children[1].textContent = '0';
    Play1.classList.add('active');

    P2[0].children[0].textContent = 'Player 2';
    P2[0].children[1].textContent = '0';
    P2[1].children[1].textContent = '0';

    ButDisToggle(false);
}


// Changes the Button Disabled atribute to true or false
function ButDisToggle(value) {
    buttons[1].disabled = value;
    buttons[2].disabled = value;
}
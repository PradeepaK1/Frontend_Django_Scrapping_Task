const gameElements = {
    gameWrapper: document.querySelector('.game-wrapper'),
    gameButtons: Array.from(document.querySelector('.game-wrapper').children),
    gameScore: document.querySelector('.SboxS'),
    resultWrapper: document.querySelector('.result-wrapper'),
    gameResult: document.querySelector('.game-result'),
    playerSelectionBtn: document.querySelector('.player-selection'),
    houseSelectionBtn: document.querySelector('.SelectedHouse'),
    resultBox: document.querySelector('.result-box'),
    playAgain: document.querySelector('.btn-play-again'),
    loadingDot: document.querySelector('.Loading'),
    gameReset: document.querySelector('.ResetButton')
};

let houseSelection, playerSelection;
let result = false;

let score = localStorage.getItem('score') ? (JSON.parse(localStorage.getItem('score'))) : 0;
console.log('score: ', score); 
gameElements.gameScore.textContent = score;

for (let elem of gameElements.gameButtons) {
    elem.addEventListener('click', playRound);
}

function computerPlay() {
    let randomSelection = Math.floor(Math.random() * gameElements.gameButtons.length);
    houseSelection = gameElements.gameButtons[randomSelection].className;
    return houseSelection;
}

function playRound(event) {
    playerSelection = event.currentTarget.className;
    houseSelection = computerPlay();
    getResult(playerSelection, houseSelection);
    renderResultScreen();
}

function getResult(playerSelection, houseSelection) {
    if (playerSelection === houseSelection) {
        result = undefined;
    } else if (playerSelection === 'btn-paper' && houseSelection === 'btn-rock') {
        result = true;
    } else if (playerSelection === 'btn-rock' && houseSelection === 'btn-scissors') {
        result = true;
    } else if (playerSelection === 'btn-scissors' && houseSelection === 'btn-paper') {
        result = true;
    } else {
        result = false;
    }
    return result;
}

function printResult() {
    switch(result) {
        case undefined:
            gameElements.gameResult.textContent = 'It\'s a Draw';
            break;
        case true:
            gameElements.playerSelectionBtn.classList.add('is-winner');
            gameElements.gameResult.textContent = 'You Win';
            score++;
            gameElements.gameScore.textContent = score;
            break;
        case false:
            gameElements.gameResult.textContent = 'You Lose';
            gameElements.houseSelectionBtn.classList.add('is-winner');
            score--;
            gameElements.gameScore.textContent = score;
            break;
    }
    console.log(`result: ${gameElements.gameResult.textContent}`);

    localStorage.setItem('score', JSON.stringify(score));
}

function renderResultScreen() {
    gameElements.gameWrapper.style.display = 'none';
    gameElements.resultWrapper.style.display = 'grid';
    gameElements.houseSelectionBtn.style.display = 'none'; 
    gameElements.resultBox.style.display = 'none'; 
    gameElements.playerSelectionBtn.classList.add(`${playerSelection}`);
    console.log(`your pick: ${playerSelection}`);

    setTimeout(function () {
        gameElements.houseSelectionBtn.classList.add(`${houseSelection}`);
        console.log(`house pick: ${houseSelection}`); 
        gameElements.loadingDot.style.display = 'none';
        gameElements.houseSelectionBtn.style.display = 'grid';
        setTimeout(function () {
            printResult();
            gameElements.resultBox.style.display = 'initial';
            gameElements.resultBox.style.gridTemplateArea = 'resultBox'
            let windowSize = window.matchMedia('(min-width: 992px)');
            if (windowSize.matches) {
                gameElements.resultWrapper.style.width = '80%';
                gameElements.resultWrapper.style.gridTemplateColumns = '1fr 1fr 1fr';
            }
        }, 500)
    }, 3000)
}

gameElements.playAgain.addEventListener('click', renderGameScreen);

function renderGameScreen() {
    gameElements.gameWrapper.style.display = '';
    gameElements.resultWrapper.style.display = '';
    gameElements.resultWrapper.style.width = '';
    gameElements.resultWrapper.style.gridTemplateColumns = '';
    gameElements.playerSelectionBtn.classList.remove(`${playerSelection}`);
    gameElements.houseSelectionBtn.classList.remove(`${houseSelection}`);
    gameElements.playerSelectionBtn.classList.remove('is-winner');
    gameElements.houseSelectionBtn.classList.remove('is-winner');
    gameElements.loadingDot.style.display = '';
}

gameElements.gameReset.addEventListener('click', resetGame);

function resetGame() {
    score = 0;
    gameElements.gameScore.textContent = score;
    localStorage.clear();
}

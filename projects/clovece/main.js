class Game {
    path = [
        { x: 0, y: 4 },
        { x: 1, y: 4 },
        { x: 2, y: 4 },
        { x: 3, y: 4 },
        { x: 4, y: 4 },
        { x: 4, y: 3 },
        { x: 4, y: 2 },
        { x: 4, y: 1 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 0 },
        { x: 6, y: 1 },
        { x: 6, y: 2 },
        { x: 6, y: 3 },
        { x: 6, y: 4 },
        { x: 7, y: 4 },
        { x: 8, y: 4 },
        { x: 9, y: 4 },
        { x: 10, y: 4 },
        { x: 10, y: 5 },
        { x: 10, y: 6 },
        { x: 9, y: 6 },
        { x: 8, y: 6 },
        { x: 7, y: 6 },
        { x: 6, y: 6 },
        { x: 6, y: 7 },
        { x: 6, y: 8 },
        { x: 6, y: 9 },
        { x: 6, y: 10 },
        { x: 5, y: 10 },
        { x: 4, y: 10 },
        { x: 4, y: 9 },
        { x: 4, y: 8 },
        { x: 4, y: 7 },
        { x: 4, y: 6 },
        { x: 3, y: 6 },
        { x: 2, y: 6 },
        { x: 1, y: 6 },
        { x: 0, y: 6 },
        { x: 0, y: 5 },
        { x: 1, y: 5 },
        { x: 2, y: 5 },
        { x: 3, y: 5 },
        { x: 4, y: 5 }
    ];
    players = {};

    constructor(numberOfPlayers) {
        // this.colors = ['red', 'yellow', 'green', 'blue'];
        switch (numberOfPlayers) {
            case 1:
                this.colors = ['red'];
                break;
            case 2:
                this.colors = ['yellow', 'blue'];
                break;
            case 3:
                this.colors = ['red', 'yellow', 'green'];
                break;
            case 4:
                this.colors = ['red', 'yellow', 'green', 'blue'];
                break;
        }
        this.board = new Board(width);
        this.UI = new UI(this);
        this.createPlayers();
        this.play();
    }

    play() {
        this.UI.start(this.players.red);
    }

    nextPlayer(previousColor) {
        // pick next value in list colors to use it as a key for players
        let newIndex = null;
        // if previous color is last in the list
        if ((newIndex = this.colors.indexOf(previousColor) + 1) === this.colors.length) {
            // set it to the beginning
            newIndex = 0;
        }
        let newColor = this.colors[newIndex];
        this.UI.start(this.players[newColor]);
    }

    createPlayers() {
        for (let iColor = 0; iColor < this.colors.length; iColor++) {
            let newPath = this.generatePath(iColor);
            let newColor = this.colors[iColor];
            // genereates path for specific color / player
            this.players[this.colors[iColor]] = new Player(newColor, newPath, this.UI);
        }
    }

    // generates path for every player (IDs of boxes)
    generatePath(orderNum) {
        let newPath = [];
        switch (orderNum) {
            case 0:  // red
                for (let i = 0; i < this.path.length; i++) {
                    let newX = this.path[i].x;
                    let newY = this.path[i].y;
                    newPath.push(`${newX}-${newY}`);
                }
                break;
            case 1:  // yellow
                for (let i = 0; i < this.path.length; i++) {
                    let newX = 10 - this.path[i].y;
                    let newY = this.path[i].x;
                    newPath.push(`${newX}-${newY}`);
                }
                break;
            case 2:  // green
                for (let i = 0; i < this.path.length; i++) {
                    let newX = 10 - this.path[i].x;
                    let newY = 10 - this.path[i].y;
                    newPath.push(`${newX}-${newY}`);
                }
                break;
            case 3:  // blue
                for (let i = 0; i < this.path.length; i++) {
                    let newX = this.path[i].y;
                    let newY = 10 - this.path[i].x;
                    newPath.push(`${newX}-${newY}`);
                }
                break;
        }
        return newPath;
    }
}

class UI {

    // is set to false, when turn ends
    rolledDice = false;
    diceVal = null;
    currentPlayer = null;
    rollBySpace = (event) => { if (event.code === 'Space') this.handleDice() };

    constructor(game) {
        this.game = game;
        this.dice = document.querySelector('#dice');
        this.player = document.querySelector('#player');
        this.thrown = document.querySelector('#thrown');
        this.message = document.querySelector('#message');
        this.playerBtn = document.querySelector('#player-btn');

        document.onkeydown = this.rollBySpace;
        this.dice.addEventListener('click', () => { this.handleDice() });
    }

    nextPlayer(color) {
        this.playerBtn.onclick = null;
        document.onkeydown = null;
        this.game.nextPlayer(color);  // taken from Game clas
        this.showDiceBtn();
    }

    activatePlayerBtn(color) {
        this.playerBtn.onclick = () => { this.nextPlayer(color) };
        document.onkeydown = (event) => {
            if (event.code === 'Enter') {
                this.nextPlayer(color);
            }
        };
    }

    hideDiceBtn() {
        this.dice.style.display = 'none';
        document.onkeydown = null;
    }

    showDiceBtn() {
        this.dice.style.display = 'block';
        document.onkeydown = this.rollBySpace;
    }

    showPlayer(player) {
        this.player.textContent = player;
    }

    showMessage(message) {
        this.message.textContent = message;
    }

    start(startingPlayer) {
        this.currentPlayer = startingPlayer;
        this.message.textContent = "Roll the dice!";
        startingPlayer.startTurn();
    }

    handleDice() {
        // random number between 1 and 6 inclusive
        let randNum = Math.floor(Math.random() * 6) + 1;
        if (randNum === 6) {
            this.thrown.textContent = '6 (again)';
        } else {
            this.thrown.textContent = randNum;
        }
        this.diceVal = randNum;
        this.rolledDice = true;
        // if is not null, if has been set, if game started
        if (this.currentPlayer) {
            this.currentPlayer.afterRoll(randNum);
        }
    }

    getDiceVal() {
        return this.diceVal;
    }
}

class Board {

    allClasses = [
        // if both x and y are different, a rectangle is created. 
        // inclusive
        // 'from' must be smaller than 'to'
        { classes: ['round', 'wait', 'red'], from: { x: 0, y: 0 }, to: { x: 1, y: 1 } },
        { classes: ['round', 'wait', 'blue'], from: { x: 0, y: 9 }, to: { x: 1, y: 10 } },
        { classes: ['round', 'wait', 'yellow'], from: { x: 9, y: 0 }, to: { x: 10, y: 1 } },
        { classes: ['round', 'wait', 'green'], from: { x: 9, y: 9 }, to: { x: 10, y: 10 } },
        { classes: ['round', 'path'], from: { x: 0, y: 4 }, to: { x: 10, y: 6 } },
        { classes: ['round', 'path'], from: { x: 4, y: 0 }, to: { x: 6, y: 10 } },
        { classes: ['round', 'start', 'red'], just: { x: 0, y: 4 } },
        { classes: ['round', 'start', 'blue'], just: { x: 4, y: 10 } },
        { classes: ['round', 'start', 'yellow'], just: { x: 6, y: 0 } },
        { classes: ['round', 'start', 'green'], just: { x: 10, y: 6 } },
        { classes: ['round', 'home', 'red'], from: { x: 1, y: 5 }, to: { x: 4, y: 5 } },
        { classes: ['round', 'home', 'blue'], from: { x: 5, y: 6 }, to: { x: 5, y: 9 } },
        { classes: ['round', 'home', 'green'], from: { x: 6, y: 5 }, to: { x: 9, y: 5 } },
        { classes: ['round', 'home', 'yellow'], from: { x: 5, y: 1 }, to: { x: 5, y: 4 } },
    ];

    constructor(width) {
        this.width = width;
        this.createGrid();
        this.addClasses();
    }
    // adds classes to cells (from allClasses)
    addClasses() {
        // iSet ~ index of dictionary inside allClasses array, single rule
        for (let set of this.allClasses) {
            // y - vertical, first number
            // if set contains only one cell
            if ('just' in set) {
                // if ('just' in this.allClasses[iSet]) {
                const cellId = `${set['just']['x']}-${set['just']['y']}`;
                const cell = document.getElementById(cellId);
                // add all classes from allClasses, which were intended for this cell
                cell.classList.add(...set['classes']);

            } else {
                for (let x = set['from']['x']; x <= set['to']['x']; x++) {
                    for (let y = set['from']['y']; y <= set['to']['y']; y++) {
                        const cellId = `${x}-${y}`;
                        const cell = document.getElementById(cellId);
                        // add all classes from allClasses, which were intended for this cell
                        cell.classList.add(...set['classes']);
                    }
                }
            }
        }
    }

    // creates grid inside the board
    createGrid() {
        const board = document.getElementById('board');
        for (let y = 0; y < this.width; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                // from cell#0-0 to cell#10-10
                let cellId = `${x}-${y}`;
                cell.setAttribute('id', cellId);
                board.appendChild(cell);

                // // test - delete when done
                // cell.innerText = cellId;
            }
        }
        board.style.gridTemplateColumns = 'auto '.repeat(11);
        board.style.gridTemplateRows = 'auto '.repeat(11);
    }
}

class Player {
    initBoxes = ['wait', 'start', 'home'];
    status = 0;
    ownTurn = false;
    figuresListenersSet = false;

    constructor(color, path, UI) {
        this.path = path;
        this.color = color;
        // if 'new UI();' was assigned, there would be multiple evenetlisteners assigned to rolling dice, 4 dices would be thrown (and ONE of them used)
        this.UI = UI;
        this.figuresInit();
    }

    startTurn() {
        // number of current roll, which downgrades each time, when any figure can't move
        this.stuckRolls = 3;  // used when player is stuck
        this.canRoll = true; // false if moves figure
        this.ownTurn = true;
        // e.g. 'red'
        this.UI.showPlayer(this.color);
    }

    endTurn() {
        // this.nextPlayer is called with parameter 'this.color, when 'player-btn' is pressed
        this.UI.hideDiceBtn();
        this.UI.showPlayer('');
        this.UI.activatePlayerBtn(this.color);
        this.UI.showMessage("Please press 'player' box to pass the dice to the next player, or press 'Enter'.");
    }

    hasWon() {  // checks if all .home field of this.color are full
        let home = document.querySelectorAll('.home.' + this.color);
        let winner = true;
        for (let box of home) {
            if (!box.hasChildNodes()) {  // if box (cell) of home (finish) is empty
                winner = false;
            }
        }
        return winner;
    }

    // let player choose, which figure he wants to move
    chooseFigure() {
        this.UI.hideDiceBtn();  // turns of the possibility to roll the dice (not even with Space)
        this.UI.showMessage("Click, which figure you want to move.");  // changes text content inside #message box
        this.addFiguresEventListeners();  // makes figures clickable
    }

    // run, when dice is rolled
    afterRoll(diceVal) {
        this.UI.showPlayer(this.color);
        this.diceVal = diceVal;

        if (!this.canRoll) {  // if player cant roll the dice
            this.endTurn();
            return;
        } else if (this.diceVal === 6 && this.canMoveAny()) { // player gets 6 and can move
            this.stuckRolls = 3;  // makes sense only when user gets 6. If it's not 6, user won't get stuck, because he ends his turn.
            this.canRoll = true;  // add one more roll, when gets 6
            this.chooseFigure();
        } else if (this.canMoveAny()) {  // dice is not 6 and still can move some figure
            this.canRoll = false;  // can't roll anymore, when doesn't get 6 and is not stuck
            this.chooseFigure();
        } else if (this.stuckRolls === 1) {  // can't move any, cant roll anymore, because it was
            this.endTurn();
        } else if (!this.canMoveAny()) {  // is stuck
            this.stuckRolls--;  // when is user stuck, he has only 3 attempts to get number, he can 'use'
        } else {  // normal turn followed by end of turn
            this.chooseFigure();
        }


        ///////////////////////////////////////////////////////////////////////////
        // if (this.diceVal === 6 && this.canMoveAny()) {
        // } else if (this.diceVal === 6) {  // if user gets 6, but can't move
        //     console.log('got 6, but cant move');
        //     this.endTurn();
        // } else if(!this.canMoveAny()) {  // if player can't move with any of his figures
        // } else {  // standard, player can move some figure
        // }
    }

    canMoveAny() {
        let allFigures = document.querySelectorAll('.figure.' + this.color);
        let canMove = false;
        for (let figure of allFigures) {
            // if at least one figure can be moved, change to true
            if (this.canMoveNow(figure)) canMove = true;
        }
        return canMove;
    }

    // needs further improvement
    // tests if single figure can be moved
    canMoveNow(figure) {
        // if figures are waiting, then 0, else dice value added to parents id
        let potentialPosIndex = figure.parentElement.classList.contains('wait') ? 0 : this.path.indexOf(figure.parentElement.id) + this.diceVal;
        let potentialPosElement = document.getElementById(this.path[potentialPosIndex]);

        // if tested figure is in wait-zone and 
        if (figure.parentElement.classList.contains('wait')
            // (value of dice is between 1 and 5     
            && (this.diceVal !== 6
                // or (start is not empty and there is same-colored figure on start)) 
                || (potentialPosElement.hasChildNodes() && potentialPosElement.firstChild.classList.contains('figure') && potentialPosElement.firstChild.classList.contains(this.color)))) {
            return false;
        }
        // figure cant move by diceVal, because there is end of path
        else if (potentialPosIndex
            // is not present in path
            > (this.path.length - 1)) {
            return false;
        }
        // collision happens with figure, that has same color
        else if (potentialPosElement.hasChildNodes()
            && potentialPosElement.firstChild.classList.contains('figure')
            && potentialPosElement.firstChild.classList.contains(this.color)) {
            return false;
        }
        else {
            return true;
        }
    }

    useFigure(figure) {
        let newPosId = '';

        this.UI.showMessage('Figure has moved.')

        if (!this.canMoveNow(figure)) {
            this.UI.showMessage('You can not move this figure.');
            return;
        }

        if (figure.parentElement.classList.contains('wait') && this.diceVal === 6) {
            // move figure to start  // pos ~ position
            newPosId = this.path[0];
        } else {  // needs further work - some IFs (collosion, end of field...)
            // move figure by number, which player has got from dice
            let currPosId = figure.parentElement.id;
            // number of current field, where 0 ~ .start
            let currPosIndex = this.path.indexOf(currPosId);
            newPosId = this.path[currPosIndex + this.diceVal];
        }

        let newPosCell = document.getElementById(newPosId);

        // chceck collision with other-colored figures. Same color is being checked in this.canMoveNow().
        let rivalHitColor;
        if (rivalHitColor = this.checkCollision(newPosCell)) {  // if collision happens
            this.addToRivalsWait(rivalHitColor);  // adding is enough, because figure is immediatelly replaced by this.placeSingleFigure()
        }

        // move figure
        this.placeSingleFigure(newPosCell, this.color);
        figure.remove();

        // show dice
        this.UI.showDiceBtn();

        // remove event listeners from all figures
        this.removeFiguresEventListeners();

        // end turn if player isn't allowed to roll the dice anymore
        if (!this.canRoll) {
            this.endTurn();
        }

        if (this.hasWon()) {  // if current player is a winner
            alert(`Player with '${this.color}' color is the winner!`);
        }
    }

    addToRivalsWait(rivalsColor) {
        // all boxes, where are initially placed figures of color rivalsColor
        let allRivalsWaits = document.querySelectorAll('.wait.' + rivalsColor);
        for (let box of allRivalsWaits) {
            if (!box.hasChildNodes()) {  // if box is empty
                this.placeSingleFigure(box, rivalsColor);
                break;  // place only one figure
            }
        }
    }

    // newPosCell ~ HTML element on path, where figure will step on
    checkCollision(newPosCell) {
        let child;
        // if there is no child  // either assign it to variable, or assign false
        if (!(child = newPosCell.firstChild)) {
            return false;
        }

        let rivalsFigColor = '';
        // classList will never contain this.color, because this was checked in this.canMoveNow()
        if (child.classList.contains('red')) {
            rivalsFigColor = 'red';
        } else if (child.classList.contains('yellow')) {
            rivalsFigColor = 'yellow';
        } else if (child.classList.contains('green')) {
            rivalsFigColor = 'green';
        } else if (child.classList.contains('blue')) {
            rivalsFigColor = 'blue';
        } else {
            return false;
        }
        return rivalsFigColor;
    }

    removeFiguresEventListeners() {
        let allFigures = document.querySelectorAll('.figure.' + this.color);
        for (let figure of allFigures) {
            figure.onclick = null;
        }
        this.figuresListenersSet = false;
    }

    addFiguresEventListeners() {
        // all figures of current player
        if (!this.figuresListenersSet) {
            let allFigures = document.querySelectorAll('.figure.' + this.color);
            for (let figure of allFigures) {
                figure.onclick = () => this.useFigure(figure);
            }
        }
        this.figuresListenersSet = true;
    }

    // puts this players figure to parent passed as argument
    placeSingleFigure(parent, color = this.color) {
        const inner = document.createElement('div');
        inner.classList.add('figure', color);
        parent.replaceChildren();
        parent.appendChild(inner);
    }

    // initially place figures on board
    figuresInit() {
        let init = {};
        for (let type of this.initBoxes) {
            init[type] = document.getElementsByClassName(this.color + ' ' + type);
        }
        // wait ~ place, where figures are initially placed
        for (let box of init.wait) {
            // means, that there is a figure
            this.placeSingleFigure(box);
        }
    }
}

// game constant - it is a square
const width = 11;

function startGame() {
    selectArea = document.getElementById('select');
    // hide whole select-area, so gameboard can be normally shown
    selectArea.style.display = 'none';

    selectBox = document.getElementById('number-players');
    numberPlayers = parseInt(selectBox.options[selectBox.selectedIndex].value);
    // start the game
    let game = new Game(numberPlayers);
}
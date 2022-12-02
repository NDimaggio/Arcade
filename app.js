$(document).ready(function () {
    // Default to a single player
    let numberOfPlayers = 1;
    // On page load - have user select number of players
    $("#playerSelectModal").modal();

    // Once the user has selected how many players there are display the "names" modal
    $(".player-select").on('click', function (event) {
        const {target} = event;
        numberOfPlayers = target.value;
        console.log(numberOfPlayers);

        // At this point we know how many players we have, and need to show input to collect names
        $("#playerNames").modal();
        if (numberOfPlayers === "1" || numberOfPlayers === 1) {
            $('#player2Name').val("Computer");
            $('#player2Name').prop('disabled', true);
        }
    })

    // Once the user has selected players and typed in their names - they will click the playbutton which allows us to grab those names and display on screen
    $('#playButton').on('click', function() {
        const player1Name = $('#player1Name').val();
        const player2Name = $('#player2Name').val();
        document.getElementById('player1').innerHTML = player1Name;
        document.getElementById('player2').innerHTML = player2Name;
        console.log(numberOfPlayers);
    })

    //Game State
    const players = ['O', 'X'];
    const gameBoard = ['', '', '', '', '', '', '', '', '',]
    let currentPlayer;
    let gameBoardElem;

    const makeGameBoardElem = () => {
        const gameBoardElem = document.createElement('div');
        gameBoardElem.classList.add('game-board');

        return gameBoardElem;
    };

    const makeSquareElem = squareNumber => {
        const squareElement = document.createElement('div');
        squareElement.setAttribute('id', squareNumber);
        squareElement.classList.add('game-square');

        squareElement.addEventListener('click', event => {
            const { target } = event;
            target.textContent = currentPlayer;
            gameBoard[squareNumber] = currentPlayer;
            checkBoard();
            switchPlayer();

            console.log(numberOfPlayers);
            // If a single player
            if (numberOfPlayers === 1 || numberOfPlayers === "1") {
                computerMove(currentPlayer);
            }
        },
            { once: true }
        );

        return squareElement;
    };

    const computerMove = currentPlayer => {
        let move = Math.floor(Math.random() * 10); // 8
        if (gameBoard[move] === "") {
            const square = document.getElementById(move); // 8
            square.textContent = currentPlayer; // X or O
            gameBoard[move] = currentPlayer; // 
            checkBoard();
            switchPlayer();
        } else {
            computerMove(currentPlayer);
        }
    }

    const switchPlayer = () => {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        }
    }

    const checkBoard = () => {
        const winningStates = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let winState of winningStates) {
            const [position1, position2, position3] = winState
            if (
                gameBoard[position1] !== '' &&
                gameBoard[position1] === gameBoard[position2] &&
                gameBoard[position1] === gameBoard[position3]
            ) {
                completeGame(`${gameBoard[position1]}'s wins!`);
                return;
            }
        }

        const allSquaresUsed = gameBoard.every(square => square !== '')

        if (allSquaresUsed) {
            alert(`it's a draw!`);
        }
    };

    const completeGame = message => {
        const overLayElem = document.createElement('div');
        overLayElem.style.position = 'fixed';
        overLayElem.style.top = '0';
        overLayElem.style.left = '0';
        overLayElem.style.right = '0';
        overLayElem.style.bottom = '0';
        overLayElem.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overLayElem.style.display = 'flex';
        overLayElem.style.flexDirection = 'column';
        overLayElem.style.justifyContent = 'center';
        overLayElem.style.alignItems = 'center';
        overLayElem.style.textAlign = 'center';

        const messageElem = document.createElement('h2');
        messageElem.textContent = message;
        messageElem.style.color = 'white';
        messageElem.style.fontSize = '100px';


        overLayElem.appendChild(messageElem);

        const restartButtonElem = document.createElement('button');
        restartButtonElem.textContent = 'Restart';
        restartButtonElem.style.backgroundColor = 'transparent';
        restartButtonElem.style.color = 'white';
        restartButtonElem.style.border = '1px solid white';
        restartButtonElem.style.padding = '10px 30px';
        restartButtonElem.style.fontSize = '30px'

        restartButtonElem.addEventListener('click', () => {
            resetGame();
            document.body.removeChild(overLayElem);
        });

        overLayElem.appendChild(restartButtonElem);

        document.body.appendChild(overLayElem);
    };

    const resetGame = () => {
        if (gameBoardElem) {
            document.body.removeChild(gameBoardElem);

        }

        gameBoardElem = makeGameBoardElem();

        for (let square = 0; square < 9; square++) {
            gameBoardElem.appendChild(makeSquareElem(square));

        }

        currentPlayer = players[0];
        gameBoard.fill('');
        document.body.appendChild(gameBoardElem);
    };

    // If single player
    // On singple player move
    // Random placement value
    // Check if that random spot that we calculate above is free
    // We place the x or o
    // if not free we need to calculate another random move

    resetGame();
});
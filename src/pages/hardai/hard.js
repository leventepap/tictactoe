import React, { useEffect, useState } from "react";
import { HardContainer } from "./hard.styles";
import Board from "../../components/board/board";
import restart from "../../assets/icons/restart.png";
import back from "../../assets/icons/back.png";
import { useNavigate } from "react-router-dom";


const Hard = () => {

    const navigate = useNavigate();
    const [gameActive, setGameActive] = useState(false); //whether game is running or not.
    const [freeTiles, setFreeTiles] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]); //available tiles.
    const [playerTiles, setPlayerTiles] = useState([]); //player owned tiles.
    const [aiTiles, setAiTiles] = useState([]); //ai owned tiles.
    const [wins, setWins] = useState({ //win states.
        player: false,
        ai: false
    })
    const winCombos = [ //win conditions.
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const newGame = () => { //starts a new game, clears board and tiles, resets wins.
        setGameActive(true);
        setFreeTiles([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        setPlayerTiles([]);
        setAiTiles([]);
        setWins({
            player: false,
            ai: false
        });
    }

    const checkWinState = () => { //checks the tiles of both players against winning the conditions, sets winner.
        winCombos.forEach((element) => {
            if (playerTiles.includes(element[0]) && playerTiles.includes(element[1]) && playerTiles.includes(element[2])) {
                wins.player = true
            }
        })
        winCombos.forEach((element) => {
            if (aiTiles.includes(element[0]) && aiTiles.includes(element[1]) && aiTiles.includes(element[2])) {
                wins.ai = true
            }
        })
    }

    const playerMove = (tileNr) => { //checks if player can choose a certain field. removes the field from available tiles and adds it to the player's tiles.
        if (gameActive === true) {
            if (freeTiles.includes(tileNr)) {
                let index = freeTiles.indexOf(tileNr)
                freeTiles.splice(index, 1);
                let newPlayerTiles = [...playerTiles]
                newPlayerTiles.push(tileNr);
                setPlayerTiles(newPlayerTiles);
            }
        }
    }

    const aiMove = (opponentTiles, selfTiles, availableTiles) => { //the logic for ai

        const makeMove = (number) => { //takes in an a single integer and makes move on that field
            let index = freeTiles.indexOf(number)
            freeTiles.splice(index, 1);
            let newAiTiles = [...aiTiles]
            newAiTiles.push(number);
            setAiTiles(newAiTiles);
        }

        const checkWinState = (player, all) => { //checks if player is 1 step away from victory, if yes then return the number of that field
            let number = false
            const getThirdElement = (arr1, arr2) => {
                const remainingElements = arr1.filter(x => !arr2.includes(x));
                if (remainingElements.length === 1 && all.includes(remainingElements[0])) {
                    return remainingElements[0]
                } else {
                    return false
                }
            }
            for (let i = 0; i < winCombos.length; i++) {
                if (getThirdElement(winCombos[i], player) !== false) {
                    number = getThirdElement(winCombos[i], player);
                    return number;
                } else if (i === winCombos.length && !getThirdElement(winCombos[i], player)) {
                    return number;
                }
            }
        }

        const checkCornerState = (player) => { //prevents the possibility of losing to corners, 1 move before it happens
            if        ((player.includes(1) && player.includes(6)) ||
                       (player.includes(1) && player.includes(3)) ||
                       (player.includes(2) && player.includes(3))) {
                       return 0;
            } else if ((player.includes(0) && player.includes(5)) ||
                       (player.includes(1) && player.includes(4)) ||
                       (player.includes(1) && player.includes(8))) {
                       return 2
            } else if ((player.includes(0) && player.includes(7)) ||
                       (player.includes(3) && player.includes(7)) ||
                       (player.includes(3) && player.includes(8))) {
                       return 6
            } else if ((player.includes(2) && player.includes(7)) ||
                       (player.includes(5) && player.includes(7)) ||
                       (player.includes(5) && player.includes(6))) {
                       return 8
            } else {
                return false
            }
        }

        const checkDiagonal = (player, all) => { //handles the four straight line cases
            if ((!all.includes(0) && !all.includes(4) && !all.includes(8)) ||
                (!all.includes(2) && !all.includes(4) && !all.includes(6))) {
                if (player[0] === 0) {
                    return 2
                } else {
                    return 1
                }
            } else if (!all.includes(1) && !all.includes(4) && !all.includes(7)) {
                return 3
            } else if (!all.includes(3) && !all.includes(4) && !all.includes(5)) {
                return 2
            }
        }

        if (availableTiles.length === 8) { //tries to take the middle field if possible or takes corner
            if (freeTiles.includes(4)) {
                makeMove(4);
            } else if (!freeTiles.includes(0)) {
                makeMove(2);
            } else {
                makeMove(0);
            }
        } 
        if (availableTiles.length === 6) {
            if (checkWinState(opponentTiles, availableTiles)) { //blocks if opponent can immediately win
                makeMove(checkWinState(opponentTiles, availableTiles))
            } else if (checkCornerState(opponentTiles) !== false) { //blocks if opponent is setting up a corner strategy
                makeMove(checkCornerState(opponentTiles))
            } else { //sets up self for a win
                makeMove(checkDiagonal(selfTiles, availableTiles))
            }
        }
        if (availableTiles.length === 4) {
            if (checkWinState(selfTiles, availableTiles)) { //takes win for self if possible
                makeMove(checkWinState(selfTiles, availableTiles))
            } else if (checkWinState(opponentTiles, availableTiles)) { //blocks if opponent can immediately win
                makeMove(checkWinState(opponentTiles, availableTiles))
            } else if (checkCornerState(opponentTiles) !== false) { //blocks if opponent is setting up a corner strategy
                makeMove(checkCornerState(opponentTiles))
            }
        }
        if (availableTiles.length === 2) {
            if (checkWinState(selfTiles, availableTiles)) { //takes win for self if possible
                makeMove(checkWinState(selfTiles, availableTiles))
            } else if (checkWinState(opponentTiles, availableTiles)) { //blocks if opponent can immediately win
                makeMove(checkWinState(opponentTiles, availableTiles))
            } else { // when a tie game is inevitable, takes the first available space
                makeMove(availableTiles[0])
            }
        }
    }

    useEffect(() => { //sets up a new game when the page loads for the first time or when is manually refreshed.
        newGame();
    },[])

    useEffect(() => { //checks win conditions for the player. stops game when needed or takes tile for ai move. runs after player takes a tile.
        checkWinState();
        if (wins.player === true) {
            setGameActive(false)
        } else if (wins.player === false && freeTiles.length === 0) {
            setGameActive(false)
        } else if (freeTiles.length === 9) {
            console.log('New Game!')
        } else {
            aiMove(playerTiles, aiTiles, freeTiles)
        }
    }, [playerTiles])

    useEffect(() => { //checks win conditions for the ai. stops the game when needed. runs after ai takes a tile.
        checkWinState();
        if (wins.ai === true) {
            setGameActive(false)
        } else if (wins.ai === false && freeTiles.length === 0) {
            setGameActive(false)
        }
    },[aiTiles]) 

    return (
        <HardContainer>
            <main>
                <h1>Currently playing against hard AI</h1>
                <Board //board component. inherits the tiles of both players and the ability to take tiles for the player.
                    makeMove={playerMove}
                    playerTiles={playerTiles}
                    aiTiles={aiTiles} />
                <div className="buttons">
                    <div className="left" onClick={() => navigate("/")} >Back
                        <img src={back} />
                    </div>
                    <div className="right" onClick={() => newGame()}>Restart
                        <img src={restart} />
                    </div>
                </div>
                <div className="result">
                {/*checks the win states after every move. declares result.*/}
                {wins.player === true ? <p>Player wins!</p> : <></>}
                {wins.ai === true ? <p>AI wins!</p> : <></>}
                {(wins.ai === false && wins.player === false) && freeTiles.length === 0 ? <p>It's a tie!</p> : <></>}
                </div>
            </main>
        </HardContainer>
    )

}

export default Hard;
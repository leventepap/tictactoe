import React, { useEffect, useState } from "react";
import { FriendContainer } from "./friend.styles";
import Board from "../../components/board/board";
import restart from "../../assets/icons/restart.png";
import back from "../../assets/icons/back.png";
import { useNavigate } from "react-router-dom";


const Friend = () => {

    const navigate = useNavigate();
    const [gameActive, setGameActive] = useState(false); //whether game is running or not.
    const [freeTiles, setFreeTiles] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]); //available tiles.
    const [playerTiles, setPlayerTiles] = useState([]); //player 1 owned tiles.
    const [aiTiles, setAiTiles] = useState([]); //player 2 owned tiles.
    const [turns, setTurns] = useState(true); //determines which player's turn is it.
    const [wins, setWins] = useState({ //win states.
        player: false,
        ai: false
    });
    const winCombos = [ //win conditions.
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const newGame = () => { //starts a new game, clears board and tiles, resets wins.
        setGameActive(true);
        setFreeTiles([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        setPlayerTiles([]);
        setAiTiles([]);
        setTurns(true);
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

    const playerMove = (tileNr) => { //checks if player can choose a certain field. removes the field from available tiles and adds it to the player's tiles. alternates turns.
        if (gameActive === true) {
            if (freeTiles.includes(tileNr)) {
                let index = freeTiles.indexOf(tileNr)
                freeTiles.splice(index, 1);
                if (turns) {
                    let newPlayer1Tiles = [...playerTiles]
                    newPlayer1Tiles.push(tileNr);
                    setPlayerTiles(newPlayer1Tiles);
                    setTurns(!turns);
                } else {
                    let newPlayer2Tiles = [...aiTiles]
                    newPlayer2Tiles.push(tileNr);
                    setAiTiles(newPlayer2Tiles);
                    setTurns(!turns);
                }
            }
        }
    }

    useEffect(() => { //sets up a new game when the page loads for the first time or when is manually refreshed.
        newGame();
    }, [])

    useEffect(() => { //checks win conditions for player 1. stops game when needed. runs after player 1 takes a tile.
        checkWinState();
        if (wins.player === true) {
            setGameActive(false)
        } else if (wins.player === false && freeTiles.length === 0) {
            setGameActive(false)
        } else if (freeTiles.length === 9) {
            console.log('New Game!')
        }
    }, [playerTiles])

    useEffect(() => { //checks win conditions for player 2. stops the game when needed. runs player 2 takes a tile.
        checkWinState();
        if (wins.ai === true) {
            setGameActive(false)
        } else if (wins.ai === false && freeTiles.length === 0) {
            setGameActive(false)
        }
    }, [aiTiles])

    return (
        <FriendContainer>
            <main>
                <h1>Currently playing against friend</h1>
                <Board //board component. inherits the tiles of both players and the ability to take tiles for the player.
                    makeMove={playerMove}
                    playerTiles={playerTiles}
                    aiTiles={aiTiles} />
                <div className="buttons">
                    <div className="left" onClick={() => navigate("/")} >Back
                        <img src={back} />
                    </div>
                    <div className="turns">
                        {gameActive ? <div>{turns ? <p>X's turn</p> : <p>O's turn</p>}</div> : <></>}
                    </div>
                    <div className="right" onClick={() => newGame()}>Restart
                        <img src={restart} />
                    </div>
                </div>
                <div className="result">
                    {/*checks the win states after every move. declares result.*/}
                    {wins.player === true ? <p>X wins!</p> : <></>}
                    {wins.ai === true ? <p>O wins!</p> : <></>}
                    {(wins.ai === false && wins.player === false) && freeTiles.length === 0 ? <p>It's a tie!</p> : <></>}
                </div>
            </main>
        </FriendContainer>
    )

}

export default Friend;
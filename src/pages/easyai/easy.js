import React, { useEffect, useState } from "react";
import { EasyContainer } from "./easy.styles";
import Board from "../../components/board/board";
import restart from "../../assets/icons/restart.png";
import back from "../../assets/icons/back.png";
import { useNavigate } from "react-router-dom";


const Easy = () => {

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
            let randomTile = freeTiles[Math.floor(Math.random() * freeTiles.length)]
            let index = freeTiles.indexOf(randomTile)
            freeTiles.splice(index, 1);
            let newAiTiles = [...aiTiles]
            newAiTiles.push(randomTile);
            setAiTiles(newAiTiles);
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
        <EasyContainer>
            <main>
                <h1>Currently playing against easy AI</h1>
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
        </EasyContainer>
    )

}

export default Easy;
import React, { useEffect, useState } from "react";
import { EasyContainer } from "./easy.styles";
import Board from "../../components/board/board";
import restart from "../../assets/icons/restart.png";
import back from "../../assets/icons/back.png";
import { useNavigate } from "react-router-dom";


const Easy = () => {

    const navigate = useNavigate();
    const [gameActive, setGameActive] = useState(false);
    const [freeTiles, setFreeTiles] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const [playerTiles, setPlayerTiles] = useState([]);
    const [aiTiles, setAiTiles] = useState([]);
    const [wins, setWins] = useState({
        player: false,
        ai: false
    })
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const newGame = () => {
        setGameActive(true);
        setFreeTiles([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        setPlayerTiles([]);
        setAiTiles([]);
        setWins({
            player: false,
            ai: false
        });
    }

    const checkWinState = () => {
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

    const playerMove = (tileNr) => {

        if (gameActive === true) {
            if (freeTiles.includes(tileNr)) {
                let index = freeTiles.indexOf(tileNr)
                freeTiles.splice(index, 1);
                let newPlayerTiles = [...playerTiles]
                newPlayerTiles.push(tileNr);
                setPlayerTiles(newPlayerTiles);
            } else {
                console.log('Field already taken!')
            }
        }
    }

    useEffect(() => {
        newGame();
    },[])

    useEffect(() => {
        checkWinState();
        if (wins.player === true) {
            setGameActive(false)
            console.log('Player won!')
        } else if (wins.player === false && freeTiles.length === 0) {
            setGameActive(false)
            console.log('Its a tie!')
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

    useEffect(() => {
        checkWinState();
        if (wins.ai === true) {
            setGameActive(false)
            console.log('AI won!')
        } else if (wins.ai === false && freeTiles.length === 0) {
            setGameActive(false)
            console.log('Its a tie!')
        }
    },[aiTiles]) 


    return (
        <EasyContainer>
            <main>
                <h1>Currently playing against easy AI</h1>
                <Board
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
                {wins.player === true ? <p>Player wins!</p> : <></>}
                {wins.ai === true ? <p>AI wins!</p> : <></>}
                {(wins.ai === false && wins.player === false) && freeTiles.length === 0 ? <p>It's a tie!</p> : <></>}
                </div>
            </main>
        </EasyContainer>
    )

}

export default Easy;
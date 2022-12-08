import React from "react";
import { HardContainer } from "./hard.styles";
import Board from "../../components/board/board";
import restart from "../../assets/icons/restart.png";
import back from "../../assets/icons/back.png";
import { useNavigate } from "react-router-dom";


const Hard = () => {

    const navigate = useNavigate();

    return (
        <HardContainer>
            <main>
                <h1>Currently playing against hard AI</h1>
                <Board />
                <div className="buttons">
                    <div className="left" onClick={() => navigate("/")} >Back
                    <img src={back} />
                    </div>
                    <div className="right">Restart
                    <img src={restart} />
                    </div>
                </div>
            </main>
        </HardContainer>
    )

}

export default Hard;
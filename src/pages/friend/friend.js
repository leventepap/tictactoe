import React from "react";
import { FriendContainer } from "./friend.styles";
import Board from "../../components/board/board";
import restart from "../../assets/icons/restart.png";
import back from "../../assets/icons/back.png";
import { useNavigate } from "react-router-dom";


const Friend = () => {

    const navigate = useNavigate();

    return (
        <FriendContainer>
            <main>
                <h1>Currently playing against friend</h1>
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
        </FriendContainer>
    )

}

export default Friend;
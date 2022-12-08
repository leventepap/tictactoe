import React from "react";
import { WelcomeContainer } from "./welcome.styles";
import friend from "../../assets/icons/friend.png";
import easy from "../../assets/icons/easy.png";
import hard from "../../assets/icons/hard.png";
import { useNavigate } from "react-router-dom";

const Welcome = () => {

    const navigate = useNavigate();

    return (
        <WelcomeContainer>
            <main>
                <center>
                    <h1>TIC TAC TOE</h1>

                    <div className="friend" onClick={() => navigate("friend/")}>PLAY AGAINST A FRIEND
                    <img src={friend}/>
                    </div>
                    <div className="easy" onClick={() => navigate("easy/")}>PLAY AGAINST AN EASY AI
                    <img src={easy}/>
                    </div>
                    <div className="hard" onClick={() => navigate("hard/")}>PLAY AGAINST A HARD AI
                    <img src={hard}/>
                    </div>
                </center>
            </main>
        </WelcomeContainer>
    )

}

export default Welcome;
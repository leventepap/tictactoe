import React from "react";
import { BoardContainer } from "./board.styles";

const Board = (props) => {

    return (
        <BoardContainer>
            <center>
                <div className="tile" onClick={() => props.makeMove(0)}>
                    {props.playerTiles.includes(0) === true ? 'X' : ""}
                    {props.aiTiles.includes(0) === true ? 'O' : ""}
                </div>
                <div className="tile" onClick={() => props.makeMove(1)}>
                    {props.playerTiles.includes(1) === true ? 'X' : ""}
                    {props.aiTiles.includes(1) === true ? 'O' : ""}
                </div>
                <div className="tile" onClick={() => props.makeMove(2)}>
                    {props.playerTiles.includes(2) === true ? 'X' : ""}
                    {props.aiTiles.includes(2) === true ? 'O' : ""}
                </div>
                <div className="tile" onClick={() => props.makeMove(3)}>
                    {props.playerTiles.includes(3) === true ? 'X' : ""}
                    {props.aiTiles.includes(3) === true ? 'O' : ""}
                </div>
                <div className="tile" onClick={() => props.makeMove(4)}>
                    {props.playerTiles.includes(4) === true ? 'X' : ""}
                    {props.aiTiles.includes(4) === true ? 'O' : ""}
                </div>
                <div className="tile" onClick={() => props.makeMove(5)}>
                    {props.playerTiles.includes(5) === true ? 'X' : ""}
                    {props.aiTiles.includes(5) === true ? 'O' : ""}
                </div>
                <div className="tile" onClick={() => props.makeMove(6)}>
                    {props.playerTiles.includes(6) === true ? 'X' : ""}
                    {props.aiTiles.includes(6) === true ? 'O' : ""}
                </div>
                <div className="tile" onClick={() => props.makeMove(7)}>
                    {props.playerTiles.includes(7) === true ? 'X' : ""}
                    {props.aiTiles.includes(7) === true ? 'O' : ""}
                </div>
                <div className="tile" onClick={() => props.makeMove(8)}>
                    {props.playerTiles.includes(8) === true ? 'X' : ""}
                    {props.aiTiles.includes(8) === true ? 'O' : ""}
                </div>
            </center>

            <div className="hor1"></div>
            <div className="hor2"></div>
            <div className="vert1"></div>
            <div className="vert2"></div>
        </BoardContainer>
    )

}

export default Board;
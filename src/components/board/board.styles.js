import styled from "styled-components";
import vert1 from "../../assets/images/vert1.png"
import vert2 from "../../assets/images/vert2.png"
import hor1 from "../../assets/images/hor1.png"
import hor2 from "../../assets/images/hor2.png"
import regular from "../../assets/fonts/PWChalk.ttf"


export const BoardContainer = styled.div`

@font-face {
    font-family: 'regular';
    src: url(${regular});
}

center {
    width: 600px;
    height: 600px;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
}

.tile {
    width: 190px;
    height: 190px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    font-family: regular;
    font-size: 105px;
    color: white;

    :hover {
        cursor: pointer;
        box-shadow: 
            inset 0px 0px 5px rgba(255, 255, 255, 0.4),
            inset 0px 0px 10px rgba(255, 255, 255, 0.4),
            inset 0px 0px 15px rgba(255, 255, 255, 0.4), 
            inset 0px 0px 20px rgba(255, 255, 255, 0.4);
        border-radius: 15px;
        cursor: pointer;
    }
}

.vert1,
.vert2,
.hor1,
.hor2 {
    position: relative;
}

.vert1,
.vert2 {
    height: 600px;
    width: 15px;
}

.hor1,
.hor2 {
    height: 15px;
    width: 600px;
}

.vert1 {
    top: -630px;
    margin-bottom: -630px;
    left: 190px;
    background: url(${vert1});
}

.vert2 {
    top: -600px;
    margin-bottom: -600px;
    left: 395px;
    background: url(${vert2});
}

.hor1 {
    top: -410px;
    background: url(${hor1});
}

.hor2 {
    top: -220px;
    background: url(${hor2});
}

`;
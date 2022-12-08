import styled from "styled-components";
import bg from "../../assets/images/background.jpg"
import title from "../../assets/fonts/Chalk-Regular.ttf"
import regular from "../../assets/fonts/PWChalk.ttf"

export const WelcomeContainer = styled.div`

/* {
    border: 1px solid blue;
}*/

@font-face {
    font-family: 'title';
    src: url(${title});
}

@font-face {
    font-family: 'regular';
    src: url(${regular});
}

main {
    width: 100vw;
    height: 100vh;

    background: linear-gradient(
    90deg,
    rgba(191, 86, 57, 0) 1%, 
    rgba(191, 86, 57, 0.5) 25%,
    rgba(191, 86, 57, 0.9) 38%,  
    rgba(191, 86, 57, 1) 50%,
    rgba(191, 86, 57, 0.9) 62%,  
    rgba(191, 86, 57, 0.5) 75%, 
    rgba(191, 86, 57, 0) 100%
    ),url(${bg});

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    display: flex;
    align-items: center;
    justify-content: center;
}

center {
    width: 550px;
    height: 800px;

    display: flex;
    flex-direction: column;
}

h1 {
    font-family: title;
    font-size: 93px;
    color: white;
    margin-bottom: 150px;
}

.friend,
.easy,
.hard {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    font-family: regular;
    font-size: 30px;
    color: white;

    margin: 30px 0px;

    > img {
        height: 70px;
        width: 70px;
        margin-left: 30px;
    }

    :hover {
        cursor: pointer;
        text-shadow: 0px 0px 5px white, 0px 0px 10px white, 0px 0px 15px white;
    }
}

`;
import styled from "styled-components";
import bg from "../../assets/images/background.jpg"
import title from "../../assets/fonts/Chalk-Regular.ttf"

export const EasyContainer = styled.div`

/* {
    border: 1px solid blue;
}*/

@font-face {
    font-family: 'title';
    src: url(${title});
}

main {
    width: 100vw;
    height: 100vh;

    background: linear-gradient(
    90deg,
    rgba(191, 86, 57, 0) 1%, 
    rgba(191, 86, 57, 0.5) 10%,
    rgba(191, 86, 57, 0.9) 25%,  
    rgba(191, 86, 57, 1) 50%,
    rgba(191, 86, 57, 0.9) 75%,  
    rgba(191, 86, 57, 0.5) 90%, 
    rgba(191, 86, 57, 0) 100%
    ),url(${bg});

    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    font-family: title;
    font-size: 50px;
    color: white;
    margin-block-start: 1px;
    margin-block-end: 30px;
}

.buttons {
    width: 700px;

    margin-top: 30px;
    
    justify-content: space-between;
    
    font-family: title;
    font-size: 30px;
    color: white;
}

.buttons,
.left,
.right {
    display: flex;
    flex-direction: row;
    align-items: center;

}

.left,
.right {
    > img {
        height: 50px;
        width: 50px;
        margin-left: 30px;
    }

    :hover {
        cursor: pointer;
        text-shadow: 0px 0px 5px white, 0px 0px 10px white;
    }
}

.result {
    font-family: title;
    font-size: 45px;
    color: white;
    height: 45px;
}

`;
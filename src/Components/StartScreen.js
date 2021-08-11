import React,{useState} from 'react'

function StartScreen(props) {

   
    return (
        <div className="wrap">
            <img src="/img/dices.png" alt="dices"></img>
            <div className="main">
                <h1>The Dice Game</h1>
                <button onClick={() => props.gameStarter()}>Lets Roll</button>
            </div>
        </div>
    )
}

export default StartScreen

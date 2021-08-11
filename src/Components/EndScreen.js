import React from 'react'

function EndScreen(props) {
    return (
        <div>
                <h1>Koniec Gry</h1>
                <h1>Your points: {Math.round((props.points + Number.EPSILON) * 100) / 100}</h1>
                <button onClick={props.handleReset}>Reset</button>
        </div>
    )
}

export default EndScreen
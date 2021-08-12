import React from 'react'

function EndScreen(props) {
    return (
        <div className="endscreen">
                <h1>Game Over</h1>
                <h1>Your points: {Math.round((props.points + Number.EPSILON) * 100) / 100}</h1>
                <button onClick={props.handleReset}>Reset</button>
        </div>
    )
}

export default EndScreen
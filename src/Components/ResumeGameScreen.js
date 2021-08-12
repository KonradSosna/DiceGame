import React from 'react'

function ResumeGameScreen(props) {
    return (
        <div className="resumegamescreen">
            <h1>Do you want </h1>
            <button onClick={() => { props.handleResumeGame(false) }}>New game</button>
            <h1>or to</h1>
            <button onClick={() => { props.handleResumeGame(true) }}>Resume</button>
        </div>
    )
}

export default ResumeGameScreen
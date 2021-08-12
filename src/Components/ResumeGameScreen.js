import React from 'react'

function ResumeGameScreen(props) {
    return (
        <div className="resumegamescreen">
            <h1>Reload the previous game?</h1>
            <div className="btnbox">
                <button onClick={() => { props.handleResumeGame(true) }}>YES</button>
                <button onClick={() => { props.handleResumeGame(false) }}>NO</button>
            </div>
        </div>
    )
}

export default ResumeGameScreen
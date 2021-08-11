import React from 'react'

function ResumeGameScreen(props) {
    return (
        <div>
            <button onClick={() => { props.handleResumeGame(true) }}>Wznów</button>
            <button onClick={() => { props.handleResumeGame(false) }}>Graj od nowa</button>
        </div>
    )
}

export default ResumeGameScreen
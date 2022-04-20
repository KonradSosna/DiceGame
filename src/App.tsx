import { useState, useEffect } from 'react'
import DataFetching from './Components/DataFetching'
import { GlobalContainer } from './utils/GlobalContainer.style'
import StartScreen from './Components/StartScreen'
import { gameDataExist, deleteGameData } from './helpers/localstorage'
import './App.css'
import ResumeGameScreen from './Components/ResumeGameScreen'

const App = () => {
  const [gameStarted, setGameStarted] = useState(true)
  const [previouseGameExist, setPreviouseGameExist] = useState(false)

  const gameStarter = () => {
    setGameStarted(false)
  }

  useEffect(() => {
    if (gameDataExist()) setPreviouseGameExist(true)
  }, [])

  const handleResumeGame = (result: boolean) => {
    if (result) setGameStarted(false)
    else {
      setPreviouseGameExist(false)
      deleteGameData()
    }
  }

  return (
    <GlobalContainer>
      {previouseGameExist ? (
        <>
          {gameStarted ? (
            <ResumeGameScreen handleResumeGame={handleResumeGame} />
          ) : (
            <DataFetching resume={true} />
          )}
        </>
      ) : (
        <>
          {gameStarted ? (
            <StartScreen gameStarter={gameStarter} />
          ) : (
            <DataFetching resume={false} />
          )}
        </>
      )}
    </GlobalContainer>
  )
}

export default App

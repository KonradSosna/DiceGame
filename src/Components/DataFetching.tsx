import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EndScreen from './EndScreen'
import {
  getGameData,
  deleteGameData,
  saveGameData,
  TSaveGameData,
} from 'helpers/localstorage'
import ClipLoader from 'react-spinners/ClipLoader'
import { Button, Grid, styled, Typography } from '@mui/material'
import History from './History'

export const StyledButton = styled(Button)({
  backgroundColor: 'black',
  Color: 'white',
  '&:hover': {
    backgroundColor: '#6b1010',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
})

const StyledTypograpgy = styled(Typography)({
  fontSize: '40px',
  margin: 0,
  padding: '10px',
})

type TDataFetching = {
  resume: boolean
}

export const isCorrectChoice = (
  lastNumber: number,
  currNumber: number,
  a: number
) => {
  return (
    (lastNumber < currNumber && a === 2) || (lastNumber > currNumber && a === 1)
  )
}

export const DataFetching: React.FC<TDataFetching> = ({ resume }) => {
  const [loading, setLoading] = useState<boolean>(true)

  const [gameData, setGameData] = useState<TSaveGameData>({
    currNumber: Math.ceil(Math.random() * 5 + 1),
    lastNumber: null,
    points: 0,
    history: [],
    roundCount: 1,
  })

  useEffect(() => {
    if (resume) {
      const gameDataLocalStorage = getGameData()
      setGameData(gameDataLocalStorage)
    }
  }, [resume])

  useEffect(() => {
    setLoading(false)
    saveGameData(gameData)
  }, [gameData])

  const handleClick = async (a: number) => {
    const res = await axios.get('http://roll.diceapi.com/json/d6')
    const lastNumber = gameData.currNumber
    const history = gameData.history
    const currNumber = res.data.dice[0].value
    let points = gameData.points
    let roundCount = gameData.roundCount

    if (isCorrectChoice(lastNumber, currNumber, a)) {
      points += 0.2
      history.push({
        round: roundCount,
        win: true,
      })
    } else {
      history.push({
        round: roundCount,
        win: false,
      })
    }

    if (roundCount < 30 && roundCount >= 0) roundCount += 1

    setGameData({
      currNumber,
      lastNumber,
      points,
      history,
      roundCount,
    })
  }

  const handleReset = () => {
    setGameData({
      currNumber: Math.ceil(Math.random() * 5 + 1),
      lastNumber: null,
      points: 0,
      history: [],
      roundCount: 1,
    })
    deleteGameData()
  }

  const Die = ({ img }: { img: number }) => {
    return (
      <img
        className="dice"
        src={`http://roll.diceapi.com/images/poorly-drawn/d6/${img}.png`}
        alt="dice"
      />
    )
  }

  return (
    <>
      {gameData.roundCount !== 30 ? (
        <Grid container className="gameboard">
          <aside className="info">
            <h1>Round {gameData.roundCount} of 30</h1>
            <StyledTypograpgy>
              Points:
              {Math.round((gameData.points + Number.EPSILON) * 100) / 100}
            </StyledTypograpgy>
          </aside>

          <main>
            <Grid item>
              <h1>Number: {gameData.currNumber}</h1>
              <h1>Last Number: {gameData.lastNumber}</h1>
              <div className="dice">
                {loading ? (
                  <ClipLoader color="#AA0000" loading={loading} size={50} />
                ) : (
                  <Die img={gameData.currNumber} />
                )}
              </div>
              <h3>Next number will be: </h3>
            </Grid>

            <Grid container spacing={2} direction="column" className="btnbox">
              <Grid item>
                <StyledButton
                  variant="contained"
                  onClick={() => {
                    handleClick(1)
                    setLoading(true)
                  }}
                >
                  <Typography>Smaller</Typography>
                </StyledButton>
                <StyledButton
                  variant="contained"
                  onClick={() => {
                    handleClick(2)
                    setLoading(true)
                  }}
                >
                  <Typography>Greater</Typography>
                </StyledButton>
              </Grid>
              <Grid item>
                <StyledButton
                  variant="contained"
                  onClick={handleReset}
                  disabled={loading}
                >
                  <Typography>Reset</Typography>
                </StyledButton>
              </Grid>
            </Grid>
          </main>
          <History history={gameData.history} />
        </Grid>
      ) : (
        <EndScreen points={gameData.points} handleReset={handleReset} />
      )}
    </>
  )
}

export default DataFetching

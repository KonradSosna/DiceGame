import React, {useState, useEffect} from 'react'
import axios from 'axios'
import EndScreen from './EndScreen';
import { getGameData, deleteGameData, saveGameData } from '../helpers/localstorage'
import ClipLoader from "react-spinners/ClipLoader";


function DataFetching(props) {

    let [loading, setLoading] = useState(true);
    const [gameData, setGameData] = useState({
        currNumber:  Math.ceil(Math.random() * 5 + 1),
        lastNumber: null,
        points: 0,
        history: [],
        roundCount: 1
    })

    useEffect(() =>{
        if(props.resume)
        {
            const gameDataLocalStorage = getGameData()
            setGameData(gameDataLocalStorage)
        }
    }, [])

    useEffect(() =>{
        setLoading(false)
        saveGameData(gameData)
    }, [gameData])

    const handleClick = async (a) =>{
        const res = await axios.get('http://roll.diceapi.com/json/d6')
        const lastNumber = gameData.currNumber
        const history = gameData.history
        const currNumber = res.data.dice[0].value
        let points = gameData.points
        let roundCount = gameData.roundCount

        if(isCorrectChoice(lastNumber, currNumber, a))
        {
            points += 0.2
            history.push({
                round: roundCount,
                win: true
            })
        }
        else
        {
            history.push({
                round: roundCount,
                win: false
            })
        }

        if(roundCount < 30 && roundCount >= 0)
            roundCount += 1

        setGameData({
            currNumber,
            lastNumber,
            points,
            history,
            roundCount
        })


    }

    const isCorrectChoice = (lastNumber, currNumber, a) => {
        return (lastNumber < currNumber && a===2) || (lastNumber > currNumber && a===1)
    }

    const handleReset = () => {
        setGameData({
            currNumber:  Math.ceil(Math.random() * 5 + 1),
            lastNumber: null,
            points: 0,
            history: [],
            roundCount: 1
        })
        deleteGameData()
    }

    const Die = ({img}) => 
    {return <img className="dice" src={`http://roll.diceapi.com/images/poorly-drawn/d6/${img}.png`} alt="dice" />}


    return (
        <div>
            {gameData.roundCount !== 30 
            ?  
            <div className="gameboard">
                <aside className="info">
                    <h1>Round {gameData.roundCount} of 30</h1>
                    <h1>Points: {Math.round((gameData.points + Number.EPSILON) * 100) / 100}</h1>
                </aside>

                <main>
                    <h1>Number: {gameData.currNumber}</h1>
                    <h1>Last Number: {gameData.lastNumber}</h1>
                    <div className="dice">{loading ? <ClipLoader color="#AA0000" loading={loading} size={50} /> : <Die img={gameData.currNumber} /> }</div>
                    <h3>Next number will be: </h3>
                    <div className="btnbox">
                        <button className="btn" onClick={()=>{handleClick(1);setLoading(true)}}>Smaller</button>
                        <button className="btn" onClick={()=>{handleClick(2);setLoading(true)}}>Greater</button>
                    </div>
                </main>

                <div className="history">
                    <table>
                        <thead>
                            History:
                        </thead>
                        <tbody>
                        {
                            gameData.history.map((h, index) =>{
                                return <tr key={index}>
                                    <td>{h.round}.</td>
                                    <td>{h.win ? "win" : "no points"}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div> 
            :
            <EndScreen points={gameData.points} handleReset={handleReset} />
            }
        </div>
    )
}

export default DataFetching

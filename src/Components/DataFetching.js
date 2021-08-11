import React, {useState, useEffect} from 'react'
import axios from 'axios'
import EndScreen from './EndScreen';
import { getGameData, deleteGameData, saveGameData } from '../helpers/localstorage'


function DataFetching(props) {
    // const [currNumber, setCurrNumber] = useState(Math.ceil(Math.random() * 5 + 1));
    // const [roundCount, setRoundCount] = useState(1);
    // const [lastNumber, setLastNumber] = useState(currNumber);

    const [gameData, setGameData] = useState({
        currNumber:  Math.ceil(Math.random() * 5 + 1),
        lastNumber: null,
        points: 0,
        history: [],
        roundCount: 1
    })

    // const [points, setPoints] = useState(0);
    const [update, setupdate] = useState(0)
    const [wybor, setwybor] = useState(0)

    useEffect(() =>{
        if(props.resume)
        {
            const gameDataLocalStorage = getGameData()
            setGameData(gameDataLocalStorage)
        }
    }, [])

    useEffect(() =>{
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
        return (lastNumber < currNumber && a==2) || (lastNumber > currNumber && a==1)
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
    {return <img src={`http://roll.diceapi.com/images/poorly-drawn/d6/${img}.png`} alt="dice" />}


    return (
        <div>
            {gameData.roundCount !== 30 
            ?  
            <div>
                <div>
                    <table>
                        <tbody>
                        {
                            gameData.history.map((h, index) =>{
                                return <tr key={index}>
                                    <td>{h.round}</td>
                                    <td>{h.win ? "win" : "loose"}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div>
                    <h1>Number: {gameData.currNumber}</h1>
                    <h1>Last Number: {gameData.lastNumber}</h1>
                    <h1>Points: {Math.round((gameData.points + Number.EPSILON) * 100) / 100}</h1>
                    <Die img={gameData.currNumber} />
                    <h1>Round {gameData.roundCount} of 30</h1>
                    <button className="btn" onClick={()=>{handleClick(1)}}>Smaller</button>
                    <button className="btn" onClick={()=>{handleClick(2)}}>Greater</button>
                </div>
            </div> 
            :
            <EndScreen points={gameData.points} handleReset={handleReset} />
            }
        </div>
    )
}

export default DataFetching

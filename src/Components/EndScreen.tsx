type TEndScreen = {
  points: number
  handleReset: () => void
}

const EndScreen: React.FC<TEndScreen> = ({ points, handleReset }) => {
  return (
    <div className="endscreen">
      <h1>Game Over</h1>
      <h1>Your points: {Math.round((points + Number.EPSILON) * 100) / 100}</h1>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default EndScreen

type TResumeGameScreen = {
  handleResumeGame: (value: boolean) => void
}

const ResumeGameScreen: React.FC<TResumeGameScreen> = ({
  handleResumeGame,
}) => {
  return (
    <div className="resumegamescreen">
      <h1>Reload the previous game?</h1>
      <div className="btnbox">
        <button
          onClick={() => {
            handleResumeGame(true)
          }}
        >
          YES
        </button>
        <button
          onClick={() => {
            handleResumeGame(false)
          }}
        >
          NO
        </button>
      </div>
    </div>
  )
}

export default ResumeGameScreen

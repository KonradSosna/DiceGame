export type TSaveGameData = {
  currNumber: number
  history: historyType[]
  lastNumber: number | null
  points: number
  roundCount: number
}

export type historyType = {
  round: number
  win: boolean
}

export const saveGameData = (gameData: TSaveGameData) => {
  localStorage.setItem('gameData', JSON.stringify(gameData))
}

export const getGameData = () => {
  if (!gameDataExist) return null

  const gameStatusJSON = localStorage.getItem('gameData') || '[]'
  return JSON.parse(gameStatusJSON)
}

export const gameDataExist = (): boolean => {
  return localStorage.getItem('gameData') != null
}

export const deleteGameData = () => {
  localStorage.removeItem('gameData')
}

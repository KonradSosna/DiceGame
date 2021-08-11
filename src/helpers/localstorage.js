export const saveGameData = (gameData) =>{
    localStorage.setItem("gameData", JSON.stringify(gameData))
}

export const getGameData = () =>{
    if(!gameDataExist())
        return null
    const gameStatusJSON = localStorage.getItem("gameData")
    return JSON.parse(gameStatusJSON)
}

export const gameDataExist = () =>{
    return localStorage.getItem("gameData") != null
}

export const deleteGameData = () =>{
    localStorage.removeItem("gameData")
}
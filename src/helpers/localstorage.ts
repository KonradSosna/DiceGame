export const saveGameData = (gameData: TSaveGameData) => {
	localStorage.setItem('gameData', JSON.stringify(gameData));
	console.log('gameData', gameData);
};

type TSaveGameData = {
	currNumber: number;
	history: history[];
	lastNumber: number;
	points: number;
	roundCount: number;
};

type history = {
	round: number;
	win: string;
};

export const getGameData = () => {
	if (!gameDataExist) return null;

	const gameStatusJSON: any = localStorage.getItem('gameData');
	return JSON.parse(gameStatusJSON);
};

export const gameDataExist = (): boolean => {
	return localStorage.getItem('gameData') != null;
};

export const deleteGameData = () => {
	localStorage.removeItem('gameData');
};

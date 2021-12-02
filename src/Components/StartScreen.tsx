import React from 'react';

type TStartScreen = {
	gameStarter: () => void;
};

const StartScreen: React.FC<TStartScreen> = ({ gameStarter }) => {
	return (
		<div className="wrap">
			<img src="/img/dices.png" alt="dices"></img>
			<div className="main">
				<h1>The Dice Game</h1>
				<button onClick={() => gameStarter()}>Lets Roll</button>
			</div>
		</div>
	);
};

export default StartScreen;

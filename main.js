document.addEventListener('DOMContentLoaded', e => {
	const gameBoard = getSizedCanvas('game-board');

	const universe = new Universe(gameBoard);
	universe.addPlayer(
		new Vector(50, gameBoard.height / 2),
		20);
	universe.addPlayer(
		new Vector(gameBoard.width - 50, gameBoard.height / 2),
		20);

	new Starfield(getSizedCanvas('background'), {
		starSystem: universe.starSystem
	})

	function getSizedCanvas(id) {
		const canvas = document.getElementById(id);
		canvas.width = document.body.clientWidth;
		canvas.height = canvas.width * 0.65;
		return canvas;
	}

	universe.on('state-change', state => {
		document.body.classList.remove('targetting');
		document.body.classList.remove('ongoing-shot');
		document.body.classList.remove('game-over');
		switch (state) {
			case Universe.TARGETTING:
				document.body.classList.add('targetting');
				break;
			case Universe.ONGOING_SHOT:
				document.body.classList.add('ongoing-shot');
				break;
			case Universe.GAME_OVER:
				document.body.classList.add('game-over');
				break;
		}
	});
	universe.on('change-player', player => {
		document.body.classList.remove('player-1');
		document.body.classList.remove('player-2');
		document.body.classList.add(`player-${player + 1}`);
	});
	
});
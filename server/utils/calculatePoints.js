const { Match } = require('../models/Match');
const { User } = require('../models/User');
const userController = require('../controllers/userController');
const { RoundResults } = require('../models/RoundResults');

const fs = require('fs');
const readline = require('readline');

const numOfGroups = 8;
const matchesPerRound = 2 * 8;
const currentRound = 1;

//const filePath = 'resultsPerRounds.json';

const countNumOfLines = (filePath) => {
	try {
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const lines = fileContent.split('\n');
		return lines.length;
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.error('File not found.');
		} else {
			console.error('Error reading the file:', error);
		}
		return -1; // Return -1 to indicate an error
	}
};

const readRealResults = (round, filePath) => {
	return new Promise((resolve, reject) => {
		const rl = readline.createInterface({
			input: fs.createReadStream(filePath),
		});

		let jsonObj = {};
		let currentLine = 0;

		rl.on('line', (line) => {
			currentLine++;

			if (currentLine === round) {
				try {
					jsonObj = JSON.parse(line);
					rl.close();
					resolve(jsonObj);
				} catch (error) {
					console.error('Error parsing JSON: ', error);
					reject(error);
				}
			}
		});
		rl.on('close', () => {
			//poziva se kad se sve linije obrade, ako nije prije pozvan.
			if (currentLine < round) {
				//console.log(`The file has fewer than ${round} lines.`);
				reject(new Error(`The file has fewer than ${round} lines.`));
			}
		});
	});
};

const calculatePointsPerRound = (userResults, realRoundResults) => {
	//userResults će biti dostupni jer će se fetchat iz baze
	//userResults je objekt: {roundNumber, results}

	let totalPoints = 0;
	let correctResultPoints = 0; //bodovi za točan rezultat
	let correctWinningTeamPoints = 0; //bodovi za pogođenog pobjednika

	const { roundNumber, results } = userResults;
	for (let i = 0; i < results.length; i++) {
		const userResult = results[i];

		const realResult = findMatch(userResult, realRoundResults);
		console.log('userResult: ', userResult);
		console.log('realResult: ', realResult);

		//console.log('User-result: ', userResult.result);
		//console.log('Real-result: ', realResult.result);
		if (userResult.result === realResult.result) {
			//console.log('userResult: ', userResult.result);
			//console.log('realResult: ', realResult.result);
			correctResultPoints += 1;
		}
		const realWinner = findWinner(realResult);
		if (userResult.winningTeam === realWinner) {
			//console.log('match: ', userResult.match);
			//console.log('winningTeam: ', userResult.winningTeam);
			correctWinningTeamPoints += 1;
		}
	}
	totalPoints = correctWinningTeamPoints + 3 * correctResultPoints;
	return totalPoints;
};
const findMatch = (userResult, realRoundResults) => {
	for (let i = 0; i < realRoundResults.length; i++) {
		const match = realRoundResults[i].match;
		if (userResult.winningTeam === 'x') {
			if (match === userResult.match) {
				return realRoundResults[i];
			}
		}
		if (match.includes(userResult.winningTeam)) {
			return realRoundResults[i];
		}
	}
};
const findWinner = (realResult) => {
	const res = realResult.result.split('-');
	const teams = realResult.match.split('-');

	if (res[0] === res[1]) {
		return 'x';
	}
	if (+res[0] > +res[1]) {
		return teams[0];
	}
	if (+res[0] < +res[1]) {
		return teams[1];
	}
};

module.exports = { readRealResults, calculatePointsPerRound, countNumOfLines };

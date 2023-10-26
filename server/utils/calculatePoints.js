const { Match } = require('../models/Match');

const numOfGroups = 8;
const matchesPerRound = 2 * 8;
const currentRound = 1;

const realRoundResults = [
	{
		match: 'Arsenal-PSV',
		result: '4-0',
	},
	{
		match: 'Bayern-Manchester Utd',
		result: '4-3',
	},
	{
		match: 'Benfica-Salzburg',
		result: '0-2',
	},
	{
		match: 'Braga-Napoli',
		result: '1-2',
	},
	{
		match: 'Real Sociedad-Inter',
		result: '1-1',
	},
	{
		match: 'Sevilla-Lens',
		result: '1-1',
	},
	{
		match: 'Galatasaray-FC Kopenhagen',
		result: '2-2',
	},
	{
		match: 'Real Madrid-Union Berlin',
		result: '1-0',
	},
	{
		match: 'Barcelona-Antwerp',
		result: '5-0',
	},
	{
		match: 'Feyenoord-Celtic',
		result: '2-0',
	},
	{
		match: 'Lazio-Atletico Madrid',
		result: '1-1',
	},
	{
		match: 'Manchester City-Crvena zvezda',
		result: '3-1',
	},
	{
		match: 'PSG-Borussia Dortmund',
		result: '2-0',
	},
	{
		match: 'Shakhtar-Porto',
		result: '1-3',
	},
	{
		match: 'AC Milan-Newcastle',
		result: '0-0',
	},
	{
		match: 'Young Boys-RB Leipzig',
		result: '1-3',
	},
];

const calculatePointsPerRound = (userResults, realRoundResults) => {
	//userResults će biti dostupni jer će se fetchat iz baze
	//userResults je objekt: {roundNumber, results}

	const totalPoints = 0;
	const correctResultPoints = 0; //bodovi za točan rezultat
	const correctWinningTeamPoints = 0; //bodovi za pogođenog pobjednika

	const { roundNumber, results } = userResults;
	for (let i = 0; i < results.length; i++) {
		const userResult = results[i];
		const realResult = findMatch(userResult.winningTeam, realRoundResults);

		if (userResult.result === realResult.result) {
			correctResultPoints += 1;
		}
		const realWinner = findWinner(realResult);
		if (userResult.winningTeam === realWinner) {
			correctWinningTeamPoints += 1;
		}
	}
	totalPoints = correctWinningTeamPoints + 3 * correctResultPoints;
	return totalPoints;
};
const findMatch = (teamInMatch, realRoundResults) => {
	for (let i = 0; i < realRoundResults.length; i++) {
		const match = realRoundResults[i].match;
		if (match.includes(teamInMatch)) {
			return realRoundResults[i];
		}
	}
};
const findWinner = (realResult) => {
	const res = realResult.result.split('-');
	const teams = realResult.match.split('-');

	if (res[0] === res[1]) {
		return '-';
	}
	if (+res[0] > +res[1]) {
		return teams[0];
	}
	if (+res[0] < +res[1]) {
		return teams[1];
	}
};

module.exports = {
	calculatePointsPerRound,
	realRoundResults,
};

const { error } = require('console');
const fs = require('fs');

const realRoundResults = [
	{
		match: 'Antwerp-Porto',
		result: '1-4',
	},
	{
		match: 'Celtic-Atletico Madrid',
		result: '2-2',
	},
	{
		match: 'Newcastle-Borussia Dortmund',
		result: '0-1',
	},
	{
		match: 'PSG-AC Milan',
		result: '3-0',
	},
	{
		match: 'RB Leipzig-Crvena zvezda',
		result: '3-1',
	},
	{
		match: 'Young Boys-Mancester City',
		result: '1-3',
	},
	{
		match: 'Barcelona-Shakhtar',
		result: '2-1',
	},
	{
		match: 'Feyenoord-Lazio',
		result: '3-1',
	},
	{
		match: 'Benfica-Real Sociedad',
		result: '0-1',
	},
	{
		match: 'Braga-Real Madrid',
		result: '1-2',
	},
	{
		match: 'Lens-PSV',
		result: '1-1',
	},
	{
		match: 'Manchester Utd-FC Kopenhagen',
		result: '1-0',
	},
	{
		match: 'Sevilla-Arsenal',
		result: '1-2',
	},
	{
		match: 'Union Berlin-Napoli',
		result: '0-1',
	},
	{
		match: 'Galatasaray-Bayern',
		result: '1-3',
	},
	{
		match: 'Inter-Salzburg',
		result: '2-1',
	},
];

const jsonData = JSON.stringify(realRoundResults);
const jsonDataWithNewLine = jsonData + '\n';

const filePath = 'resultsPerRounds.json';

fs.writeFile(filePath, jsonDataWithNewLine, { flag: 'a' }, (err) => {
	if (err) {
		console.log('Cannot save the file', err);
	}
});

const DUMMY_MATCHES = [
	'Dinamo - Hajduk',
	'Slaven Belupo - Lokomotiva',
	'Rudeš - Gorica',
	'Istra - Rijeka',
];

const groupAMatches = ['Galatasaray - Bayern', 'Inter - Salzburg'];
const groupBMatches = ['Benfica - Real Sociedad', 'Braga - Real Madrid'];
const groupCMatches = ['Lens - PSV', 'Manchester Utd - FC Kopenhagen'];
const groupDMatches = ['Sevilla - Arsenal', 'Union Berlin - Napoli'];
const groupEMatches = ['Barcelona - Shakhtar', 'Feyenoord - Lazio'];
const groupFMatches = ['Antwerp - Porto', 'Celtic - Atletico Madrid'];
const groupGMatches = ['Newcastle - Borussia Dortmund', 'PSG - AC Milan'];
const groupHMatches = [
	'RB Leipzig - Crvena zvezda',
	'Young Boys - Manchester City',
];

const availableMatches = [
	groupAMatches,
	groupBMatches,
	groupCMatches,
	groupDMatches,
	groupEMatches,
	groupFMatches,
	groupGMatches,
	groupHMatches,
];
const roundNumber = 1; //broj kola

module.exports = {
	roundNumber,
	availableMatches,
};

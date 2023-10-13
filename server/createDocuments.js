const { Group } = require('./models/Group');
const { Match } = require('./models/Match');

const groups = [
	['Bayern Munich', 'Galatasaray', 'Kopenhagen', 'Man Utd'],
	['Lens', 'Arsenal', 'Sevilla', 'PSV Eindhoven'],
	['Real Madrid', 'Napoli', 'Braga', 'Union Berlin'],
	['Real Sociedad', 'Inter', 'RB Salzburg', 'Benfica'],
	['Atletico Madrid', 'Lazio', 'Feyenoord', 'Celtic'],
	['Newcastle', 'PSG', 'Milan', 'Borussia Dortmund'],
	['Man City', 'RB Leipzig', 'Young Boys', 'Crvena zvezda'],
	['Barcelona', 'Porto', 'Šahtar', 'Antwerp'],
];

const createMatchesForOneGroup = (group) => {
	const matches = [];
	for (let j = 0; j < group.length; j++) {
		const team1 = group[j];
		for (let k = j + 1; k < group.length; k++) {
			const match = new Match({
				team1: team1,
				team2: group[k],
			});
			matches.push(match);
		}
	}
	return matches;
};
const extractTeamsFromGroup = (group) => {
	const teams = [];
	for (let i = 0; i < group.length; i++) {
		teams.push(group[i]);
	}
	return teams;
};

const createGroups = (groups) => {
	for (let i = 0; i < groups.length; i++) {
		const teamsInGroup = extractTeamsFromGroup(groups[i]);
		const matchesInGroup = createMatchesForOneGroup(groups[i]);

		Promise.all(matchesInGroup.map((match) => match.save())).then(
			(savedMatches) => {
				const group = new Group({
					teams: teamsInGroup,
					matches: savedMatches.map((match) => match._id),
				});
				return group.save();
			}
		);
	}
};

module.exports = {
	groups,
	createGroups,
};

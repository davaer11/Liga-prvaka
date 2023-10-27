const fs = require('fs');

//const groupAMatches1 = ['Bayern-Manchester Utd', 'Galatasaray-FC Kopenhagen'];
//const groupAMatches2 = ['Manchester Utd-Galatasaray', 'FC Kopenhagen-Bayern'];
//const groupAMatches3 = ['Galatasaray-Bayern', 'Manchester Utd-FC Kopenhagen'];
//const groupAMatches4 = ['FC Kopenhagen-Manchester Utd', 'Bayern-Galatasaray'];
//const groupAMatches5 = ['Galatasaray-Manchester Utd', 'Bayern-FC Kopenhagen'];
const groupAMatches6 = ['Manchester Utd-Bayern', 'FC Kopenhagen-Galatasaray'];

//const groupBMatches1 = ['Sevilla-Lens', 'Arsenal-PSV'];
//const groupBMatches2 = ['Lens-Arsenal', 'PSV-Sevilla'];
//const groupBMatches3 = ['Sevilla-Arsenal', 'Lens-PSV'];
//const groupBMatches4 = ['PSV-Lens', 'Arsenal-Sevilla'];
//const groupBMatches5 = ['Sevilla-PSV', 'Arsenal-Lens'];
const groupBMatches6 = ['Lens-Sevilla', 'PSV-Arsenal'];

//const groupCMatches1 = ['Real Madrid-Union Berlin', 'Braga-Napoli'];
//const groupCMatches2 = ['Napoli-Real Madrid', 'Union Berlin-Braga'];
//const groupCMatches3 = ['Braga-Real Madrid', 'Union Berlin-Napoli'];
//const groupCMatches4 = ['Napoli-Union Berlin', 'Real Madrid-Braga'];
//const groupCMatches5 = ['Braga-Union Berlin', 'Real Madrid-Napoli'];
const groupCMatches6 = ['Union Berlin-Real Madrid', 'Napoli-Braga'];

//const groupDMatches1 = ['Benfica-Salzburg', 'Real Sociedad-Inter'];
//const groupDMatches2 = ['Salzburg-Real Sociedad', 'Inter-Benfica'];
//const groupDMatches3 = ['Inter-Salzburg', 'Benfica-Real Sociedad'];
//const groupDMatches4 = ['Salzburg-Inter', 'Real Sociedad-Benfica'];
//const groupDMatches5 = ['Benfica-Inter', 'Real Sociedad-Salzburg'];
const groupDMatches6 = ['Inter-Real Sociedad', 'Salzburg-Benfica'];

//const groupEMatches1 = ['Lazio-Atletico Madrid', 'Feyenoord-Celtic'];
//const groupEMatches2 = ['Atletico Madrid-Feyenoord', 'Celtic-Lazio'];
//const groupEMatches3 = ['Celtic-Atletico Madrid', 'Feyenoord-Lazio'];
//const groupEMatches4 = ['Lazio-Feyenoord', 'Atletico Madrid-Celtic'];
//const groupEMatches5 = ['Lazio-Celtic', 'Feyenoord-Atletico Madrid'];
const groupEMatches6 = ['Atletico Madrid-Lazio', 'Celtic-Feyenoord'];

//const groupFMatches1 = ['Milan-Newcastle', 'PSG-Borussia Dortmund'];
//const groupFMatches2 = ['Newcastle-PSG', 'Borussia Dortmund-Milan'];
//const groupFMatches3 = ['Newcastle-Borussia Dortmund', 'PSG-Milan'];
//const groupFMatches4 = ['Milan-PSG', 'Borussia Dortmund-Newcastle'];
//const groupFMatches5 = ['PSG-Newcastle', 'Milan-Borussia Dortmund'];
const groupFMatches6 = ['Borussia Dortmund-PSG', 'Newcastle-Milan'];

//const groupGMatches1 = ['Young Boys-Leipzig', 'Manchester City-Crvena Zvezda'];
//const groupGMatches2 = ['Leipzig-Manchester City', 'Crvena Zvezda-Young Boys'];
//const groupGMatches3 = ['Leipzig-Crvena Zvezda', 'Young Boys-Manchester City'];
//const groupGMatches4 = ['Crvena Zvezda-Leipzig', 'Manchester City-Young Boys'];
//const groupGMatches5 = ['Manchester City-Leipzig', 'Young Boys-Crvena Zvezda'];
const groupGMatches6 = ['Crvena Zvezda-Manchester City', 'Leipzig-Young Boys'];

//const groupHMatches1 = ['Barcelona-Antwerp', 'Shakhtar-Porto'];
//const groupHMatches2 = ['Antwerp-Shakhtar', 'Porto-Barcelona'];
//const groupHMatches3 = ['Barcelona-Shakhtar', 'Antwerp-Porto'];
//const groupHMatches4 = ['Porto-Antwerp', 'Shakhtar-Barcelona'];
//const groupHMatches5 = ['Shakhtar-Antwerp', 'Barcelona-Porto'];
const groupHMatches6 = ['Antwerp-Barcelona', 'Porto-Shakhtar'];

const availableMatches = [
	groupAMatches6,
	groupBMatches6,
	groupCMatches6,
	groupDMatches6,
	groupEMatches6,
	groupFMatches6,
	groupGMatches6,
	groupHMatches6,
];
const roundNumber = 6; //broj kola

const jsonData = JSON.stringify({
	roundNumber: roundNumber,
	availableMatches: availableMatches,
});
const jsonDataWithNewLine = jsonData;
+'\n';

const filePath = 'availableMatches.json';

fs.writeFile(filePath, jsonDataWithNewLine, { flag: 'a' }, (err) => {
	if (err) {
		console.log('Cannot save the file', err);
	}
});

module.exports = {
	roundNumber,
	availableMatches,
};

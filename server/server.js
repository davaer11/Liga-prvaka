const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { User, UserSchema } = require('./models/User');
const { RoundResults } = require('./models/RoundResults');
const InitialForm = require('./models/InitialForm');
const { Group, GroupSchema } = require('./models/Group');
const { groups, createGroups } = require('./utils/createDocuments');
const userController = require('./controllers/userController');

const {
	readRealResults,
	calculatePointsPerRound,
	countNumOfLines,
} = require('./utils/calculatePoints');
const { UserStats } = require('./models/UserStats');

//how to organize route files

const app = express();
const CURRENT_ROUND_INDEX = 1;

mongoose
	.connect(
		'mongodb+srv://david:dava1998@lpcluster.mo4b7nt.mongodb.net/LigaPrvaka',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const secretKey = 'liga_prvaka2023';

app.post('/register', async (req, res) => {
	const user = req.body;
	try {
		const userExists = await userController.findUser(user.userName);
		if (userExists) {
			res.status(401).send('User with that username already exists!');
		} else {
			await userController.createUser(user);
			res.status(200).send('User is successfully created!');
		}
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: error.message });
	}
});
app.post('/login', async (req, res) => {
	const { userName, password } = req.body;
	try {
		const user = await userController.findUser(userName);

		if (!user) {
			res.status(401).json({ error: 'User not found!' });
		}

		await userController.checkIfPasswordIsCorrect(password, user.password);

		const token = jwt.sign({ userId: user._id }, secretKey, {
			expiresIn: '1h',
		});
		res.json({ token, user });
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: error.message });
	}
});
app.post('/initialForm', async (req, res) => {
	try {
		const { userId, formData } = req.body;
		console.log(formData);

		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found!' });
		}

		const initialForm = new InitialForm({
			user: user._id,
			leagueWinner: formData.leagueWinner,
			bestScorer: formData.bestScorer,
			groupAOrder: formData.groupAOrder,
			groupBOrder: formData.groupBOrder,
			groupCOrder: formData.groupCOrder,
			groupDOrder: formData.groupDOrder,
		});

		await initialForm.save();
		return res
			.status(201)
			.json({ message: 'Form data submitted successfully!' });
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.put('/initialForm', async (req, res) => {
	// ZA SADA: tu sam mijenjao samo initialFormSubmitted, pa cu samo to promijenit u bazi

	try {
		const updatedUser = req.body;
		const updatedUserID = await User.findOne(
			{ userName: updatedUser.userName },
			'_id'
		).exec();

		const update = {
			$set: {
				initialFormSubmitted: updatedUser.initialFormSubmitted,
			},
		};

		const result = await User.updateOne({ _id: updatedUserID }, update).exec();

		if (result.nModified === 1) {
			console.log('User updated successfully!');
		}
	} catch (error) {
		console.log('Cannot update user with provided username');
	}
});

app.get('/initialForm', async (req, res) => {
	const groups = await Group.find({});

	const groupsForClient = [];
	for (let i = 0; i < groups.length; i++) {
		groupsForClient.push({
			groupName: groups[i].groupName,
			teams: groups[i].teams,
		});
	}
	groupsForClient.sort((first, second) => {
		const firstLowerCase = first.groupName.toLowerCase();
		const secondLowerCase = second.groupName.toLowerCase();

		const firstLetter = firstLowerCase.charAt(firstLowerCase.length - 1);
		const secondLetter = secondLowerCase.charAt(secondLowerCase.length - 1);

		return firstLetter.localeCompare(secondLetter);
	});
	console.log(groupsForClient.length);
	return res.json(groupsForClient);
});

app.get('/availableMatches', async (req, res) => {
	try {
		const data = fs.readFileSync('utils/availableMatches.json', 'utf-8'); //data je string
		const jsonObject = JSON.parse(data);
		res.json(jsonObject[CURRENT_ROUND_INDEX]);
	} catch (error) {
		res.json(error);
	}
});
app.post('/availableMatches', async (req, res) => {
	try {
		const { userId, roundResults, roundNumber } = req.body;

		const updatedRoundResults = roundResults.map((obj) => {
			//mičem id
			return {
				match: obj.match,
				winningTeam: obj.winningTeam,
				result: obj.result,
			};
		});

		const newRoundResults = new RoundResults({
			roundNumber: roundNumber,
			results: updatedRoundResults,
		});

		const savedRoundResults = await newRoundResults.save();

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $push: { roundResults: savedRoundResults._id } },
			{ new: true }
		);
		res.json(roundResults);
	} catch (error) {
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.get('/rankings', async (req, res) => {
	const usernamesWithPoints = await User.aggregate([
		{
			$project: {
				userName: 1,
				totalPoints: 1,
				numOfRounds: { $size: '$roundResults' },
				_id: 0,
			},
		},
		{
			$sort: {
				totalPoints: -1, //descending order
			},
		},
	]).exec();

	return res.json(usernamesWithPoints);
});

app.get('/userStats', async (req, res) => {
	const userName = req.query.userName;

	const user = await userController.findUser(userName);

	const numOfLines = countNumOfLines('utils/resultsPerRounds.json'); //koliko se stvarno odigralo kola

	const firstFalseIndex = user.pointsAreCalculated.findIndex(
		(element) => element === false
	);
	const numOfSubmittedRounds = user.roundResults.length;

	if (firstFalseIndex === 0 && numOfSubmittedRounds === 0) {
		//user se prvi put logirao i pri tome nije niti jednu rundu submitao.
		return res.json({ message: 'There is no stats for you!' });
	}

	console.log('first false index: ', firstFalseIndex);

	//postoji neko kolo čiji bodovi nisu izračunati
	if (firstFalseIndex < numOfSubmittedRounds) {
		//nije izračunato neko kolo koje je odigrano
		for (let i = firstFalseIndex; i < numOfSubmittedRounds; i++) {
			const roundResultsRef = user.roundResults[i];
			const userResults = await RoundResults.findOne({ _id: roundResultsRef });
			readRealResults(i + 1, 'utils/resultsPerRounds.json')
				.then(async (realRoundResults) => {
					const pointsPerRound = calculatePointsPerRound(
						userResults,
						realRoundResults
					);
					const updateObj = {
						$set: {
							totalPoints: user.totalPoints + pointsPerRound,
						},
					};
					updateObj.$set[`pointsAreCalculated.${i}`] = true;
					await User.updateOne({ _id: user._id }, updateObj);

					const statsData = {
						$set: {
							totalPoints: user.totalPoints + pointsPerRound,
							[`pointsPerRounds.${i}`]: pointsPerRound,
						},
					};

					const updatedUserStats = await UserStats.updateOne(
						{ _id: user.userStats },
						statsData
					);
				})
				.catch((error) => {
					console.log('Error: ', error);
				});
		}
	}
	//(svi veći indeksi znače da još nije izračunato za to kolo, ali to kolo još nije odigrano pa ne može bit račun)
	const userStats = await UserStats.findById(user.userStats);

	return res.json({
		totalPoints: userStats.totalPoints,
		pointsPerRounds: userStats.pointsPerRounds,
	});
});

app.listen(5000, (req, res) => {
	console.log('Server started on port 5000!');
});

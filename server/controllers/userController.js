const { User } = require('../models/User');
const { UserStats } = require('../models/UserStats');

const bcrypt = require('bcrypt');

const getAllUsers = async () => {
	try {
		const users = await User.find({}).exec();
		return users;
	} catch (error) {
		console.error('Cannot fetch users ', error);
	}
};

const createUser = async (user) => {
	try {
		const newUserStats = new UserStats();
		await newUserStats.save();

		const newUser = new User(user);
		newUser.userStats = newUserStats._id;
		await newUser.save();
	} catch (error) {
		console.error('Cannot create new user ', error);
		throw error;
	}
};

const findUser = async (username) => {
	try {
		const user = await User.findOne({ userName: username });
		return user;
	} catch (error) {
		console.log('Error checking if user exists ', error);
		throw error;
	}
};

//actualPassword je trenutno upisana šifra, a druga je postojeća u bazi.
const checkIfPasswordIsCorrect = async (actualPassword, savedPassword) => {
	try {
		const isPasswordCorrect = await bcrypt.compare(
			actualPassword,
			savedPassword
		);

		if (!isPasswordCorrect) {
			throw new Error('Incorrect password!');
		}
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllUsers,
	createUser,
	findUser,
	checkIfPasswordIsCorrect,
};

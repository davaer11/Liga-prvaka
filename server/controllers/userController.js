const { User } = require('../models/User');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
	//za sada ga ne koristim
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		console.error('Cannot fetch users ', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

const createUser = async (user) => {
	try {
		const newUser = new User(user);
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

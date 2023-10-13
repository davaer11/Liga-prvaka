import AuthContext from './auth-context';
import { useState } from 'react';

const AuthProvider = (props) => {
	const [user, setUser] = useState({
		userName: '',
		password: '',
		totalPoints: 0,
		initialFormSubmitted: false,
	});
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = async (userData) => {
		try {
			const response = await fetch('/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				throw new Error('Login failed!');
			}

			const serverUserData = await response.json();
			const { token, ...serverUser } = serverUserData;
			setUser(serverUser.foundUser);
			setIsLoggedIn(true);
			localStorage.setItem('user_token', token);
			return { msg: 'Login successfull!', serverUser: serverUser.foundUser };
		} catch (error) {
			return error.message;
		}
	};

	const logout = () => {
		setUser(null);
		setIsLoggedIn(false);
		localStorage.removeItem('user_token');
	};

	const changeUserData = async (newData) => {
		const updatedUser = { ...user };
		updatedUser.initialFormSubmitted = newData.initialFormSubmitted;
		setUser(updatedUser);

		try {
			const response = await fetch('/initialForm', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedUser),
			});

			if (!response.ok) {
				throw new Error('User cannot be modified!');
			}
			console.log('Uspješno je update prošao');
		} catch (error) {
			console.log(error.message);
		}
	};

	const authContext = {
		user: user,
		isLoggedIn: isLoggedIn,
		login: login,
		logout: logout,
		changeUserData: changeUserData,
	};

	return (
		<AuthContext.Provider value={authContext}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

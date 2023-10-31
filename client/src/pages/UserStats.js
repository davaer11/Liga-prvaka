import { useEffect, useContext, useState } from 'react';
import AuthContext from '../store/auth-context';

const UserStats = () => {
	const authContext = useContext(AuthContext);
	const user = authContext.user;

	//useReducer koristit za ova stanja
	const [totalNumOfPoints, setTotalNumOfPoints] = useState(0);
	const [message, setMessage] = useState('');

	const fetchStats = async () => {
		try {
			const response = await fetch(`/userStats?userName=${user.userName}`);

			if (!response.ok) {
				throw new Error();
			}

			//const { totalPoints, pointsPerRounds } = await response.json();
			const resObj = await response.json();
			if (resObj.message) {
				setMessage(resObj.message);
			} else {
				//ima i pointsPerRounds: resObj.pointsPerRounds
				setTotalNumOfPoints(resObj.totalPoints);
			}
		} catch (error) {
			console.log("Couldn't fetch data from server!!");
		}
	};

	useEffect(() => {
		fetchStats();
	}, []);

	return (
		<>
			{!message && <p>totalPoints: {totalNumOfPoints}</p>}
			{message && <p>{message}</p>}
		</>
	);
};
export default UserStats;

//To može biti: broj ukupno skupljenih bodova i pokaz na čemu su se bodovi dobili i koliki je udio svakog (kroz svako kolo)

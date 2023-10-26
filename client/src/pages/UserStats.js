import { useEffect } from 'react';

const UserStats = () => {
	const fetchStats = async () => {
		try {
			const response = await fetch('/userStats');

			if (!response.ok) {
				throw new Error();
			}

			const { roundNumber, matches } = await response.json();
		} catch (error) {
			console.log("Couldn't fetch data from server!!");
		}
	};

	useEffect(() => {
		fetchStats();
	}, []);

	return <p>UserStats</p>;
};
export default UserStats;

//To može biti: broj ukupno skupljenih bodova i pokaz na čemu su se bodovi dobili i koliki je udio svakog (kroz svako kolo)

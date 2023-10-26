import React from 'react';
import classes from './AvailableMatches.module.css';
import { useEffect, useState } from 'react';
import MatchesInGroup from '../components/MatchesInGroup';
import { useNavigate } from 'react-router-dom';
import { useGetUserId } from '../utils/userUtils';

const AvailableMatches = () => {
	const [availableMatches, setAvailableMatches] = useState([]);
	const [roundResults, setRoundResults] = useState([]);
	const [roundNumber, setRoundNumber] = useState(0);

	const navigate = useNavigate();

	const userId = useGetUserId();

	const fetchMatches = async () => {
		try {
			const response = await fetch('/availableMatches');

			if (!response.ok) {
				throw new Error();
			}

			const { roundNumber, matches } = await response.json();
			setAvailableMatches(matches);
			setRoundNumber(roundNumber);
		} catch (error) {
			console.log("Couldn't fetch data from server!!");
		}
	};
	useEffect(() => {
		fetchMatches();
	}, []);

	const handleRoundResults = (matchResult) => {
		let updatedResults = [...roundResults];

		const foundIndex = roundResults.findIndex(
			(result) => result.id === matchResult.id
		);
		if (foundIndex !== -1) {
			//postoji već u polju
			updatedResults = roundResults.map((result) => {
				if (result.id === matchResult.id) {
					return matchResult;
				}
				return result;
			});
		} else {
			updatedResults.push(matchResult);
		}
		setRoundResults(updatedResults);
	};
	console.log(roundResults);

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch('/availableMatches', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId, roundResults, roundNumber }),
			});

			if (!response.ok) {
				throw new Error("Couldn't submit chosen match results to the server!!");
			}
		} catch (error) {
			console.log(error.message);
		}
		navigate('../');
	};
	return (
		<form className={classes.matches} onSubmit={handleSubmit}>
			<ul>
				{`Kolo: ${roundNumber}.`}
				{availableMatches.map((groupMatches, groupIndex) => (
					<MatchesInGroup
						onSetRoundResults={handleRoundResults}
						key={groupIndex}
						groupId={groupIndex}
						groupMatches={groupMatches}
					></MatchesInGroup>
				))}
			</ul>
			<button type='submit'>Submit</button>
		</form>
	);
};

export default AvailableMatches;

import classes from './InitialForm.module.css';
import Group from './Group';
import { useState, useEffect, useContext, useReducer } from 'react';
import { useGetUserId } from '../utils/userUtils';
import AuthContext from '../store/auth-context';

const initialFormData = {
	leagueWinner: '',
	bestScorer: '',
	groupOrders: [],
};
const initialFormDataReducer = (state, action) => {
	if (action.type === 'SET_LEAGUE_WINNER') {
		return { ...state, leagueWinner: action.payload };
	}
	if (action.type === 'SET_BEST_SCORER') {
		return { ...state, bestScorer: action.payload };
	}
	if (action.type === 'SET_GROUP_ORDERS') {
		return { ...state, groupOrders: [...state.groupOrders, action.payload] };
	}
};

const InitialForm = () => {
	const [formData, dispatch] = useReducer(
		initialFormDataReducer,
		initialFormData
	);

	const [hideGroups, setHideGroups] = useState([false, false, false, false]);
	const [showIndividualGuesses, setShowIndividualGuesses] = useState(true);
	const [groups, setGroups] = useState([]);

	const userId = useGetUserId();

	const authCtx = useContext(AuthContext);

	let canPostFormData =
		formData.leagueWinner !== '' &&
		formData.bestScorer !== '' &&
		formData.groupOrders.length === 8;

	useEffect(() => {
		if (canPostFormData) {
			try {
				fetch('/initialForm', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ userId, formData }),
				}).then((response) => {
					if (!response.ok) {
						throw new Error('Response is not good -> ' + response.status);
					} else {
						authCtx.changeUserData({ initialFormSubmitted: true });
					}
				});
			} catch (error) {
				console.log(error.message);
			}
		}
	}, [userId, formData, canPostFormData]); //kad uključim authCtx ovdje onda se post napravi 6 puta - kako to riješit ??

	useEffect(() => {
		try {
			fetch('/initialForm')
				.then((response) => {
					if (!response.ok) {
						throw new Error('Response is not good -> ' + response.status);
					}
					return response.json();
				})
				.then((data) => {
					setGroups(data);
				});
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	const handleGroupSubmit = (groupNumber, groupOrder) => {
		const groupArray = [...hideGroups];
		groupArray[groupNumber] = true;
		setHideGroups(groupArray);

		dispatch({
			type: 'SET_GROUP_ORDERS',
			payload: groupOrder,
		});
	};

	return (
		<div className={classes['initial-form-container']}>
			{showIndividualGuesses && (
				<form
					className={classes.form}
					onSubmit={(event) => {
						event.preventDefault();
						setShowIndividualGuesses(false);
					}}
				>
					<div className={classes['input-group']}>
						<label>Pobjednik lige prvaka: </label>
						<input
							value={formData.leagueWinner}
							type='text'
							onChange={(event) =>
								dispatch({
									type: 'SET_LEAGUE_WINNER',
									payload: event.target.value,
								})
							}
						></input>
					</div>

					<div className={classes['input-group']}>
						<label>Najbolji strijelac: </label>
						<input
							value={formData.bestScorer}
							type='text'
							onChange={(event) =>
								dispatch({
									type: 'SET_BEST_SCORER',
									payload: event.target.value,
								})
							}
						></input>
					</div>
					<button type='submit'>OK</button>
				</form>
			)}
			<p>
				<strong>INFO:</strong> U polje ispod svake grupe unesite poredak od
				prvog do zadnjeg mjesta. Unesite imena klubova iz grupe i odvojite ih
				zarezom.
			</p>
			<section>
				<ul>
					{groups.map((group, index) => (
						<Group
							key={index}
							group={group}
							groupNumber={index}
							hide={hideGroups[index]}
							submitGroup={handleGroupSubmit}
						></Group>
					))}
				</ul>
			</section>
		</div>
	);
};
export default InitialForm;

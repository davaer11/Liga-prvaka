import classes from './Match.module.css';

import { useEffect, useState } from 'react';
const Match = ({ matchId, match, onSetRoundResults }) => {
	const teams = match.split('-');

	const [leftInputValue, setLeftInputValue] = useState(0);
	const [rightInputValue, setRightInputValue] = useState(0);

	const [hideMatch, setHideMatch] = useState(false);

	let winTeam = '';

	if (leftInputValue === rightInputValue) {
		winTeam = 'x';
	} else if (leftInputValue > rightInputValue) {
		winTeam = teams[0];
	} else if (leftInputValue < rightInputValue) {
		winTeam = teams[1];
	}
	const handleClick = (event) => {
		const matchResult = {
			id: matchId,
			match: match,
			winningTeam: winTeam,
			result: `${leftInputValue}-${rightInputValue}`,
		};
		onSetRoundResults(matchResult);
		setHideMatch(true);
	};

	const handleInputChange = (inputType, value) => {
		if (inputType === 'leftInput') {
			setLeftInputValue(value);
		}
		if (inputType === 'rightInput') {
			setRightInputValue(value);
		}
	};

	if (hideMatch) {
		return (
			<div>
				<span> Match submitted!</span>
			</div>
		);
	} else {
		return (
			<div className={classes.match}>
				<span style={{ color: winTeam === teams[0] ? 'blue' : 'black' }}>
					{teams[0]}
				</span>
				{' - '}
				<span style={{ color: winTeam === teams[1] ? 'blue' : 'black' }}>
					{teams[1]}
				</span>
				<div>
					<input
						type='number'
						min='0'
						value={leftInputValue}
						onChange={(event) =>
							handleInputChange('leftInput', event.target.value)
						}
					></input>
					{' - '}
					<input
						type='number'
						min='0'
						value={rightInputValue}
						onChange={(event) =>
							handleInputChange('rightInput', event.target.value)
						}
					></input>
					<button type='button' onClick={handleClick}>
						OK
					</button>
				</div>
			</div>
		);
	}
};

export default Match;

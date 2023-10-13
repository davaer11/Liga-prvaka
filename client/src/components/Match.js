import classes from './Match.module.css';

import { useEffect, useState } from 'react';
const Match = ({ matchId, match, onSetRoundResults }) => {
	const [selectedValue, setSelectedValue] = useState('');
	const teams = match.split('-');

	const [leftInputValue, setLeftInputValue] = useState(0);
	const [rightInputValue, setRightInputValue] = useState(0);

	useEffect(() => {
		if (selectedValue.length > 0) {
			const matchResult = {
				id: matchId,
				winningTeam: selectedValue,
				result: `${leftInputValue}:${rightInputValue}`,
			};
			onSetRoundResults(matchResult);
		}
	}, [selectedValue, leftInputValue, rightInputValue]);

	const toggleBtn = (btnType) => {
		if (btnType === 'leftBtn') {
			setSelectedValue(teams[0]);
		}
		if (btnType === 'rightBtn') {
			setSelectedValue(teams[1]);
		}
	};
	const handleInputChange = (inputType, value) => {
		if (inputType === 'leftInput') {
			setLeftInputValue(value);
		}
		if (inputType === 'rightInput') {
			setRightInputValue(value);
		}
	};

	return (
		<div className={classes.match}>
			<button
				type='button'
				id='leftBtn'
				onClick={() => toggleBtn('leftBtn')}
				style={{ backgroundColor: selectedValue === teams[0] ? 'green' : '' }}
			>
				{teams[0]}
			</button>
			{' - '}
			<button
				type='button'
				id='rightBtn'
				onClick={() => toggleBtn('rightBtn')}
				style={{ backgroundColor: selectedValue === teams[1] ? 'green' : '' }}
			>
				{teams[1]}
			</button>
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
			</div>
		</div>
	);
};

export default Match;

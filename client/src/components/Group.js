import { useState, useEffect } from 'react';
import classes from './Group.module.css';

const hasNoDuplicates = (arr) => {
	return arr.every((element, index) => arr.indexOf(element) === index);
};

const Group = ({ group, groupNumber, hide, orderGroup, submitGroup }) => {
	const teams = group.teams;
	const groupName = group.groupName;

	const [selectedValues, setSelectedValues] = useState(['', '', '', '']);

	let btnDisabled = true;
	if (
		selectedValues.every((element) => element !== '') &&
		hasNoDuplicates(selectedValues)
	) {
		btnDisabled = false;
	}

	useEffect(() => {
		if (selectedValues.some((element) => element !== '')) {
			const emptyElements = selectedValues.reduce(
				(result, element, index) => {
					if (element === '') {
						result.count = result.count + 1;
						result.indices.push(index);
					}
					return result;
				},
				{ count: 0, indices: [] }
			);

			if (emptyElements.count === 1) {
				//ima jedan element koji je prazan string
				const indexOfEmptyElem = emptyElements.indices[0];
				const selectedValuesCopy = [...selectedValues];
				selectedValuesCopy[indexOfEmptyElem] = '1';
				setSelectedValues(selectedValuesCopy);
			}
			if (emptyElements.count === 0) {
				const teamOrder = [];
				for (let i = 0; i < selectedValues.length; i++) {
					const index = parseInt(selectedValues[i]) - 1;
					teamOrder.splice(index, 0, teams[i]);
				}

				orderGroup(teamOrder, groupNumber);
			}
		}
	}, [selectedValues, groupNumber, orderGroup]);

	const handleSelectChange = (selectedValue, selectedTeamNumber) => {
		const selectedValuesCopy = [...selectedValues];
		selectedValuesCopy[selectedTeamNumber] = selectedValue;
		setSelectedValues(selectedValuesCopy);
	};
	return (
		<>
			{!hide && (
				<div className={classes.group}>
					<h2>{groupName}</h2>
					{teams.map((team, index) => (
						<div key={index}>
							<strong>{team}</strong>
							<select
								value={selectedValues[index]}
								onChange={(event) =>
									handleSelectChange(event.target.value, index)
								}
							>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
							</select>
						</div>
					))}
					<button
						disabled={btnDisabled}
						onClick={() => submitGroup(groupNumber)}
					>
						Submit
					</button>
				</div>
			)}
		</>
	);
};
export default Group;

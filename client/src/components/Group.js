import { useState, useMemo } from 'react';
import classes from './Group.module.css';

const hasNoDuplicates = (arr) => {
	return arr.every((element, index) => arr.indexOf(element) === index);
};

const Group = ({ group, groupNumber, hide, submitGroup }) => {
	const teams = group.teams;
	const groupName = group.groupName;

	const [selectedValues, setSelectedValues] = useState(['', '', '', '']);

	const { groupOrder, btnDisabled } = useMemo(() => {
		const groupOrder = [];
		let btnDisabled = true;
		if (
			selectedValues.every((element) => element !== '') &&
			hasNoDuplicates(selectedValues)
		) {
			for (let i = 0; i < selectedValues.length; i++) {
				const index = parseInt(selectedValues[i]) - 1;
				groupOrder.splice(index, 0, teams[i]);
			}
			btnDisabled = false;
		}
		return { groupOrder, btnDisabled };
	}, [selectedValues, teams]);

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
								<option value=''>Select</option>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
							</select>
						</div>
					))}
					<button
						disabled={btnDisabled}
						onClick={() => submitGroup(groupNumber, groupOrder)}
					>
						Submit
					</button>
				</div>
			)}
		</>
	);
};
export default Group;

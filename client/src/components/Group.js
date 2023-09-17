import { useState, useEffect } from 'react';
import classes from './Group.module.css';


const Group = (props) => {

    const hide = props.hide
    const teams = props.group.teams;
    const groupName = props.group.groupName;
    const groupNumber = props.groupNumber;

    const [selectedValues, setSelectedValues] = useState(['','','',''])

    useEffect(()=> {
        if (selectedValues.some((element) => element !== '')) {
            console.log(selectedValues);
            const emptyElements = selectedValues.reduce((result,element, index) => {
                if (element === '') {
                result.count = result.count + 1;
                result.indices.push(index);
                }
                return result;
            },{count: 0, indices: []});

            if (emptyElements.count === 1) {
                //ima jedan element koji je prazan string
                const indexOfEmptyElem = emptyElements.indices[0];
                const selectedValuesCopy = [...selectedValues];
                selectedValuesCopy[indexOfEmptyElem] = '1';
                setSelectedValues(selectedValuesCopy);
            }
            if (emptyElements.count === 0) {
                props.orderGroup(selectedValues, groupNumber);
            }

    }
             
    },[selectedValues,groupNumber,props]);

   const handleSelectChange = (selectedValue, selectedTeamNumber) => {
        const selectedValuesCopy = [...selectedValues];
        selectedValuesCopy[selectedTeamNumber] = selectedValue;
        setSelectedValues(selectedValuesCopy);
   }
   //<textarea value = {groupOrder} onChange = {handleChange}></textarea>
    return (
        <>
            {!hide && (
                <div className={classes.group}>
                    <h2>{groupName}</h2>
                    {teams.map((team, index) => <div key = {index}>
                            <strong>{team}</strong>
                            <select value = {selectedValues[index]} onChange = {(event) => handleSelectChange(event.target.value, index)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>)}
                
                   
                 </div>
            )}      
        </>
    );
};
export default Group;
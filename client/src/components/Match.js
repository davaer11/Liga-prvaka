import classes from './Match.module.css';

import {useState} from 'react';
const Match = (props) => {

    const [selectedValue, setSelectedValue] = useState(null);
    const teams = props.match.split('-');

    const [leftInputValue, setLeftInputValue] = useState(0);
    const [rightInputValue, setRightInputValue] = useState(0);
   
    const toggleBtn = (btnType) => {
        if (btnType === "leftBtn") {
            setSelectedValue(teams[0]);
        }
        if (btnType === "rightBtn") {
            setSelectedValue(teams[1]);
        }
    };
    const handleInputChange = (inputType, value) => {
        if (inputType === "leftInput") {
           setLeftInputValue(value);
        }
        if (inputType === "rightInput") {
            setRightInputValue(value);
        }
    };

    return (
        <div className= {classes.match}>
            <button id = "leftBtn" onClick = {() => toggleBtn("leftBtn")}>{teams[0]}</button>
            {" - "}
            <button  id = "rightBtn" onClick = {() => toggleBtn("rightBtn")}>{teams[1]}</button>
            <div>
                <input  type = "number" min = "0" value = {leftInputValue} 
                    onChange = {(event) => handleInputChange("leftInput", event.target.value)}></input>
                {" - "}
                <input type = "number" min = "0" value = {rightInputValue}
                    onChange = {(event) => handleInputChange("rightInput",event.target.value)}></input>
            </div>
        </div>
    );

};

export default Match;
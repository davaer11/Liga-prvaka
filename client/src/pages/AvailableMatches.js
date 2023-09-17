import React from 'react';
import Match from '../components/Match';
import classes from './AvailableMatches.module.css';
import { useEffect, useState } from 'react';

const AvailableMatches = () => {

    const [availableMatches, setAvailableMatches] = useState([]);

    const fetchMatches = async () => {
        try {
            const response = await fetch('/availableMatches');

            if(!response.ok) {
                throw new Error();
            }
            const matches = await response.json(); 
            setAvailableMatches(matches);
        }
        catch(error) {
            console.log("Couldn't fetch data from server!!");
        }
    }

    useEffect(() => {
        fetchMatches();
    },[]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }


    return(
        <form className = {classes.matches} onSubmit={handleSubmit}>
            <ul>
                {availableMatches.map((match,index) => <Match key = {index} match = {match}>{match}</Match>)}
            </ul>
            <button type = "submit">Submit</button>
       </form>
    )   
};
export default AvailableMatches;
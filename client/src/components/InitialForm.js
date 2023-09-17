import classes from './InitialForm.module.css';
import Group from './Group';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//import jwt from 'jsonwebtoken';
import { useJwt } from 'react-jwt';
import AuthContext from '../store/auth-context';

const DUMMY_GROUPS = [
    {groupName: 'group A',
     teams: ['Dinamo', 'Schalke', 'Bayern Munich', 'Barcelona']
},
    {groupName: 'group B',
     teams: ['Hajduk', 'PSG', 'Manchester City', 'AC Milan']
},
    {groupName: 'group C',
     teams: ['Real Madrid', 'Chelsea', 'Liverpool', 'Inter']
},
    {groupName: 'group D',
     teams: ['Ajax', 'Sevilla', 'RB Leipzig', 'FC Porto']
}
];
let groupOrders = ['','','',''];

const InitialForm = (props) => {

    const [hideGroupArray, setHideGroupArray] = useState([false,false,false,false]);
    const [leagueWinner, setLeagueWinner] = useState('');
    const [bestScorer, setBestScorer] = useState('');

    const navigate = useNavigate();

    const jwtToken = localStorage.getItem('user_token');
    const {decodedToken} = useJwt(jwtToken);

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if (hideGroupArray.every((hideElement) => hideElement)) {
            
            try {
                const formData = {
                    leagueWinner: leagueWinner,
                    bestScorer: bestScorer,
                    groupAOrder: groupOrders[0],
                    groupBOrder: groupOrders[1],
                    groupCOrder: groupOrders[2],
                    groupDOrder: groupOrders[3],
                };
               
                const userId = decodedToken.userId;
    
                fetch("/initialForm", {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({userId,formData})
                }).then(response => {
                    if (!response.ok) {
                        throw new Error("Response is not good -> " + response.status);
                    }
                    else {
                        authCtx.changeUserData({initialFormSubmitted: true});
                    }
                })
            }catch(error) {
                console.log(error.message);
            }
            setLeagueWinner('');
            setBestScorer('');
            setHideGroupArray([false,false,false,false]);
            groupOrders = ['','','',''];
            navigate('../AvailableMatches'); 
        }
    },[hideGroupArray, bestScorer, leagueWinner, decodedToken, navigate, authCtx]);

    const handleGroupSubmit = (groupNumber) => {
        const groupArray = [...hideGroupArray]
        groupArray[groupNumber] = true;
        setHideGroupArray(groupArray);
    }
    const orderGroup = (groupOrder, groupNumber) => {
        //groupOrder = groupOrder.join(',');
        groupOrders[groupNumber] = groupOrder; 
    }


    return (
        <div className = {classes['initial-form-container']}>
            <form className={classes.form}>
                <div className={classes['input-group']}>
                    <label>Pobjednik lige prvaka: </label>
                    <input value = {leagueWinner} type = "text" onChange = {(event) => setLeagueWinner(event.target.value)}></input>
                </div>
            
                <div className={classes['input-group']}> 
                    <label>Najbolji strijelac: </label>
                    <input value = {bestScorer} type = "text" onChange = {(event) => setBestScorer(event.target.value)}></input>
                </div>
            </form>
            <p> <strong>INFO:</strong> U polje ispod svake grupe unesite poredak od prvog do zadnjeg mjesta. Unesite imena klubova iz grupe i odvojite ih zarezom.</p>
            <section>
                <ul>
                    {DUMMY_GROUPS.map((group, index) => ( 
                        <>
                            <Group key = {Math.random()} group = {group} groupNumber = {index} hide = {hideGroupArray[index]} orderGroup = {orderGroup}></Group>
                            {!hideGroupArray[index] && <button onClick = {() => handleGroupSubmit(index)}>Submit</button>}
                        </>
                   ))}
                </ul>
            </section>  
        </div>
    );
}
export default InitialForm;
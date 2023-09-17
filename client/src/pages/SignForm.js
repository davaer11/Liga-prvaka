import React ,{useState, useContext} from 'react';
import classes from './SignForm.module.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const startWithNumber = (str) => {

    return /^\d/.test(str);
}

const SignForm = (props) => {

    const navigate = useNavigate();

    const authContext = useContext(AuthContext);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const userNameIsInvalid = userName.length < 4 || startWithNumber(userName);
    const passwordIsInvalid = password.length < 4;

  
    const handleInputChange = (inputValue, id) => {
        if (id === 'username') {
            const updatedUser = {...authContext.user, userName: inputValue }
            authContext.setUser(updatedUser);
        }
        if (id === 'password') {
            const updatedUser = {...authContext.user, password: inputValue }
            authContext.setUser()
        }
    }
    const handleRegister = async (event) => {

        try {
            const user = {
                userName: userName,
                password: password,
                totalPoints: 0,
                initialFormSubmitted: false
            }
            const response = await fetch("/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            if (!response.ok) {
                const msg = await response.text();
                throw new Error(msg);
            }
            else {
                navigate('../initialForm')
            }
        
        }catch(error) {
            setMessage(error.message);
        }
    }  
    const handleLogin = async (event) => {

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (userNameIsInvalid || passwordIsInvalid) {
            //tu dodat još neku logiku što napravit ako je to invalid, neki css ili tekst koji će pokazat da je to invalid
            return; 
        }

        if (props.text === 'Register') {
            await handleRegister(); 
        }
        else if (props.text === 'Login') {
            await handleLogin(); 
        }
        setUserName('');
        setPassword('');
    }

    return (

        <form className = {classes.form} onSubmit = {handleSubmit} >
        <div>
            <label htmlFor = "username">Username</label>
            <input id= "username" type = "text" value = {userName}
                onChange = {(event) => handleInputChange(event.target.value, 'username')}
            ></input>
             
        </div>
        <div>
            <label htmlFor = "password">Password</label>
            <input id= "password" type = "password" value = {password}
                onChange = {(event) => handleInputChange(event.target.value, 'password')}
            ></input>
            <p style = {{color: 'red'}}>{message}</p>
        </div>
        <button type = "submit">{props.text}</button>
       
    </form>

    );
}

export default SignForm;
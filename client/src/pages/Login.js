import React, { useContext, useState } from 'react';
import AuthContext from '../store/auth-context';
import classes from './SignForm.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const authCtx  = useContext(AuthContext); 
    const user = authCtx.user;

    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (inputValue, id) => {
        if (id === 'username') {
            const updatedFormData = {...formData, userName: inputValue}
            setFormData(updatedFormData);
        }
        if (id === 'password') {
            const updatedFormData = {...formData, password: inputValue }
            setFormData(updatedFormData);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {msg, serverUser} = await authCtx.login(formData);
        
        setMessage(msg);
        if (msg === 'Login successfull!') {
            if (!serverUser.initialFormSubmitted) {
                navigate('../user/initialForm');
            }
            else {
                navigate('../user/availableMatches');
            }
           
        }
        
    }

    return (

        <form className = {classes.form} onSubmit = {handleSubmit} >
        <div>
            <label htmlFor = "username">Username</label>
            <input id= "username" type = "text" value = {formData.userName}
                onChange = {(event) => handleInputChange(event.target.value, 'username')}
            ></input>
             
        </div>
        <div>
            <label htmlFor = "password">Password</label>
            <input id= "password" type = "password" value = {formData.password}
                onChange = {(event) => handleInputChange(event.target.value, 'password')}
            ></input>
            <p style = {{color: 'red'}}>{message}</p>
        </div>
        <button type = "submit">Sign in</button>
       
    </form>

    );
};
export default Login;

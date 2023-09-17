import React, { useState }  from 'react';
import classes from './SignForm.module.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {

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

        try {
            const user = {
                userName: formData.userName,
                password: formData.password,
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
            navigate('../Login');
            
        }catch(error) {
            setMessage(error.message);
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
        <button type = "submit">Sign up</button>
       
    </form>
    );
};

export default Register;
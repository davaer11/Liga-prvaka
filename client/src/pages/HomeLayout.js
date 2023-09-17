import React from 'react';
import classes from './HomeLayout.module.css';
import { Outlet, useNavigate } from 'react-router-dom';

const HomeLayout = () => {

    const navigate = useNavigate();

    let title = "Champions League 2023/2024";

    const navigateHandler = (value) => {
        if (value === 'register') {
            navigate('register');
        }
        if (value === 'login') {
            navigate('login');
        }
    }

    return (
        <>
            <div className= {classes['home-elements']}>
                <p>{title}</p>
                <div>
                    <button onClick = {() => (navigateHandler('register'))}>Sign up</button>
                    <button onClick = {() => (navigateHandler('login'))}>Login</button>
                </div>
            </div>
            <Outlet />
        </>
    );
}
export default HomeLayout;
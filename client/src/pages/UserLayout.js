import React, { useContext } from 'react';
import classes from './HomeLayout.module.css';
import {Outlet, useNavigate} from 'react-router-dom';
import AuthContext from '../store/auth-context';

const UserLayout = (props) => {
    
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    let text = 'Welcome ' + authContext.user.userName + '!';

    const navigateHandler = (value) => {
        if (value === "logout") {
            authContext.logout();
            navigate('../');
        }
    }
   

    return (
        <>
            <div className= {classes['home-elements']}>
                <p>{text}</p>
                <div>
                    <button onClick = {() => (navigateHandler("logout"))}>Logout</button>
                </div>
            </div>
            <Outlet />
        </>
    );

}

export default UserLayout;
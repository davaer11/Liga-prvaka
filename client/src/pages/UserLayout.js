import React, { useContext } from 'react';
import classes from './HomeLayout.module.css';
import { Outlet, Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const UserLayout = (props) => {
	const authContext = useContext(AuthContext);
	const user = authContext.user;

	let text = 'Welcome ' + authContext.user.userName + '!';

	const handleOnClick = (value) => {
		if (value === 'logout') {
			authContext.logout();
		}
	};

	return (
		<>
			<div className={classes['home-elements']}>
				<p>{text}</p>
				<div>
					<Link to='availableMatches'>
						<button>AvailableMatches</button>
					</Link>
					<Link to='initialForm'>
						<button onClick={() => handleOnClick('initialForm')}>
							InitialForm
						</button>
					</Link>
					<Link to='../'>
						<button onClick={() => handleOnClick('logout')}>Logout</button>
					</Link>
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default UserLayout;

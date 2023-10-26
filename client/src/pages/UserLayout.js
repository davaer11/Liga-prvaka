import React, { useContext } from 'react';
import classes from './HomeLayout.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const UserLayout = (props) => {
	const authContext = useContext(AuthContext);
	const user = authContext.user;

	const navigate = useNavigate();

	let text = 'Welcome ' + user.userName + '!';

	const handleLinkClick = (event, pageLink) => {
		event.preventDefault();
		if (pageLink === 'logout') {
			authContext.logout();
			navigate('../');
		} else {
			navigate(pageLink);
		}
	};

	return (
		<>
			<Navbar bg='primary' variant='dark'>
				<Navbar.Brand style={{ marginLeft: '50px', fontSize: '30px' }}>
					{text}
				</Navbar.Brand>
				<Nav style={{ marginLeft: 'auto', paddingRight: '50px' }}>
					<Nav.Item style={{ paddingRight: '10px' }}>
						<NavDropdown title='Actions'>
							<NavDropdown.Item
								onClick={(event) => handleLinkClick(event, 'availableMatches')}
							>
								Available matches
							</NavDropdown.Item>
							<NavDropdown.Item
								onClick={(event) => handleLinkClick(event, 'rankings')}
							>
								Rankings
							</NavDropdown.Item>
							<NavDropdown.Item
								onClick={(event) => handleLinkClick(event, 'initialForm')}
							>
								Initial form
							</NavDropdown.Item>
						</NavDropdown>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							eventKey='logout-link'
							onClick={(event) => handleLinkClick(event, 'logout')}
						>
							Logout
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar>

			<Outlet />
		</>
	);
};

/*<div className={classes['home-elements']}>
				<p>{text}</p>
				<div>
					<Link to='rankings'>
						<button>Rankings</button>
					</Link>
					<Link to='availableMatches'>
						<button>AvailableMatches</button>
					</Link>
					<Link to='initialForm'>
						<button>InitialForm</button>
					</Link>
					<Link to='../'>
						<button onClick={() => handleOnClick('logout')}>Logout</button>
					</Link>
				</div>
			</div> */

export default UserLayout;

import React from 'react';
import classes from './HomeLayout.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';

const HomeLayout = () => {
	const [activeKey, setActiveKey] = useState('home-link');

	const navigate = useNavigate();

	let title = 'Champions League 2023/2024';

	const handleLinkClick = (event, pageLink) => {
		event.preventDefault();
		navigate(pageLink);
	};

	return (
		<>
			<Navbar bg='primary' data-bs-theme='dark'>
				<Nav
					className='me-auto'
					variant='underline'
					activeKey={activeKey}
					onSelect={(selectedKey) => setActiveKey(selectedKey)}
				>
					<Nav.Item>
						<Nav.Link
							eventKey='home-link'
							onClick={(event) => handleLinkClick(event, 'home')}
						>
							Home
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							eventKey='register-link'
							onClick={(event) => handleLinkClick(event, 'register')}
						>
							Register
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							eventKey='login-link'
							onClick={(event) => handleLinkClick(event, 'login')}
						>
							Login
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar>
			<Outlet />
		</>
	);
};
export default HomeLayout;

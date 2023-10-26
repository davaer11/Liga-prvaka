import React, { useContext, useState } from 'react';
import AuthContext from '../store/auth-context';
import styles from './SignForm.module.css';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Login = () => {
	const authCtx = useContext(AuthContext);
	const user = authCtx.user;

	const [formData, setFormData] = useState({
		userName: '',
		password: '',
	});
	const [message, setMessage] = useState('');

	const navigate = useNavigate();

	const handleInputChange = (inputValue, id) => {
		if (id === 'username') {
			const updatedFormData = { ...formData, userName: inputValue };
			setFormData(updatedFormData);
		}
		if (id === 'password') {
			const updatedFormData = { ...formData, password: inputValue };
			setFormData(updatedFormData);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { msg, serverUser } = await authCtx.login(formData);

		setMessage(msg);
		if (msg === 'Login successfull!') {
			/*
			if (!serverUser.initialFormSubmitted) {
				navigate('../user/initialForm');
			} else {
				navigate('../user/availableMatches');
			}*/
			navigate('../user');
		}
	};

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ minHeight: '40vh' }}
		>
			<Form onSubmit={handleSubmit} className={styles.form}>
				<Form.Group className='mb-3' controlId='usernameFormGroup'>
					<Form.Label>Username</Form.Label>
					<Form.Control
						type='text'
						value={formData.userName}
						placeholder='Enter username'
						onChange={(event) =>
							handleInputChange(event.target.value, 'username')
						}
					></Form.Control>
				</Form.Group>

				<Form.Group className='mb-3' controlId='passwordFormGroup'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						value={formData.password}
						placeholder='Enter password'
						onChange={(event) =>
							handleInputChange(event.target.value, 'password')
						}
					></Form.Control>
				</Form.Group>

				<Button variant='primary' type='submit'>
					Sign in
				</Button>
			</Form>
		</Container>
	);
};
export default Login;

/*<form className={classes.form} onSubmit={handleSubmit}>
		<div>
			<label htmlFor='username'>Username</label>
			<input
				id='username'
				type='text'
				value={formData.userName}
				onChange={(event) =>
					handleInputChange(event.target.value, 'username')
				}
			></input>
		</div>
		<div>
			<label htmlFor='password'>Password</label>
			<input
				id='password'
				type='password'
				value={formData.password}
				onChange={(event) =>
					handleInputChange(event.target.value, 'password')
				}
			></input>
			<p style={{ color: 'red' }}>{message}</p>
		</div>
		<button type='submit'>Sign in</button>
			</form> */

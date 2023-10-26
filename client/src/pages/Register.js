import React, { useState } from 'react';
import styles from './SignForm.module.css';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Register = () => {
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

		try {
			const user = {
				userName: formData.userName,
				password: formData.password,
				totalPoints: 0,
				initialFormSubmitted: false,
			};
			const response = await fetch('/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});
			if (!response.ok) {
				const msg = await response.text();
				throw new Error(msg);
			}
			navigate('../Login');
		} catch (error) {
			setMessage(error.message);
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
					Sign up
				</Button>
			</Form>
		</Container>
	);
};

export default Register;

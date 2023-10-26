import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import styles from './Rankings.module.css';

const createHeaders = (numOfRounds) => {
	const headers = [];

	headers.push('#');
	for (let i = 0; i < numOfRounds; i++) {
		headers.push(`Round ${i + 1}`);
	}
	return headers;
};

const Rankings = () => {
	const [userRankings, setUserRankings] = useState([]);
	const [headers, setHeaders] = useState([]);

	useEffect(() => {
		try {
			fetch('/rankings')
				.then((response) => {
					if (!response.ok) {
						console.log(response);
						throw new Error('Response is not good -> ' + response.status);
					}
					return response.json();
				})
				.then((data) => {
					setUserRankings(data);
					const headers = createHeaders(data[0].numOfRounds);
					setHeaders(headers);
				});
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	return (
		<Table striped bordered hover className={styles.rankings}>
			<thead>
				<tr>
					{headers.map((header, index) => {
						return <th key={index}>{header}</th>;
					})}
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<td>2</td>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<td>3</td>
					<td colSpan={2}>Larry the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</Table>
	);
};

export default Rankings;

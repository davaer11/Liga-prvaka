import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './pages/HomeLayout';
import UserLayout from './pages/UserLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import InitialForm from './components/InitialForm';
import AuthProvider from './store/AuthProvider';
import AvailableMatches from './pages/AvailableMatches';
import UserStats from './pages/UserStats';

import './App.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		children: [
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/login',
				element: <Login />,
			},
		],
	},
	{
		path: '/user',
		element: <UserLayout />,
		children: [
			{
				index: true,
				element: <UserStats />,
			},
			{
				path: '/user/initialForm',
				element: <InitialForm />,
			},
			{
				path: '/user/availableMatches',
				element: <AvailableMatches />,
			},
		],
	},
]);

const App = () => {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
};
export default App;

import { useJwt } from 'react-jwt';

export const useGetUserId = () => {
	const jwtToken = localStorage.getItem('user_token');
	const { decodedToken } = useJwt(jwtToken);

	return decodedToken?.userId;
};

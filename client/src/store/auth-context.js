import React from 'react';

const AuthContext = React.createContext({
    user : {},
    isLoggedIn: false,
    login: (userData) => {},
    logout: () => {},
    changeUserData: (newData) => {}, 
});

export default AuthContext;
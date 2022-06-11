import React from 'react';
import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const RequireAuth = ({children}) => {
    const location = useLocation();
    const isAuthenticated = useSelector(state =>
        state.authReducer.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to={'/'} state={{from: location}} replace={true}/>
    }
    return children;
};

export default RequireAuth;
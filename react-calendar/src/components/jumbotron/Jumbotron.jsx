import React from 'react';
import {Container, Button} from "react-bootstrap";
import './jumbotron.css';
import {connect, useSelector} from "react-redux";

const WelcomeMess = () => {
    const username = useSelector(state => state.authReducer.authResult.account.name);
    return (
        <p>Welcome, {username}!</p>
    );
}

const Jumbotron = () => {
    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);

    return (
        <div className={'cont'}>
            <div className={"p-5 mb-4 rounded-3"} style={{background: '#e9ecef'}}>
                <Container>
                    <h1>React Calendar</h1>
                    <p className="lead">
                        This sample app shows how to use the Microsoft Graph API to access a user's data from React
                    </p>
                    {isAuthenticated && <WelcomeMess/>}
                    <Button variant="primary">Login</Button>
                </Container>
            </div>
        </div>
    );
};

export default Jumbotron;
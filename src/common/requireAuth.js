import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function requireAuth(Component) {
    function AuthComponent(props) {
        const {
            loginPending,
            loggedIn,
            location: { pathname }
        } = props;

        if (loginPending) {
            return null;
        }

        let redirect = '/login';
        if (pathname !== '/') {
            redirect += '?redirect=' + pathname;
        }

        return loggedIn ? <Component {...props} /> : <Redirect to={redirect} />;
    }

    function mapState(state) {
        return {
            currentUser: state.auth.currentUser,
            loginPending: state.auth.loginPending,
            loggedIn: state.auth.loggedIn
        };
    }

    return connect(mapState)(AuthComponent);
}

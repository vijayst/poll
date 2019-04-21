import React, { useEffect } from 'react';
import styles from './app.module.css';
import Menu from './common/Menu';
import { Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import MyPolls from './polls/MyPolls';
import PollForm from './polls/PollForm';
import Message from './common/Message';
import Profile from './auth/Profile';
import { connect } from 'react-redux';
import { getCurrentUser } from './auth/actions';

function App(props) {
    const { message } = props;

    useEffect(() => {
        props.getCurrentUser();
    }, []);

    return (
        <div className={styles.app}>
            <header>
                <div className={styles.brand}>Pollsy.co</div>
                <Menu />
            </header>
            <main>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/polls/my" component={MyPolls} />
                    <Route path="/polls/create" component={PollForm} />
                    <Route path="/profile" component={Profile} />
                </Switch>
            </main>
            {message.text && <Message {...message} />}
        </div>
    );
}

function mapState(state) {
    return {
        message: state.message
    };
}

const dispatchProps = {
    getCurrentUser
};

export default connect(
    mapState,
    dispatchProps
)(App);

import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import Menu from './common/Menu';
import { Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import MyPolls from './polls/MyPolls';
import PollForm from './polls/PollForm';
import Message from './common/Message';
import UserContext from './auth/UserContext';
import Profile from './auth/Profile';
import firebase from './util/firebase';
import { connect } from 'react-redux';

function App(props) {
    const { message } = props;
    const [user, setUser] = useState(firebase.auth().currentUser);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(currentUser => {
            setUser(currentUser);
        });
    }, []);

    return (
        <UserContext.Provider value={user}>
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
        </UserContext.Provider>
    );
}

function mapState(state) {
    return {
        message: state.message
    };
}

console.log(typeof connect);

export default connect(mapState)(App);

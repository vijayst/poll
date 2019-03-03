import React, { useState, useEffect, useReducer } from 'react';
import styles from './app.module.css';
import Menu from './common/Menu';
import { Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import MyPolls from './polls/MyPolls';
import PollForm from './polls/PollForm';
import Message from './common/Message';
import MessageDispatchContext from './common/MessageDispatchContext';
import UserContext from './auth/UserContext';
import Profile from './auth/Profile';
import firebase from './util/firebase';

function messageReducer(state, action) {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.payload;
        case 'CLEAR_MESSAGE':
            return {};
        default:
            return {};
    }
}


function App(props) {
    const [message, dispatch] = useReducer(messageReducer, {});
    const [user, setUser] = useState(firebase.auth().currentUser);
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(currentUser => {
            setUser(currentUser);
        });
    }, []);

    return (
        <UserContext.Provider value={user}>
            <MessageDispatchContext.Provider value={dispatch}>
                <div className={styles.app}>
                    <header>
                        <div className={styles.brand}>Pollz</div>
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
            </MessageDispatchContext.Provider>
        </UserContext.Provider>
    );
}

export default App;

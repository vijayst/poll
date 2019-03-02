import React, { useReducer } from 'react';
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
    console.log('message', message);
    return (
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
                    </Switch>
                </main>
                {message.text && <Message {...message} />}
            </div>
        </MessageDispatchContext.Provider>
    );
}

export default App;

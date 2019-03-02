import React from 'react';
import styles from './app.module.css';
import Menu from './common/Menu';
import { Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import MyPolls from './polls/MyPolls';
import PollForm from './polls/PollForm';

function App(props) {
    return (
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
        </div>
    );
}

export default App;

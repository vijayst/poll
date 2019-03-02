import React, { Component } from 'react';
import styles from './app.module.css';

class App extends Component {
    render() {
        return (
            <div className={styles.app}>
                <h1 className="ui header">Hello world</h1>
            </div>
        );
    }
}

export default App;

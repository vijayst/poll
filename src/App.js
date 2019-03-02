import React, { Component } from 'react';
import styles from './app.module.css';
import { Menu } from 'semantic-ui-react';

class App extends Component {
    render() {
        return (
            <div className={styles.app}>
                <header>
                    <div className={styles.brand}>Pollz</div>
                    <Menu secondary>
                        <Menu.Item name="polls" content="My Polls" />
                        <Menu.Item name="logout" content="Logout" />
                        <Menu.Item name="create" content="Create Poll" />
                    </Menu>
                </header>
            </div>
        );
    }
}

export default App;

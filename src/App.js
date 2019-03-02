import React from 'react';
import styles from './app.module.css';
import Menu from './common/Menu';

function App() {
    return (
        <div className={styles.app}>
            <header>
                <div className={styles.brand}>Pollz</div>
                <Menu />
            </header>
        </div>
    );
}

export default App;

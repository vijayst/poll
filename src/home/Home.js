import React, { useState, useEffect, useContext } from 'react';
import firebase from '../util/firebase';
import { Segment, Header, Button } from 'semantic-ui-react';
import UserContext from '../auth/UserContext';
import styles from './home.module.css';
import { Link } from 'react-router-dom';

export default function MyPolls() {
    let [polls, setPolls] = useState([]);
    const user = useContext(UserContext);

    useEffect(() => {
        firebase
            .firestore()
            .collection('polls')
            .get()
            .then(snapshot => {
                const polls = [];
                snapshot.forEach(doc => {
                    polls.push(doc.data());
                });
                setPolls(polls);
            });
    }, []);

    return (
        <div className={styles.page}>
            <h1>Open Polls</h1>
            {polls.length === 0 && (
                <Segment placeholder>
                    <Header icon>There are no open polls!!!</Header>
                </Segment>
            )}
            {polls.length && !user ? (
                <Segment placeholder>
                    <Header icon>Login to poll</Header>
                    <Button primary as={Link} to="/login">
                        Login
                    </Button>
                </Segment>
            ) : null}
            {polls.map(poll => (
                <Segment style={{ marginBottom: 32 }} key={poll.uid}>
                    <div className={styles.question}>{poll.question}</div>
                    <ol className={styles.list}>
                        {poll.options.map((option, index) => (
                            <li key={index}>{option.text}</li>
                        ))}
                    </ol>
                </Segment>
            ))}
        </div>
    );
}

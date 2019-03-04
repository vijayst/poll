import React, { useState, useEffect, useContext } from 'react';
import firebase from '../util/firebase';
import { Segment, Button } from 'semantic-ui-react';
import UserContext from '../auth/UserContext';
import styles from './mypolls.module.css';

export default function MyPolls() {
    const [polls, setPolls] = useState([]);
    const user = useContext(UserContext);
    useEffect(() => {
        if (user) {
            firebase
                .firestore()
                .collection('polls')
                .where('createdBy.uid', '==', user.uid)
                .get()
                .then(snapshot => {
                    const polls = [];
                    snapshot.forEach(doc => {
                        polls.push(doc.data());
                    });
                    setPolls(polls);
                });
        }
    }, [user]);

    return (
        <div className={styles.page}>
            <h1>My Polls</h1>
            {polls.map(poll => (
                <Segment.Group style={{ marginBottom: 32 }} key={poll.uid}>
                    <Segment>
                        <div className={styles.question}>{poll.question}</div>
                        <ol className={styles.list}>
                            {poll.options.map((option, index) => (
                                <li key={index}>{option.text}</li>
                            ))}
                        </ol>
                    </Segment>
                    <Segment>
                        <Button type="button" primary content="Edit" />
                        <Button type="button" color="red" content="Delete" />
                    </Segment>
                </Segment.Group>
            ))}
        </div>
    );
}

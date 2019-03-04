import React, { useState, useEffect, useContext } from 'react';
import firebase from '../util/firebase';
import { Segment, Button } from 'semantic-ui-react';
import UserContext from '../auth/UserContext';
import styles from './mypolls.module.css';
import DeleteModal from './DeleteModal';

let pollId;

export default function MyPolls() {
    let [polls, setPolls] = useState([]);
    const [open, setOpen] = useState(false);
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

    function handleOpen(id) {
        setOpen(true);
        pollId = id;
    }

    function handleClose() {
        setOpen(false);
    }

    async function handleDelete() {
        try {
            await firebase.firestore().collection("polls").doc(pollId).delete();
            const index = polls.findIndex(p => p.uid === pollId);
            if (index !== -1) {
                polls = polls.slice();
                polls.splice(index, 1);
                setPolls(polls);
            }
            setOpen(false);
        } catch(err) {
            console.log(err);
        }
    }

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
                        <Button
                            type="button"
                            color="red"
                            content="Delete"
                            onClick={handleOpen.bind(null, poll.uid)}
                        />
                    </Segment>
                </Segment.Group>
            ))}
            <DeleteModal open={open} onClose={handleClose} onAction={handleDelete} />
        </div>
    );
}

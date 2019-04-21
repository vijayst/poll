import React, { useState, useEffect } from 'react';
import firebase from '../util/firebase';
import {
    Segment,
    Header,
    Button,
    Form,
    Radio,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import styles from './home.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Options(props) {
    const { poll, user } = props;
    let initialAnswer = null;
    if (poll.votes) {
        const vote = poll.votes.find(v => v.userId === user.uid);
        if (vote) {
            initialAnswer = `${vote.optionIndex + 1}`;
        }
    }
    const [answer, setAnswer] = useState(initialAnswer);

    async function handleSelect(e, { value }) {
        setAnswer(value);
        const newPoll = Object.assign({}, poll);
        const optionIndex = parseInt(value) - 1;
        newPoll.options[optionIndex].count += 1;
        const userId = user.uid;
        if (!newPoll.votes) {
            newPoll.votes = [
                {
                    userId,
                    optionIndex
                }
            ];
        } else {
            const vote = newPoll.votes.find(v => v.userId === userId);
            if (vote) {
                // this should never happen!
                vote.optionIndex = optionIndex;
            } else {
                newPoll.votes.push({
                    userId,
                    optionIndex
                });
            }
        }
        await firebase
            .firestore()
            .collection('polls')
            .doc(newPoll.uid)
            .set(newPoll);
    }

    return props.options.map((option, index) => (
        <Form.Field key={index}>
            <Radio
                label={
                    answer
                        ? `${option.text} (${option.count} votes)`
                        : option.text
                }
                name="options"
                value={`${index + 1}`}
                checked={answer === `${index + 1}`}
                onChange={handleSelect}
                disabled={!!answer}
            />
        </Form.Field>
    ));
}

function Home({ user, loggedIn, loginPending }) {
    let [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);

    if (loginPending || loading) {
        return (
            <Segment placeholder>
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
            </Segment>
        );
    }

    if (!loggedIn) {
        return (
            <Segment placeholder>
                <Header icon>Login using Google to get started!</Header>
                <Button primary as={Link} to="/login">
                    Login
                </Button>
                <Segment.Inline>
                    <p style={{ marginTop: 100, textAlign: 'center' }}>
                        The code for this project is in{' '}
                        <a href="https://github.com/vijayst/poll">Github</a>.{' '}
                        <br /> Pollsy uses Firebase for authentication, storage
                        and hosting.
                    </p>
                </Segment.Inline>
            </Segment>
        );
    }

    return (
        <div className={styles.page}>
            <h1>Open Polls</h1>
            {polls.length === 0 && (
                <Segment placeholder>
                    <Header icon>There are no open polls!!!</Header>
                </Segment>
            )}
            {polls.map(poll => (
                <Segment style={{ marginBottom: 32 }} key={poll.uid}>
                    <div className={styles.question}>{poll.question}</div>
                    <Form>
                        <Options
                            user={user}
                            poll={poll}
                            options={poll.options}
                        />
                    </Form>
                </Segment>
            ))}
        </div>
    );
}

function mapState(state) {
    return {
        loggedIn: state.auth.loggedIn,
        loginPending: state.auth.loginPending,
        user: state.auth.currentUser
    };
}

export default connect(mapState)(Home);

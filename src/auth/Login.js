import React, { useState, useContext } from 'react';
import styles from './login.module.css';
import { Form, Button, Divider } from 'semantic-ui-react';
import firebase from '../util/firebase';
import MessageDispatchContext from '../common/MessageDispatchContext';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useContext(MessageDispatchContext);

    async function handleSubmit() {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            props.history.push('/');
        } catch (err) {
            console.log(err);
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: 'Error in login', error: true }
            });
        }
    }

    async function handleGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            props.history.push('/');
        } catch (err) {
            console.log(err);
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: 'Error in login', error: true }
            });
        }
    }

    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Email</label>
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Field>
                <div className={styles.button}>
                    <Button primary type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
            <Divider style={{ margin: '2rem 0' }} horizontal>
                Or
            </Divider>
            <div className={styles.button}>
                <Button color="red" onClick={handleGoogle}>
                    Login as Google
                </Button>
            </div>
        </div>
    );
}
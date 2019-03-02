import React, { useState } from 'react';
import { Form, Button, Label, Divider } from 'semantic-ui-react';
import firebase from '../util/firebase';
import {
    createValidator,
    composeValidators,
    combineValidators,
    isRequired,
    hasLengthGreaterThan,
    matchesField
} from 'revalidate';

import styles from './register.module.css';

const isEmail = createValidator(
    message => value => {
        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return message;
        }
    },
    'Invalid email address'
);

const formValidator = combineValidators({
    name: isRequired('Name'),
    email: composeValidators(isRequired, isEmail)('Email'),
    password: composeValidators(
        isRequired,
        hasLengthGreaterThan(5)({
            message: 'Should be 6 or more characters'
        })
    )('Password'),
    repeat: composeValidators(
        isRequired,
        matchesField('password')({
            message: 'Passwords do not match'
        })
    )('Repeat Password')
});

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');
    const [error, setError] = useState({});

    async function handleSubmit() {
        const formObj = {
            name,
            email,
            password,
            repeat
        };
        const errors = formValidator(formObj);
        if (Object.values(errors).every(error => !error)) {
            const result = await firebase
                .auth()
                .createUserWithEmailAndPassword(
                    email,
                    password
                );
            await result.user.updateProfile({
                displayName: name
            });
        } else {
            setError(errors);
        }
    }

    return (
        <div className={styles.register}>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Field error={error.name}>
                    <label>Name</label>
                    <input
                        placeholder="Display Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    {error.name && (
                        <Label basic color="red" pointing>
                            {error.name}
                        </Label>
                    )}
                </Form.Field>
                <Form.Field error={error.email}>
                    <label>Email</label>
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {error.email && (
                        <Label basic color="red" pointing>
                            {error.email}
                        </Label>
                    )}
                </Form.Field>
                <Form.Field error={error.password}>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {error.password && (
                        <Label basic color="red" pointing>
                            {error.password}
                        </Label>
                    )}
                </Form.Field>
                <Form.Field error={error.repeat}>
                    <label>Repeat password</label>
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        value={repeat}
                        onChange={e => setRepeat(e.target.value)}
                    />
                    {error.repeat && (
                        <Label basic color="red" pointing>
                            {error.repeat}
                        </Label>
                    )}
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
                <Button color="red">
                    Login as Google
                </Button>
            </div>
        </div>
    );
}

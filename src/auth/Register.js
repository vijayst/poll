import React, { useState } from 'react';
import { Form, Button, Label } from 'semantic-ui-react';

import {
    createValidator,
    composeValidators,
    combineValidators,
    isRequired,
    hasLengthGreaterThan,
    matchesField
} from 'revalidate';

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

    function handleSubmit() {
        const formObj = {
            name,
            email,
            password,
            repeat
        };
        const errors = formValidator(formObj);
        if (Object.values(errors).every(error => !error)) {
            // submit the form
            console.log('submit form');
        } else {
            console.log(errors);
            setError(errors);
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Field error={error.name}>
                    <label>Name</label>
                    <input
                        placeholder="Display Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    {error.name && <Label basic color="red" pointing>{error.name}</Label>}
                </Form.Field>
                <Form.Field error={error.email}>
                    <label>Email</label>
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {error.email && <Label basic color="red" pointing>{error.email}</Label>}
                </Form.Field>
                <Form.Field error={error.password}>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {error.password && <Label basic color="red" pointing>{error.password}</Label>}
                </Form.Field>
                <Form.Field error={error.repeat}>
                    <label>Repeat password</label>
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        value={repeat}
                        onChange={e => setRepeat(e.target.value)}
                    />
                    {error.repeat && <Label basic color="red" pointing>{error.repeat}</Label>}
                </Form.Field>
                <Button primary type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

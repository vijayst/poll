import React, { useState } from 'react';
import styles from './login.module.css';
import { Form, Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { login, loginAsGoogle } from './actions';

function Login(props) {
    const { login, loginAsGoogle } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit() {
        login(email, password);
    }

    async function handleGoogle() {
        loginAsGoogle();
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

const dispatchProps = {
    login,
    loginAsGoogle
};

export default connect(
    null,
    dispatchProps
)(Login);

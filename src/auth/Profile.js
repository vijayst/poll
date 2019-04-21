import React, { useState, useContext, useEffect } from 'react';
import styles from './login.module.css';
import { Form, Button, Label } from 'semantic-ui-react';
import UserContext from './UserContext';
import { combineValidators, isRequired } from 'revalidate';
import { hasError } from 'revalidate/assertions';
import { updateProfile } from './actions';
import { connect } from 'react-redux';

const formValidator = combineValidators({
    name: isRequired('Display Name')
});

function Profile(props) {
    const { updateProfile } = props;
    const user = useContext(UserContext);
    const [name, setName] = useState(user ? user.displayName : '');
    const [error, setError] = useState({});

    useEffect(() => {
        setName(user ? user.displayName : '');
    }, [user]);

    async function handleSubmit() {
        const formValues = { name };
        const error = formValidator(formValues);
        setError(error);
        if (!hasError(error)) {
            updateProfile();
        }
    }

    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Display name</label>
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
                <div className={styles.button}>
                    <Button primary type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

const dispatchProps = {
    updateProfile
};

export default connect(
    null,
    dispatchProps
)(Profile);

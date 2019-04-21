import React, { useReducer } from 'react';
import styles from './pollform.module.css';
import { Form, Label, Button, Input } from 'semantic-ui-react';
import pollformReducer from './pollformReducer';
import { isRequired, combineValidators } from 'revalidate';
import { hasError } from 'revalidate/assertions';
import cuid from 'cuid';
import firebase from '../util/firebase';

const initialState = {
    question: '',
    option1: '',
    option2: '',
    options: [],
    error: {}
};

export default function PollForm(props) {
    const [state, dispatch] = useReducer(pollformReducer, initialState);
    const { question, option1, option2, options, error } = state;

    function handleQuestionChange(e) {
        dispatch({
            type: 'CHANGE_QUESTION',
            payload: { question: e.target.value }
        });
    }

    function handleOption1Change(e) {
        dispatch({
            type: 'CHANGE_OPTION1',
            payload: { option1: e.target.value }
        });
    }

    function handleOption2Change(e) {
        dispatch({
            type: 'CHANGE_OPTION2',
            payload: { option2: e.target.value }
        });
    }

    function handleOptionAdd() {
        dispatch({
            type: 'ADD_OPTION'
        });
    }

    function handleOptionRemove(optionIndex) {
        dispatch({
            type: 'REMOVE_OPTION',
            payload: { optionIndex }
        });
    }

    function handleOptionChange(i, e) {
        dispatch({
            type: 'CHANGE_OPTION',
            payload: {
                optionIndex: i,
                option: e.target.value
            }
        });
    }

    function getValidator() {
        const validators = {
            question: isRequired('Question'),
            option1: isRequired('Option 1'),
            option2: isRequired('Option 2')
        };
        options.forEach((option, index) => {
            validators[`option${index + 3}`] = isRequired(
                `Option ${index + 3}`
            );
        });
        return combineValidators(validators);
    }

    function getFormValues() {
        const formValues = {
            question,
            option1,
            option2
        };
        options.forEach((option, index) => {
            formValues[`option${index + 3}`] = option;
        });
        return formValues;
    }

    async function handleSubmit() {
        const formValidator = getValidator();
        const formValues = getFormValues();
        const error = formValidator(formValues);
        dispatch({
            type: 'SET_ERROR',
            payload: { error }
        });
        if (!hasError(error)) {
            const uid = cuid();
            let allOptions = [option1, option2, ...options];
            allOptions = allOptions.map(option => ({
                text: option,
                count: 0
            }));
            const user = firebase.auth().currentUser;
            const data = {
                uid,
                question,
                createdBy: {
                    uid: user.uid,
                    name: user.displayName
                },
                createdOn: firebase.firestore.FieldValue.serverTimestamp(),
                options: allOptions
            };
            try {
                await firebase
                    .firestore()
                    .collection('polls')
                    .doc(uid)
                    .set(data);
                // messageDispatch({
                //     type: 'SET_MESSAGE',
                //     payload: { text: 'Poll is created' }
                // });
                props.history.push('/polls/my');
            } catch (err) {
                console.log(err);
                // messageDispatch({
                //     type: 'SET_MESSAGE',
                //     payload: { text: 'Unable to create poll', error }
                // });
            }
        }
    }

    return (
        <div className={styles.form}>
            <h1>Poll Form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Field error={!!error.question}>
                    <label>Question</label>
                    <input
                        placeholder="Question"
                        value={question}
                        onChange={handleQuestionChange}
                    />
                    {error.question && (
                        <Label basic color="red" pointing>
                            {error.question}
                        </Label>
                    )}
                </Form.Field>
                <Form.Field error={!!error.option1}>
                    <label>Option 1</label>
                    <input
                        placeholder="Option 1"
                        value={option1}
                        onChange={handleOption1Change}
                    />
                    {error.option1 && (
                        <Label basic color="red" pointing>
                            {error.option1}
                        </Label>
                    )}
                </Form.Field>
                <Form.Field error={!!error.question}>
                    <label>Option 2</label>
                    <input
                        placeholder="Option 2"
                        value={option2}
                        onChange={handleOption2Change}
                    />
                    {error.option2 && (
                        <Label basic color="red" pointing>
                            {error.option2}
                        </Label>
                    )}
                </Form.Field>
                {options.map((option, index) => (
                    <Form.Field
                        key={index}
                        error={!!error[`option${index + 3}`]}
                    >
                        <label>Option {index + 3}</label>
                        <Input
                            placeholder={`Option ${index + 3}`}
                            value={option}
                            onChange={handleOptionChange.bind(null, index)}
                            action={{
                                color: 'red',
                                icon: 'close',
                                type: 'button',
                                onClick: handleOptionRemove.bind(null, index)
                            }}
                        />
                        {error[`option${index + 3}`] && (
                            <Label basic color="red" pointing>
                                {error[`option${index + 3}`]}
                            </Label>
                        )}
                    </Form.Field>
                ))}
                <div className={styles.button}>
                    <Button type="button" onClick={handleOptionAdd}>
                        Add Option
                    </Button>
                    <Button primary type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

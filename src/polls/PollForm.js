import React, { useReducer } from 'react';
import styles from './pollform.module.css';
import { Form, Label, Button } from 'semantic-ui-react';
import pollformReducer from './pollformReducer';

const initialState = {
    question: '',
    option1: '',
    option2: '',
    options: [],
    error: {}
};

export default function PollForm() {
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

    function handleOptionChange(i, e) {
        dispatch({
            type: 'CHANGE_OPTION',
            payload: {
                optionIndex: i,
                option: e.target.value
            }
        })
    }

    function handleSubmit() {}

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
                    <Form.Field error={!!error[`option${index + 3}`]}>
                        <label>Option {index + 3}</label>
                        <input
                            placeholder={`Option ${index + 3}`}
                            value={option}
                            onChange={handleOptionChange.bind(null, index)}
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

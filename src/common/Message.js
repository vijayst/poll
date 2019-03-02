import React, { useEffect, useContext } from 'react';
import styles from './message.module.css';
import MessageDispatchContext from './MessageDispatchContext';

export default function Message(props) {
    const dispatch = useContext(MessageDispatchContext)
    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: 'CLEAR_MESSAGE' });
        }, 5000);
    });

    return (
        <div className={props.error ? styles.error : styles.message}>
            {props.text}
        </div>
    );
}

import React, { useEffect } from 'react';
import styles from './message.module.css';
import { connect } from 'react-redux';
import { closeMessage } from './actions';

function Message(props) {
    useEffect(() => {
        setTimeout(() => {
            props.closeMessage();
        }, 5000);
    });

    return (
        <div className={props.error ? styles.error : styles.message}>
            {props.text}
        </div>
    );
}

const dispatchProps = {
    closeMessage
};

export default connect(
    null,
    dispatchProps
)(Message);

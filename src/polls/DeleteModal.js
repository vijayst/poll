import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

export default function DeleteModal(props) {
    return (
        <Modal size="mini" open={props.open} onClose={props.onClose}>
            <Modal.Header>Delete Poll</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete the poll?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={props.onClose}>No</Button>
                <Button positive content="Yes" onClick={props.onAction} />
            </Modal.Actions>
        </Modal>
    );
}

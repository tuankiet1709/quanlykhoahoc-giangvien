import React, { Fragment } from "react";
import { Modal } from 'react-bootstrap';

const DeleteModal = ({ title, isShow, onHide, children }) => {

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            dialogClassName="modal-90w containerModal"
            aria-labelledby="login-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="login-modal">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Fragment>
                    {children}
                </Fragment>
            </Modal.Body>
        </Modal>
    );
};

export default DeleteModal;

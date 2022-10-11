import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'reactstrap';

function DisconnectModal(props) {
  const { closeModal, disconnectAction } = props;
  return (
    <Modal show={true} onHide={closeModal} centered>
      <Modal.Header closeButton className="border-0 pb-0"></Modal.Header>
      <Modal.Body className="text-center pb-4 px-lg-5">
        <h4 className="text-secondary mb-3">Are you sure?</h4>
        <p className="fs-16">Are you sure you want to disconnect from current storage?</p>
        <div className="pt-2">
          <Button outline color="danger" onClick={closeModal}>
            NO
          </Button>
          <Button className="ms-3" outline color="primary" onClick={disconnectAction}>
            YES
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DisconnectModal;

import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { updateTransaction } from "../services/TransactionService";

const UpdateTransactionModal = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTransaction(props.transaction.transactionId, e.target)
     .then((result) => {
        alert(result);
        props.setUpdated(true);
     },
     (error) => {
        alert("Failed To Update Transaction");
     });
  };

  return (
    <div className="container">
      <Modal {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"> 
            Update A Transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <Row className="justify-content-center">
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="category" className="my-2">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" name="category" required 
                                    defaultValue={props.transaction.category}
                                    placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="totalAmount" className="my-2">
                                    <Form.Label>Total Amount</Form.Label>
                                    <Form.Control type="text" name="totalAmount" required 
                                    defaultValue={props.transaction.totalAmount}
                                    placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="payee" className="my-2">
                                    <Form.Label>Payee's Username</Form.Label>
                                    <Form.Control type="text" name="payee" required 
                                    defaultValue={props.transaction.payee} placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="payers" className="my-2">
                                    <Form.Label>Payers' Username</Form.Label>
                                    <Form.Control type="text" name="payers" required 
                                    defaultValue={props.transaction.payers} placeholder="" />
                            </Form.Group>
                            <Form.Group>
                                <p></p>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                </Button>
                </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateTransactionModal;

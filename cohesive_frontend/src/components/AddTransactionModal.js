import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { addTransaction } from "../services/TransactionService";

const AddTransactionModal = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(e.target)
     .then((result) => {
        alert(result);
        props.setUpdated(true);
     },
     (error) => {
        alert("Failed To Add Transaction");
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
            Create A New Transaction
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
                    <Row  className="justify-content-center">
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="category" className="my-2">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" name="category" required placeholder="Category" />
                            </Form.Group>
                            <Form.Group controlId="totalAmount" className="my-2">
                                    <Form.Label>Total Amount</Form.Label>
                                    <Form.Control type="number" step="0.01" name="totalAmount" required placeholder="Total Amount" />
                            </Form.Group>
                            <Form.Group controlId="payee" className="my-2">
                                    <Form.Label>Payee Username</Form.Label>
                                    <Form.Control type="text" name="payee" required placeholder="Payee's Username" />
                            </Form.Group>
                            <Form.Group controlId="payers" className="my-2">
                                    <Form.Label>Payers Username</Form.Label>
                                    <Form.Control type="text" name="payers" required placeholder="Comma Separated Payers' Username (eg. raj,ria)" />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" type="submit" className="my-2">
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

export default AddTransactionModal;

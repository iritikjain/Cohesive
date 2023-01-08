import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { addBudget } from "../services/ProfileService";

const AddBudgetModal = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    addBudget(e.target)
     .then((result) => {
        alert(result);
        props.setUpdated(true);
     },
     (error) => {
        alert("Failed To Add Budget");
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
            Add Your Budget
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
                    <Row className="justify-content-center">
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="friends">
                                    <Form.Label>Budget</Form.Label>
                                    <Form.Control type="number" step="0.01" name="budget" required placeholder="Enter Your Budget" />
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

export default AddBudgetModal;

import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { addFriend } from "../services/ProfileService";

const AddFriendModal = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    addFriend(e.target)
     .then((result) => {
        alert(result);
        props.setUpdated(true);
     },
     (error) => {
        alert("Failed To Add Friend");
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
            Add A New Friend
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
                    <Row className="justify-content-center">
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="friends">
                                    <Form.Label>Friend's Username</Form.Label>
                                    <Form.Control type="text" name="friends" required placeholder="Enter Your Friend's Username" />
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

export default AddFriendModal;

import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {getFriends, deleteFriend} from "../services/ProfileService";
import {Button, ButtonToolbar, Alert} from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import "../App.css";
import AddFriendModal from "./AddFriendModal";

const Friends = (props) => {
  const [friends, setFriends] = useState(null);
  const [addModalShow, setAddModalShow] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    let mounted = true;
    getFriends()
      .then(data => {
        if (mounted) {
          setFriends(data)
        }
      })
    return () => {
      mounted = false;
      setIsUpdated(false);
    }
  }, [isUpdated, friends]);


  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleDelete = (e) => {
    if (window.confirm("Are You Sure You Want To Delete This Friend ?")){
      e.preventDefault();
      deleteFriend()
      .then((result) => {
        alert(result);
        setIsUpdated(true);
      },
      (error) => {
        alert("Failed To Delete The Friend.");
      });
    }
  };

  let AddModalClose = () => setAddModalShow(false);

  return (
    <>
    {props.token?
    <div className="fri-table">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Your Friends</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {friends && friends[0].friends.map((fri, index) =>
          <tr key={index}>
            <td>{fri.toUpperCase()}</td> 
            <td>
            <Button variant="danger" className="mr-2"
            onClick={event => handleDelete(event)}> < RiDeleteBin5Line /> Delete
            </Button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
    <ButtonToolbar>
      <Button variant="success" className="mr-2" onClick={handleAdd}> < BiAddToQueue /> Add Friend</Button>{' '} 
      <AddFriendModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
      </AddFriendModal>
    </ButtonToolbar>
    </div>:<Alert variant="primary" body className="text-center my-5"><b>Sign In To Get Started !</b></Alert>};
  </>
  );
};

export default Friends;
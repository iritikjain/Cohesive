import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {Button, ButtonToolbar} from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { BiAddToQueue } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Dropdown, Form, Alert } from "react-bootstrap"
import {getTransactions, deleteTransaction} from "../services/TransactionService";
import "../App.css";
import AddTransactionModal from "./AddTransactionModal";
import UpdateTransactionModal from "./UpdateTransactionModal.js";

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editTransaction, setEditTransaction] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (transactions.length && !isUpdated){
      return;
    }
    getTransactions()
      .then(data => {
        if (mounted) {
          setTransactions(data);
        }
      })
    return () => {
      mounted = false;
      setIsUpdated(false);
    }
  }, [isUpdated, transactions]);

  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  const handleUpdate = (e, trans) => {
    e.preventDefault();
    setEditModalShow(true);
    setEditTransaction(trans);
  };

  const handleDelete = (e, transactionId) => {
    if (window.confirm("Are You Sure You Want To Delete This Transaction ?")){
      e.preventDefault();
      deleteTransaction(transactionId)
      .then((result) => {
        alert(result);
        setIsUpdated(true);
      },
      (error) => {
        alert("Failed To Delete The Transaction.");
      });
    }
  };

  let AddModalClose = () => setAddModalShow(false);
  let EditModalClose = () => setEditModalShow(false);

  // const getUniqueData = (data, property) => {
  //   let newVal = data.map((currElem) => {
  //     return currElem[property];
  //   });
  //   newVal = ["All", ...new Set(newVal)];
  //   console.log(newVal);
  // }

  // const filterCategoryData = getUniqueData(transactions, "category"); 
  // console.log(filterCategoryData)

  // console.log(transactions)
  // console.log(transactions['transactionData'])

  return (
    <>
    {props.token?(
    <>
    <div className="d-flex">
    <Dropdown className="m-5">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Category
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="action-1">Action 1</Dropdown.Item>
        <Dropdown.Item href="action-2">Action 2</Dropdown.Item>
        <Dropdown.Item href="action-3">Action 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Form.Group controlId="date" className="m-5 d-flex">
        <Form.Label className="me-auto">Select Date</Form.Label>
        <Form.Control className="m-2" type="date" name="date" placeholder="" />
    </Form.Group>
    </div>
    <div className="trans-table">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Created By</th>
          <th>Category</th>
          <th>Date</th>
          <th>Total Amount</th>
          <th>Payee</th>
          <th>Payers</th>
          <th>Splitted Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((trans) =>
          <tr key={trans.id}>
            <td>{trans.transactionId}</td>
            <td>{trans.createdBy}</td>
            <td>{trans.category}</td>
            <td>{trans.date}</td>
            <td>{trans.totalAmount}</td>
            <td>{trans.payee}</td>
            <td>{trans.payers}</td>
            <td>{trans.amount}</td>
            <td>
            <Button variant="danger" className="mr-2"
            onClick={event => handleDelete(event, trans.transactionId)}> < RiDeleteBin5Line /> Delete
            </Button>
            <span>&nbsp;&nbsp;</span>
            <Button variant="primary" className="mr-2" 
            onClick={event => handleUpdate(event, trans)}> < FaEdit /> Edit
            </Button>
            <UpdateTransactionModal show={editModalShow} onHide={EditModalClose} 
            transaction = {editTransaction}
            setUpdated={setIsUpdated}>
            </UpdateTransactionModal>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
    <ButtonToolbar>
      <Button variant="success" className="mr-2" onClick={handleAdd}> < BiAddToQueue /> Create Transaction</Button>{' '} 
      <AddTransactionModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
      </AddTransactionModal>
    </ButtonToolbar>
    </div></>):<Alert variant="primary" body className="text-center my-5"><b>Sign In To Get Started !</b></Alert>};
    </>
  );
};

export default Transactions;
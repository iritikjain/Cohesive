import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "../App.css";
import {Button, ButtonToolbar, Image, Alert} from "react-bootstrap";
import { BiAddToQueue } from "react-icons/bi";
import img from "../static/final.jpg";
import AddBudgetModal from "./AddBudgetModal";
import { getBudget } from "../services/ProfileService";

const Home = (props) => {

  const [budget, setBudget] = useState(null);
  const [addModalShow, setAddModalShow] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    let mounted = true;
    getBudget()
      .then(data => {
        if (mounted) {
          setBudget(data)
        }
      })
    return () => {
      mounted = false;
      setIsUpdated(false);
    }
  }, [isUpdated, budget]);


  const handleAdd = (e) => {
    e.preventDefault();
    setAddModalShow(true);
  };

  let AddModalClose = () => setAddModalShow(false);

  return (
    <>
    <div>
      <Image fluid
        src={img}
      />
      {props.token?
      <CardGroup className="mt-3">
        <Card>
          <Card.Body>
            <div className="d-flex">
            <Card.Title className="me-auto mt-2">Budget</Card.Title>
            <ButtonToolbar>
            <Button variant="success" onClick={handleAdd}> < BiAddToQueue /> Add Budget</Button>{' '} 
            <AddBudgetModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsUpdated}>
            </AddBudgetModal>
            </ButtonToolbar>
            </div>
            <hr />
            <Card.Text className="p-2 text-center">
              {budget && budget[0].budget?budget[0].budget:0}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title className="text-center p-2">Expenditure</Card.Title>
            <hr />
            <Card.Text className="p-2 text-center">
              {budget && budget[0].expenditure?budget[0].expenditure:0}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title className="text-center p-2">Available Budget</Card.Title>
            <hr />
            <Card.Text className="p-2 text-center">
              {budget && budget[0].budget && budget[0].expenditure?budget[0].budget-budget[0].expenditure:0}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      :<Alert variant="primary" body className="text-center my-5"><b>Sign In To Get Started !</b></Alert>};
    </div>
    </>
  );
};

export default Home;

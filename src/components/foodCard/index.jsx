import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const FoodCard = (props) =>{
  const { id, publicId, name, imgUrl, nameScientific, foodGroup, foodSubgroup } = props.children;

return (  
  <Card>
  <Card.Body>
    <Card.Title>
      <a href={"#/food/" + id}>{name}</a>
      <a className="float-right" href={"#/food/" + id}>{id}</a>
    </Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{publicId}</Card.Subtitle>
    <Card.Img src={imgUrl} />
    <Card.Text>
      <Container fluid>
        <Row>
          <Col>Scientific name:</Col>
          <Col>{nameScientific}</Col>
        </Row>
        <Row>
          <Col>Group:</Col>
          <Col>{foodGroup}</Col>
        </Row>
        <Row>
          <Col>Subgroup:</Col>
          <Col>{foodSubgroup}</Col>
        </Row>
      </Container>
    </Card.Text>
  </Card.Body>
  </Card>
)};

export default FoodCard;
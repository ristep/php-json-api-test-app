import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const Home = () => {
  return (
    <>
    {/* <h2>Just an sumple photos</h2> */}
    <Container className="appBody">
      <Row>
        <Col xs={6} md={4}>
          <Image src="https://foodb.ca/system/foods/pictures/121/full/121.png" rounded />
        </Col>
        <Col xs={6} md={4}>
          <Image src="https://foodb.ca/system/foods/pictures/119/full/119.png" roundedCircle />
        </Col>
        <Col xs={6} md={4}>
          <Image src="https://foodb.ca/system/foods/pictures/117/full/117.png" thumbnail />
        </Col>
      </Row>
    </Container>
    </> 
  )
}

export default Home;
import React from "react";
import {  Image, Card, CardDeck, CardGroup, CardColumns } from "react-bootstrap";

const Home = () => {

  const Dibe = () => (
    [
      'Primary',
      'Secondary',
      'Success',
      'Danger',
      'Warning',
      'Info',
      'Light',
      'Dark',
    ].map((variant, idx) => (
      <Card>
        <Card.Body>
          <Card.Title>{variant} Card Title </Card.Title>
          <Card.Img src="https://foodb.ca/system/foods/pictures/122/full/122.png" large />
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk
            of the card's content.
          </Card.Text>
        </Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    ))
    
  );

  return (
    <CardColumns>
      <Dibe />
    </CardColumns>
 );

}

export default Home;
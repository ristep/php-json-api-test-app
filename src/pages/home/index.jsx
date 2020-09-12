import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <h2>Home page placeholders</h2>
  <Button onClick={() => setCount(count + 1)}>klink {count}</Button>
    </Container>
  );

}

export default Home;
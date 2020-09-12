import React, { useEffect, useState } from "react";
import { Card, Container, Col, Row, Pagination, Navbar, Form, FormControl, Button } from "react-bootstrap";

import Axios from "Axios";

const flr = (page) => (
  {
    "Listing": {
      "type": "foods",
      "attributes": [
        "id", "name", "description", "name_scientific", "wikipedia_id", "food_group", "food_subgroup", "food_type", "public_id"
      ],
      page
    }
  }
);

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState({ limit: 10, offset: 0 })
  const [pageMeta, setPageMeta] = useState({ size: 10, cur: 1, count: 992, pages: 992 / 10 })
  const [count, setCount] = useState(0);

  const nextPage = () => {
    setPageMeta({ ...pageMeta, cur: pageMeta.cur + 1 });
  }

  const prevPage = () => {
    setPageMeta({ ...pageMeta, cur: pageMeta.cur - 1 });
  }

  useEffect(() => {
    setPage({ limit: pageMeta.size , offset: pageMeta.size * pageMeta.cur });
  },[pageMeta] );

  const Pagi = () => (
    <Pagination style={{ marginTop: "10px" }}>
      <Pagination.First />
      <Pagination.Prev onClick={() => prevPage()} />

      <Pagination.Item>{pageMeta.cur}</Pagination.Item>

      <Pagination.Next onClick={() => nextPage(page, pageMeta)} />
      <Pagination.Last />
      <Button onClick={() => setCount(count + 1)}>klink {count}</Button>
    </Pagination>
  );

  const Navi2 = () => (
    <Navbar className="bg-light justify-content-between">
      <Navbar.Collapse id="basic-navbar-nav">
        <Container className=" fluid" >
          <Row>
            <Form inline >
              <FormControl type="text" placeholder="Search" />
              <Button type="submit">Submit</Button>
            </Form>
          </Row>
          <Row>
            <Pagi />
          </Row>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );

  useEffect(() => {
    (async () => {
      await Axios.post("", flr(page)).then((result) => {
        setFoods(result.data.data);
      });
    })();

  }, [page]);


  return (<>
    <Navi2 />
    <hr />
    <Container className="card-columns card-columns-2 card-columns-md-3 card-columns-xl-4">

      {foods.map((variant, idx) => (
        <Card key={idx}>
          <Card.Body>
            <Card.Title>
              <a href={"#/food/" + variant.id}>{variant.name}</a>
              <a className="float-right" href={"#/food/" + variant.id}>{variant.id}</a>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{variant.public_id}</Card.Subtitle>
            <Card.Img src={Axios.defaults.baseURL + "img/" + variant.id + ".png"} />
            <Card.Text>
              <Container fluid>
                <Row>
                  <Col>Scientific name:</Col>
                  <Col>{variant.name_scientific}</Col>
                </Row>
                <Row>
                  <Col>Group:</Col>
                  <Col>{variant.food_group}</Col>
                </Row>
                <Row>
                  <Col>Subgroup:</Col>
                  <Col>{variant.food_subgroup}</Col>
                </Row>
              </Container>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}

    </Container>
  </>
  );

}

export default Foods;
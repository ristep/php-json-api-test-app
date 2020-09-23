import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, Container, Col, Row, Pagination, Navbar, Form, FormControl, FormText } from "react-bootstrap";

import Axios from "Axios";
import { useParams } from "react-router-dom";
import { BackButton } from "components/backButton";

const PAGE_SIZE = 5;
const N0N = "-none-";
const BaseURL = "#/foods/"

const foodList = (search, pgSize, offset) => ({
  MetaList: {
    type: "foods",
    attributes: [
      "id", "name", "description", "name_scientific", "wikipedia_id", "food_group", "food_subgroup", "food_type", "public_id"
    ],
    filter: {
      template: "name like :par1 or name_scientific like :par2",
      params: {
        par1: "%" + search + "%",
        par2: "%" + search + "%"
      }
    },
    page: {
      limit: pgSize,
      offset: offset
    }
  }
});

const Foods = () => {
  const par = useParams();

  const [navi, setNavi] = useState({});
  const [prms, setPrms] = useState({});
  const [result, setResult] = useState({ OK: false, count: 0, data: [] });
  const [search, setSearch] = useState("");

  useMemo(() => {
    setPrms({ search: N0N, size: PAGE_SIZE, page: 0, ...par });
  }, [par]);

  useMemo(() => {
    const src = search === "" ? N0N : search;
    window.location.replace(BaseURL + src + "/" + prms.size + "/" + prms.page);
  }, [search, prms]);

  useMemo(() => {
    const last = result.recordCount % prms.size > 0 ? Math.floor(result.recordCount / prms.size) : Math.floor(result.recordCount / prms.size - 1);
    const prev = parseInt(prms.page) > 0 ? parseInt(prms.page) - 1 : parseInt(prms.page);
    const next = parseInt(prms.page) < last ? parseInt(prms.page) + 1 : parseInt(prms.page);
    setNavi({
      first: BaseURL + prms.search + "/" + prms.size + "/" + 0,
      prev: BaseURL + prms.search + "/" + prms.size + "/" + prev,
      info: "Page " + (parseInt(prms.page) + 1) + " of " + (last + 1),
      next: BaseURL + prms.search + "/" + prms.size + "/" + next,
      last: BaseURL + prms.search + "/" + prms.size + "/" + last
    })
  }, [prms, result.recordCount]);

  useMemo( () => {
    const src = N0N === prms.search ? "" : prms.search;
    setSearch(src);
  },[prms.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        await Axios.post("", foodList(N0N === prms.search ? "" : prms.search, prms.size, prms.page * prms.size)).then((ret) => {
          if (ret.data.OK) {
            setResult(ret.data);
            //setLastPage( ret.data.recordCount % prms.size > 0 ? Math.floor(ret.data.recordCount / prms.size) : Math.floor(ret.data.recordCount / prms.size - 1));
          }
        });
      })();
    }, 1);
    return () => clearTimeout(timer);
  }, [prms]);

  const Pagi = () => (
    <Pagination hidden={result.recordCount <= prms.size} style={{ marginTop: "10px" }}>
      <Pagination.First href={navi.first} />
      <Pagination.Prev href={navi.prev} />
      <Pagination.Item disabled={true} >{navi.info}</Pagination.Item>
      <Pagination.Next href={navi.next} />
      <Pagination.Last href={navi.last} />
    </Pagination>
  );

  return (
    <>
      <Navbar className="bg-light justify-content-between">
        <Navbar.Collapse id="basic-navbar-nav">
          <Container className=" fluid" >
            <Row>
              <BackButton>Back</BackButton>
            </Row>
            <Row>
              <Form inline >
                <FormControl type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
                <FormText style={{ marginLeft: "10px" }}>
                  Items found: {result.recordCount}
                </FormText>
              </Form>
            </Row>
            <Row>
              {/* <Button className="btn btn-primary" href={RelURL+"ma/5/2"}>Test</Button> */}
              <Pagi />
            </Row>
          </Container>
        </Navbar.Collapse>
      </Navbar>

      <Container className="card-columns card-columns-2 card-columns-md-3 card-columns-xl-4">

        {result.data.map((variant, idx) => (
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
        {/* <ReactJson src={par} />
        <ReactJson src={navi} /> */}
      </Container>
    </>
  );

}

export default Foods;
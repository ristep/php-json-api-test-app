import React, { memo, useEffect, useState } from "react";
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
  const { size = PAGE_SIZE, page = 0, search = '' } = useParams();

  const [navi, setNavi] = useState({});
  const [result, setResult] = useState({ OK: false, count: 0, data: [] });
  // const [searcht, setSearcht] = useState("");

  const goto = (ps, pg, sr) => {
    // const src = sr === "" ? N0N : sr;
    window.location.replace(BaseURL + ps + "/" + pg + "/" + sr);
  }

  const changeHandle = (txt) => {
    goto( size, page, txt);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        await Axios.post("", foodList( search,  size,  page * size)).then((ret) => {
          if (ret.data.OK) {
            setResult(ret.data);
            const last = result.recordCount %  size > 0 ? Math.floor(result.recordCount /  size) : Math.floor(result.recordCount /  size - 1);
            const prev = parseInt( page) > 0 ? parseInt( page) - 1 : parseInt( page);
            const next = parseInt( page) < last ? parseInt( page) + 1 : parseInt( page);
            setNavi({
              first: BaseURL + size + "/" + 0 + "/" + search,
              prev: BaseURL +  size + "/" + prev+ "/" + search,
              info: "Page " + (parseInt( page) + 1) + " of " + (last + 1),
              next: BaseURL + size + "/" + next+ "/" + search,
              last: BaseURL + size + "/" + last+ "/" + search
            });
            if( page>result.recordCount)
              goto( size, 0, search );
          }
        });
      })();
    }, 1);
    return () => clearTimeout(timer);
  }, [ page, search, size, result.recordCount]);

  const Pagi = memo((props) => {
    const { navi, recordCount } = props
    return(
      <Pagination hidden={recordCount <= navi.size} style={{ marginTop: "10px" }}>
        <Pagination.First href={navi.first} />
        <Pagination.Prev href={navi.prev} />
        <Pagination.Item disabled={true} >{navi.info}</Pagination.Item>
        <Pagination.Next href={navi.next} />
        <Pagination.Last href={navi.last} />
      </Pagination>
     );
  });

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
                <FormControl type="text" placeholder="Search" value={search} onChange={e => changeHandle(e.target.value)} />
                <FormText style={{ marginLeft: "10px" }}>
                  Items found: {result.recordCount}
                </FormText>
              </Form>
            </Row>
            <Row>
              {/* <Button className="btn btn-primary" href={RelURL+"ma/5/2"}>Test</Button> */}
              <Pagi navi={{...navi, recordCount:result.recordCount}} />
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
        {/* <ReactJson src={prms} /> */}
        {/* <ReactJson src={navi} /> */}
      </Container>
    </>
  );

}

export default Foods;
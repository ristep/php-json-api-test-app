import React, { useEffect, useState } from "react";
import { Card, Container, Col, Row, Pagination, Navbar, Form, FormControl, FormText } from "react-bootstrap";

import Axios from "Axios";
import { useParams } from "react-router-dom";
// import ReactJson from "react-json-view";

const PAGE_SIZE = 5;

const foodList = ( search, pgSize, offset ) => ({
    MetaList:{
      type: "foods",
      attributes: [
        "id", "name", "description", "name_scientific", "wikipedia_id", "food_group", "food_subgroup", "food_type", "public_id"
      ],
      filter:{
        template:"name like :par1 or name_scientific like :par2",
        params:{
          par1: "%"+search+"%",
          par2: "%"+search+"%"
        }
      },
      page:{
        limit: pgSize,
        offset: offset
      }
    }
});

const Foods = () => {
  
  const { searchPar="__NaN__", pageSizePar=PAGE_SIZE, pagePar=0 } = useParams(); 

  const [result, setResult] = useState({ OK: false, count:0, data:[] });
  const [search, setSearch] = useState("");
  const [maxPage, setMaxPage] = useState(0);
  
  const goto = ( search, size, page) => {
    const src = ""===search ? "__NaN__" : search;
    window.location.assign("#/foods/"+src+"/"+parseInt(size)+"/"+parseInt(page))
  };

  const nextPage = () => {
    const page = parseInt(pagePar) === maxPage ? parseInt(pagePar) :  parseInt(pagePar)+1;
    goto(searchPar,pageSizePar,page);
  }

  const prevPage = () => {
    const page =  parseInt(pagePar) === 0 ? parseInt(pagePar) : parseInt(pagePar) - 1;
    goto(searchPar, pageSizePar, page);
  }

  const firstPage = () => {
    goto(searchPar, pageSizePar, 0);
  };

  const lastPage = () => {
    goto(searchPar, pageSizePar, maxPage );
  };

  useEffect( () => {
    if(pagePar>maxPage) 
      goto(searchPar, pageSizePar, maxPage);
  }, [searchPar, pageSizePar, pagePar, maxPage ])
  
  useEffect(() => {
    goto(search, pageSizePar, pagePar);
  }, [search, pageSizePar, pagePar ]);

  useEffect(() => {
    const src = "__NaN__"===searchPar ? "" : searchPar;
    setSearch(src);
    (async () => {
      await Axios.post("", foodList( src, pageSizePar, pagePar*pageSizePar )).then((ret) => {
        if( ret.data.OK ){
          setResult( ret.data );
        }  
      });
    })();
  }, [  searchPar, pageSizePar, pagePar ]);

  useEffect( () => {
     setMaxPage( result.recordCount%pageSizePar>0 ? Math.floor(result.recordCount/pageSizePar) : Math.floor(result.recordCount/pageSizePar-1) );
  },[result.recordCount, pageSizePar]);

  const Pagi = () => (
    <Pagination hidden={result.recordCount<=pageSizePar} style={{ marginTop: "10px" }}>
      <Pagination.First onClick={() => firstPage()} />
      <Pagination.Prev onClick={() => prevPage()} />
      <Pagination.Item disabled >Page {parseInt(pagePar)+1} of {Math.ceil(result.recordCount/pageSizePar)}</Pagination.Item>
      <Pagination.Next onClick={() => nextPage()} />
      <Pagination.Last onClick={() => lastPage()} />
    </Pagination>
  );

  return (
  <>
    <Navbar className="bg-light justify-content-between">
      <Navbar.Collapse id="basic-navbar-nav">
        <Container className=" fluid" >
          <Row>
            <Form inline >
              <FormControl type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
              <FormText style={{ marginLeft: "10px" }}>
                Items found: {result.recordCount}
              </FormText>
            </Form>
          </Row>
          <Row>
            <Pagi />
          </Row>
        </Container>
      </Navbar.Collapse>
    </Navbar> 
   
    <Container className="card-columns card-columns-2 card-columns-md-3 card-columns-xl-4">

      { result.data.map((variant, idx) => (
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
      {/* <ReactJson src={{ searchPar, pageSizePar, pagePar, maxPage }} /> */}
    </Container>
  </>
  );

}

export default Foods;
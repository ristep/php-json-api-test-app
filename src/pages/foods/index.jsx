import React, { useEffect, useState } from "react";
import { Card, Container, Col, Row, Pagination, Navbar, Form, FormControl, FormText } from "react-bootstrap";

import Axios from "Axios";
import { useParams } from "react-router-dom";

const pageSize = 5;

const foodList = (page, search ) => ({
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
      page
    }
});

const Foods = () => {
  const { filterPar="", pageSizePar=5, pagePar=1 } = useParams(); 
  
  const [result, setResult] = useState({ OK: false, count:0, data:[] });
  const [page, setPage] = useState({ limit: pageSize, offset: 0 });
  const [search, setSearch] = useState("");

  // useEffect(()=>{
  //   setSearch(filterPar);    
  //   setPage( p => ({...p, offset:pagePar*pageSizePar, limit:pageSizePar }));
  // },[ filterPar, pageSizePar, pagePar ])

  const nextPage = () => {
    const offset = page.offset + page.limit >= result.recordCount ? page.offset :  page.offset + page.limit;
    setPage({ ...page, offset });
  }

  const prevPage = () => {
    const offset = page.offset - page.limit < 0 ? page.offset : page.offset - page.limit;
    setPage({ ...page, offset });
  }

  const firstPage = () => {
    setPage({ ...page, offset: 0 });
  };

  const lastPage = () => {
    if( result.recordCount%page.limit>0 ) 
      setPage({ ...page, offset: Math.floor(result.recordCount/page.limit)*page.limit});
    else  
      setPage({ ...page, offset: Math.floor(result.recordCount/page.limit*page.limit) - page.limit });
  };

  useEffect(() => {
    (async () => {
      await Axios.post("", foodList( page, search )).then((ret) => {
        if( ret.data.OK ){
          setResult( ret.data );
        }  
      });
    })();
  }, [ search, page ]);

  useEffect( () =>
    setPage( p => ({...p, offset: 0 } ) )
  ,[result.recordCount]);

  const Pagi = () => (
    <Pagination hidden={result.recordCount<=page.limit} style={{ marginTop: "10px" }}>
      <Pagination.First onClick={() => firstPage()} />
      <Pagination.Prev onClick={() => prevPage()} />
      <Pagination.Item disabled >Page {page.offset/page.limit+1} of {Math.ceil(result.recordCount/page.limit)}</Pagination.Item>
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
              <FormText id="passwordHelpBlock" style={{ marginLeft: "10px" }}>
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
      <h3>filter: {filterPar}</h3> 
      <h3>pageSize: {pageSizePar}</h3> 
      <h3>page: {pagePar}</h3> 
    </Container>
  </>
  );

}

export default Foods;
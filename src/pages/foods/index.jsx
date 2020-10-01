import React, { useEffect, useState } from "react";
import { Container, Row, Navbar, Form, FormControl, Button } from "react-bootstrap";

import Axios from "Axios";
import { useParams } from "react-router-dom";
import NaviGator from "components/naviGator";
import FoodCard from "components/foodCard";

const PAGE_SIZE = 5;
const DT = 250;
const BaseUrl = "#/foods/"

const foodListQuery = (search, pgSize, offset) => ({
  MetaList: {
    type: "foods",
    attributes: [
      "id", "name", "description", "name_scientific", "wikipedia_id", "food_group", "food_subgroup", "food_type", "public_id", "picture_url"
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
  const [result, setResult] = useState({ OK: false, count: 0, data: [] });
  // const [ imageList, setImageList] = useState([]);

  const location = (ps, pg, sr) => {
    window.location.replace(BaseUrl + ps + "/" + pg + "/" + sr);
  }

  useEffect(() => {
    const dt = DT;
    const timer = setTimeout(() => {
      (async () => {
        await Axios.post("", foodListQuery(search, size, page * size)).then((ret) => {
          if (ret.data.OK) {
            setResult(ret.data);
            if (page * size > result.recordCount)
              location(size, 0, search);
          }
        });
      })();
    }, dt);
    return () => clearTimeout(timer);
  }, [page, search, size, result.recordCount]);

  return (
    <>
      <Navbar className="bg-light justify-content-between">
        <Navbar.Collapse id="basic-navbar-nav">
          <Container className=" fluid" >
            <Row>
              <Form inline >
                <FormControl type="text" placeholder="Search" value={search} onChange={e => location(size, page, e.target.value)} />
                <Button className="btn-light" disabled style={{ marginLeft: "10px" }}>
                  Items found: {result.recordCount}
                </Button>
              </Form>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <NaviGator controls={{ BaseUrl, size, page, search, totalCount: result.recordCount }} />
            </Row>
            <Row>
              <button className="btn btn-light" disabled>Page size:</button>
              <button onClick={() => location(  5, page, search )} className="btn btn-outline-primary" >5</button>
              <button onClick={() => location( 10, page, search )} className="btn btn-outline-primary">10</button>
              <button onClick={() => location( 15, page, search )} className="btn btn-outline-primary">15</button>
            </Row>
          </Container>
        </Navbar.Collapse>
      </Navbar>

      <Container className="card-columns card-columns-2 card-columns-md-3 card-columns-xl-4">

        {result.data.map((variant, idx) => (
          <FoodCard key={idx}>{{
            id: variant.id,
            publicId: variant.public_id,
            name: variant.name,
            imgUrl: Axios.defaults.baseURL + variant.picture_url,
            nameScientific: variant.name_scientific,
            foodGroup: variant.food_group,
            foodSubgroup: variant.food_subgroup
          }}</FoodCard>
        ))}

      </Container>
    </>
  );

}

export default Foods;
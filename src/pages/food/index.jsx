import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Axios from "Axios";
import { Card } from "react-bootstrap";

const foodDetailQuery = (id) => (
  {
    "Get": {
      "type": "foods",
      "id": id,
      "attributes": [
        "id", "name", "description", "name_scientific", "wikipedia_id", "food_group", "food_subgroup", "food_type", "public_id"
      ],
    }
  });

const Food = () => {
  const { foodID } = useParams();
  const [food, setFood] = useState({});

  useEffect(() => {
    (async () => {
      await Axios.post("", foodDetailQuery(foodID)).then((result) => {
        setFood(result.data.data);
      });
    })();
  }, [foodID]);

  return (
    <Card>
      <Card.Body>
        <Card.Title><h2>{food.name}</h2></Card.Title>
        <Card.Img src={Axios.defaults.baseURL + "img/" + food.id + ".png"} />
        <Card.Text component={'span'}>
          <dl className="row">

            <dt className="col-sm-2">Public id:</dt>
            <dd className="col-sm-10">{food.public_id}</dd>

            <dt className="col-sm-2">Scientific name:</dt>
            <dd className="col-sm-10">{food.name_scientific}</dd>

            <dt className="col-sm-2">Description:</dt>
            <dd className="col-sm-10">{food.description}</dd>

            <dt className="col-sm-2">Group:</dt>
            <dd className="col-sm-10">{food.food_group}</dd>

            <dt className="col-sm-2">Subgroup:</dt>
            <dd className="col-sm-10">{food.food_subgroup}</dd>

          </dl>
        </Card.Text>
      </Card.Body>
      <Card.Footer style={{ width: '100%' }}>
        <a href={"https://en.wikipedia.org/wiki/" + food.wikipedia_id}>Wikipedia</a>
        <a className="float-right" href={"#/food/" + food.id}>{food.id} - {food.name}</a>
      </Card.Footer>
    </Card>
  )
};

export default Food;
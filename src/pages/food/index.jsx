import React,{ useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import Axios from "Axios";
import { Card } from "react-bootstrap";


const flr = (id) => (
  {
    "Get": {
      "type": "foods",
      "id" :id,
      "attributes": [
        "id", "name", "description", "name_scientific", "wikipedia_id", "food_group", "food_subgroup", "food_type", "public_id"
      ],
    }
  });

const Food = () => {
  const { foodID } = useParams(); 
  const [food, setFood] = useState();

  useEffect(() => {
    (async () => {
      await Axios.post("", flr(foodID)).then((result) => {
        var dibe = result.data.data;
        setFood(
              <Card>
                <Card.Body>
                  <Card.Title><h2>{dibe.name}</h2></Card.Title>
                  <Card.Img src={Axios.defaults.baseURL + "img/" + dibe.id + ".png"} />
                  <Card.Text component={'span'}>
                  <dl className="row">
                    
                    <dt className="col-sm-2">Public id:</dt>
                    <dd className="col-sm-10">{dibe.public_id}</dd>

                    <dt className="col-sm-2">Scientific name:</dt> 
                    <dd className="col-sm-10">{dibe.name_scientific}</dd>

                    <dt className="col-sm-2">Description:</dt> 
                    <dd className="col-sm-10">{dibe.description}</dd>

                    <dt className="col-sm-2">Group:</dt>
                    <dd className="col-sm-10">{dibe.food_group}</dd>

                    <dt className="col-sm-2">Subgroup:</dt>
                    <dd className="col-sm-10">{dibe.food_subgroup}</dd>

                  </dl>
                  </Card.Text>
                </Card.Body>
                <Card.Footer  style={{ width: '100%' }}>
                  <a href={"https://en.wikipedia.org/wiki/" + dibe.wikipedia_id}>Wikipedia</a>
                  <a className="float-right" href={"#/food/" + dibe.id}>{dibe.id} - {dibe.name}</a>
                </Card.Footer>
              </Card>
        )
      
      });
    })();

  }, [foodID]);
  return(
    <div>
      {food}
    </div>
  )
};

export default Food;
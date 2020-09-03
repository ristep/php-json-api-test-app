import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ReactJson from "react-json-view";

import axios from "axios";
import { Card, Table, Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";

const axParams = {
  baseURL: "http://phptest.sman/php-json-api/",
  headers: {
    Authorization: "dummy-key",
    "Content-type": "application/json",
  },
};
const Axios = axios.create(axParams);

const rq = (rqID) => ({
  Get: {
    type: "test_requests",
    id: rqID,
    attributes: [
      "jsonRequest"
    ]
  }
});


const Queries = () => {
  let { rqID } = useParams();
  const [request, setRequest] = useState();
  const [result, setResult] = useState();
  const [tabela, setTabela] = useState();
  const [tabKey, setTabKey] = useState();
  
  var list = Array();

  const lrq = {
    Listing: {
      type: "test_requests",
      attributes: [
        "id", "title", "comment"
      ]
    },
  };

  useEffect(() => {

    if(rqID){
      setTabKey("Result");
    }else{  
      setTabKey("List");
    }
  
    (
      async () => {
        setRequest({});
        setResult({});
        await Axios.post("", rq(rqID)).then(ret => {
          if (ret.data.OK && ret.data.data.attributes)
            setRequest(JSON.parse(ret.data.data.attributes.jsonRequest));
        })
      }
    )();
  }, [rqID]);

  useEffect(() => {
    (async () => {
      setTabela('');
      await Axios.post("", lrq).then((ret) => {

        setTabela(

          Array.from(ret.data.data).map((value, index) =>

            <tr key={index}>
              <td>{value.id}</td>
              <td><a href={"#/queries/" + value.id}>{value.attributes.title}</a></td>
              <td>{value.attributes.comment}</td>
            </tr>

          )

        );

      });

    })();
  }, []);

  const resendRequest = () => {
    (async () => {
      setResult({});
      await Axios.post("", request)
        .then((ret) => {
          setResult({
            ...ret.data,
            status: ret.status,
            statusText: ret.statusText,
            error: false,
          });
        })
        .catch((err) => {
          setResult({
            status: 204,
            statusText: "Data base error!!",
            error: true,
            errorNo: err.error,
            errMessage: err.message,
            name: err.name,
            config: err.config,
          });
        });
    })();
  };

  return (
    <div className="appBody">
      <Tabs id="tab-control"
        defaultActiveKey="List" 
        activeKey={tabKey}
        onSelect={(k) => setTabKey(k)}
      >
        <Tab eventKey="List" title="List">
            <Card>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Title</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {tabela}
                </tbody>
              </Table>
            </Card>
          </Tab>
          <Tab eventKey="Result" title="Queri result">
            <Card>
              <h5>Record ID: {rqID}</h5>
            <ReactJson
              name={false}
              src={request}
              onEdit={(ob) => {
                setRequest(ob.updated_src);
              }}
              onDelete={(ob) => {
                setRequest(ob.updated_src);
              }}
              onAdd={(ob) => {
                setRequest(ob.updated_src);
              }}
            />
            <Button onClick={() => resendRequest()}>Send request</Button>
          </Card>
          <div className="card">
            <ReactJson name={false} src={result} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Queries;

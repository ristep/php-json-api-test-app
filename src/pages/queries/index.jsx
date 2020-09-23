import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ReactJson from "react-json-view";

import { Card, Table, Tabs, Tab } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import Axios from "Axios";

const rq = (rqID) => ({
  Get: {
    type: "test_requests",
    id: rqID,
    attributes: [
      "jsonRequest"
    ]
  }
});

const lrq = {
  Listing: {
    type: "test_requests",
    attributes: [
      "id", "title", "comment"
    ]
  },
};

const Queries = () => {
  let { rqID } = useParams();
  const [request, setRequest] = useState();
  const [result, setResult] = useState();
  const [tabela, setTabela] = useState({});
  const [tabKey, setTabKey] = useState();

  useEffect(() => {
    rqID ? setTabKey("Result") : setTabKey("List");

    (async () => {
      setRequest({});
      setResult({});
      await Axios.post("", rq(rqID)).then(ret => {
        if (ret.data.OK && ret.data.data)
          setRequest(JSON.parse(ret.data.data.jsonRequest));
      })
    }
    )();
  }, [rqID]);

  useEffect(() => {
    (async () => {
      setTabela('');
      await Axios.post("", lrq).then((ret) => {
        setTabela( data => (ret.data.data));
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
                {Array.from(tabela).map((value, index) =>
                  <tr key={index}>
                    <td>{value.id}</td>
                    {/*<td><Link to={"/queries/"+value.id}>{value.title}</td> */}
                    <td><Link to={"/queries/" + value.id}>{value.title}</Link> </td>
                    <td>{value.comment}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
          <ReactJson src={tabela} name={false} />
        </Tab>
        <Tab eventKey="Result" title=" Query ">
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
            {/* <ReactJson name={false} src={{baseURL:Axios.defaults.baseURL}} /> */}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Queries;

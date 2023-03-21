import React, { useState, Fragment, useEffect } from "react";
import { Row, Col, Card, Tab, Tabs } from "react-bootstrap";
import CaseManagerList from "./case_manager/CaseManagerList";
import PatientList from "./patient/PatientList";
import axios from "axios";
import { token, url } from "../../api";

const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const Home = (props) => {
  const [key, setKey] = useState("case-manager");

  const urlTabs =
    props.location && props.location.state ? props.location.state : null;
  const [permissions, setPermissions] = useState([]);

  const userPermission = () => {
    axios
      .get(`${url}account`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setPermissions(response.data.permissions);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    userPermission();

    switch (urlTabs) {
      case "existing-manifest":
        return setKey("case-manager");
      case "sample-tracker":
        return setKey("tracker");
      default:
        return setKey("case-manager");
    }
  }, [urlTabs]);

  return (
    <Fragment>
      <Row>
        <Col xl={12}>
          <Card style={divStyle}>
            <Card.Body>
              {/* <!-- Nav tabs --> */}
              <div className="custom-tab-1">
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="case-manager" title="Case Managers">
                    <CaseManagerList />
                  </Tab>
                  <Tab eventKey="collection" title="Assign Case Manager">
                    <PatientList />
                  </Tab>
                </Tabs>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Home;

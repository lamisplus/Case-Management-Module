import React, { useState, Fragment, useEffect } from "react";
import { Row, Col, Card, Tab, Tabs } from "react-bootstrap";
import CaseManagerList from "./case_manager/CaseManagerList";
import PatientList from "./patient/PatientList";
import AssignedClients from "./patient/AssignedClients";
import axios from "axios";
import { token, url } from "../../api";
import PageTitle from "./layouts/PageTitle";

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
      case "assigned-casemanager":
        return setKey("assigned-casemanager");
      case "assign-casemanager":
        return setKey("assign-casemanager");
      default:
        return setKey("assign-casemanager");
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
                <PageTitle activeMenu="Home " motherMenu="Case Manager" />
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="assign-casemanager" title="Enrolled Patients">
                    <PatientList />
                  </Tab>
                  <Tab
                    eventKey="assigned-casemanager"
                    title="Assigned Managers"
                  >
                    <AssignedClients />
                  </Tab>
                  <Tab eventKey="case-manager" title="Case Managers">
                    <CaseManagerList />
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

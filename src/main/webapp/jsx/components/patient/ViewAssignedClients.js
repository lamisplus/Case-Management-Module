import React, { useEffect, useCallback, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { token, url } from "../../../api";
import PageTitle from "../layouts/PageTitle";

import { Link } from "react-router-dom";
import MatButton from "@material-ui/core/Button";
import HomeIcon from "@mui/icons-material/Home";

import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
  Badge,
} from "reactstrap";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardBottom: {
    marginBottom: 20,
  },
  Select: {
    height: 45,
    width: 350,
  },
  button: {
    margin: theme.spacing(1),
  },

  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    border: "1px solid #014d88",
    borderRadius: "0px",
    fontSize: "14px",
    color: "#000",
  },
  error: {
    color: "#f85032",
    fontSize: "11px",
  },
  success: {
    color: "#4BB543 ",
    fontSize: "11px",
  },
  inputGroupText: {
    backgroundColor: "#014d88",
    fontWeight: "bolder",
    color: "#fff",
    borderRadius: "0px",
  },
  label: {
    fontSize: "14px",
    color: "#014d88",
    fontWeight: "600",
  },
}));

const ViewAssignedClients = (props) => {
  const location = useLocation();
  const { clients } = location.state;

  const history = useHistory();

  const classes = useStyles();
  const [states, setStates] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [caseManager, setCaseManager] = useState([]);
  const [patientAssigned, setPatientAssigned] = useState([]);
  const [errors, setErrors] = useState({});
  const [assignedData, setAssignedData] = useState(clients);

  useEffect(() => {}, []);

  return (
    <>
      <Container maxWidth>
        <Card>
          <CardBody>
            <PageTitle activeMenu="Clients " motherMenu="Case Manager" />
            <p style={{ textAlign: "right" }}>
              <Link color="inherit" to={{ pathname: "/" }}>
                <MatButton
                  variant="contained"
                  color="primary"
                  startIcon={<HomeIcon />}
                  style={{
                    backgroundColor: "#014d88",
                    fontWeight: "bolder",
                    color: "fff",
                  }}
                >
                  back
                </MatButton>
              </Link>
            </p>
            <hr />
            <br />
            <Form>
              <Row>
                <Col>
                  {" "}
                  <FormGroup>
                    <Label for="assignDate" className={classes.label}>
                      Assigned Date
                    </Label>
                    <Input
                      type="datetime-local"
                      max={new Date().toISOString().substr(0, 16)}
                      name="assignDate"
                      id="assignDate"
                      placeholder="Date & Time Created"
                      className={classes.input}
                      value={assignedData.assignDate}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="caseManager" className={classes.label}>
                      Case Manager
                    </Label>
                    <Input
                      type="text"
                      name="caseManager"
                      value={assignedData.caseManager}
                      id="caseManager"
                      className={classes.input}
                      disabled
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label className={classes.label}>State</Label>
                    <Input
                      type="text"
                      name="state"
                      id="state"
                      className={classes.input}
                      value={assignedData.state.split(" ")[1]}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className={classes.label}>LGA</Label>
                    <Input
                      type="text"
                      name="lga"
                      id="lga"
                      value={assignedData.lga}
                      className={classes.input}
                      disabled
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
            <br />
            <br />
            <Row>
              <Table striped bordered size="sm">
                <tbody>
                  <tr style={{ backgroundColor: "#014d88", color: "#fff" }}>
                    <th>Hospital No</th>
                    <th>Full Name</th>
                    <th>Sex</th>
                    <th>Age</th>
                    <th>Enrolled Status</th>
                    <th></th>
                  </tr>
                  {assignedData &&
                    assignedData.patients.map((item, value) => (
                      <tr key={value + 1}>
                        <td>{item.hospitalNo}</td>
                        <td>{item.fullName}</td>
                        <td>{item.sex}</td>
                        <td>{item.age}</td>
                        <td>{item.currentStatus}</td>
                        <td>
                          <Badge color="info">Assigned</Badge>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default ViewAssignedClients;

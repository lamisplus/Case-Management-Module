import React, { useEffect, useCallback, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@mui/material/Container";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { token, url } from "../../../api";

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

const AssignCaseManager = (props) => {
  const location = useLocation();
  // const { patients } = location.state;
  const history = useHistory();
  const result = JSON.parse(localStorage.getItem("patients"));
  const classes = useStyles();
  const [states, setStates] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [caseManager, setCaseManager] = useState([]);
  const [patientAssigned, setPatientAssigned] = useState([]);
  const [errors, setErrors] = useState({});
  const [assignedData, setAssignedData] = useState({
    assignedDate: "",
    casemanager: "",
    stateId: "",
    lga: "",
    patients: result,
  });

  function getStateByCountryId(getCountryId) {
    axios
      .get(
        `${url}organisation-units/parent-organisation-units/${getCountryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setStates(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  const getProvinces = (e) => {
    const stateId = e.target.value;
    setAssignedData({ ...assignedData, stateId: e.target.value });
    axios
      .get(`${url}organisation-units/parent-organisation-units/${stateId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProvinces(
          response.data.sort((x, y) => {
            return x.id - y.id;
          })
        );
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const getStates = () => {
    getStateByCountryId("1");
    //setAssignedData({ ...assignedData, countryId: 1 });
  };

  const getCaseManager = async () => {
    await axios
      .get(`${url}casemanager/list`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => setCaseManager(resp.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("patients"));

    setPatientAssigned(result);

    getStates();
    getCaseManager();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignedData({
      ...assignedData,
      [name]: value,
    });
  };

  const validateInputs = () => {
    let temp = { ...errors };
    temp.assignedDate = assignedData.assignedDate
      ? ""
      : "Assign date is required.";
    temp.casemanager = assignedData.casemanager
      ? ""
      : "Case manager is required.";
    temp.stateId = assignedData.stateId ? "" : "State is required.";
    temp.lga = assignedData.lga ? "" : "LGA is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      console.log(assignedData);
      history.push("/");
    }
  };

  return (
    <>
      <Container maxWidth>
        <Card>
          <CardBody>
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
                  back Home
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
                    <Label for="assignedDate" className={classes.label}>
                      Date & Time <span style={{ color: "red" }}> *</span>
                    </Label>
                    <Input
                      type="datetime-local"
                      max={new Date().toISOString().substr(0, 16)}
                      name="assignedDate"
                      id="assignedDate"
                      placeholder="Date & Time Created"
                      className={classes.input}
                      value={assignedData.assignedDate}
                      onChange={handleInputChange}
                    />
                    {errors.assignedDate !== "" ? (
                      <span className={classes.error}>
                        {errors.assignedDate}
                      </span>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="casemanager" className={classes.label}>
                      Case Manager <span style={{ color: "red" }}> *</span>
                    </Label>
                    <select
                      className="form-control"
                      style={{
                        border: "1px solid #014d88",
                        borderRadius: "0px",
                        fontSize: "14px",
                        color: "#000",
                      }}
                      name="casemanager"
                      value={assignedData.casemanager}
                      id="casemanager"
                      onChange={handleInputChange}
                    >
                      <option>Select Case Manager</option>
                      {caseManager.map((value, i) => (
                        <option key={i} value={value.id}>
                          {`${value.firstName} ${value.lastName}`}
                        </option>
                      ))}
                    </select>
                    {errors.casemanager !== "" ? (
                      <span className={classes.error}>
                        {errors.casemanager}
                      </span>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label className={classes.label}>
                      State <span style={{ color: "red" }}> *</span>
                    </Label>
                    <select
                      className="form-control"
                      name="state"
                      id="state"
                      onChange={getProvinces}
                      value={assignedData.stateId}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.2rem",
                      }}
                    >
                      <option value={""}></option>
                      {states.map((value) => (
                        <option key={value.id} value={value.id}>
                          {value.name}
                        </option>
                      ))}
                    </select>
                    {errors.stateId !== "" ? (
                      <span className={classes.error}>{errors.stateId}</span>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label className={classes.label}>
                      LGA <span style={{ color: "red" }}> *</span>
                    </Label>
                    <select
                      className="form-control"
                      name="lga"
                      id="lga"
                      value={assignedData.lga}
                      onChange={handleInputChange}
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.2rem",
                      }}
                    >
                      <option value={""}></option>
                      {provinces.map((value, index) => (
                        <option key={index} value={value.id}>
                          {value.name}
                        </option>
                      ))}
                    </select>
                    {errors.lga !== "" ? (
                      <span className={classes.error}>{errors.lga}</span>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<SendIcon />}
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#014d88",
                  fontWeight: "bolder",
                  color: "fff",
                }}
              >
                Submit
              </Button>
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
                    {/* <th>Enrolled</th> */}
                    <th>Date registered</th>
                  </tr>
                  {patientAssigned &&
                    patientAssigned.map((item, value) => (
                      <tr key={value + 1}>
                        <td>{item.hospitalNo}</td>
                        <td>{item.fullname}</td>
                        <td>{item.sex}</td>
                        {/* <td>{item.isEnrolled}</td> */}
                        <td>{item.dateOfRegistration}</td>
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

export default AssignCaseManager;

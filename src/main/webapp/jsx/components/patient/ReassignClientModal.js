import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormFeedback,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import MatButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { Alert } from "reactstrap";
import { Spinner } from "reactstrap";
import axios from "axios";
import { token, url } from "../../../api";
import { toast } from "react-toastify";

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
  error: {
    color: "#f85032",
    fontSize: "11px",
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
    display: "none",
  },
}));

const ReassignClientModal = (props) => {
  const patient = JSON.parse(localStorage.getItem("patient"));
  const history = useHistory();
  const classes = useStyles();
  const [states, setStates] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [caseManager, setCaseManager] = useState([]);
  const [user, setUser] = useState("");
  const [assignedData, setAssignedData] = useState({
    caseManagerId: "",
    patients: [],
  });

  let hasIds = [];

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignedData({
      ...assignedData,
      [name]: value,
    });
  };

  function getStateByCountryId(getCountryId) {
    axios
      .get(
        `${url}organisation-units/parent-organisation-units/${getCountryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setStates(response.data);
      })
      .catch((error) => {});
  }

  const getProvinces = (e) => {
    let stateValue = e.target.value.split(" ");
    let stateId = stateValue[0];
    let stateName = stateValue[1];

    if (stateName.length > 0) {
      setAssignedData({ ...assignedData, state: e.target.value });
    }

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
      .catch((error) => {});
  };

  const getStates = () => {
    getStateByCountryId("1");
  };

  const getCaseManager = async () => {
    await axios
      .get(`${url}casemanager/list`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => setCaseManager(resp.data))
      .catch((err) => console.log(err));
  };
  const Facilities = () => {
    axios
      .get(`${url}account`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(`${response.data.firstName} ${response.data.lastName}`);
        // setFacilities(response.data.applicationUserOrganisationUnits);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  useEffect(() => {
    Facilities();
    getStates();
    getCaseManager();
  }, []);

  const validateInputs = () => {
    let temp = { ...errors };
    //temp.assignDate = assignedData.assignDate ? "" : "Assign date is required.";
    temp.caseManagerId = assignedData.caseManagerId
      ? ""
      : "Case manager is required.";
    // temp.state = assignedData.state ? "" : "State is required.";
    // temp.lga = assignedData.lga ? "" : "LGA is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const assignCaseManager = async (e) => {
    e.preventDefault();

    let updatedRecord = patient.map((item) => {
      //console.log(item);
      hasIds.push(item.id);
      const updated = {
        ...item,
        createdBy: "",
        modifiedBy: user,
        action: "REASSIGNMENTS",
      };
      return updated;
    });

    assignedData.patients = updatedRecord;

    if (validateInputs()) {
      //console.log(assignedData);
      if (assignedData.patients?.length > 0) {
        await axios
          .post(`${url}assign/reassign`, assignedData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((resp) => {
            //console.log(resp);
            toast.success("Patient reassigned successfully");
            //history.push("/");
            props.setPatients(
              props.patients.filter((person) => !hasIds.includes(person.id))
            );
            props.togglestatus();
          })
          .catch((err) => {
            //console.log(err);
            toast.error(
              "Something went wrong. Please try again... " + err.message
            );
          });
      } else {
        toast.error("Patients were not selected, for re-assignment");
      }

      //props.getAllCaseManagers();
      props.togglestatus();
    }
  };

  return (
    <div>
      <Modal
        isOpen={props.modalstatus}
        toggle={props.togglestatus}
        className={props.className}
        size="lg"
      >
        <Form>
          <ModalHeader toggle={props.togglestatus}>
            Reassign Patient to Case Manager
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                <Form>
                  <Row>
                    <Col>
                      {" "}
                      <FormGroup>
                        <Label for="assignDate" className={classes.label}>
                          Date & Time <span style={{ color: "red" }}> *</span>
                        </Label>
                        <Input
                          type="datetime-local"
                          max={new Date().toISOString().substr(0, 16)}
                          name="assignDate"
                          id="assignDate"
                          placeholder="Date & Time Created"
                          className="form-control"
                          style={{
                            border: "1px solid #014d88",
                            borderRadius: "0px",
                            fontSize: "14px",
                            color: "#000",
                          }}
                          value={assignedData.assignDate}
                          onChange={handleInputChange}
                        />
                        {errors.assignDate !== "" ? (
                          <span className={classes.error}>
                            {errors.assignDate}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="caseManagerId" className={classes.label}>
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
                          name="caseManagerId"
                          value={assignedData.caseManager}
                          id="caseManagerId"
                          onChange={handleInputChange}
                        >
                          <option>Select Case Manager</option>
                          {caseManager &&
                            caseManager.map((value, i) => (
                              <option key={i} value={`${value.id}`}>
                                {`${value.firstName} ${value.lastName}`}
                              </option>
                            ))}
                        </select>
                        {errors.caseManagerId !== "" ? (
                          <span className={classes.error}>
                            {errors.caseManagerId}
                          </span>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
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
                          value={assignedData.state}
                          style={{
                            border: "1px solid #014D88",
                            borderRadius: "0.2rem",
                          }}
                        >
                          <option value={""}></option>
                          {states.map((value) => (
                            <option
                              key={value.id}
                              value={`${value.id} ${value.name}`}
                            >
                              {value.name}
                            </option>
                          ))}
                        </select>
                        {errors.state !== "" ? (
                          <span className={classes.error}>{errors.state}</span>
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
                            <option key={index} value={value.name}>
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
                  </Row> */}
                </Form>
                <br />
                <br />
                {patient?.length > 0 ? (
                  <MatButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={assignCaseManager}
                  >
                    Confirm
                  </MatButton>
                ) : (
                  " "
                )}

                <MatButton
                  variant="contained"
                  color="default"
                  onClick={props.togglestatus}
                  className={classes.button}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </MatButton>
              </CardBody>
            </Card>
          </ModalBody>
        </Form>
      </Modal>
    </div>
  );
};

export default ReassignClientModal;

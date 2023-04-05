import React, { useEffect, useCallback, forwardRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import uniq from "lodash/uniq";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@mui/material/Container";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Button from "@mui/material/Button";
import ReassignClientModal from "./ReassignClientModal";
import axios from "axios";
import { toast } from "react-toastify";
import { token, url } from "../../../api";
import PageTitle from "../layouts/PageTitle";
import ButtonGroup from "@mui/material/ButtonGroup";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import MatButton from "@material-ui/core/Button";
import ReplyIcon from "@mui/icons-material/Reply";

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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

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
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { caseManager } = location.state;
  console.log(caseManager);
  const history = useHistory();
  const [addModal, setAddModal] = useState(false);
  const [patient, setPatient] = useState({});
  const classes = useStyles();
  const [assignedData, setAssignedData] = useState(caseManager);
  const [modal, setModal] = useState(false);

  const toggle = () => setAddModal(!addModal);

  const addCaseManager = () => {
    setAddModal(!addModal);
  };

  const toggleDelete = (id) => {
    localStorage.setItem("patientID", JSON.stringify(id));
    setModal(!modal);
  };

  const onCancelDelete = () => {
    setModal(false);
  };

  // const getCaseManagerPatients = async () => {
  //   await axios
  //     .get(`${url}casemanager/get/${caseManagerId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((resp) => {
  //       console.log(resp.data);
  //       setAssignedData(resp.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   getCaseManagerPatients();
  // }, []);

  const handleDelete = () => {
    const patientId = localStorage.getItem("patientID");
    axios
      .delete(`${url}assign/delete/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        localStorage.removeItem("patientID");
        Swal.fire({
          icon: "success",
          text: "Patient Unassigned Successfully",
          timer: 1500,
        });

        setModal(false);
        // getAllCaseManagers();
        history.push("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while deleting!!!",
        });
      });
  };

  const handlePatientChanges = (patient) => {
    console.log(patient);
    let patientArray = [];

    patient.forEach((patientChange) => {
      const {
        id,
        hospitalNo,
        fullName,
        sex,
        dob,
        age,
        biometricStatus,
        currentStatus,
      } = patientChange;
      patientArray.push({
        id,
        hospitalNo,
        fullName,
        sex,
        dob,
        age,
        biometricStatus,
        currentStatus,
      });
    });

    console.log(patientArray);
    localStorage.setItem("patient", JSON.stringify(patientArray));
  };

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
                  startIcon={<ReplyIcon />}
                  style={{ backgroundColor: "rgb(153, 46, 98)", color: "#fff" }}
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
                      value={assignedData.createDate}
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
                      value={`${assignedData.firstName}  ${assignedData.lastName}`}
                      id="caseManager"
                      className={classes.input}
                      disabled
                    />
                  </FormGroup>
                </Col>
              </Row>
              {/* <Row>
                <Col>
                  <FormGroup>
                    <Label className={classes.label}>State</Label>
                    <Input
                      type="text"
                      name="state"
                      id="state"
                      className={classes.input}
                      value={assignedData.state}
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
              </Row> */}
            </Form>
            <Row>
              <Col></Col>
              <Col></Col>
              <Col>
                <Button
                  variant="contained"
                  color="primary"
                  className="float-right mr-1"
                  startIcon={<PersonAddIcon />}
                  onClick={addCaseManager}
                  style={{
                    float: "right",
                    backgroundColor: "#014d88",
                    fontWeight: "bolder",
                    color: "fff",
                  }}
                >
                  <span style={{ textTransform: "capitalize" }}>Reassign </span>
                </Button>
              </Col>
              <br />
              <br />
              <MaterialTable
                icons={tableIcons}
                title="Enrolled Patients Assigned"
                columns={[
                  { title: "ID", field: "id" },
                  { title: "Hospital No", field: "hospitalNo" },
                  { title: "Full Name", field: "fullName" },
                  { title: "Sex", field: "sex" },
                  { title: "DOB", field: "dob" },
                  { title: "Age", field: "age" },
                  // { title: "Biometrics", field: "biometricStatus" },
                  // { title: "Enrolled Status", field: "currentStatus" },
                  { title: "", field: "assigned" },
                  { title: "Action", field: "actions" },
                ]}
                isLoading={loading}
                data={
                  assignedData &&
                  assignedData.patients.map((item) => ({
                    id: item.id,
                    hospitalNo: item.hospitalNo,
                    fullName: item.fullName,
                    sex: item.sex,
                    dob: item.dob,
                    age: item.age,
                    // biometricStatus: item.biometricStatus,
                    // currentStatus: item.currentStatus,
                    assigned: <Badge color="info">Assigned</Badge>,
                    actions: (
                      <>
                        <ButtonGroup
                          variant="contained"
                          aria-label="split button"
                          style={{
                            backgroundColor: "rgb(153, 46, 98)",
                            height: "30px",
                          }}
                          size="large"
                        >
                          {/* <Button
                            color="primary"
                            size="small"
                            aria-label="select merge strategy"
                            onClick={() => addCaseManager(item)}
                            style={{ backgroundColor: "rgb(153, 46, 98)" }}
                          >
                            <PersonAddIcon />
                          </Button> */}
                          <Button
                            color="primary"
                            size="small"
                            aria-label="select merge strategy"
                            onClick={() => {
                              toggleDelete(item.id);
                            }}
                            style={{ backgroundColor: "rgb(153, 46, 98)" }}
                          >
                            <PersonRemoveIcon />
                            <span style={{ textTransform: "capitalize" }}>
                              {" "}
                              Unassign
                            </span>
                          </Button>
                        </ButtonGroup>
                      </>
                    ),
                  }))
                }
                options={{
                  headerStyle: {
                    backgroundColor: "#014d88",
                    color: "#fff",
                    fontSize: "16px",
                    padding: "10px",
                  },
                  searchFieldStyle: {
                    width: "200%",
                    margingLeft: "250px",
                  },
                  selection: true,
                  filtering: false,
                  sorting: false,
                  exportButton: false,
                  searchFieldAlignment: "left",
                  searchAutoFocus: true,
                  searchFieldVariant: "filled",
                  pageSizeOptions: [10, 20, 50, 100],
                  pageSize: 10,
                  showFirstLastPageButtons: false,
                  debounceInterval: 400,
                }}
                onSelectionChange={(rows) => handlePatientChanges(rows)}
              />
            </Row>
          </CardBody>
        </Card>
      </Container>

      <ReassignClientModal
        modalstatus={addModal}
        togglestatus={toggle}
        // getAllCaseManagers={getAllCaseManagers}
      />
      <Modal isOpen={modal} toggle={onCancelDelete}>
        <ModalHeader toggle={onCancelDelete}>Remove Patient</ModalHeader>
        <ModalBody>Are you sure you want unassign this patient?</ModalBody>
        <ModalFooter>
          <Button color="primary" type="button" onClick={handleDelete}>
            Yes
          </Button>{" "}
          <Button
            color="secondary"
            type="button"
            onClick={(e) => onCancelDelete()}
          >
            No
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ViewAssignedClients;

import React, { useState, useEffect } from "react";
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import MatButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import UpdateIcon from "@mui/icons-material/Update";
import CancelIcon from "@material-ui/icons/Cancel";
import { Alert } from "reactstrap";
import { Spinner } from "reactstrap";
import axios from "axios";
import { token, url as baseUrl } from "../../../api";
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

const EditCaseManager = (props) => {
  const classes = useStyles();
  const [contactPhone, setContactPhone] = useState("");
  //console.log(props.casemanager);

  const [data, setData] = useState({
    designation: props.casemanager?.designation,
    firstName: props.casemanager?.firstName,
    lastName: props.casemanager?.lastName,
    sex: props.casemanager?.sex,
    phoneNumber: props.casemanager?.phoneNumber,
  });

  useEffect(() => {
    setData(props.casemanager);
  }, [props.casemanager]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const checkPhoneNumber = (e) => {
    setContactPhone(e);
  };

  const editCaseManager = async (e) => {
    e.preventDefault();

    //console.log("Edit data", data);
    data.phoneNumber = contactPhone;
    await axios
      .put(`${baseUrl}casemanager/update/${props.casemanager.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        console.log(resp);
        toast.success("Case manager updated successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong. Please try again... " + err.message);
      });
    props.getAllCaseManagers();
    props.togglestatus();
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
            Edit Case Manager
          </ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="courierRiderName" className={classes.label}>
                        Designation <span style={{ color: "red" }}> *</span>
                      </Label>
                      <Input
                        type="text"
                        name="designation"
                        id="designation"
                        value={data.designation}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="courierRiderName" className={classes.label}>
                        First Name <span style={{ color: "red" }}> *</span>
                      </Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={data.firstName}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="courierRiderName" className={classes.label}>
                        Last Name <span style={{ color: "red" }}> *</span>
                      </Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={data.lastName}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="sex" className={classes.label}>
                        Gender <span style={{ color: "red" }}> *</span>
                      </Label>
                      <select
                        className="form-control"
                        style={{
                          border: "1px solid #014d88",
                          borderRadius: "0px",
                          fontSize: "14px",
                          color: "#000",
                        }}
                        name="sex"
                        value={data.sex}
                        id="sex"
                        onChange={handleInputChange}
                      >
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="phoneNumber" className={classes.label}>
                        Phone Number <span style={{ color: "red" }}> *</span>
                      </Label>
                      <PhoneInput
                        containerStyle={{
                          width: "100%",
                          border: "1px solid #014d88",
                        }}
                        inputStyle={{
                          width: "100%",
                          borderRadius: "0px",
                          height: 44,
                        }}
                        country={"ng"}
                        masks={{ ng: "...-...-....", at: "(....) ...-...." }}
                        placeholder="(234)7099999999"
                        value={data.phoneNumber}
                        onChange={(e) => checkPhoneNumber(e)}
                      />
                      {/* <Input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={data.phoneNumber}
                        onChange={handleInputChange}
                        className="form-control"
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                      /> */}
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                <br />

                <MatButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<UpdateIcon />}
                  onClick={editCaseManager}
                >
                  Submit
                </MatButton>

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

export default EditCaseManager;

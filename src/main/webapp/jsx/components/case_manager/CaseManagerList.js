import React, { useEffect, useCallback, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RefreshIcon from "@mui/icons-material/Refresh";

import AddCaseManager from "./AddCaseManager";
import EditCaseManager from "./EditCaseManager";
import Swal from "sweetalert2";

import { MdDeleteForever, MdModeEdit } from "react-icons/md";

import SplitActionButton from "../layouts/SplitActionButton";

import { Badge, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "../layouts/sample.css";

import { forwardRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { token, url } from "../../../api";

import "@reach/menu-button/styles.css";
import { FaEye } from "react-icons/fa";

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
    display: "none",
  },
  error: {
    color: "#f85032",
    fontSize: "11px",
  },
  success: {
    color: "#4BB543 ",
    fontSize: "11px",
  },
}));

const CaseManagerList = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState("");
  const [permissions, setPermissions] = useState([]);
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [caseManager, setCaseManager] = useState({});
  const [caseManagers, setCaseManagers] = useState([]);

  const toggle = () => setAddModal(!addModal);

  const toggleEdit = () => setEditModal(!editModal);

  const toggleDelete = (id) => {
    localStorage.setItem("patientID", JSON.stringify(id));
    setModal(!modal);
  };

  const userPermission = () => {
    axios
      .get(`${url}account`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        //console.log("permission", response.data.permissions)
        setPermissions(response.data.permissions);
      })
      .catch((error) => {});
  };

  const addCaseManager = () => {
    setAddModal(!addModal);
  };

  const editCaseManager = (data) => {
    setCaseManager(data);
    setEditModal(!editModal);
  };

  const onCancelDelete = () => {
    setModal(false);
  };

  const getAllCaseManagers = () => {
    try {
      axios
        .get(`${url}casemanager/list`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => setCaseManagers(resp.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCaseManagers();
    //setLoading("true");
    //userPermission();
  }, []);

  const handleDelete = () => {
    const patientId = localStorage.getItem("patientID");
    axios
      .delete(`${url}casemanager/delete/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        localStorage.removeItem("patientID");
        Swal.fire({
          icon: "success",
          text: "Case Manager Deleted Successfully",
          timer: 1500,
        });

        setModal(false);
        getAllCaseManagers();
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

  const actionItems = (row) => {
    return [
      {
        name: "View",
        type: "link",
        icon: <FaEye size="22" />,
        to: {
          pathname: "/clients",
          state: { caseManager: row },
        },
      },
      {
        name: " Edit",
        type: "link",
        icon: <MdModeEdit size="20" color="rgb(4, 196, 217)" />,
        editAction: () => {
          editCaseManager(row);
        },
        to: {
          pathname: "/#",
          state: { patientObj: row },
        },
      },
      {
        name: " Delete",
        type: "link",
        icon: <MdDeleteForever size="20" color="rgb(4, 196, 217)" />,
        deleteAction: () => {
          toggleDelete(row.id);
        },
        to: {
          pathname: "/#",
          state: { patientObj: row },
        },
      },
      {
        name: " View Patients",
        type: "link",
        icon: <FaEye size="20" color="rgb(4, 196, 217)" />,
        to: {
          pathname: "/clients",
          state: { caseManager: row },
        },
      },
    ];
  };

  const handleChangePage = (page) => {
    setCurrentPage(page + 1);
  };

  const localization = {
    pagination: {
      labelDisplayedRows: `Page: ${currentPage}`,
    },
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className="float-right mr-1"
        startIcon={<RefreshIcon />}
        onClick={getAllCaseManagers}
        style={{
          float: "right",
          backgroundColor: "#014d88",
          fontWeight: "bolder",
          color: "fff",
          marginLeft: "10px",
        }}
      >
        <span style={{ textTransform: "capitalize" }}>Refresh </span>
      </Button>
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
        <span style={{ textTransform: "capitalize" }}>Add Case Manager </span>
      </Button>
      <br />
      <br />
      <br />
      <MaterialTable
        icons={tableIcons}
        title="Case Managers"
        columns={[
          { title: "Designation", field: "designation" },
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Gender", field: "gender" },
          { title: "Phone Number", field: "phoneNumber" },
          { title: "Religion", field: "religion" },
          { title: "Address", field: "address", hidden: true },
          { title: "Total Patients", field: "patients" },
          { title: "Action", field: "actions" },
        ]}
        isLoading={loading}
        data={
          caseManagers &&
          caseManagers.map((row) => ({
            designation: row.designation,
            firstName: row.firstName,
            lastName: row.lastName,
            gender: row.sex,
            phoneNumber: `+${row.phoneNumber}`,
            religion: row.religion,
            addCaseManager: row.addCase,
            patients: row.patients.length,
            actions: (
              <>
                <SplitActionButton actions={actionItems(row)} />
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
          selection: false,
          filtering: false,
          exportButton: false,
          searchFieldAlignment: "left",
          pageSizeOptions: [10, 20, 100],
          pageSize: 10,
          debounceInterval: 400,
        }}
        onChangePage={handleChangePage}
        localization={localization}
      />
      <AddCaseManager
        modalstatus={addModal}
        togglestatus={toggle}
        getAllCaseManagers={getAllCaseManagers}
      />
      <EditCaseManager
        modalstatus={editModal}
        togglestatus={toggleEdit}
        casemanager={caseManager}
        getAllCaseManagers={getAllCaseManagers}
      />
      <Modal isOpen={modal} toggle={onCancelDelete}>
        <ModalHeader toggle={onCancelDelete}>Delete Case Manager</ModalHeader>
        <ModalBody>Are you sure you want to delete this record?</ModalBody>
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

export default CaseManagerList;

import React, { useEffect, useCallback, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { FaEye, FaUserPlus } from "react-icons/fa";

import { forwardRef } from "react";
import axios from "axios";
import { token, url } from "../../../api";
import MaterialTable from "material-table";
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

const AssignedClients = (props) => {
  const [loading, setLoading] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patientArray, setPatientArray] = useState([]);
  const [totalPage, setTotalPage] = useState([]);

  const getCaseManagers = async () => {
    await axios
      .get(`${url}assign/list`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setTotalPage(response.data));
  };

  useEffect(() => {
    getCaseManagers();
  }, []);

  return (
    <div>
      <br />
      <MaterialTable
        icons={tableIcons}
        title="Case managers assigned to patients"
        columns={[
          { title: "Assigned Date", field: "assignDate" },
          { title: "Case Manager", field: "caseManager" },
          { title: "State", field: "state" },
          { title: "LGA", field: "lga" },
          { title: "Patients", field: "patients" },
          { title: "Actions", field: "actions", filtering: false },
        ]}
        isLoading={loading}
        data={
          totalPage &&
          totalPage.map((d) => ({
            assignDate: d.assignDate?.replace("T", " "),
            caseManager: d.caseManager,
            state: d.state?.split(" ")[1],
            lga: d.lga,
            patients: d.patients.length,
            actions: (
              <>
                <Link
                  to={{
                    pathname: "/clients",
                    state: { clients: d },
                  }}
                >
                  <ButtonGroup
                    variant="contained"
                    aria-label="split button"
                    style={{
                      backgroundColor: "rgb(153, 46, 98)",
                      height: "30px",
                      width: "215px",
                    }}
                    size="large"
                  >
                    <Button
                      color="primary"
                      size="small"
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      style={{ backgroundColor: "rgb(153, 46, 98)" }}
                    >
                      <MdDashboard size="20" color="#fff" />
                    </Button>
                    <Button style={{ backgroundColor: "rgb(153, 46, 98)" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#fff",
                          fontWeight: "bolder",
                        }}
                      >
                        View Patients
                      </span>
                    </Button>
                  </ButtonGroup>
                </Link>
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
          filtering: false,
          sorting: true,
          exportButton: false,
          searchFieldAlignment: "left",
          pageSizeOptions: [10, 20, 50, 100],
          pageSize: 10,
          showFirstLastPageButtons: false,
          debounceInterval: 400,
        }}
      />
    </div>
  );
};

export default AssignedClients;

import React, { useEffect, useCallback, useState } from "react";
import { Card } from "react-bootstrap";

import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import uniq from "lodash/uniq";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { forwardRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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

const PatientList = (props) => {
  const [loading, setLoading] = useState("");
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePatientRecords = (query) =>
    new Promise((resolve, reject) => {
      axios
        .get(
          `${url}hiv/patients?pageSize=${query.pageSize}&pageNo=${query.page}&searchValue=${query.search}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => response)
        .then((result) => {
          if (result.data.records === null) {
            resolve({
              data: [],
              page: 0,
              totalCount: 0,
            });
          } else {
            resolve({
              data: result.data.records.map((row) => ({
                hospitalNo: row.hospitalNumber,
                fullname: `${row.firstName} ${row.otherName} ${row.surname}`,
                sex: row.sex,
                dob: row.dateOfBirth,
                age: row.age,
                biometricStatus: row.biometricStatus,
                isEnrolled: row.isEnrolled,
                commenced: row.commenced,
                dateOfRegistration: row.dateOfRegistration,
                // actions: (
                //   <Link
                //     to={{
                //       pathname: "/patient-history",
                //       state: { patientObj: row },
                //     }}
                //   >
                //     <ButtonGroup
                //       variant="contained"
                //       aria-label="split button"
                //       style={{
                //         backgroundColor: "rgb(153, 46, 98)",
                //         height: "30px",
                //         width: "215px",
                //       }}
                //       size="large"
                //     >
                //       <Button
                //         color="primary"
                //         size="small"
                //         aria-label="select merge strategy"
                //         aria-haspopup="menu"
                //         style={{ backgroundColor: "rgb(153, 46, 98)" }}
                //       >
                //         <MdDashboard />
                //       </Button>
                //       <Button style={{ backgroundColor: "rgb(153, 46, 98)" }}>
                //         <span
                //           style={{
                //             fontSize: "12px",
                //             color: "#fff",
                //             fontWeight: "bolder",
                //           }}
                //         >
                //           Assign Manager
                //         </span>
                //       </Button>
                //     </ButtonGroup>
                //   </Link>
                // ),
              })),
              page: query.page,
              totalCount: result.data.totalRecords,
            });
          }
        });
    });

  useEffect(() => {}, []);

  const handlePatientChanges = (patient) => {
    let patientArray = [];

    let uniquePatients = uniq(patient).map((item) => {
      patientArray.push(item);
    });

    setPatients(patientArray);
    //localStorage.setItem("samples", JSON.stringify(samples));
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
    <div>
      <Card>
        <Card.Body>
          <Link
            to={{
              pathname: "/assign",
              state: { patients: patients },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              className="float-right mr-1"
              startIcon={<PersonAddIcon />}
              //onClick={addCaseManager}
              style={{
                float: "right",
                backgroundColor: "#014d88",
                fontWeight: "bolder",
                color: "fff",
              }}
            >
              <span style={{ textTransform: "capitalize" }}>
                Assign Case Manager{" "}
              </span>
            </Button>
          </Link>
          <br />
          <br />
          <br />
          <MaterialTable
            icons={tableIcons}
            title="Enrolled Clients"
            columns={[
              { title: "Hospital ID", field: "hospitalNo" },
              { title: "Full Name", field: "fullname" },
              { title: "Sex", field: "sex" },
              { title: "DOB", field: "dob" },
              { title: "Age", field: "age" },
              { title: "Biometrics", field: "biometricStatus" },
              { title: "Enrolled", field: "isEnrolled" },
              { title: "Commenced", field: "commenced" },
              { title: "Date Registered", field: "dateOfRegistration" },
              // { title: "Actions", field: "actions", filtering: false },
            ]}
            isLoading={loading}
            // data={handlePulledData}
            data={handlePatientRecords}
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
              exportButton: false,
              searchFieldAlignment: "left",
              pageSizeOptions: [10, 20, 50, 100],
              pageSize: 10,
              debounceInterval: 400,
            }}
            onSelectionChange={(rows) => handlePatientChanges(rows)}
            onChangePage={handleChangePage}
            localization={localization}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default PatientList;

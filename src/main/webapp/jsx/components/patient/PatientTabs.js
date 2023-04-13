import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PatientList from "./PatientList";
import AssignedClients from "./AssignedClients";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PatientTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant=""
        aria-label="clients"
      >
        <Tab label="Enrolled" {...a11yProps(0)} wrapped />
        <Tab label="Assigned" {...a11yProps(1)} wrapped />
      </Tabs>

      <TabPanel value={value} index={0}>
        <PatientList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AssignedClients />
      </TabPanel>
    </Box>
  );
}

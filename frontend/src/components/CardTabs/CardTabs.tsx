import React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CardWrapper } from "../StyledComponent/home";
import ToDoCard from "../ToDoCard/ToDoCard";
import { Task } from "../../type/type";
import "../../pages/home/home.css";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      className="tab-panel"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const CardTabs = ({
  todos,
  handleEdit,
  handleRemove,
  handleCompleted,
}: {
  todos: Task[];
  handleEdit: (uuid: string) => void;
  handleRemove: (uuid: string) => void;
  handleCompleted: (uuid: string, checked: boolean) => void;
}) => {
  const theme = useTheme();
  const [tabvalue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        border: "1px solid var(--text-color)",
        width: 500,
        marginTop: "50px",
      }}
      style={{ width: "100%" }}
    >
      <AppBar position="static">
        <Tabs
          value={tabvalue}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          sx={{
            background: "var(--tab-bar-color)",
            "& .MuiTabs-indicator": {
              backgroundColor: "#0fbc8f", // Custom color for selected tab underline
              height: "5px", // Adjust the height of the underline
            },
          }}
        >
          <Tab
            style={{ fontWeight: "bold" }}
            label="Not Completed Tasks"
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontWeight: "bold" }}
            label="Not Completed Important Tasks"
            {...a11yProps(1)}
          />
          <Tab
            style={{ fontWeight: "bold" }}
            label="Completed Tasks"
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={tabvalue} index={0} dir={theme.direction}>
        <CardWrapper>
          {Array.isArray(todos) &&
            todos
              .filter((item) => !item.completed)
              .map((item, index) => (
                <ToDoCard
                  key={index}
                  index={index}
                  {...item}
                  handleEdit={handleEdit}
                  handleRemove={handleRemove}
                  handleCompleted={handleCompleted}
                />
              ))}
        </CardWrapper>
      </TabPanel>
      <TabPanel value={tabvalue} index={1} dir={theme.direction}>
        <CardWrapper>
          {Array.isArray(todos) &&
            todos
              .filter((item) => item.important && !item.completed)
              .map((item, index) => (
                <ToDoCard
                  key={index}
                  index={index}
                  {...item}
                  handleEdit={handleEdit}
                  handleRemove={handleRemove}
                  handleCompleted={handleCompleted}
                />
              ))}
        </CardWrapper>
      </TabPanel>
      <TabPanel value={tabvalue} index={2} dir={theme.direction}>
        <CardWrapper>
          {Array.isArray(todos) &&
            todos
              .filter((item) => item.completed)
              .map((item, index) => (
                <ToDoCard
                  key={index}
                  index={index}
                  {...item}
                  handleEdit={handleEdit}
                  handleRemove={handleRemove}
                />
              ))}
        </CardWrapper>
      </TabPanel>
    </Box>
  );
};

export default CardTabs;

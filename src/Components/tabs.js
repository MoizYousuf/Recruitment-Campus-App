import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import UpdateInformation from "./updateinformation";
import TotalCompanies from "./totalCompanies";
import TotalJobs from "./jobs";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

export default class TabsWrappedLabel extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "two"
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div className={styles.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} centered>
            <Tab value="one" label="Update Information" />
            <Tab value="two" label="Jobs" />
            <Tab value="three" label="Total Company" />
          </Tabs>
        </AppBar>
        {value === "one" && (
          <TabContainer>
            <UpdateInformation />
          </TabContainer>
        )}
        {value === "two" && (
          <TabContainer>
            <TotalJobs />
          </TabContainer>
        )}
        {value === "three" && (
          <TabContainer>
            <TotalCompanies />
          </TabContainer>
        )}
      </div>
    );
  }
}

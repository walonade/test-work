import React from "react";
import { withRouter } from "react-router-dom";

export default withRouter(props => {
  const { history, location, match, staticContext, to, ...other } = props;
  return <span {...other} onClick={event => history.push(to)} />;
});

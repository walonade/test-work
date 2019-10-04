import React from "react";
import "./style.css";
import Header from "~con/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { routes } from "~r";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";

export default props => {
  let routesComponents = routes.map(route => {
    return (
      <Route
        path={route.url}
        component={route.component}
        exact={route.exact}
        key={route.url}
      />
    );
  });
  return (
    <>
      <Header/>
      <Switch>{routesComponents}</Switch>
    </>
  );
}

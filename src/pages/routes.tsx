import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RegistrationEnd } from "./RegistrationEnd";
import { Home } from "./Home";
import { Layout } from "../components/modules";

export function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/registration-end" component={RegistrationEnd} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

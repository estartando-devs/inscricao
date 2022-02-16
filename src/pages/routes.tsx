import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RegistrationEnd, Home } from ".";
import { Layout } from "../components/modules";

export default function Routes() {
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

import React from "react";
import { Route, useHistory } from "react-router-dom";

import { Layout } from "./components/Layout";
import { PartsList } from "./pages/PartsList";
import { PartView } from "./pages/PartView";
import { Plans } from "./pages/Plans";
import SourceManagement from "./pages/SourceManagement";

const Routes = () => {
  const nav = useHistory();
  return (
    <Layout>
      <Route
        exact
        path="/"
        component={() => {
          nav.push("/list/");
          return <div />;
        }}
      />
      <Route exact path="/list" component={() => <PartsList />} />
      <Route exact path="/source" component={() => <SourceManagement />} />
      <Route exact path="/plans" component={() => <Plans />} />
      <Route exact path="/part/:partSap" component={() => <PartView />} />
    </Layout>
  );
};

export default Routes;

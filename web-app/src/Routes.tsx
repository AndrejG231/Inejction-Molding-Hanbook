import React from "react";
import { Route } from "react-router-dom";

import { Layout } from "./components/Layout";
import { PartsList } from "./pages/PartsList";
import { PartView } from "./pages/PartView";

const Routes = () => {
  return (
    <Layout>
      <Route exact path="/list" component={() => <PartsList />} />
      <Route exact path="/part/:partSap" component={() => <PartView />} />
    </Layout>
  );
};

export default Routes;

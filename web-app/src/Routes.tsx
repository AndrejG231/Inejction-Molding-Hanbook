import React from "react";
import { Route } from "react-router-dom";

import { Layout } from "./components/Layout";
import { PartsList } from "./pages/PartsList";

const Routes = () => {
  return (
    <Layout>
      <Route exact path="/list" component={() => <PartsList />} />
    </Layout>
  );
};

export default Routes;

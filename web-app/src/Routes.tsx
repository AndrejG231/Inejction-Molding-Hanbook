import React from "react";
import { Layout } from "./components/Layout";
import { Route } from "react-router-dom";

const Routes = () => {
  return (
    <Layout>
      <Route exact path="/" component={() => <div>Hello</div>} />
    </Layout>
  );
};

export default Routes;

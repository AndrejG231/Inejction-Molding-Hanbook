import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { ReduxStore } from "./redux/reduxStore";

ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <Provider store={ReduxStore}>
        <Routes />
      </Provider>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);

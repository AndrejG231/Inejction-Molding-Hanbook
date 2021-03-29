import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { ReduxStore } from "./redux/reduxStore";

ReactDOM.render(
  <Provider store={ReduxStore}>
    <ChakraProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);

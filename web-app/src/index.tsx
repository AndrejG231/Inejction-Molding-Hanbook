import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";

import { ReduxStore } from "./redux/reduxStore";

const mainTheme = {
  ...theme,
  breakpoints: {
    sm: "0px",
    lg: "550px",
  },
};

ReactDOM.render(
  <ChakraProvider theme={mainTheme}>
    <BrowserRouter>
      <Provider store={ReduxStore}>
        <Routes />
      </Provider>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);

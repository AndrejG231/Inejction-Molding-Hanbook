import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);

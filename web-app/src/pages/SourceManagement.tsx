import React, { FC, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Button, Flex, Text, VStack } from "@chakra-ui/react";

import EditForm from "../components/SourceManagement/EditForm";
import MaterialSelect from "../components/SourceManagement/MaterialSelect";

import { materials } from "../private/data";

import {
  setEditMode,
  reloadCookies,
  setEditValues,
} from "../redux/SourceManagement/Actions";
import { SourceManagementStateT } from "../redux/SourceManagement/Reducer";
import { ReduxStoreT } from "../redux/reduxStore";

const defaultEditState = {
  name: "",
  material: "",
  info: "",
};

const StateToProps = (state: ReduxStoreT) => {
  return {
    state: state.sourceManagement,
  };
};

const DispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch: dispatch,
  };
};

interface SourceManagementProps {
  state: SourceManagementStateT;
  dispatch: (action: any) => void;
}

const SourceManagement: FC<SourceManagementProps> = ({ state, dispatch }) => {
  const { editMode, selectionMode, sources } = state;

  useEffect(() => {
    if (!editMode) {
      dispatch(reloadCookies());
    }
  }, [editMode, dispatch]);

  if (selectionMode) {
    return <MaterialSelect />;
  }

  if (editMode) {
    return <EditForm />;
  }

  return (
    <Flex alignItems="center" direction="column">
      <VStack w="100%" align="center">
        {sources.map((cookie, index) => {
          return (
            <Flex
              key={index}
              mt="10px"
              p="10px"
              direction="column"
              w="95%"
              border="2px solid teal"
              borderRadius="15px"
              background="blue.200"
              fontSize="24px"
              fontWeight="600"
              onClick={() => {
                dispatch(setEditMode(true));
                dispatch(
                  setEditValues({
                    name: cookie.name,
                    material: cookie.material,
                    info: cookie.info,
                  })
                );
              }}
            >
              <Flex justify="space-between" borderBottom="2px solid teal">
                <Text textAlign="left">{cookie.name}</Text>
                <Text textAlign="right">{cookie.info}</Text>
              </Flex>
              <Text textAlign="center" fontSize="16px">
                {cookie.material.startsWith("@m-")
                  ? materials[cookie.material.slice(3)].name
                  : cookie.material}
              </Text>
            </Flex>
          );
        })}
      </VStack>
      <Button
        m="auto"
        mt="10px"
        w="80%"
        colorScheme="teal"
        onClick={() => {
          dispatch(setEditMode(true));
          setEditValues(defaultEditState);
        }}
      >
        Add
      </Button>
    </Flex>
  );
};

export default connect(StateToProps, DispatchToProps)(SourceManagement);

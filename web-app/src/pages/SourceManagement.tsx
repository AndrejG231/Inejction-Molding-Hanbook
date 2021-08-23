import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Flex, Text, VStack } from "@chakra-ui/react";

import EditForm from "../components/SourceManagement/EditForm";
import MaterialSelect from "../components/SourceManagement/MaterialSelect";

import { materials } from "../data/data";

import {
  setEditMode,
  reloadCookies,
  setEditValues,
} from "../redux/SourceManagement/Actions";
import { ReduxStoreT } from "../redux/reduxStore";
import { editValuesT } from "../redux/SourceManagement/Reducer";

const defaultEditState = {
  name: "",
  material: "",
  info: "",
};



const SourceManagement: FC = () => {
  const dispatch = useDispatch();
  const { editMode, selectionMode, sources } = useSelector((state: ReduxStoreT) => ({
    editMode: state.sourceManagement.editMode,
    selectionMode: state.sourceManagement.selectionMode,
    sources: state.sourceManagement.sources,
  }));

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
        {sources.map((cookie: editValuesT, index: number) => {
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
                  ? materials[cookie.material.slice(3)]
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

export default SourceManagement;


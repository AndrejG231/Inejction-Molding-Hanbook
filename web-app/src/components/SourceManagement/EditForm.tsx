import React, { FC, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Flex, Input, Button, Spacer } from "@chakra-ui/react";

import { materials } from "../../private/data";

import {
  setEditMode,
  setEditValue,
  setMatSelMode,
} from "../../redux/SourceManagement/Actions";

import { ReduxStoreT } from "../../redux/reduxStore";
import { SourceManagementStateT } from "../../redux/SourceManagement/Reducer";
import { createCookie, clearCookie } from "../../utilities/manageCookie";

const StateToProps = (state: ReduxStoreT) => {
  return {
    editData: state.sourceManagement.editValues,
  };
};

const DispatchToProps = (dispatch: Dispatch) => {
  return {
    dispatch: dispatch,
  };
};

interface editFormProps {
  editData: SourceManagementStateT["editValues"];
  dispatch: Dispatch;
}

const EditForm: FC<editFormProps> = ({ editData, dispatch }) => {
  const [oldName] = useState(editData.name);
  return (
    <Flex direction="column" m="10px" align="center" h="90%">
      <Input
        fontSize="22px"
        h="48px"
        m="10px"
        isInvalid
        errorBorderColor="teal.400"
        bg="white"
        placeholder="Name"
        value={editData.name}
        onChange={(event) => dispatch(setEditValue("name", event.target.value))}
      />
      <Input
        fontSize="22px"
        h="48px"
        m="10px"
        mb="5px"
        isInvalid
        errorBorderColor="teal.400"
        bg="white"
        placeholder="Material"
        value={
          editData.material.startsWith("@m-")
            ? materials[editData.material.slice(3)].slice(0, 15) + "..."
            : editData.material
        }
        onChange={(event) =>
          dispatch(setEditValue("material", event.target.value))
        }
      />
      <Button
        fontSize="20px"
        w="60%"
        h="40px"
        mb="10px"
        mr="10px"
        ml="auto"
        colorScheme="teal"
        onClick={() => dispatch(setMatSelMode(true))}
      >
        Select
      </Button>
      <Input
        fontSize="22px"
        h="48px"
        m="10px"
        isInvalid
        errorBorderColor="teal.400"
        bg="white"
        placeholder="Info"
        value={editData.info}
        onChange={(event) => dispatch(setEditValue("info", event.target.value))}
      />
      <Button
        h="50px"
        mt="15px"
        w="80%"
        fontSize="22px"
        colorScheme="red"
        onClick={() => {
          clearCookie(`@mat-${oldName}`);
          dispatch(setEditMode(false));
        }}
      >
        Remove
      </Button>
      <Spacer />
      <Button
        h="50px"
        mb="10px"
        w="80%"
        fontSize="22px"
        colorScheme="yellow"
        onClick={() => dispatch(setEditMode(false))}
      >
        Cancel
      </Button>
      <Button
        fontSize="22px"
        h="50px"
        w="80%"
        colorScheme="green"
        onClick={() => {
          clearCookie(`@mat-${oldName}`);
          createCookie(
            `@mat-${editData.name}`,
            `${editData.material}@info@${editData.info}`
          );
          dispatch(setEditMode(false));
        }}
      >
        Save
      </Button>
    </Flex>
  );
};

export default connect(StateToProps, DispatchToProps)(EditForm);

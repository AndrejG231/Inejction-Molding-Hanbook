import React, { FC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Button, VStack, Text } from "@chakra-ui/react";

import { materials } from "../../data/data";

import {
  setEditValue,
  setMatSelMode,
} from "../../redux/SourceManagement/Actions";

const StateToProps = () => {
  return {};
};
const DispatchToProps = (dispatch: Dispatch) => {
  return {
    selectHandler: (item: string) => dispatch(setEditValue("material", item)),
    quitSelection: () => dispatch(setMatSelMode(false)),
  };
};

interface materialSelectProps {
  selectHandler: (item: string) => void;
  quitSelection: () => void;
}

const MaterialSelect: FC<materialSelectProps> = ({
  selectHandler,
  quitSelection,
}) => {
  return (
    <VStack my="10px">
      {Object.keys(materials).map((material, index) => {
        return (
          <Button
            w="90%"
            h="70px"
            fontSize="16px"
            colorScheme="blue"
            key={index}
            onClick={() => {
              selectHandler(`@m-${material}`);
              quitSelection();
            }}
          >
            <Text textAlign="center" fontSize="20px" whiteSpace="break-spaces">
              {materials[material]}
            </Text>
          </Button>
        );
      })}
      <Button
        w="80%"
        h="50px"
        onClick={() => quitSelection()}
        colorScheme="red"
      >
        Cancel
      </Button>
    </VStack>
  );
};

export default connect(StateToProps, DispatchToProps)(MaterialSelect);

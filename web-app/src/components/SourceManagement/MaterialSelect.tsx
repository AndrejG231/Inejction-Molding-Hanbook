import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Button, VStack, Text } from "@chakra-ui/react";

import { materials } from "../../data/data";

import {
  setEditValue,
  setMatSelMode,
} from "../../redux/SourceManagement/Actions";


const MaterialSelect: FC = () => {
  const dispatch = useDispatch()
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
              dispatch(setEditValue("material", `@m-${material}`));
              dispatch(setMatSelMode(false));
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
        onClick={() => dispatch(setMatSelMode(false))}
        colorScheme="red"
      >
        Cancel
      </Button>
    </VStack>
  );
};

export default MaterialSelect;

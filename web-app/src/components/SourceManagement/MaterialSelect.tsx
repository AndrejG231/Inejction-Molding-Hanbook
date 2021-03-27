import React, { FC } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
import { materials } from "../../private/data";
import { materialSelectProps } from "../../types/sourceManagementTypes";

export const MaterialSelect: FC<materialSelectProps> = ({ selectHandler }) => {
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
            onClick={() => selectHandler(`@m-${material}`)}
          >
            <Text textAlign="center" fontSize="20px" whiteSpace="break-spaces">
              {materials[material].name}
            </Text>
          </Button>
        );
      })}
      <Button
        w="80%"
        h="50px"
        onClick={() => selectHandler("")}
        colorScheme="red"
      >
        Cancel
      </Button>
    </VStack>
  );
};

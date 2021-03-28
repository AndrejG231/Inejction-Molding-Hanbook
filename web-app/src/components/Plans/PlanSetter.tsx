import { Flex, VStack, Button, Box } from "@chakra-ui/react";
import React, { FC } from "react";
import { materials } from "../../private/data";
import { numberObject } from "../../types/globalTypes";
import { planSetterProps } from "../../types/plansTypes";
import { PlanItem } from "./PlanItem";

export const PlanSetter: FC<planSetterProps> = ({ plan, enterEditMode }) => {
  const previous: numberObject = {};
  return (
    <Flex alignItems="center" direction="column">
      <VStack w="100%" align="center"></VStack>
      {plan
        .sort((a, b) => a.time - b.time)
        .map((swtch, index) => {
          const last = previous[swtch.mold];
          previous[swtch.mold] = swtch.nextForm;
          return <PlanItem key={index} swtch={swtch} previousForm={last} />;
        })}
      <Button
        m="auto"
        mt="10px"
        w="80%"
        colorScheme="teal"
        onClick={enterEditMode}
      >
        Add
      </Button>
    </Flex>
  );
};

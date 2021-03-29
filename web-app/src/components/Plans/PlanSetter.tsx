import { Flex, VStack, Button, Box } from "@chakra-ui/react";
import React, { FC } from "react";
import { materials } from "../../private/data";
import { numberObject } from "../../types/globalTypes";
import { switchT, editValues } from "../../types/plansTypes";
import { PlanItem } from "./PlanItem";

interface planSetterProps {
  plan: switchT[];
  enterEditMode: () => void;
  setEditValues: (editValues: editValues) => void;
}

export const PlanSetter: FC<planSetterProps> = ({
  plan,
  enterEditMode,
  setEditValues,
}) => {
  const previous: numberObject = {};
  return (
    <Flex alignItems="center" direction="column" pb="15px">
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

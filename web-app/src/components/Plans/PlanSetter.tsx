import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Button } from "@chakra-ui/react";

import PlanItem from "./PlanItem";

import { clearPlans, setEditMode } from "../../redux/Plans/Actions";

import { ReduxStoreT } from "../../redux/reduxStore";
import { numberObject } from "../../types/globalTypes";

export const PlanSetter: FC = () => {
  const {plan} = useSelector((state: ReduxStoreT) => ({plan: state.plans.plans}));
  const dispatch = useDispatch();
  const previous: numberObject = {};
  return (
    <Flex alignItems="center" direction="column" pb="15px">
      {plan.map((swtch, index) => {
        const last = previous[swtch.mold];
        previous[swtch.mold] = swtch.nextForm;
        return (
          <PlanItem
            index={index}
            key={index}
            swtch={swtch}
            previousForm={last}
          />
        );
      })}
      <Button
        m="auto"
        mt="10px"
        w="80%"
        colorScheme="teal"
        onClick={() => dispatch(setEditMode(true))}
      >
        Add
      </Button>
      <Button m="auto" mt="10px" w="80%" colorScheme="red" onClick={clearPlans}>
        Clear
      </Button>
    </Flex>
  );
};

export default PlanSetter;

import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Flex, Button } from "@chakra-ui/react";

import PlanItem from "./PlanItem";

import { clearPlans, setEditMode } from "../../redux/Plans/Actions";

import { editValuesT } from "../../redux/Plans/Reducer";
import { ReduxStoreT } from "../../redux/reduxStore";
import { numberObject } from "../../types/globalTypes";

const StateToProps = (state: ReduxStoreT) => {
  return {
    plan: state.plans.plans,
  };
};

const DispatchToProps = (dispatch: Dispatch) => {
  return {
    enterEditMode: () => dispatch(setEditMode(true)),
    clearPlans: () => dispatch(clearPlans()),
  };
};

interface planSetterProps {
  plan: editValuesT[];
  enterEditMode: () => void;
  clearPlans: () => void;
}

export const PlanSetter: FC<planSetterProps> = ({
  plan,
  enterEditMode,
  clearPlans,
}) => {
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
        onClick={enterEditMode}
      >
        Add
      </Button>
      <Button m="auto" mt="10px" w="80%" colorScheme="red" onClick={clearPlans}>
        Clear
      </Button>
    </Flex>
  );
};

export default connect(StateToProps, DispatchToProps)(PlanSetter);

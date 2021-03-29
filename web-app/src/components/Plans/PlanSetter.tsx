import { Flex, VStack, Button, Box } from "@chakra-ui/react";
import React, { FC } from "react";
import { ReduxStoreT } from "../../redux/reduxStore";
import { numberObject } from "../../types/globalTypes";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { PlanItem } from "./PlanItem";
import { setEditMode, setEditValues } from "../../redux/Plans/Actions";
import { editValuesT } from "../../redux/Plans/Reducer";

const StateToProps = (state: ReduxStoreT) => {
  return {
    plan: state.plans.plans,
  };
};

const DispatchToProps = (dispatch: Dispatch) => {
  return {
    enterEditMode: () => dispatch(setEditMode(true)),
  };
};

interface planSetterProps {
  plan: editValuesT[];
  enterEditMode: () => void;
}

export const PlanSetter: FC<planSetterProps> = ({ plan, enterEditMode }) => {
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

export default connect(StateToProps, DispatchToProps)(PlanSetter);

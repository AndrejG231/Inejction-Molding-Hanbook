import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ReduxStoreT } from "../../redux/reduxStore";
import { editValuesT } from "../../redux/Plans/Reducer";
import { getMaxMin } from "../../utilities/getMaxMin";
import { Flex } from "@chakra-ui/react";

const StateToProps = (state: ReduxStoreT) => {
  return { plan: state.plans.plans };
};

const DispatchToProps = (dispatch: Dispatch) => {
  return {};
};

interface MaterialFlowProps {
  plan: editValuesT[];
}

const MaterialFlow: FC<MaterialFlowProps> = ({ plan }) => {
  const { min } = getMaxMin(plan, "time");
  const materials = "";
  const startTime = min - (min % (8 * 60 * 60 * 1000)) + 4 * 60 * 60 * 1000;
  const endTime = startTime + 8 * 60 * 60 * 1000;
  return (
    <Flex h="100%" w="100%" justify="space-evenly">
      
    </Flex>
  );
};

export default connect(StateToProps, DispatchToProps)(MaterialFlow);

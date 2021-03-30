import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ReduxStoreT } from "../../redux/reduxStore";
import { getMaxMin } from "../../utilities/getMaxMin";
import { editValuesT } from "../../redux/Plans/Reducer";
import { Box } from "@chakra-ui/react";

const StateToProps = (state: ReduxStoreT) => {
  return {
    plans: state.plans.plans,
  };
};

const DispatchToProps = (dispatch: Dispatch) => {
  return {};
};

interface VisualProps {
  plans: editValuesT[];
}

const Visual: FC<VisualProps> = ({ plans }) => {
  const { max, min } = getMaxMin(plans, "time");
  return (
    <Box h="80%" w="90%">
      {max}
      {min}
    </Box>
  );
};

export default connect(StateToProps, DispatchToProps)(Visual);

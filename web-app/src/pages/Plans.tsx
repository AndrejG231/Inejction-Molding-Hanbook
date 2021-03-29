import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Box } from "@chakra-ui/react";

import { WithNavbar } from "../components/WithNavbar";
import PlansEdit from "../components/Plans/PlansEdit";
import PlanSetter from "../components/Plans/PlanSetter";

import { editValuesT } from "../redux/Plans/Reducer";
import { storeEdits } from "../redux/Plans/Actions";
import { ReduxStoreT } from "../redux/reduxStore";

const navItems = ["visual", "flow", "manage"];

const StateToProps = (state: ReduxStoreT) => {
  return {
    editMode: state.plans.editMode,
    plans: state.plans.plans,
  };
};

const DispatchToProps = (dispatch: Dispatch) => {
  return { updateCookie: () => dispatch(storeEdits()) };
};

interface PlansProps {
  editMode: boolean;
  plans: editValuesT[];
  updateCookie: () => void;
}

const Plans: FC<PlansProps> = ({ editMode, plans, updateCookie }) => {
  const [navigation, setNavigation] = useState(navItems[0]);

  useEffect(() => {
    updateCookie();
  }, [plans, updateCookie]);

  if (editMode) {
    return <PlansEdit />;
  }

  return (
    <WithNavbar
      navItems={navItems}
      selectedItem={navigation}
      menuSelector={(item) => setNavigation(item)}
    >
      <Box overflowY="auto" flex={1}>
        {navigation === "manage" ? <PlanSetter /> : null}
      </Box>
    </WithNavbar>
  );
};

export default connect(StateToProps, DispatchToProps)(Plans);

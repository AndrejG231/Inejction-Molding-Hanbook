import React, { FC, useState } from "react";
import { useSelector } from "react-redux";

import { Box } from "@chakra-ui/react";

import { WithNavbar } from "../components/WithNavbar";
import PlansEdit from "../components/Plans/PlansEdit";
import PlanSetter from "../components/Plans/PlanSetter";

import { ReduxStoreT } from "../redux/reduxStore";
import Visual from "../components/Plans/Visual";
import MaterialFlow from "../components/Plans/MaterialFlow";

const navItems = ["visual", "flow", "manage"];


const Plans: FC = () => {
  const {editMode} = useSelector((state: ReduxStoreT) => ({ editMode: state.plans.editMode}));
  const [navigation, setNavigation] = useState(navItems[0]);

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
        {navigation === "visual" ? <Visual /> : null}
        {navigation === "flow" ? <MaterialFlow /> : null}
      </Box>
    </WithNavbar>
  );
};

export default Plans;

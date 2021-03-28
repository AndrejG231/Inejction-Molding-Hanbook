import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PlansEdit } from "../components/Plans/PlansEdit";
import { PlanSetter } from "../components/Plans/PlanSetter";
import { WithNavbar } from "../components/WithNavbar";
import { getPlanFromCookie } from "../utilities/getPlanFromCooke";
import { getTime } from "../utilities/getTime";

const navItems = ["visual", "flow", "manage"];

const defaultEditState = {
  mold: "",
  previous: "",
  nextForm: "",
};

export const Plans = () => {
  const [navigation, setNavigation] = useState(navItems[0]);
  const [plans, setPlans] = useState(getPlanFromCookie());
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState({
    ...defaultEditState,
    time: getTime(),
  });

  const saveEdits = () => {
    if (editValues.mold && editValues.nextForm) {
      setEditValues({ ...defaultEditState, time: editValues.time + 30 });
      setPlans([...plans, editValues]);
    }
  };

  useEffect(() => {
    document.cookie = `@plan=${JSON.stringify(plans)}`;
  }, [plans]);

  if (editMode) {
    return (
      <PlansEdit
        setEditValues={setEditValues}
        values={editValues}
        saveEdits={saveEdits}
        setEditMode={setEditMode}
      />
    );
  }

  return (
    <WithNavbar
      navItems={navItems}
      selectedItem={navigation}
      menuSelector={(item) => setNavigation(item)}
    >
      <Box overflowY="auto" flex={1}>
        {navigation === "manage" ? (
          <PlanSetter
            plan={plans}
            setEditValues={setEditValues}
            enterEditMode={() => {
              setEditMode(true);
            }}
          />
        ) : null}
      </Box>
    </WithNavbar>
  );
};

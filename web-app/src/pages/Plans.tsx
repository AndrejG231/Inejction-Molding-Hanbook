import { Box, Button, Center } from "@chakra-ui/react";
import React, { FC, ReactChild, useState } from "react";
import { PlansEdit } from "../components/Plans/PlansEdit";
import { PlanSetter } from "../components/Plans/PlanSetter";
import { WithNavbar } from "../components/WithNavbar";
import { getPlanFromCookie } from "../utilities/getPlanFromCooke";

const navItems = ["visual", "flow", "manage"];

const defaultEditState = {
  mold: "",
  time: -1,
  nextForm: -1,
};

export const Plans = () => {
  const [navigation, setNavigation] = useState(navItems[0]);
  const [plans, setPlans] = useState(getPlanFromCookie());
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState(defaultEditState);

  const saveEdits = () => {
    setPlans([...plans, editValues]);
    setEditMode(false);
  };

  if (editMode) {
    return (
      <PlansEdit
        setEditValues={setEditValues}
        values={editValues}
        saveEdits={saveEdits}
      />
    );
  }

  return (
    <WithNavbar
      navItems={navItems}
      selectedItem={navigation}
      menuSelector={(item) => setNavigation(item)}
    >
      <Box overflowY="scroll" flex={1}>
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

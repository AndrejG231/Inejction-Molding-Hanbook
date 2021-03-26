import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import {
  EditForm,
  MaterialSelect,
} from "../components/SourceManagementComponents";
import { editStateType } from "../types/sourceManagementTypes";
import { parseMaterialCookies } from "../utilities/parseCookies";

const defaultEditState = {
  name: "",
  material: "",
  info: "",
};

export const SourceManagement: FC = () => {
  const [cookies, setCookies] = useState(parseMaterialCookies());
  const [editMode, setEditMode] = useState(false);
  const [matSelMode, setMatSelMode] = useState(false);
  const [editValues, setEditValues] = useState<editStateType>(defaultEditState);

  const submitDataEdit = () => {
    document.cookie = `@mat-${editValues.name}=${editValues.material}@info@${editValues.info}`;
    setEditMode(false);
    setCookies(parseMaterialCookies());
  };

  const handleMaterialSelect = (material: string) => {
    setEditValues({ ...editValues, material: `@m-${material}` });
    setMatSelMode(false);
  };

  if (matSelMode) {
    return <MaterialSelect selectHandler={handleMaterialSelect} />;
  }

  if (editMode) {
    return (
      <EditForm
        editData={editValues}
        setEditData={setEditValues}
        handleSubmit={() => submitDataEdit()}
        setMatSelect={() => setMatSelMode(true)}
      />
    );
  }

  return (
    <div>
      {cookies.map((cookie) => {
        return (
          <div>
            {cookie.name},<br />
            {cookie.material}, <br />
            {cookie.info}
          </div>
        );
      })}
      <Button
        colorScheme="teal"
        onClick={() => {
          setEditMode(true);
          setEditValues(defaultEditState);
        }}
      >
        Add
      </Button>
    </div>
  );
};

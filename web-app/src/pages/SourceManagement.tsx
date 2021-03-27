import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { EditForm } from "../components/SourceManagement/EditForm";
import { MaterialSelect } from "../components/SourceManagement/MaterialSelect";
import { materials } from "../private/data";
import { editStateType } from "../types/sourceManagementTypes";
import { parseMaterialCookies } from "../utilities/parseMaterialCookies";

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
    document.cookie = `@mat-${editValues.name}=${editValues.material}@info@${editValues.info};expires=Fri, 31 Dec 9999 23:59:59 GMT";`;
    setEditMode(false);
  };

  const handleMaterialSelect = (material: string) => {
    setEditValues({ ...editValues, material: material });
    setMatSelMode(false);
  };

  useEffect(() => {
    if (!editMode) {
      setCookies(parseMaterialCookies);
    }
  }, [setCookies, editMode]);

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
        endEditMode={() => {
          setEditMode(false);
        }}
      />
    );
  }

  return (
    <Flex alignItems="center" direction="column">
      <VStack w="100%" align="center">
        {cookies.map((cookie, index) => {
          return (
            <Flex
              key={index}
              mt="10px"
              p="10px"
              direction="column"
              w="95%"
              border="2px solid teal"
              borderRadius="15px"
              background="blue.200"
              fontSize="24px"
              fontWeight="600"
              onClick={() => {
                setEditMode(true);
                setEditValues({
                  name: cookie.name,
                  material: cookie.material,
                  info: cookie.info,
                });
              }}
            >
              <Flex justify="space-between" borderBottom="2px solid teal">
                <Text textAlign="left">{cookie.name}</Text>
                <Text textAlign="right">{cookie.info}</Text>
              </Flex>
              <Text textAlign="center" fontSize="16px">
                {cookie.material.startsWith("@m-")
                  ? materials[cookie.material.slice(3)].name
                  : cookie.material}
              </Text>
            </Flex>
          );
        })}
      </VStack>
      <Button
        m="auto"
        mt="10px"
        w="80%"
        colorScheme="teal"
        onClick={() => {
          setEditMode(true);
          setEditValues(defaultEditState);
        }}
      >
        Add
      </Button>
    </Flex>
  );
};

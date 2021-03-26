import React, { FC } from "react";
import { Flex, Input, Button, VStack, Center } from "@chakra-ui/react";
import { editFormProps } from "../types/sourceManagementTypes";
import { materials } from "../private/data";

export const EditForm: FC<editFormProps> = ({
  editData,
  setEditData,
  handleSubmit,
  setMatSelect,
}) => {
  console.log(editData.material);
  return (
    <Flex direction="column">
      <Input
        placeholder="Name"
        value={editData.name}
        onChange={(event) =>
          setEditData({ ...editData, name: event.target.value })
        }
      />
      <Input
        placeholder="Material"
        value={
          editData.material.startsWith("@m-")
            ? materials[editData.material.slice(3)].name.slice(0, 15) + "..."
            : editData.material
        }
        onChange={(event) =>
          setEditData({ ...editData, material: event.target.value })
        }
      />
      <Button onClick={setMatSelect}>Select</Button>
      <Input
        placeholder="Info"
        value={editData.info}
        onChange={(event) =>
          setEditData({ ...editData, info: event.target.value })
        }
      />
      <Button onClick={handleSubmit}></Button>
    </Flex>
  );
};

export const MaterialSelect: FC<any> = ({ selectHandler }) => {
  return (
    <VStack>
      {Object.keys(materials).map((material, index) => {
        return (
          <Center key={index} onClick={() => selectHandler(material)}>
            {materials[material].name}
          </Center>
        );
      })}
    </VStack>
  );
};

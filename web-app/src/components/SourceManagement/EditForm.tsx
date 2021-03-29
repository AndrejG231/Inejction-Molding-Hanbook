import { Flex, Input, Button, Spacer } from "@chakra-ui/react";
import React, { FC } from "react";
import { materials } from "../../private/data";
import { onClick } from "../../types/globalTypes";
import { editStateType } from "../../types/sourceManagementTypes";

interface editFormProps {
  editData: editStateType;
  setEditData: (editData: editStateType) => void;
  handleSubmit: onClick<HTMLButtonElement>;
  setMatSelect: () => void;
  endEditMode: () => void;
};

export const EditForm: FC<editFormProps> = ({
  editData,
  setEditData,
  handleSubmit,
  setMatSelect,
  endEditMode,
}) => {
  return (
    <Flex direction="column" m="10px" align="center" h="90%">
      <Input
        fontSize="22px"
        h="48px"
        m="10px"
        isInvalid
        errorBorderColor="teal.400"
        bg="white"
        placeholder="Name"
        value={editData.name}
        onChange={(event) =>
          setEditData({ ...editData, name: event.target.value })
        }
      />
      <Input
        fontSize="22px"
        h="48px"
        m="10px"
        mb="5px"
        isInvalid
        errorBorderColor="teal.400"
        bg="white"
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
      <Button
        fontSize="20px"
        w="60%"
        h="40px"
        mb="10px"
        mr="10px"
        ml="auto"
        colorScheme="teal"
        onClick={setMatSelect}
      >
        Select
      </Button>
      <Input
        fontSize="22px"
        h="48px"
        m="10px"
        isInvalid
        errorBorderColor="teal.400"
        bg="white"
        placeholder="Info"
        value={editData.info}
        onChange={(event) =>
          setEditData({ ...editData, info: event.target.value })
        }
      />
      <Button
        h="50px"
        mt="15px"
        w="80%"
        fontSize="22px"
        colorScheme="red"
        onClick={() => {
          endEditMode();
          document.cookie = `@mat-${editData.name}=none;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        }}
      >
        Remove
      </Button>
      <Spacer />
      <Button
        h="50px"
        mb="10px"
        w="80%"
        fontSize="22px"
        colorScheme="yellow"
        onClick={endEditMode}
      >
        Cancel
      </Button>
      <Button
        fontSize="22px"
        h="50px"
        w="80%"
        colorScheme="green"
        onClick={handleSubmit}
      >
        Save
      </Button>
    </Flex>
  );
};

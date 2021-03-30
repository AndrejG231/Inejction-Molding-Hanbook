import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";

import { imms } from "../../private/data";
import {
  saveEdits,
  setEditMode,
  setEditValues,
} from "../../redux/Plans/Actions";
import { editValuesT } from "../../redux/Plans/Reducer";
import { ReduxStoreT } from "../../redux/reduxStore";

const keys = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["C", "0", "<"],
];

const StateToProps = (state: ReduxStoreT) => {
  return {
    values: state.plans.editValues,
  };
};

const DispatchToProps = (dispatch: Dispatch) => {
  return {
    setEditValues: (editValues: editValuesT) =>
      dispatch(setEditValues(editValues)),
    setEditMode: (mode: boolean) => dispatch(setEditMode(mode)),
    saveEdits: () => dispatch(saveEdits()),
  };
};

interface plansEditProps {
  values: editValuesT;
  setEditValues: (editValues: editValuesT) => void;
  setEditMode: (mode: boolean) => void;
  saveEdits: () => void;
}

export const PlansEdit: FC<plansEditProps> = ({
  values,
  setEditValues,
  setEditMode,
  saveEdits,
}) => {
  const [selected, setSelected] = useState<"nextForm" | "previous">("nextForm");
  const handleClick = (number: string) => {
    if (number === "<") {
      return setEditValues({
        ...values,
        [selected]: values[selected].slice(0, -1),
      });
    }

    if (number === "C") {
      return setEditValues({
        ...values,
        [selected]: "",
      });
    }
    return setEditValues({ ...values, [selected]: values[selected] + number });
  };
  return (
    <Flex py="5px" h="100%" direction="column">
      <Flex h="100%">
        <VStack mx="5px" my="20px" spacing="auto">
          {Object.keys(imms).map((imm, index) => {
            return (
              <Button
                key={index}
                colorScheme={values.mold === imm ? "red" : "linkedin"}
                onClick={() => setEditValues({ ...values, mold: imm })}
                fontSize="22px"
              >
                {imm}
              </Button>
            );
          })}
        </VStack>
        <Flex direction="column" justify="space-evenly" align="stretch">
          <Box>
            <Heading mb="15px" textAlign="center">
              Time:
            </Heading>
            <HStack p="7px" borderRadius="10px" h="50px" bg="teal" w="100%">
              <Button
                onClick={() =>
                  setEditValues({ ...values, time: values.time - 30 })
                }
              >
                -30
              </Button>
              <Input
                bg="white"
                value={`${Math.floor(values.time / 60)}:${
                  values.time % 60 >= 10
                    ? values.time % 60
                    : "0" + (values.time % 60)
                }`}
                textAlign="center"
                onChange={() => null}
              />
              <Button
                onClick={() =>
                  setEditValues({ ...values, time: values.time + 30 })
                }
              >
                +30
              </Button>
            </HStack>
          </Box>
          <Flex direction="column" align="center">
            <Heading mb="15px" textAlign="center">
              Previous:
            </Heading>
            <Button
              onClick={() => setSelected("previous")}
              colorScheme={selected === "previous" ? "red" : "teal"}
              w="80%"
            >
              {values.previous}
            </Button>
          </Flex>
          <Flex direction="column" align="center">
            <Heading mb="15px" textAlign="center">
              Next:
            </Heading>
            <Button
              colorScheme={selected === "nextForm" ? "red" : "teal"}
              w="80%"
              m="auto"
              onClick={() => setSelected("nextForm")}
            >
              {values.nextForm}
            </Button>
          </Flex>
          <Flex direction="column" align="center">
            <Flex direction="column" p="5px">
              {keys.map((row, i) => {
                return (
                  <Flex w="100%">
                    {row.map((number, index) => {
                      return (
                        <Button
                          onClick={() => handleClick(number)}
                          key={index * (i + 1)}
                          m="5px"
                          w="65px"
                          h="50px"
                        >
                          {number}
                        </Button>
                      );
                    })}
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <VStack spacing="5px" justify="stretch" align="stretch" p="10px">
        <Button colorScheme="red" onClick={() => setEditMode(false)}>
          Cancel
        </Button>
        <Button colorScheme="yellow" onClick={() => saveEdits()}>
          Save & Next
        </Button>
        <Button
          colorScheme="green"
          onClick={() => {
            saveEdits();
            setEditMode(false);
          }}
        >
          Save
        </Button>
      </VStack>
    </Flex>
  );
};

export default connect(StateToProps, DispatchToProps)(PlansEdit);

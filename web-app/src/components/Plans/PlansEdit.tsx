import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";

import {
  deleteSwitch,
  saveEdits,
  setEditMode,
  setEditValues,
} from "../../redux/Plans/Actions";
import { ReduxStoreT } from "../../redux/reduxStore";

import { msToDisplay } from "../../utilities/msToDisplay";
import { useImms } from "../../data/hooks";
import { DataError, DataLoading } from "../DataHandlers";

const keys = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["C", "0", "<"],
];

export const PlansEdit: FC = () => {
  const imms = useImms();
  const [selected, setSelected] = useState<"nextForm" | "previous">("nextForm");

  const { values } = useSelector((state: ReduxStoreT) => ({
    values: state.plans.editValues,
  }));
  const dispatch = useDispatch();

  // Handle key pressed on screen or keyboard
  const handleClick = useCallback(
    (number: string) => {
      if (number === "<") {
        return dispatch(
          setEditValues({
            ...values,
            [selected]: values[selected].slice(0, -1),
          })
        );
      }

      if (number === "C") {
        return dispatch(
          setEditValues({
            ...values,
            [selected]: "",
          })
        );
      }
      return dispatch(
        setEditValues({ ...values, [selected]: values[selected] + number })
      );
    },
    [selected, values, dispatch]
  );

  // Keyboard only inputs handle
  const handleKeyInput = useCallback(
    (e: KeyboardEvent) => {
      if (
        [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "Backspace",
          "Escape",
        ].includes(e.key)
      ) {
        const key =
          e.key === "Backspace" ? "<" : e.key === "Escape" ? "C" : e.key;
        return handleClick(key);
      }
      if (e.key === "Tab") {
        e.preventDefault();
        return selected === "nextForm"
          ? setSelected("previous")
          : setSelected("nextForm");
      }
    },
    [handleClick, selected, setSelected]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyInput);
    return () => document.removeEventListener("keydown", handleKeyInput);
  }, [handleKeyInput]);

  // data load handlers
  if (!imms) {
    return <DataLoading />;
  }

  if (imms === "error") {
    return <DataError />;
  }

  return (
    <Flex w="100%" h="100%" direction="row">
      {/* IMM SELECTION */}
      <VStack mx="5px" my="20px" spacing="auto">
        {Object.keys(imms).map((imm, index) => {
          return (
            <Button
              key={index}
              colorScheme={values.mold === imm ? "red" : "linkedin"}
              onClick={() => dispatch(setEditValues({ ...values, mold: imm }))}
              fontSize="22px"
            >
              {imm}
            </Button>
          );
        })}
      </VStack>
      <Flex w="100%" py="5px" h="100%" direction={{ sm: "column", lg: "row" }}>
        {/* Main Editor content */}
        <Flex
          direction="column"
          justify="space-evenly"
          align="stretch"
          ml="auto"
        >
          <Box>
            <Heading mb="15px" textAlign="center">
              Time:
            </Heading>
            <HStack p="7px" borderRadius="10px" h="50px" bg="teal" w="100%">
              <Button
                onClick={() =>
                  dispatch(
                    setEditValues({
                      ...values,
                      time: values.time - 30 * 60 * 1000,
                    })
                  )
                }
              >
                -30
              </Button>
              <Input
                bg="white"
                value={msToDisplay(values.time)}
                textAlign="center"
                onChange={() => null}
              />
              <Button
                onClick={() =>
                  dispatch(
                    setEditValues({
                      ...values,
                      time: values.time + 30 * 60 * 1000,
                    })
                  )
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
                  <Flex w="100%" key={i}>
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
        {/* FINISHING ACTION BUTTONS */}
        <VStack
          spacing="5px"
          justify="stretch"
          align="stretch"
          p="10px"
          display={{ sm: "flex", lg: "none" }}
        >
          <Flex
            w="100%"
            justify="stretch"
            direction={{ sm: "row", lg: "column" }}
          >
            <Button
              flex={1}
              colorScheme="red"
              onClick={() => {
                dispatch(deleteSwitch());
                dispatch(setEditMode(false));
              }}
            >
              Remove
            </Button>
            <Box w="5px" />
            <Button
              flex={1}
              colorScheme="orange"
              onClick={() => dispatch(setEditMode(false))}
            >
              Cancel
            </Button>
          </Flex>
          <Button
            colorScheme="yellow"
            onClick={() => {
              dispatch(deleteSwitch());
              dispatch(saveEdits());
            }}
          >
            Save & Next
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              dispatch(deleteSwitch());
              dispatch(saveEdits());
              dispatch(setEditMode(false));
            }}
          >
            Save
          </Button>
        </VStack>
        {/* Finishing action buttons bigscreen */}
        <Flex
          mr="15px"
          ml="auto"
          h="100%"
          direction="column"
          display={{ sm: "none", lg: "flex" }}
        >
          <Button
            my="10px"
            flex={1}
            colorScheme="red"
            onClick={() => {
              dispatch(deleteSwitch());
              dispatch(setEditMode(false));
            }}
          >
            Remove
          </Button>
          <Button
            flex={1}
            my="10px"
            colorScheme="orange"
            onClick={() => dispatch(setEditMode(false))}
          >
            Cancel
          </Button>
          <Button
            flex={1}
            my="10px"
            colorScheme="yellow"
            onClick={() => {
              dispatch(deleteSwitch());
              dispatch(saveEdits());
            }}
          >
            Save & Next
          </Button>
          <Button
            my="10px"
            flex={1}
            colorScheme="green"
            onClick={() => {
              dispatch(deleteSwitch());
              dispatch(saveEdits());
              dispatch(setEditMode(false));
            }}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PlansEdit;

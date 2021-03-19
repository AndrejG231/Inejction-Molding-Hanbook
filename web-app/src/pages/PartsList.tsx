import React, { ChangeEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Flex,
  Button,
  Box,
  VStack,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import partsJson from "../private/parts.json";
import { useHistory } from "react-router-dom";

const parts: any = partsJson;

const NavItems = ["Mold", "Category", "IMM", "Material"];

export const PartsList = () => {
  const nav = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const [searchRegExp, setSearchRegExp] = useState(new RegExp(""));

  useEffect(() => {
    setSearchRegExp(new RegExp(searchInput, "gi"));
  }, [searchInput, setSearchRegExp]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <Flex direction="column" h="100%" maxH="100%">
      <InputGroup colorScheme="blue">
        <InputLeftElement pointerEvents="none">
          <FaSearch />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search.."
          focusBorderColor="blue.500"
          errorBorderColor="blue.300"
          value={searchInput}
          onChange={handleSearchChange}
          isInvalid
        />
      </InputGroup>
      <Box flex={1} overflowY="scroll">
        <VStack my="20px">
          {Object.keys(parts)
            .sort((a, b) => parts[a].HIT - parts[b].HIT)
            .map((part, index) => {
              if (!searchRegExp.test(parts[part].desc)) {
                return null;
              }
              return (
                <Center
                  key={index}
                  h="60px"
                  w="80%"
                  bg="cyan.300"
                  border="2px solid blue"
                  p="20px"
                  textAlign="center"
                  fontSize="17px"
                  fontFamily="Times new roman"
                  borderRadius="10px"
                  fontWeight="700"
                  onClick={() => nav.push(`/part/${part}`)}
                >
                  {parts[part].desc}
                </Center>
              );
            })}
        </VStack>
      </Box>
      <Flex justify="space-evenly" py="2px" bg="cyan.400">
        {NavItems.map((item, index) => {
          return (
            <Button
              isActive={false}
              _focus={{ boxShadow: "none" }}
              fontSize="14px"
              textTransform="capitalize"
              flex={1}
              mx="5px"
              key={index}
            >
              {item}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};

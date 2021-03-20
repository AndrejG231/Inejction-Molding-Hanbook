import React, { ChangeEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Flex,
  Button,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { PartListDisplay } from "../components/PartListComponents";
import { PartListTypes } from "../types/partListTypes";


const NavItems: PartListTypes[] = ["mold", "category", "imm", "material"];

export const PartsList = () => {
  const [listType, setListType] = useState<PartListTypes>("mold");
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
        <PartListDisplay variant={listType} search={searchRegExp} />
      </Box>
      <Flex justify="space-evenly" py="2px" bg="cyan.200">
        {NavItems.map((item, index) => {
          return (
            <Button
              isActive={false}
              _focus={{ boxShadow: "none" }}
              fontSize="14px"
              textTransform="capitalize"
              colorScheme={item === listType ? "facebook" : "linkedin"}
              flex={1}
              mx="5px"
              key={index}
              onClick={() => setListType(item)}
            >
              {item}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};

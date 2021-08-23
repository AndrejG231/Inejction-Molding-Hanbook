import React, { ChangeEvent, useEffect, useState } from "react";

import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

import { WithNavbar } from "../components/WithNavbar";
import { PartListDisplay } from "../components/PartList/PartListDisplay";

const NavItems = ["mold", "category", "imm", "material"];

export const PartsList = () => {
  const [listType, setListType] = useState("mold");
  const [searchInput, setSearchInput] = useState("");
  const [searchRegExp, setSearchRegExp] = useState(new RegExp(""));

  useEffect(() => {
    setSearchRegExp(new RegExp(searchInput, "gi"));
  }, [searchInput, setSearchRegExp]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <WithNavbar
      navItems={NavItems}
      menuSelector={(item) => setListType(item)}
      selectedItem={listType}
    >
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
        {/* DIFFERENT LISTS OF PARTS DISPLAY BASED ON SPECIFIED PAGE */}
        <PartListDisplay variant={listType} search={searchRegExp} />
      </Box>
    </WithNavbar>
  );
};

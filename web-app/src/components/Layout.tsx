import React, { FC, useEffect } from "react";
import { BsListTask } from "react-icons/bs";
import { FaSourcetree } from "react-icons/fa";
import { BiMapAlt } from "react-icons/bi";
import { LayoutProps } from "../types/layoutTypes";
import { useHistory, useLocation } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";

//
const NavItems: { [key in string]: any } = {
  list: BsListTask,
  source: FaSourcetree,
  plans: BiMapAlt,
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const nav = useHistory();
  const location = useLocation();

  return (
    <Flex maxH="100vh" h="100vh" bg="cyan.100" direction="column">
      <Box h="95%" overflowY="auto">
        {children}
      </Box>
      <Flex
        justify="space-evenly"
        py="4px"
        px="5px"
        bg="cyan.300"
        h="7%"
        align="center"
      >
        {Object.keys(NavItems).map((item, index) => {
          const Icon = NavItems[item];
          return (
            <Button
              isActive={false}
              _focus={{ boxShadow: "none" }}
              leftIcon={<Icon />}
              fontSize="15px"
              textTransform="capitalize"
              colorScheme={location.pathname === `/${item}/` ? "red" : "blue"}
              flex={1}
              mx="8px"
              key={index}
              onClick={() => nav.push(`/${item}/`)}
            >
              {item}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};

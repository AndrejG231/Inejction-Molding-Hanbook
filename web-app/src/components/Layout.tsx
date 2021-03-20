import React, { FC, useEffect } from "react";
import { BsListTask } from "react-icons/bs";
import { FaSourcetree } from "react-icons/fa";
import { BiMapAlt } from "react-icons/bi";
import { LayoutProps } from "../types/layoutTypes";
import { useHistory } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";

//
const NavItems: { [key in string]: any } = {
  list: BsListTask,
  source: FaSourcetree,
  plans: BiMapAlt,
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [navRoute, setNavRoute] = React.useState("list");
  const nav = useHistory();

  useEffect(() => {
    nav.push(`/${navRoute}/`);
  }, [navRoute, nav]);

  return (
    <Flex maxH="100vh" h="100vh" bg="cyan.100" direction="column">
      <Box h="95%" maxH="93%">
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
              fontSize="5vw"
              textTransform="capitalize"
              colorScheme={navRoute === item ? "red" : "blue"}
              flex={1}
              mx="8px"
              key={index}
              onClick={() => setNavRoute(item)}
            >
              {item}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};

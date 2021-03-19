import React, { FC, useEffect } from "react";
import { BsListTask } from "react-icons/bs";
import { FaSourcetree } from "react-icons/fa";
import { BiMapAlt } from "react-icons/bi";
import { LayoutProps, NavRouteChangeHandle } from "../types/layoutTypes";
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

  const handleRouteChange: NavRouteChangeHandle = (nextRoute) => {
    setNavRoute(nextRoute);
  };

  useEffect(() => {
    nav.push(`/${navRoute}/`);
  }, [navRoute, nav]);

  return (
    <Flex h="100vh" bg="cyan.100" direction="column">
      <Box flex={1}>
        <Box minH="100%" maxH="100%" bg="cyan.100" overflowY="scroll">
          {children}
        </Box>
      </Box>
      <Flex justify="space-evenly" py="4px" bg="cyan.300">
        {Object.keys(NavItems).map((item, index) => {
          const Icon = NavItems[item];
          return (
            <Button
              isActive={false}
              _focus={{ boxShadow: "none" }}
              leftIcon={<Icon />}
              fontSize="24px"
              textTransform="capitalize"
              colorScheme={navRoute === item ? "red" : "blue"}
              flex={1}
              mx="5px"
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

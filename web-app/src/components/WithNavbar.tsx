import { Flex, Button } from "@chakra-ui/react";
import React, { FC } from "react";
import { WithNavbarProps } from "../types/withNavbarTypes";

export const WithNavbar: FC<WithNavbarProps> = ({
  children,
  navItems,
  menuSelector = () => null,
  selectedItem,
}) => {
  return (
    <Flex direction="column" h="100%" maxH="100%">
      {children}
      <Flex justify="space-evenly" py="2px" bg="cyan.200">
        {navItems.map((item, index) => {
          return (
            <Button
              isActive={false}
              _focus={{ boxShadow: "none" }}
              fontSize="14px"
              textTransform="capitalize"
              colorScheme={item === selectedItem ? "facebook" : "linkedin"}
              flex={1}
              mx="5px"
              key={index}
              onClick={() => menuSelector(item)}
            >
              {item}
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
};

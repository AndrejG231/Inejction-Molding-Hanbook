import { Center } from "@chakra-ui/react";
import React, { FC } from "react";
import { CategoryProps } from "../../types/partListTypes";

export const PartCategory: FC<CategoryProps> = ({ children, onClick }) => {
  return (
    <Center
      h="60px"
      w="90%"
      bg="cyan.500"
      border="2px solid blue"
      p="20px"
      textAlign="center"
      fontSize="17px"
      fontFamily="Times new roman"
      borderRadius="10px"
      fontWeight="700"
      onClick={onClick}
    >
      {children}
    </Center>
  );
};

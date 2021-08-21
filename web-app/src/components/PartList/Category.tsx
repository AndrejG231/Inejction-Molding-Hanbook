import React, { FC } from "react";
import { Center } from "@chakra-ui/react";

import { onClick } from "../../types/globalTypes";

interface CategoryProps {
  children: string;
  onClick: onClick<HTMLDivElement>;
}

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
      cursor="pointer"
      onClick={onClick}
    >
      {children}
    </Center>
  );
};

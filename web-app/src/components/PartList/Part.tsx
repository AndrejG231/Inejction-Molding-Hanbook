import { Center } from "@chakra-ui/react";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { parts } from "../../private/data";

interface PartProps {
  part: string;
}

export const Part: FC<PartProps> = ({ part }) => {
  const nav = useHistory();
  return (
    <Center
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
      {parts[part].description}
    </Center>
  );
};

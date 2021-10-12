import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import { useParts } from "../../data/hooks";
import { DataError, DataLoading } from "../DataHandlers";

interface PartProps {
  partIndex: number;
}

export const Part: FC<PartProps> = ({ partIndex }) => {
  const nav = useHistory();
  const parts = useParts();

  if (!parts) {
    return <DataLoading />;
  }

  if (parts === "error") {
    return <DataError />;
  }

  return (
    <Center
      cursor="pointer"
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
      onClick={() => nav.push(`/part/${partIndex}`)}
    >
      {parts[partIndex].moldNumber}-{parts[partIndex].description}
    </Center>
  );
};

import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";

export const PlanItem: FC<any> = ({ swtch, previousForm }) => {
  return (
    <Flex w="100%" justify="space-evenly">
      <Box>{swtch.time}</Box>
      <Box>{swtch.mold}</Box>
      <Box>{previousForm ? previousForm : "xx"}</Box>
      <Box>{swtch.nextForm}</Box>
    </Flex>
  );
};

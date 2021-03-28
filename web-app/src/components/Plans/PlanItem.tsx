import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaCheckDouble } from "react-icons/fa";
import { IoMdArrowRoundForward } from "react-icons/io";

export const PlanItem: FC<any> = ({ swtch, previousForm }) => {
  return (
    <Flex
      m="auto"
      my="10px"
      bg="teal.200"
      borderTop="2px solid teal"
      borderLeft="2px solid teal"
      borderBottom="2px solid teal"
      borderRight="2px solid teal"
      borderRadius="15px"
      w="90%"
      justify="space-between"
      h="70px"
      align="center"
    >
      <Button
        h="100%"
        w="60px"
        colorScheme="linkedin"
        borderLeftRadius="14px"
        clipPath="polygon(0 0, 100% 0, 50% 100%, 0% 100%)"
        pl="10px"
        pb="20px"
        fontSize="25px"
      >
        <AiFillEdit />
      </Button>
      <Flex color="white" fontSize="32px" fontWeight="700" direction="column">
        <Text mb="5px">
          {Math.floor(swtch.time / 60)}:
          {swtch.time % 60 > 10 ? swtch.time % 60 : "00"}
        </Text>
        <Text
          borderTop="2px solid teal"
          fontSize="18px"
          h="20px"
          transform="translateY(-12px)"
          textAlign="center"
        >
          {swtch.mold.slice(3)}
        </Text>
      </Flex>
      <Button
        h="100%"
        width="5px"
        clipPath="polygon(50% 0, 100% 0, 50% 100%, 0% 100%)"
        colorScheme="linkedin"
        borderRadius="0"
      />
      <Flex
        flex={1}
        px="5px"
        h="80%"
        justify="space-between"
        direction="column"
      >
        <Box
          h="50%"
          w="100%"
          textAlign="left"
          fontSize="22px"
          fontWeight="600"
          color="white"
          transform="translateY(-5px)"
        >
          {previousForm ? previousForm : swtch.previous}
        </Box>
        <Flex h="0" justify="center" align="center">
          <IoMdArrowRoundForward color="white" size="30px" />
        </Flex>
        <Box
          h="50%"
          w="100%"
          textAlign="right"
          fontSize="22px"
          fontWeight="600"
          color="white"
        >
          {swtch.nextForm}
        </Box>
      </Flex>
      <Button
        h="100%"
        w="60px"
        colorScheme="linkedin"
        borderRightRadius="14px"
        clipPath="polygon(50% 0, 100% 0, 100% 100%, 0% 100%);"
        pt="10px"
        pl="20px"
        fontSize="25px"
      >
        <FaCheckDouble />
      </Button>
    </Flex>
  );
};

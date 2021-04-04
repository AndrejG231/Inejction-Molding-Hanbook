import React from "react";
import { useHistory, useParams } from "react-router-dom";

import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { TiArrowBack } from "react-icons/ti";

import { parts, materials } from "../private/data";
import { parseMaterialCookies } from "../utilities/parseMaterialCookies";
import { toMaterialSources } from "../utilities/toMaterialSources";

export const PartView = () => {
  const nav = useHistory();
  const { partSap } = useParams() as { partSap: string };
  const materialSources = toMaterialSources(parseMaterialCookies());
  return (
    <Flex
      direction="column"
      justify="space-between"
      align="center"
      py="15px"
      h="100%"
    >
      <Heading size="lg" textAlign="center">
        {parts[partSap].description}
      </Heading>
      <Heading size="md" w="90%" textAlign="center">
        Molds:
      </Heading>
      {parts[partSap].molds.map((mold) => {
        return (
          <Flex bg="teal.300" p="15px" w="93%" borderRadius="10px">
            <Heading size="sm" mr="auto">
              {mold.imm}
            </Heading>
            <Heading size="sm" ml="auto">
              {mold.cycleTime}
            </Heading>
          </Flex>
        );
      })}
      <Heading size="md" w="90%" textAlign="center">
        Materials:
      </Heading>
      {parts[partSap].materials.map((material) => {
        return (
          <Flex
            bg="teal.300"
            p="7px"
            w="93%"
            borderRadius="10px"
            direction="column"
          >
            <Heading size="sm" m="auto" textAlign="center">
              {materials[material.sap]}
            </Heading>
            {materialSources[material.sap] ? (
              <Flex
                p="5px"
                w="90%"
                borderTop="2px solid teal"
                m="auto"
                fontSize="18px"
              >
                <Text mr="auto">
                  {material.volume}%<br />
                  {material.portion}g
                </Text>
                <Text>
                  |<br />|
                </Text>
                <Text ml="auto" textAlign="right">
                  {materialSources[material.sap].name}
                  <br />
                  {materialSources[material.sap].info}
                </Text>
              </Flex>
            ) : (
              <Flex
                p="5px"
                w="90%"
                borderTop="2px solid teal"
                m="auto"
                fontSize="22px"
                justify="space-between"
              >
                <Text>{material.volume}%</Text>
                <Text>{material.portion}g</Text>
              </Flex>
            )}
          </Flex>
        );
      })}
      <Button
        colorScheme="teal"
        fontSize="21px"
        px="50px"
        leftIcon={<TiArrowBack />}
        onClick={() => nav.goBack()}
      >
        BACK
      </Button>
    </Flex>
  );
};

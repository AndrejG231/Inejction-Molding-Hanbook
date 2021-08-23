import React, { FC, useMemo } from "react";
import { editValuesT } from "../../redux/Plans/Reducer";
import { getMaxMin } from "../../utilities/getMaxMin";
import { Text, Box, Center, Flex } from "@chakra-ui/react";
import { materials } from "../../data/data";
import { plansToMaterials } from "../../utilities/plansToMaterials";
import { getShift } from "../../utilities/getShift";
import { ReduxStoreT } from "../../redux/reduxStore";
import { useSelector } from "react-redux";
import { msToDisplay } from "../../utilities/msToDisplay";

const colors = ["LawnGreen", "aqua", "DarkOrchid", "Gold", "Chartreuse", "Red"];

const MaterialFlow: FC = () => {
  const {plan} = useSelector((state: ReduxStoreT) => ({
    plan: state.plans.plans
  }))
  const { min } = getMaxMin(plan, "time");
  const { startTime, endTime } = getShift(min);
  const materialPlan = useMemo(() => plansToMaterials(plan, endTime), [plan, endTime]);
  return (
    <Flex
      h="100%"
      w={`${Object.keys(materialPlan).length * 165}px`}
      justify="space-evenly"
    >
      {Object.keys(materialPlan).map((mat, index) => {
        return (
          <Box
            key={index}
            h="98%"
            w="160px"
            m="5px"
            direction="column"
            bg="teal.200"
            borderRadius="10px"
          >
            <Center
              bg="teal.500"
              w="100%"
              h="16%"
              borderRadius="10px"
              color="white"
              textAlign="center"
            >
              <Text>{materials[mat] ?? "Unknown"}</Text>
            </Center>
            <Box w="100%" h="84%" position="relative" overflow="hidden">
              {materialPlan[mat].map((swtch, index) => {
                return (
                  <Flex
                    w="100%"
                    bg={colors[index]}
                    key={index}
                    position="absolute"
                    direction="row"
                    justify="space-between"
                    fontSize="10px"
                    color="white"
                    p="2px"
                    top={`${
                      ((swtch.start - startTime) / (30 * 60 * 1000)) *
                      (100 / 16) 
                    }%`}
                    h={`${
                      ((swtch.end - swtch.start) / (30 * 60 * 1000)) *
                      (100 / 16) 
                    }%`}
                  >
                    <Text fontSize="22px">{swtch.volume}</Text>
                      <Text fontSize="15px">
                        {msToDisplay(swtch.start)}
                        -{msToDisplay(swtch.end)}
                      </Text>
                  </Flex>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Flex>
  );
};

export default MaterialFlow;

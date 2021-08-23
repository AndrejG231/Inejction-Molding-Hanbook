import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ReduxStoreT } from "../../redux/reduxStore";
import { getMaxMin } from "../../utilities/getMaxMin";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { plansToImms } from "../../utilities/planToImms";
import { switchPerMolds } from "../../types/globalTypes";
import { getShift } from "../../utilities/getShift";
import { msToDisplay } from "../../utilities/msToDisplay";

const colors = ["LawnGreen", "aqua", "DarkOrchid", "Gold", "Chartreuse", "Red"];

const Visual: FC = () => {
  const {plans} = useSelector((state: ReduxStoreT) => ({
    plans: state.plans.plans
  }))
  const { min } = getMaxMin(plans, "time");
  const immPlans = plansToImms(plans);

  const { startTime, endTime } = getShift(min);
  return (
    <Flex h="100%" w="max-content">
      {Object.keys(immPlans)
        .sort((a, b) => ~~a - ~~b)
        .map((imm, index) => {
          return (
            <Flex
              key={index}
              direction="column"
              m="10px"
              h={{ sm: "800px", lg: "95%" }}
              w={{ sm: "70px", lg: "120px" }}
              bg="lightblue"
              position="relative"
            >
              <Heading
                color="white"
                h="50px"
                textAlign="center"
                bg="teal"
                p="5px"
              >
                {imm}
              </Heading>
              <Box position="relative" h="100%" overflow="hidden">
                {immPlans[imm].map((swtch: switchPerMolds, index) => {
                  if (swtch.time > endTime) {
                    return null;
                  }
                  return (
                    <Flex
                      position="absolute"
                      top={`${
                        ((swtch.time - startTime) / (30 * 60 * 1000)) *
                        (100 / 17)
                      }%`}
                      left="0"
                      right="0"
                      h={`${100 / 8.5}%`}
                      textAlign="center"
                      fontSize="18px"
                      key={index}
                      direction={{ sm: "column", lg: "row" }}
                      bg={colors[index % colors.length]}
                      align="center"
                      justify="space-between"
                      p="5px"
                    >
                      <Text fontWeight="700">
                        {msToDisplay(swtch.time)}
                      </Text>
                      <Text fontSize="30px">{swtch.nextForm}</Text>
                    </Flex>
                  );
                })}
              </Box>
            </Flex>
          );
        })}
    </Flex>
  );
};

export default Visual;

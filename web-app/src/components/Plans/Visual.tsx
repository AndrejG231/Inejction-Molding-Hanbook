import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ReduxStoreT } from "../../redux/reduxStore";
import { getMaxMin } from "../../utilities/getMaxMin";
import { editValuesT } from "../../redux/Plans/Reducer";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { plansToImms } from "../../utilities/planToImms";
import { switchPerMolds } from "../../types/globalTypes";

const StateToProps = (state: ReduxStoreT) => {
  return {
    plans: state.plans.plans,
  };
};

const DispatchToProps = (dispatch: Dispatch) => {
  return {};
};

interface VisualProps {
  plans: editValuesT[];
}

const colors = ["LawnGreen", "aqua", "DarkOrchid", "Gold", "Chartreuse", "Red"];

const Visual: FC<VisualProps> = ({ plans }) => {
  const { min } = getMaxMin(plans, "time");
  const immPlans = plansToImms(plans);
  const time = new Date(min);
  let startTime = min;

  for (const t of [6, 14, 22]) {
    time.setHours(t);
    if (time.getTime() <= min) {
      startTime = time.getTime();
    } else {
      console.log(time.getTime(), "is not bigger than", min);
    }

    console.log(new Date(startTime).toLocaleTimeString());
  }

  const endTime = startTime + 7.5 * 60 * 60 * 1000;
  return (
    <Flex h="100%" w={`${Object.keys(immPlans).length * 75}px`}>
      {Object.keys(immPlans)
        .sort((a, b) => ~~a.slice(3) - ~~b.slice(3))
        .map((imm, index) => {
          return (
            <Flex
              key={index}
              direction="column"
              m="10px"
              h="95%"
              w="70px"
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
                {imm.slice(3)}
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
                      direction="column"
                      bg={colors[index]}
                    >
                      <Text fontWeight="700">
                        {new Date(swtch.time).toLocaleTimeString().slice(0, 5)}
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

export default connect(StateToProps, DispatchToProps)(Visual);

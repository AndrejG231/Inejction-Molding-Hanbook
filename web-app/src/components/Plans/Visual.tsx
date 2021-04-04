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
  const startTime = min - (min % (8 * 60 * 60 * 1000)) + 4 * 60 * 60 * 1000;
  const endTime = startTime + 8 * 60 * 60 * 1000;
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
              {immPlans[imm].map((swtch: switchPerMolds, index) => {
                if (swtch.time > endTime) {
                  return null;
                }
                return (
                  <Flex
                    position="absolute"
                    top={`${
                      ((swtch.time - startTime) / (30 * 60 * 1000)) * (100 / 18)
                    }%`}
                    left="0"
                    right="0"
                    h={`${100 / 9}%`}
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
            </Flex>
          );
        })}
    </Flex>
  );
};

export default connect(StateToProps, DispatchToProps)(Visual);

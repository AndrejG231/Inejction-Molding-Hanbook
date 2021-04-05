import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ReduxStoreT } from "../../redux/reduxStore";
import { editValuesT } from "../../redux/Plans/Reducer";
import { getMaxMin } from "../../utilities/getMaxMin";
import { Text, Box, Center, Flex } from "@chakra-ui/react";
import { materials } from "../../private/data";
import { plansToMaterials } from "../../utilities/plansToMaterials";
import { getShift } from "../../utilities/getShift";

const StateToProps = (state: ReduxStoreT) => {
  return { plan: state.plans.plans };
};

const DispatchToProps = (dispatch: Dispatch) => {
  return {};
};

interface MaterialFlowProps {
  plan: editValuesT[];
}

const colors = ["LawnGreen", "aqua", "DarkOrchid", "Gold", "Chartreuse", "Red"];

const MaterialFlow: FC<MaterialFlowProps> = ({ plan }) => {
  const { min } = getMaxMin(plan, "time");
  const { startTime, endTime } = getShift(min);
  const materialPlan = plansToMaterials(plan, endTime);
  return (
    <Flex
      h="100%"
      w={`${Object.keys(materialPlan).length * 105}px`}
      justify="space-evenly"
    >
      {Object.keys(materialPlan).map((mat, index) => {
        return (
          <Flex
            key={index}
            h="98%"
            w="100px"
            m="5px"
            direction="column"
            bg="teal.200"
            borderRadius="10px"
          >
            <Center
              bg="teal.500"
              w="100%"
              h="8%"
              borderRadius="10px"
              color="white"
              textAlign="center"
            >
              <Text>{materials[mat]?.slice(0, 10) ?? "Unknown"}</Text>
            </Center>
            <Box w="100%" h="92%" position="relative">
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
                    top={`${
                      ((swtch.start - startTime) / (30 * 60 * 1000)) *
                      (100 / 17)
                    }%`}
                    h={`${
                      ((swtch.end - swtch.start) / (30 * 60 * 1000)) *
                      (100 / 17)
                    }%`}
                  >
                    <Text>
                      {new Date(swtch.start).toLocaleTimeString().slice(0, 5)}
                    </Text>
                    <Text>{swtch.use}</Text>
                    <Text>
                      {new Date(swtch.end).toLocaleTimeString().slice(0, 5)}
                    </Text>
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

export default connect(StateToProps, DispatchToProps)(MaterialFlow);

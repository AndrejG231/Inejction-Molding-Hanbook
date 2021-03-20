import React, { FC } from "react";
import { Center, VStack } from "@chakra-ui/react";

import partsJson from "../private/parts.json";
import projectsJson from "../private/projects.json";
import pressesJson from "../private/presses.json";
import materialsJson from "../private/materials.json";

import { useHistory } from "react-router-dom";
import {
  partsJsonTypes,
  partsMaterialTypes,
  partsMoldTypes,
  partsProjectTypes,
} from "../types/jsonTypes";
import {
  PartProps,
  PartListProps,
  CategoryProps,
} from "../types/partListTypes";

const parts: partsJsonTypes = partsJson;
const categories: partsProjectTypes = projectsJson;
const imms: partsMoldTypes = pressesJson;
const materials: partsMaterialTypes = materialsJson;

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

export const PartCategory: FC<CategoryProps> = ({ children }) => {
  return (
    <Center
      h="60px"
      w="90%"
      bg="cyan.500"
      border="2px solid blue"
      p="20px"
      textAlign="center"
      fontSize="17px"
      fontFamily="Times new roman"
      borderRadius="10px"
      fontWeight="700"
    >
      {children}
    </Center>
  );
};
// const getList = () => {
//   const list: any = {};
//   Object.keys(oParts).forEach((part) => {
//     if (list.hasOwnProperty(oParts[part].project)) {
//       list[oParts[part].project].push(part);
//     } else {
//       list[oParts[part].project] = [part];
//     }
//   });

//   return list;
// };

export const PartListDisplay: FC<PartListProps> = ({ variant, search }) => {
  switch (variant) {
    case "category":
      return (
        <VStack my="20px">
          {Object.keys(categories).map((category, index) => {
            return (
              <VStack key={index} w="100%">
                <PartCategory>{category}</PartCategory>
                {categories[category].map((part, index) => {
                  if (search && !search.test(parts[part].description)) {
                    return null;
                  }
                  return <Part part={part} key={index} />;
                })}
              </VStack>
            );
          })}
        </VStack>
      );

    case "imm":
      return (
        <VStack my="20px">
          {Object.keys(imms).map((imm, index) => {
            return (
              <VStack key={index} w="100%">
                <PartCategory>{imm}</PartCategory>
                {imms[imm].map((part, index) => {
                  if (search && !search.test(parts[part.sap].description)) {
                    return null;
                  }
                  return <Part part={part.sap} key={index} />;
                })}
              </VStack>
            );
          })}
        </VStack>
      );
    case "material":
      return (
        <VStack my="20px">
          {Object.keys(materials).map((material, index) => {
            return (
              <VStack key={index} w="100%">
                <PartCategory>{materials[material].name}</PartCategory>
                {materials[material].parts.map((part, index) => {
                  if (search && !search.test(parts[part.sap].description)) {
                    return null;
                  }
                  return <Part part={part.sap} key={index} />;
                })}
              </VStack>
            );
          })}
        </VStack>
      );
    default:
      return (
        <VStack my="20px">
          {Object.keys(parts)
            .sort((a, b) => parts[a].moldNumber - parts[b].moldNumber)
            .map((part, index) => {
              if (search && !search.test(parts[part].description)) {
                return null;
              }
              return <Part part={part} key={index} />;
            })}
        </VStack>
      );
  }
};

import React, { FC, useState } from "react";
import { Center, VStack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { parts, materials, categories, imms } from "../private/data";

import {
  PartProps,
  PartListProps,
  CategoryProps,
} from "../types/partListTypes";
import { booleanObject } from "../types/globalTypes";

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

export const PartCategory: FC<CategoryProps> = ({ children, onClick }) => {
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
      onClick={onClick}
    >
      {children}
    </Center>
  );
};

export const PartListDisplay: FC<PartListProps> = ({ variant, search }) => {
  const [openedCategories, setOpenedCategories] = useState<booleanObject>({});

  const handleCategoryOpen = (category: string) => () => {
    setOpenedCategories({
      ...openedCategories,
      [category]: openedCategories[category] ? false : true,
    });
  };

  switch (variant) {
    case "category":
      return (
        <VStack my="20px">
          {Object.keys(categories).map((category, index) => {
            return (
              <VStack key={index} w="100%">
                <PartCategory onClick={handleCategoryOpen(category)}>
                  {category}
                </PartCategory>
                {openedCategories[category]
                  ? categories[category].map((part, index) => {
                      if (search && !search.test(parts[part].description)) {
                        return null;
                      }
                      return <Part part={part} key={index} />;
                    })
                  : null}
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
                <PartCategory onClick={handleCategoryOpen(imm)}>
                  {imm}
                </PartCategory>
                {openedCategories[imm]
                  ? imms[imm].map((part, index) => {
                      if (search && !search.test(parts[part].description)) {
                        return null;
                      }
                      return <Part part={part} key={index} />;
                    })
                  : null}
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
                <PartCategory onClick={handleCategoryOpen(material)}>
                  {materials[material].name}
                </PartCategory>
                {openedCategories[material]
                  ? materials[material].parts.map((part, index) => {
                      if (search && !search.test(parts[part].description)) {
                        return null;
                      }
                      return <Part part={part} key={index} />;
                    })
                  : null}
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

import { VStack } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { categories, imms, materials, parts } from "../../private/data";
import { booleanObject } from "../../types/globalTypes";
import { PartListProps } from "../../types/partListTypes";
import { PartCategory } from "./Category";
import { Part } from "./Part";

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

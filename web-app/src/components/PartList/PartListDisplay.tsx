import React, { FC, useState } from "react";
import { VStack } from "@chakra-ui/react";

import { PartCategory } from "./Category";
import { Part } from "./Part";

import { materials as materialsNames, parts } from "../../data/data";
import { booleanObject } from "../../types/globalTypes";
import { partsToCategories } from "../../utilities/partsToCategories";

interface PartListProps {
  variant: string;
  search?: RegExp;
}

export const PartListDisplay: FC<PartListProps> = ({ variant, search }) => {
  const [openedCategories, setOpenedCategories] = useState<booleanObject>({});
  const { materials, imms, projects } = partsToCategories(parts);

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
          {Object.keys(projects).map((category, index) => {
            return (
              <VStack key={index} w="100%">
                <PartCategory onClick={handleCategoryOpen(category)}>
                  {category}
                </PartCategory>
                {openedCategories[category]
                  ? projects[category].map((part, index) => {
                      if (search && !search.test(parts[part].description)) {
                        return null;
                      }
                      return <Part partIndex={part} key={index} />;
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
          {Object.keys(imms).sort((a,b) => ~~a - ~~b).map((imm, index) => {
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
                      return <Part partIndex={part} key={index} />;
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
          {Object.keys(materials).sort((a,b) => materialsNames[a] > materialsNames[b] ? 1 : -1).map((material, index) => {
             return (
              <VStack key={index} w="100%">
                <PartCategory onClick={handleCategoryOpen(material)}>
                  {materialsNames[material]}
                </PartCategory>
                {openedCategories[material]
                  ? materials[material].map((part, index) => {
                      if (search && !search.test(parts[part].description)) {
                        return null;
                      } 
                      return <Part partIndex={part} key={index} />;
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
          {parts
            .sort((a, b) => a.description > b.description ? 1 : -1)
            .map((part, index) => {
              if (search && !search.test(part.description)) {
                return null;
              }
              return <Part partIndex={index} key={index} />;
            })}
        </VStack>
      );
  }
};

import React, { FC, useState } from "react";
import { VStack } from "@chakra-ui/react";

import { PartCategory } from "./Category";
import { Part } from "./Part";

import { booleanObject } from "../../types/globalTypes";
import { partsToCategories } from "../../utilities/partsToCategories";
import { useCallback } from "react";
import { useMaterials, useParts } from "../../data/hooks";
import { DataError, DataLoading } from "../DataHandlers";

interface PartListProps {
  variant: string;
  search?: RegExp;
}

export const PartListDisplay: FC<PartListProps> = ({ variant, search }) => {
  const [openedCategories, setOpenedCategories] = useState<booleanObject>({});
  const materialNames = useMaterials();
  const parts = useParts();

  const handleCategoryOpen = useCallback(
    (category: string) => () => {
      setOpenedCategories({
        ...openedCategories,
        [category]: openedCategories[category] ? false : true,
      });
    },
    [openedCategories]
  );

  if (!parts || !materialNames) {
    return <DataLoading />;
  }

  if (parts === "error" || materialNames === "error") {
    return <DataError />;
  }

  const { materials, imms, projects } = partsToCategories(parts, search);

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
          {Object.keys(imms)
            .sort((a, b) => ~~a - ~~b)
            .map((imm, index) => {
              return (
                <VStack key={index} w="100%">
                  <PartCategory onClick={handleCategoryOpen(imm)}>
                    {imm}
                  </PartCategory>
                  {openedCategories[imm]
                    ? imms[imm].map((part, index) => {
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
          {Object.keys(materials)
            .sort((a, b) => (materialNames[a] > materialNames[b] ? 1 : -1))
            .map((material, index) => {
              return (
                <VStack key={index} w="100%">
                  <PartCategory onClick={handleCategoryOpen(material)}>
                    {materialNames[material]}
                  </PartCategory>
                  {openedCategories[material]
                    ? materials[material].map((part, index) => (
                        <Part partIndex={part} key={index} />
                      ))
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
            .sort((a, b) => (a.description > b.description ? 1 : -1))
            .map((_, index) => {
              return !search ||
                search.test(parts[index].description) ||
                search.test(`${parts[index].moldNumber}`) ? (
                <Part partIndex={index} key={index} />
              ) : null;
            })}
        </VStack>
      );
  }
};

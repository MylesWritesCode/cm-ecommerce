/*
 * File: /src/pages/index.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Sunday September 12th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Sunday September 12th 2021 10:22:49 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { Flex, useColorMode } from "@chakra-ui/react";
import { VH } from "@constants";
import Gallery from "@/components/gallery/Gallery";

import { devStockImages } from "@/components/gallery";

const Index: React.FC<{}> = ({}) => {
  // Color mode for bg
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.900" };

  return (
    <>
      <Flex
        minHeight={VH}
        background={bgColor[colorMode]}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
      </Flex>
    </>
  );
};

export default Index;

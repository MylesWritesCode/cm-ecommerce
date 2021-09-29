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

const Index: React.FC<{}> = ({}) => {
  // Color mode for bg
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.900" };

  return (
    <>
      <Flex
        minHeight={VH}
        background={bgColor[colorMode]}
        // background="linear-gradient(180deg, #0055ff 0%, rgb(0, 153, 255) 100%)"
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Gallery sx={{ columnCount: [1, 2, 3], columnGap: "8px" }} />
      </Flex>
    </>
  );
};

export default Index;

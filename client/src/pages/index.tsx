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

// Components
import { Navbar } from "../components/nav";

const Index: React.FC<{}> = ({}) => {
  // Color mode for bg
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.900" };

  return (
    <>
      <Flex
        height="100vh"
        background={bgColor[colorMode]}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Navbar />
      </Flex>
    </>
  );
};

export default Index;

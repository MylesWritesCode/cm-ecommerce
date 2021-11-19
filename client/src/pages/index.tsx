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
import { NextPage } from "next";
import {
  Flex,
  Heading as ChakraHeading,
  Text,
  useColorMode,
  chakra,
} from "@chakra-ui/react";
import { VH } from "@constants";

const Heading = chakra(ChakraHeading, {
  baseStyle: {

  },
});

const Index: NextPage<{}> = ({}) => {
  // Color mode for bg
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.900" };

  return (
    <>
      <Flex
        minHeight={VH}
        width="100vw"
        background={bgColor[colorMode]}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Flex padding="2em" flexDirection="column">
          <Heading>So, what is this project 🤔</Heading>
          <Text>
            This is a little playground that I'm using to learn more about web
            development. It's just a test-box that will eventually be
            implemented in other projects. If something is broken, it's broken
            because I'm figuring it out. If you have any suggestions, feel free
            to DM me on Twitter @mylescodesemoji.{" "}
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default Index;

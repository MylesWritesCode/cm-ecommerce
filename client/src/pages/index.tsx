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
import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

// Components
import { withApollo } from "../lib/withApollo";
import { AuthModal } from "../components/auth";
import { SITE_TITLE } from "../constants";

const Index: React.FC<{}> = ({}) => {
  // Color mode for bg
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.900" };
  const color = { light: "black", dark: "white" };

  // Modal stuff for Login
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [variant, setVariant] = useState("login");

  return (
    <>
      <Flex
        height="100vh"
        background={bgColor[colorMode]}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Flex
          backgroundColor="#2a2c37"
          width="100%"
          height="60px"
          px={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex id="brand">
            <Heading
              as="em"
              size="xl"
              bgGradient="linear(to-b, #ffffff, #ffffff)"
              backgroundClip="text"
            >
              {SITE_TITLE}
            </Heading>
          </Flex>
          <Flex id="buttons">
            <Button
              mr={2}
              colorScheme="messenger"
              size="sm"
              borderRadius={0}
              onClick={() => {
                console.log("setting variant register");
                setVariant("register");
                onOpen();
              }}
            >
              Register
            </Button>
            <Button
              colorScheme="messenger"
              size="sm"
              borderRadius={0}
              onClick={() => {
                console.log("setting variant login");
                setVariant("login");
                onOpen();
              }}
            >
              Login
            </Button>
            <AuthModal
              isOpen={isOpen}
              onClose={onClose}
              variant={variant as "login" | "register" | "forgot-password"}
              changeVariantCallback={setVariant}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

// This is how you can get server-side rendering in Next via Apollo.
export default withApollo({ ssr: true })(Index);

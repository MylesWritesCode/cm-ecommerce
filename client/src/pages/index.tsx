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
import { Button, Flex, useColorMode, useDisclosure } from "@chakra-ui/react";

// Components
import { withApollo } from "../lib/withApollo";

const Index: React.FC<{}> = ({}) => {
  // Color mode for bg
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.900" };
  const color = { light: "black", dark: "white" };

  // Modal stuff for Login
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        height="100vh"
        background={bgColor[colorMode]}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        // Navbar


      </Flex>
      {/* <Button my={10} colorScheme="messenger" onClick={onOpen}>
        Login
      </Button>
      <AuthModal isOpen={isOpen} onClose={onClose} variant="login"/> */}
    </>
  );
};

// This is how you can get server-side rendering in Next via Apollo.
export default withApollo({ ssr: true })(Index);

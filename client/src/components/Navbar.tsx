/*
 * File: /src/components/Navbar.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Saturday September 18th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Saturday September 18th 2021 11:01:29 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useState } from "react";
import {
  Flex,
  Heading,
  Button,
  Icon,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { IoMdLogOut } from "react-icons/io";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { AuthModal } from "./auth";

import { SITE_TITLE } from "../constants";
import { isServer } from "../utils/isServer";
import ClientOnly from "./ClientOnly";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [variant, setVariant] = useState("login");
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });

  let infoBox;

  if (loading) {
    infoBox = null;
  } else if (data?.me.__typename === "User") {
    // Me query returned a user
    const user = data.me;
    infoBox = (
      <>
        <Flex justifyContent="center" alignItems="center">
          <Heading size="sm" color="white">
            {user.username}
          </Heading>
        </Flex>
        <Button
          marginLeft={4}
          p={2}
          size="sm"
          backgroundColor="red.500"
          color="white"
          borderRadius={0}
          onClick={() => logout()}
          isLoading={logoutLoading}
        >
          Logout
        </Button>
      </>
    );
    // FaShoppingCart
  } else {
    // User is not logged in.
    infoBox = (
      <>
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
      </>
    );
  }

  return (
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
      <ClientOnly>
        <Flex id="info-box">
          <Flex>{infoBox}</Flex>
        </Flex>
      </ClientOnly>
    </Flex>
  );
};

export default Navbar;

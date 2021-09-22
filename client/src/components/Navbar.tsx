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
import { Flex, Heading, Button, useDisclosure, Icon } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useApolloClient } from "@apollo/client";
import { AuthModal } from "./auth";
import { MenuDrawer } from "./MenuDrawer";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

import { SITE_TITLE } from "../constants";
import { isServer } from "../utils/isServer";
import ClientOnly from "./ClientOnly";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const apolloClient = useApolloClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [variant, setVariant] = useState("login");
  const [isMenuVisible, setIsMenuVisible] = useState(true);
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
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutLoading}
        >
          Logout
        </Button>
      </>
    );
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
      <Flex
        id="brand-and-menu"
        justifyContent="center"
        alignItems="center"
        userSelect="none"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          mr={3}
          width="30px"
          minWidth="30px"
          maxWidth="30px"
        >
          <Icon
            as={isMenuVisible ? CloseIcon : HamburgerIcon}
            width={isMenuVisible ? 4 : 6}
            height={isMenuVisible ? 4 : 6}
            color="white"
            onClick={() => {
              setIsMenuVisible(!isMenuVisible);
            }}
          />
        </Flex>
        {isMenuVisible ? <MenuDrawer /> : null}
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

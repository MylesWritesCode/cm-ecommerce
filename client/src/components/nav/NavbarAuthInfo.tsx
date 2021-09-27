/*
 * File: /src/components/nav/NavbarAuthInfo.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 22nd 2021
 * Author: Myles Berueda
 * Note: The code is lookin real messy in Navbar; This file should clean up some
 *       of the code from there.
 * -----
 * Last Modified: Wednesday September 22nd 2021 12:14:15 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useState } from "react";
import { Flex, Heading, Button, useDisclosure } from "@chakra-ui/react";
import { useApolloClient } from "@apollo/client";
import { useLogoutMutation, useMeQuery } from "@generated/graphql";
import { isServer } from "@utils/isServer";
import { AuthModal } from "@components/auth/AuthModal";

interface NavbarAuthInfoProps {}

export const NavbarAuthInfo: React.FC<NavbarAuthInfoProps> = ({}) => {
  const apolloClient = useApolloClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading: userLoading } = useMeQuery({ skip: isServer() });
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const [variant, setVariant] = useState("login");
  
  // We're loading data from either MeQuery or the cache (MeDocument)
  if (userLoading) {
    return null;
  } else if (data?.me.__typename === "User") {
    // Me query returned a user
    const user = data.me;
    return (
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
    return (
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
};

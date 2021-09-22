/*
 * File: \src\components\MenuDrawer.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Tuesday September 21st 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Tuesday September 21st 2021 11:56:53 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useState } from "react";
import { Flex, keyframes } from "@chakra-ui/react";
import { jello } from "../constants";

interface MenuDrawerProps {}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({ ...props }) => {

  return (
    <Flex
      display="flex"
      width="300px"
      height="calc(100vh - 60px)"
      position="absolute"
      left="0"
      top="60px"
      backgroundColor="black"
      color="white"
      borderRight="1px solid grey"
    >
      Something
      {/* LinkGroup - may change the name */}
    </Flex>
  );
};

export default MenuDrawer;

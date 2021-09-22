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
import { NAVBAR_HEIGHT } from "../constants";

interface MenuDrawerProps {}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({ ...props }) => {
  const animationKeyframes = keyframes`
    0% {
      transform: translateX(-1000px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  `;

  const animation = `${animationKeyframes} cubic-bezier(0.250, 0.460, 0.450, 0.940) forwards`;

  return (
    <Flex
      display="flex"
      width="300px"
      height={`calc(100vh - ${ NAVBAR_HEIGHT })`}
      position="absolute"
      left="0"
      top="60px"
      backgroundColor="black"
      color="white"
      borderRight="1px solid grey"
      animation={animation}
    >
      Something
      {/* LinkGroup - may change the name */}
    </Flex>
  );
};

export default MenuDrawer;

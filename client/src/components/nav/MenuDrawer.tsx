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
import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { NAVBAR_HEIGHT, MENU_CONFIG } from "../../constants";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

interface MenuDrawerProps {}

const MotionFlex = motion<FlexProps>(Flex);

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const MenuDrawer: React.FC<FlexProps> = ({ ...props }) => {
  return (
    <MotionFlex
      display="flex"
      width="300px"
      position="absolute"
      pt={5}
      top={`${NAVBAR_HEIGHT}`}
      left="0"
      bottom="0"
      color="white"
      flexDirection="column"
      variants={variants}
    >
      {MENU_CONFIG.map(({ name, children, link }) => {
        return <MenuItem key={name} name={name} children={children} />;
      })}
    </MotionFlex>
  );
};

export default MenuDrawer;

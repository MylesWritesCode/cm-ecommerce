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
import { NavbarConfig, MenuConfig } from "../../constants";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

interface MenuDrawerProps {
  toggle: () => void;
}

const MotionFlex = motion<FlexProps>(Flex);

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: `afterChildren`,
    },
  },
};

export const MenuDrawer: React.FC<MenuDrawerProps & FlexProps> = ({
  ...props
}) => {
  const { toggle } = props;
  return (
    <MotionFlex
      display="flex"
      width={NavbarConfig.drawer.width}
      position="absolute"
      pt={5}
      top={NavbarConfig.height}
      left="0"
      bottom="0"
      color="white"
      flexDirection="column"
      variants={variants}
    >
      {MenuConfig.map(({ ...menuItemProps }, index) => {
        return (
          <MenuItem key={index} toggle={() => toggle()} {...menuItemProps} />
        );
      })}
    </MotionFlex>
  );
};

export default MenuDrawer;

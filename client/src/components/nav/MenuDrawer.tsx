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
  status: boolean;
  toggle: () => void;
}

const MotionFlex = motion<FlexProps>(Flex);

const variants = {
  open: {
    display: "flex",
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    display: "none",
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
  const { status, toggle } = props;
  console.log(status);
  return (
    <MotionFlex initial={false} variants={variants}>
      <MotionFlex
        // display={status ? "flex" : "none"}
        width={NavbarConfig.drawer.width}
        position="absolute"
        pt={5}
        top={NavbarConfig.height}
        bottom="0"
        left="0"
        color="white"
        flexDirection="column"
      >
        {MenuConfig.map(({ ...menuItemProps }, index) => {
          return (
            <MenuItem key={index} toggle={() => toggle()} {...menuItemProps} />
          );
        })}
      </MotionFlex>
      <MotionFlex
        display={status ? "flex" : "none"}
        position="absolute"
        backgroundColor="rgba(0, 0, 0, 0.05)"
        top={NavbarConfig.height}
        right="0"
        bottom="0"
        left={NavbarConfig.drawer.width}
        onClick={toggle}
      ></MotionFlex>
    </MotionFlex>
  );
};

export default MenuDrawer;

/*
 * File: /src/components/nav/MenuHeader.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 22nd 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Wednesday September 22nd 2021 3:34:01 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { Flex, FlexProps, Heading } from "@chakra-ui/react";
import { MenuConfigItem } from "../../constants";
import MenuItem from "./MenuItem";
import { motion } from "framer-motion";

interface MenuHeaderProps {}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MotionFlex = motion<FlexProps>(Flex);

// My intersection is kinda long and looks gross. Gonna just place this here.
type ShortProps = MenuHeaderProps & MenuConfigItem;
export const MenuGroup: React.FC<ShortProps> = ({ ...props }) => {
  const { name, link, children } = props;
  return (
    <MotionFlex
      id={name}
      pb={3}
      flexDirection="column"
      userSelect="none"
      variants={variants}
    >
      <Heading pl={5} size="md" borderBottom="1px solid black">{name}</Heading>
      {children
        ? children.map((child) => {
            return <MenuItem {...child} />;
          })
        : null}
    </MotionFlex>
  );
};

export default MenuGroup;

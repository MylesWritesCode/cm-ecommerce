/*
 * File: /src/components/nav/MenuItem.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 22nd 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Wednesday September 22nd 2021 3:29:55 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */

import React from "react";
import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import { MenuConfigItem } from "../../constants";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

interface MenuItemProps {}

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

export const MotionFlex = motion<FlexProps>(Flex);

type ShortProps = MenuItemProps & MenuConfigItem;
export const MenuItem: React.FC<ShortProps> = ({ ...props }) => {
  const { name, link, icon } = props;
  const blankIcon = (
    <Icon as={ChevronRightIcon} width={7} height={7} color="transparent" />
  );
  return (
    <MotionFlex
      alignItems="center"
      px={5}
      py={1}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      variants={variants}
    >
      <Flex mr={6}>{icon ? <Icon as={icon} /> : blankIcon}</Flex>
      <Flex>{name}</Flex>
    </MotionFlex>
  );
};

export default MenuItem;

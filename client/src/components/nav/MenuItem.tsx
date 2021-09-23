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
import {
  ArrowForwardIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
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
  const { name, type, link, icon, children } = props;
  const isHeader = type === "header" ? true : false;
  const blankIcon = (
    <Icon
      as={ArrowForwardIcon}
      width={5}
      height={5}
      // color="transparent"
    />
  );
  return (
    <MotionFlex
      px={5}
      // py={1}
      flexDirection="column"
    >
      <MotionFlex
        py={2}
        // px={5}
        flexDirection="row"
        // I don't want the group (i.e. the surrounding div) to animate a click,
        // but I want each individual item to perform the animation.
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.995 }}
        variants={variants}
      >
        <Flex mr={4}>{icon ? <Icon as={icon} /> : blankIcon}</Flex>
        <Flex>{name}</Flex>
      </MotionFlex>
      {children
        ? children.map((child, index) => {
            return <MenuItem key={index} {...child} />;
          })
        : null}
    </MotionFlex>
  );
};

export default MenuItem;

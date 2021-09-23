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
import { Flex, FlexProps, Heading, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ConditionalNextLink } from "../ConditionalNextLink";
import { MenuConfigItem } from "../../constants";

interface MenuItemProps {
  toggle: () => void;
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 25,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MotionFlex = motion<FlexProps>(Flex);
type ShortProps = MenuItemProps & MenuConfigItem;

export const MenuItem: React.FC<ShortProps> = ({ ...props }) => {
  const { name, type, link, icon, children, toggle } = props;
  const isHeader = type === "header" ? true : false;
  return (
    <Flex
      flexDirection="column"
      py={isHeader ? 2 : null}
      onClick={toggle}
    >
      <ConditionalNextLink to={link}>
        <Flex>
          <MotionFlex
            py={3}
            px={5}
            flexDirection="row"
            flex="0 0 100%"
            alignItems="center"
            whileHover={
              !isHeader
                ? { color: "rgb(167, 85, 194)", transition: { velocity: 1000 } }
                : null
            }
            whileTap={!isHeader ? { scale: 0.995 } : null}
            variants={variants}
          >
            {icon ? <Icon as={icon} mr={4} /> : null}
            {isHeader ? (
              <Heading size="xs" color="rgb(167, 85, 194)">
                {name.toUpperCase()}
              </Heading>
            ) : (
              <Heading size="xs">{name.toUpperCase()}</Heading>
            )}
          </MotionFlex>
        </Flex>
      </ConditionalNextLink>
      {children
        ? children.map((child, index) => {
            return <MenuItem key={index} toggle={() => toggle} {...child} />;
          })
        : null}
    </Flex>
  );
};

export default MenuItem;

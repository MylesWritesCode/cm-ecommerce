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
import { NAVBAR_HEIGHT } from "../../constants";

interface MenuDrawerProps {

}

export const MenuDrawer: React.FC<FlexProps> = ({ ...props }) => {
  
  return (
    <Flex
      display="flex"
      width="300px"
      position="absolute"
      top={`${ NAVBAR_HEIGHT }`}
      left="0"
      bottom="0"
      color="white"
      {...props}
    >
      {/* Something */}
      {/* LinkGroup - may change the name */}
    </Flex>
  );
};

export default MenuDrawer;

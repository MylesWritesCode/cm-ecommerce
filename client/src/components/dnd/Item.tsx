/*
 * File: /src/components/dnd/Item.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Thursday September 30th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Thursday September 30th 2021 4:18:48 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { Box, Image } from "@chakra-ui/react";

interface ItemProps {}
  
export const Item: React.FC<ItemProps> = ({ ...props }) => {
  const { children } = props;

  return (
    <Box>
      <Image src="" />
    </Box>
  );
};

export default Item;
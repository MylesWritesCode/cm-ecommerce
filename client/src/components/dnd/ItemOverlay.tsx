/*
 * File: /src/components/dnd/ItemOverlay.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Thursday September 30th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Thursday September 30th 2021 4:19:46 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { Box, Image } from "@chakra-ui/react";

interface ItemOverlayProps {}
  
export const ItemOverlay: React.FC<ItemOverlayProps> = ({ ...props }) => {
  const { children } = props;

  return (
    <Box>
      <Image src="" />
    </Box>
  );
};

export default ItemOverlay;
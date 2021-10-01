/*
 * File: /src/components/dnd/SortableItem.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Thursday September 30th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Thursday September 30th 2021 4:16:47 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { Box, Image } from "@chakra-ui/react";

interface SortableItemProps {}

export const SortableItem: React.FC<SortableItemProps> = ({ ...props }) => {
  const { children } = props;

  return (
    <Box>
      <Image src="" />
    </Box>
  );
};

export default SortableItem;
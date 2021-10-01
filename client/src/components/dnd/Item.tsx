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
import React, { HTMLAttributes } from "react";
import { Box, Image } from "@chakra-ui/react";

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  clone?: boolean;
  id: string;
  index?: number;
  onRemove?: () => void;
}
  
export const Item: React.FC<ItemProps> = ({ ...props }) => {
  const { active, clone, id, index, onRemove, children } = props;

  return (
    <Box>
      {children}
    </Box>
  );
};

export default Item;
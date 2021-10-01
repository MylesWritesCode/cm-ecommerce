/*
 * File: /src/components/dnd/Item.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 29th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Wednesday September 29th 2021 3:57:39 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { LegacyRef, useEffect, useState } from "react";
import { Box, Image, ChakraProps } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export interface ItemProps extends ChakraProps {
  active?: boolean;
  clone?: boolean;
  id: string;
  index?: number;
  Component?: typeof Box | typeof Image;
  src?: string;
  onRemove?: () => void;
}

export const Item = React.forwardRef<HTMLElement, ItemProps>(function Item(
  { ...props },
  ref
) {
  const { id, index, active, clone, onRemove, Component = Box } = props;
  
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);

  console.log(props);
  return (
    <Box
      position="relative"
      mb="8px"
      transform={clone ? "scale(1.025)" : null}
      animation={clone ? "pop 150ms cubic-bezier(0.18, 0.67, 0.6, 1.22)" : null}
      cursor={clone ? "grabbing" : "pointer"}
    >
      <Component
        width="100%"
        height="100%"
        backgroundSize="cover"
        outline="none"
        appearance="none"
        cursor="grab"
        borderRadius="0"
        ref={ref as LegacyRef<HTMLDivElement> & LegacyRef<HTMLImageElement>}
        onLoad={() => setIsComponentLoaded(true)}
        {...props}
      />
      {!active && onRemove && isComponentLoaded ? (
        <DeleteIcon
          position="absolute"
          top="10px"
          right="10px"
          onClick={onRemove}
        />
      ) : null}
    </Box>
  );
});

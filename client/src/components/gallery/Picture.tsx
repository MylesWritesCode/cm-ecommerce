/*
 * File: /src/components/gallery/Picture.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 29th 2021
 * Author: Myles Berueda
 * Note: THIS IS THE ITEM
 * -----
 * Last Modified: Wednesday September 29th 2021 3:57:39 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { LegacyRef, useState } from "react";
import { Box, Image, ImageProps } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export interface PictureProps extends ImageProps {
  active?: boolean;
  clone?: boolean;
  id: string;
  index?: number;
  src?: string;
  onRemove?: () => void;
}

export const Picture = React.forwardRef<HTMLImageElement, PictureProps>(
  function Item({ ...props }, ref) {
    const { id, index, active, clone, style, onRemove } = props;

    const [isComponentLoaded, setIsComponentLoaded] = useState(false);

    console.log(props);
    return (
      <Box
        position="relative"
        mb="8px"
        transform={clone ? "scale(1.025)" : null}
        animation={
          clone ? "pop 150ms cubic-bezier(0.18, 0.67, 0.6, 1.22)" : null
        }
        cursor={clone ? "grabbing" : "pointer"}
      >
        <Image
          width="100%"
          height="100%"
          backgroundSize="cover"
          outline="none"
          appearance="none"
          cursor="grab"
          borderRadius="0"
          ref={ref as LegacyRef<HTMLImageElement>}
          onLoad={() => setIsComponentLoaded(true)}
          style={style}
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
  }
);

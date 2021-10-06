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
import React, { LegacyRef, useEffect, useState } from "react";
import { Box, Image, ImageProps } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { DraggableSyntheticListeners } from "@dnd-kit/core";

import { Transform } from "@utils/css";

export interface PictureProps extends Omit<ImageProps, "transform"> {
  id: string;
  src: string;
  active?: boolean;
  clone?: boolean;
  dragOverlay?: boolean;
  dragging?: boolean;
  fadeIn?: boolean;
  listeners?: DraggableSyntheticListeners;
  index?: number;
  sorting?: boolean;
  transform?: Transform | null;
  transition?: string | null;
  value?: React.ReactNode;
  onRemove?(): void;
}

export const Picture = React.memo(
  React.forwardRef<HTMLImageElement, PictureProps>(
    (
      {
        id,
        index,
        active,
        clone,
        dragOverlay,
        dragging,
        sorting,
        fadeIn,
        listeners,
        transform,
        transition,
        value,
        src,
        onRemove,
        ...props
      },
      ref
    ) => {
      const [isComponentLoaded, setIsComponentLoaded] = useState(false);

      useEffect(() => {
        if (!dragOverlay) return;

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return (
        <Box
          position="relative"
          height="100%"
          mb="8px"
          ref={ref as LegacyRef<HTMLDivElement>}
          {...listeners}
        >
          <Image
            width="100%"
            height="100%"
            borderRadius="0"
            ref={ref as LegacyRef<HTMLImageElement>}
            onLoad={() => setIsComponentLoaded(true)}
            src={src}
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
  )
);

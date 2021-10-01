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
  active?: boolean;
  clone?: boolean;
  dragOverlay?: boolean;
  dragging?: boolean;
  fadeIn?: boolean;
  listeners?: DraggableSyntheticListeners;
  id: string;
  index?: number;
  src: string;
  sorting?: boolean;
  transform?: Transform | null;
  transition?: string | null;
  value?: React.ReactNode;
  onRemove?(): void;
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: PictureProps["transform"];
    transition: PictureProps["transition"];
    value: PictureProps["value"];
  }): React.ReactElement;
}

export const Picture = React.memo(
  React.forwardRef<HTMLImageElement, PictureProps>((
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
      style,
      onRemove,
      renderItem,
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

    return renderItem ? (
      renderItem({
        dragOverlay: Boolean(dragOverlay),
        dragging: Boolean(dragging),
        sorting: Boolean(sorting),
        index,
        fadeIn: Boolean(fadeIn),
        listeners,
        ref,
        style,
        transform,
        transition,
        value,
      })
    ) : (
      <Box
        position="relative"
        mb="8px"
        transform={clone ? "scale(1.025)" : null}
        transition={transition}
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
          {...listeners}
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
  })
);

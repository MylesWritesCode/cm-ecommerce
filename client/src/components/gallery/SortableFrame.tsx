/*
 * File: /src/components/gallery/SortableFrame.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Friday October 1st 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Friday October 1st 2021 2:48:17 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useState } from "react";
import { Box, BoxProps, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";

const baseStyles: React.CSSProperties = {
  position: "relative",
  width: 140,
  height: 140,
};

const initialStyles = {
  x: 0,
  y: 0,
  scale: 1,
};

const MotionBox = motion<BoxProps>(Box);

export const SortableFrame = ({ id }) => {
  const { attributes, setNodeRef, listeners, transform, isDragging } =
    useSortable({
      id,
      transition: null,
    });

  return (
    <MotionBox
      style={baseStyles}
      ref={setNodeRef}
      tabIndex={0}
      layoutId={id}
      animate={
        transform
          ? {
              x: transform.x,
              y: transform.y,
              scale: isDragging ? 1.05 : 1,
              zIndex: isDragging ? 1 : 0,
              boxShadow: isDragging
                ? "0 0 0 1px rgba(63, 63, 68, 0.05), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
                : undefined,
            }
          : initialStyles
      }
      transition={{
        duration: !isDragging ? 0.25 : 0,
        easings: {
          type: "spring",
        },
        scale: {
          duration: 0.25,
        },
        zIndex: {
          delay: isDragging ? 0 : 0.25,
        },
      }}
      {...attributes}
      {...listeners}
    >
      {id}
    </MotionBox>
  );
}

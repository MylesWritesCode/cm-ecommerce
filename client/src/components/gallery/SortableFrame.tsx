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
import React, { useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSortable } from "@dnd-kit/sortable";

import { MotionBox } from "@/lib/chakra-motion";
import { Picture } from ".";

const baseStyles: React.CSSProperties = {
  position: "relative",
  boxShadow: "0 0 1px 1px rgba(63, 63, 68, 0.05)",
};

const initialStyles = {
  x: 0,
  y: 0,
  scale: 1,
  boxShadow: "0 0 1px 1px rgba(63, 63, 68, 0.05)",
};

interface SortableFrameProps {
  id: string;
  src: string;
  onRemove?(id: string): void;
  sx: React.CSSProperties;
}

export const SortableFrame: React.FC<SortableFrameProps> = ({
  id,
  src,
  onRemove,
  sx,
  ...props
}) => {
  const { attributes, setNodeRef, listeners, transform, isDragging } =
    useSortable({ id, transition: null });

  return (
    <>
      <MotionBox
        id={id}
        style={baseStyles}
        sx={sx}
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
                  ? "0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
                  : "0 0 3px 3px rgba(63, 63, 68, 0.05)",
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
        <Picture
          id={id}
          src={src}
          onRemove={onRemove ? () => onRemove(id) : undefined}
        />
      </MotionBox>
    </>
  );
};

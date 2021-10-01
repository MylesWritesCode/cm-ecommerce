/*
 * File: /src/components/gallery/Frame.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 29th 2021
 * Author: Myles Berueda
 * Note: THIS IS THE SORTABLE ITEM
 * -----
 * Last Modified: Wednesday September 29th 2021 3:00:36 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Picture, PictureProps } from ".";

interface FrameProps extends PictureProps {
  activeIndex: number;
  index: number;
}

export const Frame: React.FC<FrameProps> = ({ ...props }) => {
  const { id, activeIndex } = props;
  const {
    attributes,
    listeners,
    index,
    isDragging,
    isSorting,
    over,
    overIndex,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id, animateLayoutChanges: always });

  return (
    <Picture
      ref={setNodeRef}
      id={id}
      active={isDragging}
      style={{
        transition,
        transform: isSorting ? undefined : CSS.Translate.toString(transform),
      }}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default Frame;

function always() {
  return true;
}

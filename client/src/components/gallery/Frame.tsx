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
import { rectSwappingStrategy, useSortable } from "@dnd-kit/sortable";

import { Picture } from ".";

interface FrameProps {
  id: string;
  index: number;
  src: string;
  style(values: any): React.CSSProperties;
  renderItem?(args: any): React.ReactElement;
  onRemove?(id: string): void;
}

export const Frame: React.FC<FrameProps> = ({
  id,
  index,
  src,
  style,
  renderItem,
  onRemove,
  ...props
}) => {
  const {
    attributes,
    listeners,
    isDragging,
    isSorting,
    overIndex,
    setNodeRef,
    transform,
    // transition,
  } = useSortable({
    id: id,
    transition: null,
    animateLayoutChanges: () => true,
    attributes: {
      role: "image",
      tabIndex: index,
    },
    strategy: rectSwappingStrategy,
  });

  return (
    <Picture
      ref={setNodeRef}
      id={id}
      src={id}
      index={index}
      dragging={isDragging}
      sorting={isSorting}
      onRemove={onRemove ? () => onRemove(id) : undefined}
      dragOverlay={isDragging}
      {...listeners}
      {...attributes}
    />
  );
};

export default Frame;
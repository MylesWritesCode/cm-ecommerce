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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

import { Item, ItemProps } from ".";

interface SortableItemProps extends ItemProps {
  activeIndex?: number;
}

export const SortableItem: React.FC<SortableItemProps> = ({ ...props }) => {
  const { id, activeIndex, children } = props;
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
  } = useSortable({
    id: id,
    animateLayoutChanges: () => true,
  });

  return (
    <Item
      id={id}
      active={isDragging}
      style={{
        transition,
        transform: isSorting ? undefined : CSS.Translate.toString(transform),
      }}
      {...props}
      {...attributes}
      {...listeners}
    >
      {children}
    </Item>
  );
};

export default SortableItem;

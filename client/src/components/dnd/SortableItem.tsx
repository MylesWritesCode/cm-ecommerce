/*
 * File: /src/components/dnd/SortableItem.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 29th 2021
 * Author: Myles Berueda
 * Note: I'm just going to use regular divs in all of these. IDK what it does
 *       for performance, but I'm just assuming Chakra will increase the bundle
 *       size for these files. I'm not using ChakraProps anyway, so...
 * -----
 * Last Modified: Wednesday September 29th 2021 3:00:36 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useEffect } from "react";
import { Box, Image } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Item, ItemProps } from '.';

interface SortableItemProps extends ItemProps {
  activeIndex: number;
  Component?: typeof Box | typeof Image; 
}

export const SortableItem: React.FC<SortableItemProps> = ({ ...props }) => {
  const { id, activeIndex, Component = Box } = props;
  const {
    attributes,
    listeners,
    index,
    isDragging,
    isSorting,
    over,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id, animateLayoutChanges: () => true });

  return (
    <Item
      Component={Component}
      ref={setNodeRef}
      id={id}
      active={isDragging}
      transition={transition}
      transform={isSorting ? undefined : CSS.Translate.toString(transform)}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableItem;

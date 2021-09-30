/*
 * File: /src/components/dnd/Sortable.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 29th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Wednesday September 29th 2021 3:00:36 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { Box } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Item } from ".";

interface SortableProps {
  id: string | number; 
}

export const SortableItem: React.FC<SortableProps> = ({ ...props }) => {
  const { id, children } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id.toString() });
    
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
  <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
    { children }
  </Box>
  );
};

export default SortableItem;

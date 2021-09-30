/*
 * File: /src/components/dnd/Sortable.tsx
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
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    { children }
  </div>
  );
};

export default SortableItem;

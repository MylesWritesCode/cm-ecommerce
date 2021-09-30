/*
 * File: /src/components/dnd/Droppable.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 29th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Wednesday September 29th 2021 1:15:35 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { Box } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  key?: string;
}

export const Droppable: React.FC<DroppableProps> = ({ ...props }) => {
  const { id, key, children } = props;
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  return <Box ref={setNodeRef}>{children}</Box>;
};

export default Droppable;

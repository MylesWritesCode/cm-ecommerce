/*
 * File: /src/components/dnd/Sortable.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Thursday September 30th 2021
 * Author: Myles Berueda
 * Note: Sortable will be in charge of DndContext and SortableContext.
 * -----
 * Last Modified: Thursday September 30th 2021 1:27:57 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { Announcements, DndContext } from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  SortingStrategy,
} from "@dnd-kit/sortable";

interface SortableProps {
  Container?: typeof Box | typeof Flex;
  strategy?: SortingStrategy;
}

export const Sortable: React.FC<SortableProps> = ({ ...props }) => {
  const { Container = Box, strategy = rectSortingStrategy } = props;
  const [items, setItems] = useState<string[]>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const isFirstAnnouncement = useRef(true);

  const getIndex = items.indexOf.bind(items);
  const getPosition = (id: string) => getIndex(id) + 1;

  const announcements: Announcements = {
    onDragStart(id) {
      return `Picked up sortable item ${id}. Sortable item ${id} is in position 
      ${getPosition(id)} of ${items.length}`;
    },
    onDragOver(id, overId) {
      // In this specific use-case, the picked up item's `id` is always the same as the first `over` id.
      // The first `onDragOver` event therefore doesn't need to be announced, because it is called
      // immediately after the `onDragStart` announcement and is redundant.
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false;
        return;
      }

      if (overId) {
        return `Sortable item ${id} was moved into position 
        ${getPosition(overId)} of ${items.length}`;
      }

      return;
    },
    onDragEnd(id, overId) {
      if (overId) {
        return `Sortable item ${id} was dropped at position 
        ${getPosition(overId)} of ${items.length}`;
      }

      return;
    },
    onDragCancel(id) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and 
      returned to position ${getPosition(id)} of ${items.length}.`;
    },
  };

  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  return (
    <DndContext announcements={announcements}>
      <Box>
        <SortableContext items={items} strategy={strategy}>
          <Container></Container>
        </SortableContext>
      </Box>
    </DndContext>
  );
};

export default Sortable;

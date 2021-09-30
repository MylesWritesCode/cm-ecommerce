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
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Box, Flex, Image } from "@chakra-ui/react";
import {
  closestCenter,
  CollisionDetection,
  defaultDropAnimation,
  DndContext,
  DragOverlay,
  DropAnimation,
  MouseSensor,
  PointerActivationConstraint,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSwappingStrategy,
  SortableContext,
  SortingStrategy,
} from "@dnd-kit/sortable";
import { Item } from ".";
import { VH } from "@/constants/Constants";

interface SortableProps {
  items: string[];
  activationConstraint?: PointerActivationConstraint;
  Container?: typeof Box | typeof Flex; // Not sure if I want to add Grid here.
  collisionDetection?: CollisionDetection;
  dropAnimation?: DropAnimation | null;
  strategy?: SortingStrategy;
  useDragOverlay?: boolean;
}

const defaultDropAnimationConfig: DropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5,
};

export const Sortable: React.FC<SortableProps> = ({ ...props }) => {
  const {
    activationConstraint,
    collisionDetection = closestCenter,
    dropAnimation = defaultDropAnimationConfig,
    strategy = rectSwappingStrategy,
    useDragOverlay = true,
    children
  } = props;
  const [items, setItems] = useState<string[]>(props.items);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint }),
    useSensor(TouchSensor, { activationConstraint })
  );

  if (!items) {
    return (
      <Flex height={VH} justifyContent="center" alignItems="center">
        Loading...
      </Flex>
    );
  }

  const getIndex = items.indexOf.bind(items);
  const activeIndex = activeId ? getIndex(activeId) : -1;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        if (!active) return;
        setActiveId(active.id);
      }}
      onDragOver={({ over }) => {
        setActiveId(null);
        if (over) {
          const overIndex = getIndex(over.id);
          if (activeIndex !== overIndex) {
            setItems((items) => arrayMove(items, activeIndex, overIndex));
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <Box>
        <SortableContext items={items} strategy={strategy}>
          {children}
        </SortableContext>
      </Box>
      {useDragOverlay
        ? createPortal(
            <DragOverlay dropAnimation={dropAnimation}>
              {activeId ? (
                <Item id={items[activeIndex]}>
                  <Image src={items[activeIndex]} />
                </Item>
              ) : null}
            </DragOverlay>,
            document.body
          )
        : null}
    </DndContext>
  );
};

export default Sortable;

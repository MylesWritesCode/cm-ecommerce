/*
 * File: /src/components/gallery/Gallery.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Tuesday September 28th 2021
 * Author: Myles Berueda
 * Note: This is responsible for instantiating the columns.
 * -----
 * Last Modified: Tuesday September 28th 2021 2:33:57 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useEffect, useState } from "react";
import { Box, BoxProps, Image, Heading } from "@chakra-ui/react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import dynamic from "next/dynamic";

import { Draggable, Droppable, Item, SortableItem } from "@components/dnd";
import Sortable from "../dnd/Sortable";

interface GalleryProps {
  src: string[];
}

type Props = GalleryProps & BoxProps;
export const Gallery: React.FC<Props> = ({ ...props }) => {
  const { src, sx } = props;
  const [images, setImages] = useState(src);
  const [isWindowReady, setIsWindowReady] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  // This will run once on mount.
  useEffect(() => {
    setIsWindowReady(true);
  }, []);

  // If there's no images, just return a simple box.
  if (!src) return <Box></Box>;

  const onDragStart = (ev: DragStartEvent) => {
    const { active } = ev;
    setActiveId(active.id);
  };

  const onDragEnd = (ev: DragEndEvent) => {
    const { active, over } = ev;
    if (active.id !== over.id) {
      setImages((images) => {
        const oldIndex = images.indexOf(active.id);
        const newIndex = images.indexOf(over.id);

        return arrayMove(images, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const draggableComp = (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Droppable id="gallery">
        <Box sx={sx}>
          {images.map((image, index) => (
            <Draggable id={index.toString()} key={index}>
              <Image src={image} mb={sx.columnGap as string} />
            </Draggable>
          ))}
        </Box>
      </Droppable>
    </DndContext>
  );

  const comp = (
    <Sortable items={images} useDragOverlay={false}>
      <Box sx={sx}>
        {images.map((image, index) => (
          <SortableItem key={image} id={image}>
            <Image src={image} />
          </SortableItem>
        ))}
      </Box>
    </Sortable>
  );

  // Need to wait for the window to be ready before loading everything,
  // otherwise the drag handles aren't going to load correctly.
  return isWindowReady ? comp : null;
};

export default Gallery;

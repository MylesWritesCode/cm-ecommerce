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
import { Box, BoxProps, Image } from "@chakra-ui/react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  closestCenter,
  DragOverlay,
  DragCancelEvent,
  MeasuringConfiguration,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import dynamic from "next/dynamic";

import { SortableItem, ItemOverlay } from "@components/dnd";
import Sortable from "../dnd/Sortable";

interface GalleryProps {
  src: string[];
}

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

type Props = GalleryProps & BoxProps;
export const Gallery: React.FC<Props> = ({ ...props }) => {
  const { src, sx } = props;
  const [images, setImages] = useState(src);
  const [isWindowReady, setIsWindowReady] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const activeIndex = activeId ? images.indexOf(activeId) : -1;

  // This will run once, on mount.
  useEffect(() => {
    setIsWindowReady(true);
  }, []);

  // If there's no images, just return a simple box.
  if (!src) return <Box></Box>;

  const onDragStart = (ev: DragStartEvent) => {
    const { active } = ev;
    setActiveId(active.id);
  };

  const onDragCancel = (ev: DragCancelEvent) => {
    setActiveId(null);
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

  const SortableComp = (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
    >
      <SortableContext items={images} strategy={rectSwappingStrategy}>
        <Box sx={sx}>
          {images.map((image, index) => (
            <SortableItem
              Component={Image}
              key={image}
              id={image}
              index={index + 1}
              activeIndex={activeIndex}
              onRemove={() => {
                setImages((images) => images.filter((i) => i !== image));
              }}
              src={image}
            />
          ))}
        </Box>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <ItemOverlay Component={Image} activeIndex={activeIndex} id={activeId} src={activeId} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  // Need to wait for the window to be ready before loading everything,
  // otherwise the drag handles aren't going to load correctly.
  return isWindowReady ? SortableComp : null;
};

export default Gallery;

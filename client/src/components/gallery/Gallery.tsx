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
import { createPortal } from "react-dom";
import { Box, BoxProps } from "@chakra-ui/react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
  MeasuringConfiguration,
  MeasuringStrategy,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";

import { Frame, FrameOverlay, Picture } from ".";

interface GalleryProps {
  src: string[];
  getItemStyles?(args: {
    id: UniqueIdentifier;
    index: number;
    isSorting: boolean;
    isDragOverlay: boolean;
    overIndex: number;
    isDragging: boolean;
  }): React.CSSProperties;
  renderItem?: any;
}

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

type Props = GalleryProps & BoxProps;
export const Gallery: React.FC<Props> = ({ 
  src,
  getItemStyles = () => ({}),
  renderItem,
  sx,
  ...props }) => {
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

  const onDragStart = ({ active }) => {
    setActiveId(active.id);
    console.log(active);
  };

  const onDragCancel = () => {
    setActiveId(null);
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setImages((images) => {
        const oldIndex = images.indexOf(active.id);
        const newIndex = images.indexOf(over.id);

        return arrayMove(images, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const onFrameDrag = (ev) => {
    console.log(ev);
  };

  const ForwardComp = (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
    >
      <Box>
        <SortableContext
          id="gallery"
          items={images}
          strategy={rectSwappingStrategy}
        >
          <Box sx={sx}>
            {images.map((image, index) => (
              <Frame
                src={image}
                key={image}
                id={image}
                index={index}
                renderItem={renderItem}
                onRemove={() => {
                  setImages((images) => images.filter((i) => i !== image));
                }}
                style={getItemStyles}
              />
            ))}
          </Box>
        </SortableContext>
        {isWindowReady &&
          createPortal(
            <DragOverlay
              dropAnimation={{
                duration: 500,
                easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
              }}
            >
              {activeId ? (
                <Picture 
                  id={activeId} 
                  src={activeId} 
                  style={getItemStyles({
                    id: images[activeIndex],
                    index: activeIndex,
                    isSorting: activeId !== null,
                    isDragging: true,
                    overIndex: -1,
                    isDragOverlay: true,
                  })}
                  dragOverlay
                />
              ) : null}
            </DragOverlay>,
            document.body
          )}
      </Box>
    </DndContext>
  );

  // Need to wait for the window to be ready before loading everything,
  // otherwise the drag handles aren't going to load correctly.
  return isWindowReady ? ForwardComp : null;
};

export default Gallery;

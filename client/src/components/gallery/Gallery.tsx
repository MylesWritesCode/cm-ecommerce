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
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableFrame } from "./SortableFrame";

interface GalleryProps {
  src: string[];
  renderItem?: any;
  setOrderCb?: (arr: string[]) => void;
}

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

type Props = GalleryProps & BoxProps;
export const Gallery: React.FC<Props> = ({
  src: initialSrc,
  renderItem,
  sx,
  setOrderCb,
  ...props
}) => {
  const [images, setImages] = useState(initialSrc);
  const [isWindowReady, setIsWindowReady] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  // This will run once, on mount.
  useEffect(() => {
    setIsWindowReady(true);
  }, []);

  useEffect(() => {
    if (images !== initialSrc) {
      setImages(initialSrc);
      return;
    }
  }, [initialSrc]);

  // If setOrderCb is provided, then we care about the order of the images in
  // the parent component. If not, we don't care, so don't run the useEffect.
  if (setOrderCb) {
    useEffect(() => {
      // Used to tell the parent that the order of images changed.
      setOrderCb(images);
      return;
    }, [images]);
  }

  // If there's no images, just return a simple box.
  if (!initialSrc) return <Box></Box>;

  const onDragStart = ({ active }) => {
    setActiveId(active.id);
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

  const FramerMotionComp = (
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
          strategy={rectSortingStrategy}
        >
          <Box sx={sx}>
            {images.map((image, index) => (
              <SortableFrame
                src={image}
                key={image}
                id={image}
                onRemove={() => {
                  setImages((images) => images.filter((i) => i !== image));
                }}
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
            ></DragOverlay>,
            document.body
          )}
      </Box>
    </DndContext>
  );

  // Need to wait for the window to be ready before loading everything,
  // otherwise the drag handles aren't going to load correctly.
  // return isWindowReady ? ForwardComp : null;
  return isWindowReady ? FramerMotionComp : null;
};

export default Gallery;

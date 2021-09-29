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
import dynamic from "next/dynamic";

// Testing react-beautiful-dnd
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface GalleryProps {
  src: string[];
}

type Props = GalleryProps & BoxProps;
export const Gallery: React.FC<Props> = ({ ...props }) => {
  const { src, sx } = props;
  const [images, setImages] = useState(src);
  const [columns, setColumns] = useState(null);
  const [isWindowReady, setIsWindowReady] = useState(false);
  const [ids, setIds] = useState([]);

  // This will run once on mount.
  useEffect(() => {
    setIsWindowReady(true);
  }, []);

  // If there's no images, just return a simple box.
  if (!src) return <Box></Box>;

  const onDragEnd = (result, provided) => {
    console.log("result: ", result);
    console.log("provided: ", provided);
  };

  const comp = (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="gallery">
        {(provided, snapshot) => (
          <Box ref={provided.innerRef} sx={sx} {...provided.droppableProps}>
            {images.map((image, index) => (
              <Draggable
                key={`dk-${index}`}
                draggableId={`did-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Image src={image} mb={sx.columnGap as string} />
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );

  // Need to wait for the window to be ready before loading everything,
  // otherwise the drag handles aren't going to load correctly.
  return isWindowReady ? comp : null;
};

export default Gallery;
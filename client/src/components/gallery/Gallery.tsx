/*
 * File: /src/components/gallery/Gallery.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Tuesday September 28th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Tuesday September 28th 2021 2:33:57 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useState } from "react";
import { Box, BoxProps, Image } from "@chakra-ui/react";

// Testing react-beautiful-dnd
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface GalleryProps {
  src: string[];
}

type Props = GalleryProps & BoxProps;
export const Gallery: React.FC<Props> = ({ ...props }) => {
  const { src, sx } = props;
  const [images, setImages] = useState(src);
  const [selected, select] = useState(null);

  // If there's no images, just return a simple box.
  if (!src) return <Box></Box>;

  const onDragEnd = (result, provided) => {
    console.log("result: ", result);
    console.log("provided: ", provided);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="gallery">
        {(provided, snapshot) => (
          <Box ref={provided.innerRef} sx={sx} {...provided.droppableProps}>
            {images.map((image, index) => (
              <Draggable key={index} draggableId={`img-${index}`} index={index}>
                {(provided, snapshot) => (
                  <Image
                    src={image}
                    mb={sx.columnGap as string}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <Box sx={sx}>
        {images.map((image, index) => {
          return <Image src={image} key={index} mb={sx.columnGap as string} />;
        })}
      </Box>
    </DragDropContext>
  );
};

export default Gallery;

// <Box sx={sx}>
//   {images.map((image, index) => {
//     return <Image src={image} key={index} mb={sx.columnGap as string} />;
//   })}
// </Box>

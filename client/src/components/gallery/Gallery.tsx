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

  const handleOnClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target: HTMLDivElement = ev.target as HTMLDivElement;
    
    if (target === selected) {
      return;
    } else {
      target.style.border = "5px solid black";
      if (selected) selected!.style = null;
      select(target);
    }
  };
  
  const handleOnDrag = (ev: React.DragEvent<HTMLDivElement>) => {
    console.log("drag: ", ev);
  }

  return (
    <Box
      sx={sx}
      onClick={(e) => handleOnClick(e)}
      onDrag={(e) => handleOnDrag(e)}
    >
      {images.map((image, index) => {
        return (
        <Image 
          src={image} 
          key={index} 
          mb={sx.columnGap as string}
        />
        );
      })}
    </Box>
  );
};

export default Gallery;

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
import React, { useEffect, useState } from "react";
import { Box, BoxProps, Image } from "@chakra-ui/react";
import { devStockImages } from ".";

interface GalleryProps {

}

type Props = GalleryProps & BoxProps;
export const Gallery: React.FC<Props> = ({ ...props }) => {
  const { sx } = props;
  const [images, setImages] = useState([]);

  // For development
  useEffect(() => {
    setImages(devStockImages);
  }, [devStockImages])

  return (
    <Box sx={sx}>
      {images.map((image, index) => {
        console.log(image);
        return <Image src={image} key={index} mb={sx.columnGap as string}/>
      })}
    </Box>
  );
};

export default Gallery;

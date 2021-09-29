/*
 * File: /src/components/gallery/Frame.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Tuesday September 28th 2021
 * Author: Myles Berueda
 * Note: This would then be responsible for each image frame.
 * -----
 * Last Modified: Tuesday September 28th 2021 11:27:07 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from 'react';
import { Image, ChakraProps } from '@chakra-ui/react';

interface FrameProps {
  key: number | string; // Idk if this can be a string.
  src: string;
}

type Props = FrameProps & ChakraProps
export const Frame: React.FC<Props> = ({...props}) => {
  const { key, src, sx } = props;

  return <Image src={src} key={key} mb={sx.columnGap as string} />;
}

export default Frame;
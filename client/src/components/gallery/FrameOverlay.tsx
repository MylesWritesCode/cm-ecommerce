/*
 * File: /src/components/gallery/FrameOverlay.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Thursday September 30th 2021
 * Author: Myles Berueda
 * NOTE: OH SO VERY OBVIOUSLY THIS IS THE OVERLAY
 * -----
 * Last Modified: Thursday September 30th 2021 12:29:34 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { useDndContext } from "@dnd-kit/core";

import { PictureProps, Picture } from ".";

interface FrameOverlayProps extends Omit<PictureProps, "index"> {
  activeIndex: number;
  Component?: typeof Box | typeof Image;
}

export const FrameOverlay: React.FC<FrameOverlayProps> = ({ ...props }) => {
  const { id, Component } = props;
  const { activatorEvent, over } = useDndContext();
  // const activeIndex = items.indexOf(id);
  // const overIndex = over?.id ? items.indexOf(over?.id) : -1;

  return <Picture id={id} {...props} />;
};

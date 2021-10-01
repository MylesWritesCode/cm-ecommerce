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
import { useDndContext } from "@dnd-kit/core";

import { PictureProps, Picture } from ".";

interface FrameOverlayProps extends Omit<PictureProps, "index"> {
  activeIndex: number;
}

export const FrameOverlay: React.FC<FrameOverlayProps> = ({ ...props }) => {
  const { id } = props;
  const { activatorEvent, over, willRecomputeLayouts } = useDndContext();

  return <Picture id={id} {...props} />;
};

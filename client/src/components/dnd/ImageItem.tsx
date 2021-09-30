/*
 * File: /src/components/dnd/Item.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 29th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Wednesday September 29th 2021 3:57:39 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useEffect } from "react";

interface ItemProps { dragOverlay?: boolean }

export const ImageItem = React.memo(
  React.forwardRef<HTMLImageElement, ItemProps>(
    ({ children, ...props }, ref) => {
      const { dragOverlay } = props;
      
      // Change the cursor when a user is dragging an image.
      useEffect(() => {
        if (!dragOverlay) return;

        document.body.style.cursor = 'grabbing';

        return () => {
          document.body.style.cursor = '';
        };
      }, [dragOverlay]);
      

      // 

      return (
        <div {...props} ref={ref}>
          {children}
        </div>
      );
    }
  )
);

export default ImageItem;
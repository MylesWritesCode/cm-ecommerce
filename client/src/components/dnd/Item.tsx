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
import React, { forwardRef } from "react";
import { Box } from "@chakra-ui/layout";

export const Item: React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLDivElement>
> = React.forwardRef(({ children, ...props }, ref) => {
  return (
    //  <Box ref={ref} {...props}>{children}</Box>
    <div {...props} ref={ref}>
      {children}
    </div>
  );
});

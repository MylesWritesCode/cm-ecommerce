/*
 * File: /src/lib/chakra-motion.ts
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Friday October 1st 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Friday October 1st 2021 4:12:18 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import {
  chakra,
  ChakraProps,
  ComponentWithAs,
  forwardRef,
} from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";

export type MotionBoxProps = Omit<ChakraProps, keyof MotionProps> &
  MotionProps & {
    as?: React.ElementType;
  };

export const MotionBox = motion(
  forwardRef<ChakraProps, "div">((props, ref) => {
    return <chakra.div ref={ref} {...props} />;
  })
) as ComponentWithAs<"div", MotionBoxProps>;

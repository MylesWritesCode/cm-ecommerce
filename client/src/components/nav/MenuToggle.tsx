/*
 * File: /src/components/nav/MenuToggle.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 22nd 2021
 * Author: Myles Berueda
 * Note: This looks nicer; it was taken from framer-motion examples.
 * -----
 * Last Modified: Wednesday September 22nd 2021 1:08:11 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import * as React from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@chakra-ui/react";

const Path = (props) => (
  <motion.path
    fill=""
    strokeWidth="3"
    stroke="hsl(0, 0%, 100%)"
    strokeLinecap="round"
    {...props}
  />
);

interface MenuToggleProps {
  toggle: () => void;
}

export const MenuToggle: React.FC<MenuToggleProps & ButtonProps> = ({
  toggle,
  ...props
}) => (
  <Button
    variant="link"
    userSelect="none"
    onClick={toggle}
    background="unset"
    boxShadow="none !important"
    outline="none"
    size="xs"
    {...props}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </Button>
);

/*
 * File: /src/components/nav/useDimensions.ts
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 22nd 2021
 * Author: Myles Berueda
 * Note: I'm only going to use this for the nav animation, so I'm just going to
 *       leave this in here.
 * -----
 * Last Modified: Wednesday September 22nd 2021 12:52:18 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { useEffect, useRef } from "react";

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of 
// ref/effect if this is important to know on initial client render. It would 
// be safer to  return null for unmeasured states.
// 
export const useDimensions = ref => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  return dimensions.current;
};

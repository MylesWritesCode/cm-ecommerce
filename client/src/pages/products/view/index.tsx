/**
 * File: /src/pages/products/view/index.tsx
 * Project: cm-ecommerce-client
 * Purpose: Default view page. Should probabaly have some default images in
 *          assets for this.
 *
 *          Note: I'm probably goign to change the naming convention for pages
 *          and components. Gonna see how I like it here.
 *
 * @author Myles Berueda
 * @date   Wednesday November 17th 2021
 * -----
 * Modified: Wednesday November 17th 2021 1:28:18 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 **/
import React from "react";
import { NextPage } from "next";
import { Flex } from "@chakra-ui/react";

import { VH, NavbarConfig } from "@constants";

interface ViewProductPageProps {}

export const ViewProductPage: NextPage<ViewProductPageProps> = ({
  ...props
}) => {
  return (
    <Flex flexDirection="column" minHeight={VH}>
      <div>View product page works!</div>
    </Flex>
  );
};

export default ViewProductPage;

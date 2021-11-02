/*
 * File: /src/pages/gallery/index.tsx
 * Project: cm-ecommerce-client
 * Created Date: Tuesday November 2nd 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Tuesday November 2nd 2021 5:31:26 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { Flex } from "@chakra-ui/react";
import { VH } from "@constants";
import Gallery from "@/components/gallery/Gallery";

import { devStockImages } from "@/components/gallery";

const GalleryPage: React.FC<{}> = ({}) => {
  return (
    <>
      <Flex
        minHeight={VH}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Gallery
          src={devStockImages}
          sx={{
            columnCount: [1, 2, 3],
            columnGap: "8px",
            columnFill: "balance-all",
          }}
        />
      </Flex>
    </>
  );
};

export default GalleryPage;

/*
 * File: /src/pages/products/Edit.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Thursday September 23rd 2021
 * Author: Myles Berueda
 * Note: If no id is passed through the link, then this route should fire. I've
 *       gotta figure out how to share components through nextjs, because the
 *       edit and
 * -----
 * Last Modified: Thursday September 23rd 2021 9:38:58 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useState } from "react";
import { Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import ChakraInput from "../../../components/ChakraInput";

import { VH } from "../../../constants";
import ChakraGridInput from "../../../components/ChakraGridInput";

interface EditProps {}

interface ProductValues {
  name: string;
}

export const Edit: React.FC<EditProps> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <Flex minHeight={VH} justifyContent="center">
      <Formik
        initialValues={{
          name: "",
          brand: "",
          sku: "",
          description: "",
          retailPrice: undefined,
          wholesalePrice: undefined,
        }}
        onSubmit={async (values: ProductValues, { setErrors }) => {}}
      >
        <Form>
          <Grid
            templateColumns="repeat(12, 1fr)"
            gridAutoRows="minmax(100px, auto)"
            gap={6}
            padding={10}
          >
            <ChakraGridInput
              name="name"
              label="Product name"
              placeholder="Enter the product's name"
              colSpan={6}
            />
            <ChakraGridInput
              name="brand"
              label="Brand"
              placeholder="Brand"
              colSpan={6}
            />
            <ChakraGridInput
              name="sku"
              label="SKU"
              placeholder="SKU"
              colSpan={6}
            />
            <ChakraGridInput
              name="description"
              label="Description"
              placeholder="Enter the product's description"
              rowSpan={1}
              colSpan={3}
            />
            <ChakraGridInput
              name="retailPrice"
              label="Retail Price"
              placeholder="$0.00"
              rowSpan={1}
              colSpan={3}
            />
            <ChakraGridInput
              name="wholesalePrice"
              label="Wholesale Price"
              placeholder="$0.00"
              rowSpan={1}
              colSpan={3}
            />
            <GridItem colSpan={5}>
              <Button
                size="sm"
                colorScheme="green"
                type="submit"
                ml="auto"
                borderRadius={0}
                // isLoading={isSubmitting}
              >
                Create product
              </Button>
            </GridItem>
          </Grid>
        </Form>
      </Formik>
    </Flex>
  );
};

export default Edit;

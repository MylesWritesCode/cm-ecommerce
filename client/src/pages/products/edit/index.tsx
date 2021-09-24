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

import { VH } from "../../../constants";
import ChakraGridInput from "../../../components/ChakraGridInput";
import {
  useCreateProductMutation,
  CreateProductMutationVariables as CreateProductValues,
} from "../../../generated/graphql";

interface EditProps {}

export const Edit: React.FC<EditProps> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createProduct] = useCreateProductMutation();
  return (
    <Flex minHeight={VH} justifyContent="center">
      <Formik
        initialValues={{
          name: "",
          brand: "",
          sku: "",
          description: "",
          retailPrice: 0.00,
          wholesalePrice: 0.00,
        }}
        onSubmit={async (values: CreateProductValues, { setErrors }) => {
          setIsSubmitting(true);
          console.log(values);

          await createProduct({
            variables: values,
            update: (cache, { data }) => {
              setIsSubmitting(false);
            },
          });
        }}
      >
        <Form>
          <Grid
            px={14} // 3.5rem
            py={12} // 3rem
            templateColumns="repeat(12, 1fr)"
            gridAutoRows="minmax(100px, auto)"
            rowGap="0"
            columnGap={8} // 2rem
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
              colSpan={4}
            />
            <ChakraGridInput
              name="sku"
              label="SKU"
              placeholder="SKU"
              colSpan={2}
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
              type="number"
              rowSpan={1}
              colSpan={3}
            />
            <ChakraGridInput
              name="wholesalePrice"
              label="Wholesale Price"
              placeholder="$0.00"
              type="number"
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

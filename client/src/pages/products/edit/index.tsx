/*
 * File: /src/pages/products/Edit.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Thursday September 23rd 2021
 * Author: Myles Berueda
 * Note: I've opted to use a grid-column/grid-row system, but it feels really
 *       clunkly. I may have to build this out with flex instead, and worry
 *       about responsiveness later.
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

import { VH, NavbarConfig } from "../../../constants";
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
          retailPrice: 0.0,
          wholesalePrice: 0.0,
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
            // mx={14} // 3.5rem
            // my={12} // 3rem
            templateColumns="repeat(12, 1fr)"
            gridAutoRows="minmax(100px, auto)"
            rowGap="0"
            columnGap={8} // 2rem
          >
            <GridItem
              display="flex"
              backgroundColor="black"
              backgroundImage={NavbarConfig.defaultHeaderImage}
              backgroundPosition="center"
              backgroundSize="cover"
              alignItems="center"
              justifyContent="center"
              gridColumn="1/13"
              gridRow="1/3"
            ></GridItem>
            <ChakraGridInput
              name="name"
              label="Product name"
              placeholder="Enter the product's name"
              gridColumn="2/6"
              gridRow="4/5"
            />
            <ChakraGridInput
              name="brand"
              label="Brand"
              placeholder="Brand"
              gridColumn="6/10"
              gridRow="4/5"
            />
            <ChakraGridInput
              name="sku"
              label="SKU"
              placeholder="SKU"
              gridColumn="10/12"
              gridRow="4/5"
            />
            <ChakraGridInput
              name="description"
              label="Description"
              placeholder="Enter the product's description"
              gridColumn="2/8"
              gridRow="5/6"
            />
            <ChakraGridInput
              name="retailPrice"
              label="Retail Price"
              placeholder="$0.00"
              type="money"
              gridColumn="8/10"
              gridRow="5/6"
            />
            <ChakraGridInput
              name="wholesalePrice"
              label="Wholesale Price"
              placeholder="$0.00"
              type="money"
              gridColumn="10/12"
              gridRow="5/6"
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

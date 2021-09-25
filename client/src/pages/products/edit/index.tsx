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
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { VH, NavbarConfig } from "../../../constants";
import ChakraGridInput from "../../../components/ChakraGridInput";
import {
  useCreateProductMutation,
  CreateProductMutationVariables as CreateProductValues,
} from "../../../generated/graphql";

interface EditProps {}

const style = {
  width: "768px",
};

export const Edit: React.FC<EditProps> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createProduct] = useCreateProductMutation();
  return (
    <>
      <Flex
        height="270px"
        minHeight="270px"
        maxHeight="270px"
        backgroundColor="black"
        backgroundImage={NavbarConfig.defaultHeaderImage}
        backgroundPosition="center"
        backgroundSize="cover"
        alignItems="center"
        justifyContent="center"
      >
        <Heading
          display="flex"
          color="white"
          backgroundColor="blackAlpha.300"
          min-width="100%"
          width="100%"
          height="100px"
          justifyContent="center"
          alignItems="center"
        >
          Add a product to the line
        </Heading>
      </Flex>
      <Flex minHeight={VH} size="md" justifyContent="center" padding={[8, 4]}>
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

            await createProduct({
              variables: values,
              update: (cache, { data }) => {
                setIsSubmitting(false);
                console.log("shouldn't we have data here")
                console.log(data);
              },
            });

          }}
        >
          <Form style={style}>
            <Grid
              templateColumns="repeat(12, 1fr)"
              gridAutoRows="minmax(100px, auto)"
              rowGap="0"
              columnGap={8} // 2rem
            >
              <ChakraGridInput
                name="name"
                label="Product name"
                placeholder="Enter the product's name"
                colSpan={[12, 5]}
              />
              <ChakraGridInput
                name="brand"
                label="Brand"
                placeholder="Brand"
                colSpan={[6, 4]}
              />
              <ChakraGridInput
                name="sku"
                label="SKU"
                placeholder="SKU"
                colSpan={[6, 3]}
              />
              <ChakraGridInput
                name="description"
                label="Description"
                placeholder="Enter the product's description"
                colSpan={[12, 8]}
              />
              <ChakraGridInput
                name="retailPrice"
                label="Retail Price"
                placeholder="$0.00"
                type="money"
                colSpan={[6, 2]}
              />
              <ChakraGridInput
                name="wholesalePrice"
                label="Wholesale Price"
                placeholder="$0.00"
                type="money"
                colSpan={[6, 2]}
              />
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
            </Grid>
          </Form>
        </Formik>
      </Flex>
    </>
  );
};

export default Edit;

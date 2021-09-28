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
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Flex, Grid, GridItem, Heading, Image } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { VH, NavbarConfig } from "@constants";
import ChakraGridInput from "@components/ChakraGridInput";
import {
  useCreateProductMutation,
  CreateProductMutationVariables as CreateProductValues,
} from "@generated/graphql";

interface EditProps {}

const style = {
  width: "768px",
};

export const Edit: React.FC<EditProps> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const imageInputRef = useRef(null);
  const [createProduct] = useCreateProductMutation();

  // Idk if there's a cleaner way to do this. This is kinda gross. I wanted just
  // an inline function on the button's `onClick` cb, but...ya'know.
  const onImageUploadClick = () => {
    imageInputRef.current.click();
  };

  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const images: FileList = event.target.files;
    let imgPre_: string[] = [];

    if (images) {
      for (let i = 0; i < images.length; ++i) {
        // Create an object URL to be used in image previews div.
        imgPre_.push(URL.createObjectURL(images[i]));
      }
      setImagePreviews(imgPre_);
    }
  };

  const handleImageClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const image: HTMLImageElement = event.target as HTMLImageElement;
    const imgPrev = imagePreviews;

    const index = imgPrev.findIndex((v: string) => {
      return v === image.src;
    });

    // This is the TS way to swap elements:
    [imgPrev[0], imgPrev[index]] = [imgPrev[index], imgPrev[0]];

    setImagePreviews(imgPrev);
  };

  return (
    <Flex flexDirection="column" minHeight={VH}>
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
      <Flex size="md" justifyContent="center" padding={[8, 4]}>
        <Formik
          initialValues={{
            name: "",
            brand: "",
            sku: "",
            description: "",
            retailPrice: 0,
            wholesalePrice: 0,
          }}
          onSubmit={async (values: CreateProductValues, { setErrors }) => {
            setIsSubmitting(true);

            await createProduct({
              variables: {
                ...values,
              },
              update: (cache, { data }) => {
                setIsSubmitting(false);
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
                placeholder="0.00"
                type="money"
                colSpan={[6, 2]}
              />
              <ChakraGridInput
                name="wholesalePrice"
                label="Wholesale Price"
                placeholder="0.00"
                type="money"
                colSpan={[6, 2]}
              />
              <GridItem
                colSpan={[12, 10]}
                max-width="600px"
                sx={{ columnCount: [1, 2, 3], columnGap: "8px" }}
              >
                {imagePreviews.map((ip, index) => {
                  return (
                    <Image
                      key={index}
                      src={ip}
                      width="100%"
                      minWidth="100%"
                      maxWidth="450px"
                      mb={2}
                      // p={2}
                      border={
                        index === 0 ? "5px solid #a755c2" : "5px solid #323338"
                      }
                      objectFit="cover"
                      bgGradient="linear(-45deg, #A755C2, #2a2c37)"
                      onClick={handleImageClick}
                    />
                  );
                })}
              </GridItem>
              <GridItem overflow="hidden" colSpan={[2]}>
                <Flex
                  height="100%"
                  flexDirection="column"
                  justifyContent="start"
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="imageInput"
                    style={{ display: "none" }}
                    multiple={true}
                    ref={imageInputRef}
                    onChange={handleImageInputChange}
                  />
                  <Button
                    size="sm"
                    colorScheme="linkedin"
                    ml="auto"
                    mb={5}
                    width="100%"
                    borderRadius={0}
                    onClick={onImageUploadClick}
                  >
                    Select Images
                  </Button>
                  <Button
                    width="100%"
                    size="sm"
                    colorScheme="green"
                    type="submit"
                    ml="auto"
                    borderRadius={0}
                    // isLoading={isSubmitting}
                  >
                    Publish
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          </Form>
        </Formik>
      </Flex>
    </Flex>
  );
};

export default Edit;

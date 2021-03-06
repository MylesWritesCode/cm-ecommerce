/**
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
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { VH, NavbarConfig } from "@constants";
import {
  useCreateProductMutation,
  CreateProductMutationVariables as CreateProductValues,
} from "@generated/graphql";

import ChakraGridInput from "@components/ChakraGridInput";
import { Gallery } from "@components/gallery";

interface EditProps {}

const style = {
  width: "768px",
};

export const Edit: React.FC<EditProps> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imgPreviews, setImgPreviews] = useState<string[]>([]);
  const [imgs, setImgs] = useState<Map<string, File>>();
  const imageInputRef = useRef(null);
  const [createProduct] = useCreateProductMutation();

  const onImageUploadClick = () => {
    imageInputRef.current.click();
  };

  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const images: FileList = event.target.files;
    let blobs: string[] = [];
    let filesWithBlobsAsKeys: Map<string, File> = new Map([]);

    if (images) {
      for (let i = 0; i < images.length; ++i) {
        // Create an object URL to be used in image previews div.
        const blob = URL.createObjectURL(images[i]);
        filesWithBlobsAsKeys.set(blob as string, images[i]);
        blobs.push(blob);
      }

      setImgs(filesWithBlobsAsKeys);
      setImgPreviews(blobs);
    }
  };

  useEffect(() => {
    if (imgs) {
      // console.log(Object.keys(imgs));
    }
  }, [imgPreviews]);

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

            // First, upload images to cloud storage.
            for (let i = 0; i < imgPreviews.length; ++i) {
              const file = imgs.get(imgPreviews[i]);
              const fileExt = file.name.substr(file.name.lastIndexOf("."));

              const objectName = imgPreviews[i].substr(
                imgPreviews[i].lastIndexOf("/") + 1
              );
            }

            // End upload, start createProduct GraphQL call to our backend
            await createProduct({
              variables: {
                // images: images,
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
              <GridItem colSpan={[12, 10]} max-width="600px">
                <Gallery
                  src={imgPreviews}
                  sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gridTemplateRows: "200px",
                    gridGap: "8px",
                  }}
                  wrapperSx={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "200px",
                    overflow: "hidden",
                  }}
                  pictureSx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  setOrderCb={setImgPreviews}
                />
              </GridItem>
              <GridItem overflow="hidden" colSpan={[2]}>
                <Flex
                  height="100%"
                  flexDirection="column"
                  justifyContent="start"
                  padding="0.125em"
                >
                  <input
                    type="file"
                    accept="image/*"
                    name="images"
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
                    boxShadow="none !important"
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
                    boxShadow="none !important"
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

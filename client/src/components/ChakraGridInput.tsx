/*
 * File: /src/components/ChakraGridInput.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Thursday September 23rd 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Thursday September 23rd 2021 4:09:01 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { GridItem, GridItemProps } from "@chakra-ui/layout";
import { ChakraInput, ChakraInputProps } from "./ChakraInput";

interface ChakraGridInputProps {
  // I only need the name, not gonna mess with InputProps from @chakra-ui
  name: string; 
  type?: string;
}
type Props = ChakraGridInputProps & ChakraInputProps & GridItemProps;

export const ChakraGridInput: React.FC<Props> = ({ ...props }) => {
  const { label, name, type, placeholder } = props;
  return (
    <GridItem {...props}>
      <ChakraInput
        label={label}
        name={name}
        type={type}
        width="max-width"
        placeholder={placeholder}
      />
    </GridItem>
  );
};

export default ChakraGridInput;

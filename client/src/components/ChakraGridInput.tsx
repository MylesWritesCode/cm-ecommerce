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
import React from 'react';
import { Grid, GridItem, GridItemProps } from '@chakra-ui/layout';
import { ChakraInput, ChakraInputProps } from './ChakraInput';

interface ChakraGridInputProps {}
type ShortProps = ChakraGridInputProps & ChakraInputProps & GridItemProps;

export const ChakraGridInput: React.FC<ShortProps> = ({ ...props }) => {
  const { label, name, placeholder } = props;
  console.log(props);
  return (
    <GridItem {...props}>
      <ChakraInput label={label} name={name} placeholder={placeholder}/>
    </GridItem>
  );
}

export default ChakraGridInput;
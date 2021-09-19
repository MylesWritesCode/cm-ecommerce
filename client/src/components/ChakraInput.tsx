/*
 * File: /src/components/ChakraInput.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Thursday September 16th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Thursday September 16th 2021 3:48:19 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { Field } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";

interface ChakraInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  width?: string | Array<number>;
  validateCallback?: (value: string) => string;
}

export const ChakraInput: React.FC<ChakraInputProps> = ({ ...props }) => {
  const { label, name, helperText, width, validateCallback, ...rest } = props;

  return (
    <Field name={name} validate={validateCallback}>
      {({ field, form }) => (
        <FormControl
          id={name}
          py={3}
          width={width ? width : [270]}
          isInvalid={form.errors[name] && form.touched[name]}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <FormLabel htmlFor={name} fontSize="xs" mb={1}>
              {label}
            </FormLabel>
            <FormErrorMessage fontSize="xx-small" my={0}>
              {form.errors[name]}
            </FormErrorMessage>
          </Flex>
          <Input id={name} size="sm" {...field} {...rest} />
          <FormHelperText fontSize="xx-small">{helperText}</FormHelperText>
        </FormControl>
      )}
    </Field>
  );
};

export default ChakraInput;

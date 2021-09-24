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
  InputProps,
} from "@chakra-ui/react";

export interface ChakraInputProps {
  label: string;
  helperText?: string;
  validateCallback?: (value: string) => string;
}
type Props = ChakraInputProps & InputProps;

export const ChakraInput: React.FC<Props> = ({ ...props }) => {
  const { label, helperText, validateCallback, ...input } = props;

  return (
    <Field name={input.name} validate={validateCallback}>
      {({ field, form }) => (
        <FormControl
          id={input.name}
          py={3}
          isInvalid={form.errors[input.name] && form.touched[input.name]}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <FormLabel htmlFor={input.name} fontSize="xs" mb={1}>
              {label}
            </FormLabel>
            <FormErrorMessage fontSize="xx-small" my={0}>
              {form.errors[input.name]}
            </FormErrorMessage>
          </Flex>
          <Input id={input.name} size="sm" {...field} {...input} width="100%" />
          <FormHelperText fontSize="xx-small">{helperText}</FormHelperText>
        </FormControl>
      )}
    </Field>
  );
};

export default ChakraInput;

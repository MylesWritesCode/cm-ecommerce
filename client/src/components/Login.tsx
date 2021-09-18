/*
 * File: /src/components/Login.component.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Friday September 17th 2021
 * Author: Myles Berueda
 * Note: The current use for this is to be able to load the login component as
 *       a modal on other pages for the user to log in.
 * -----
 * Last Modified: Friday September 17th 2021 4:29:18 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */

import React, { useState } from "react";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import { ChakraInput } from "./ChakraInput";
import { useLoginQuery } from "../generated/graphql";

interface LoginProps {};

export const Login: React.FC<LoginProps> = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [login] = useLoginQuery();
  return (
    <Flex
      my={5}
      p={10}
      justifyContent="center"
      alignItems="center"
      border="0.5px solid #E2E8F0"
      borderRadius={0}
      boxShadow="md"
    >
      <Formik
        initialValues={{
          login: "",
          password: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          setIsSubmitting(true);
          const response = await login(values);
          console.log(response);
        }}
      >
        <Form>
          <ChakraInput
            name="login"
            label="Login"
            placeholder="Enter your username or email"
            helperText="We'll never share your email with anyone."
          />
          <ChakraInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <Flex>
            <Button
              size="sm"
              colorScheme="blue"
              type="submit"
              ml="auto"
              borderRadius={0}
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Flex>
        </Form>
      </Formik>
    </Flex>
  );
};

export default Login;
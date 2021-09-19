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
import { Formik, Form, FormikHelpers } from "formik";
import { Flex, Button } from "@chakra-ui/react";

import { ChakraInput } from "./ChakraInput";
import { useLoginMutation } from "../generated/graphql";

interface LoginProps {}

function validate(value: string): string {
  let error: string;
  if (!value) {
    error = "This field is required.";
  }

  return error;
}

interface LoginValues {
  login: string;
  password: string;
}

export const Login: React.FC<LoginProps> = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [login] = useLoginMutation();
  return (
    <Flex
      my={5}
      p={10}
      height="max-content"
      justifyContent="center"
      alignItems="center"
      border="0.5px solid #E2E8F0"
      borderRadius={0}
      boxShadow="md"
      backgroundColor="white"
    >
      <Formik
        initialValues={{
          login: "",
          password: "",
        }}
        onSubmit={async (
          values: LoginValues,
          { setStatus }: FormikHelpers<LoginValues>
        ) => {
          setIsSubmitting(true);
          const { data, errors } = await login({ variables: values });

          // We are no longer submitting, we should have something from backend.
          setIsSubmitting(false);
          
          // This means we have GraphQL errors.
          if (errors) {
            // Just tell the user there was an internal error.
            setError("Internal server error");
          }

          // We have a general error here. Let's parse it.
          if (data.login[0].__typename === "GeneralError") {
            const error = data.login[0];
            if (error.code === "NO_MATCH") {
              // We want to set the field's error message here.
              setError(error.message);
            }
          }

          // If the first element in the array is a user, we have a user.
          if (data.login[0].__typename === "User") {
            // And if we have a user, we should just do something else with the
            // component. IMO, since I want to use this as a modal, I think the
            // best bet is to close the component.
          }
        }}
      >
        <Form>
          {error ? (
            <Flex
              px={0}
              margin="auto"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              fontSize="xs"
              color="red"
              maxWidth="fit-content"
            >
              {error}
            </Flex>
          ) : null}
          <ChakraInput
            name="login"
            label="Login"
            placeholder="Enter your username or email"
            helperText="We'll never share your email with anyone."
            validateCallback={validate}
          />
          <ChakraInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            validateCallback={validate}
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

/*
 * File: /src/components/auth/Login.tsx
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
import { Formik, Form } from "formik";
import { Flex, Button } from "@chakra-ui/react";
import { ChakraInput } from "../ChakraInput";
import { useLoginMutation } from "../../generated/graphql";

interface LoginProps {
  closeModalCallback: () => void;
}

function validate(values: LoginValues) {
  let errors: LoginValues = { login: "", password: "" };
  
  if (!values.login) {
    errors.login = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
}

interface LoginValues {
  login: string;
  password: string;
}

export const Login: React.FC<LoginProps> = ({ ...props }) => {
  // Need this to be able to close the modal on success.
  const { closeModalCallback } = props;

  // Hooks
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [login] = useLoginMutation();

  return (
    <Formik
      initialValues={{
        login: "",
        password: "",
      }}
      onSubmit={async (values: LoginValues) => {
        setIsSubmitting(true);
        const { data, errors } = await login({ variables: values });
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
          // Close the modal
          setTimeout(() => {
            closeModalCallback();
          }, 100);
        }
      }}
      validate={validate}
    >
      <Form>
        <Flex
          px={0}
          margin="auto"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          fontSize="xs"
          color={error ? "red" : "black"}
          maxWidth="fit-content"
        >
          {error ? error : "Please enter your login information"}
        </Flex>
        <ChakraInput
          name="login"
          label="Login"
          placeholder="Enter your username or email"
          helperText="We'll never share your email with anyone."
          autoComplete="username"
        />
        <ChakraInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          autoComplete="current-password"
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
  );
};

export default Login;

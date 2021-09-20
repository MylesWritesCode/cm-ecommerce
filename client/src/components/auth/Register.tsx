/*
 * File: /src/components/auth/Register.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Sunday September 19th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Sunday September 19th 2021 12:33:16 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Flex, Button } from "@chakra-ui/react";
import { ChakraInput } from "../ChakraInput";
import { useRegisterMutation } from "../../generated/graphql";

interface RegisterProps {}

function validate(value: string): string {
  // todo: write out some better validations
  let error: string;
  if (!value) {
    error = "This field is required.";
  }
  return error;
}

interface RegisterValues {
  username: string;
  email: string;
  password: string;
}

export const Register: React.FC<RegisterProps> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [register] = useRegisterMutation();

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      onSubmit={async (values: RegisterValues) => {
        setIsSubmitting(true);
        const { data, errors } = await register({ variables: values });
        setIsSubmitting(false);

        // This means we have GraphQL errors.
        if (errors) {
          // Just tell the user there was an internal error.
          setError("Internal server error");
        }

        // We have a general error here. Let's parse it.
        if (data.register[0].__typename === "GeneralError") {
          const error = data.register[0];
          if (error.code === "NO_MATCH") {
            // We want to set the field's error message here.
            setError(error.message);
          }
        }

        // If the first element in the array is a user, we have a user.
        if (data.register[0].__typename === "User") {
          // do something with the user
        }
      }}
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
          name="username"
          label="Username"
          placeholder="Enter your username"
          validateCallback={validate}
        />
        <ChakraInput
          name="email"
          label="Email"
          placeholder="Enter your email"
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
            Register
          </Button>
        </Flex>
      </Form>
    </Formik>
  );
};

export default Register;

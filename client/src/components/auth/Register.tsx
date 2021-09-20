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
import * as Yup from "yup";
import { ChakraInput } from "../ChakraInput";
import { toErrorMap } from "../../utils";
import { useRegisterMutation } from "../../generated/graphql";

interface RegisterProps {
  closeModalCallback: () => void;
}

interface RegisterValues {
  username: string;
  email: string;
  password: string;
}

const RegisterErrorSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Requierd"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
});

export const Register: React.FC<RegisterProps> = ({ ...props }) => {
  const { closeModalCallback } = props;

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
      onSubmit={async (values: RegisterValues, { setErrors }) => {
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
          const errors = data.register;

          // Map the error responses to their respective fields in the form.
          setErrors(toErrorMap(errors));
        }

        // If the first element in the array is a user, we have a user.
        if (data.register[0].__typename === "User") {
          closeModalCallback();
        }
      }}
      validationSchema={RegisterErrorSchema}
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
          autoComplete="username"
        />
        <ChakraInput
          name="email"
          label="Email"
          placeholder="Enter your email"
          autoComplete="email"
          helperText="We'll never share your email with anyone."
        />
        <ChakraInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          autoComplete="new-password"
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

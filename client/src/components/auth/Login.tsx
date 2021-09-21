/*
 * File: /src/components/auth/Login.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Friday September 17th 2021
 * Author: Myles Berueda
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
import * as Yup from "yup";
import { ChakraInput } from "../ChakraInput";
import { MeDocument, MeQuery, useLoginMutation } from "../../generated/graphql";

interface LoginProps {
  closeModal: () => void;
}

const LoginErrorSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
});

interface LoginValues {
  login: string;
  password: string;
}

export const Login: React.FC<LoginProps> = ({ ...props }) => {
  const { closeModal } = props;
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
        const { data, errors } = await login({
          variables: values,
          update: (cache, { data }) => {
            setIsSubmitting(false);

            // We have a general error here. Let's parse it.
            if (data.login[0].__typename === "GeneralError") {
              const error = data.login[0];
              if (error.code === "NO_MATCH") {
                // We want to set the field's error message here.
                setError(error.message);
              }
            }

            if (data.login[0].__typename === "User") {
              // This means we have a user. Write to the cache.
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.login[0],
                },
              });

              // Need to close the modal so its not there when we logout.
              closeModal();
            }
          },
        });

        // This means we have GraphQL errors.
        if (errors) {
          // Just tell the user there was an internal error.
          setError("Internal server error");
        }
      }}
      validationSchema={LoginErrorSchema}
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

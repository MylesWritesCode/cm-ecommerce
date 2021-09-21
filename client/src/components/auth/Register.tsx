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
import {
  MeDocument,
  MeQuery,
  useRegisterMutation,
} from "../../generated/graphql";
import { ChakraInput } from "../ChakraInput";
import { toErrorMap } from "../../utils";

interface RegisterProps {
  closeModal: () => void;
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
  const { closeModal } = props;

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
        debugger;
        try {
          // We can also destructure this, but there's no need since we're
          // handling everything in the update callback.
          await register({
            variables: values,
            update: (cache, { data }) => {
              setIsSubmitting(false);

              // We have a general error here. Let's parse it.
              if (data.register[0].__typename === "GeneralError") {
                const errors = data.register;

                // Map the error responses to their respective fields in the form.
                setErrors(toErrorMap(errors));
              }

              if (data.register[0].__typename === "User") {
                // This means we have a user. Write to the cache.
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.register[0],
                  },
                });

                // Need to close the modal so its not there when we logout.
                closeModal();
              }
            },
          });
        } catch (e) {
          setIsSubmitting(false);
          setError("Auth service unreachable. Try again later.");
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

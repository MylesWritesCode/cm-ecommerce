/*
 * File: /src/components/Login.component.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Friday September 17th 2021
 * Author: Myles Berueda
 * Note: The current use for this is to be able to load the login component as
 *       a modal on other pages for the user to log in.
 *
 *       While I'd like to stick the modal in it's own component, there's too
 *       many things that I need to control within the modal. For this reason,
 *       I'm going to leave all the code within this component.
 * -----
 * Last Modified: Friday September 17th 2021 4:29:18 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Flex,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Heading,
  ModalFooter,
} from "@chakra-ui/react";
import { SITE_TITLE } from "../constants";
import { ChakraInput } from "./ChakraInput";
import { useLoginMutation } from "../generated/graphql";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  headerImageUrl?: string;
}

function validate(value: string): string {
  // todo: write out some better validations
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

export const Login: React.FC<LoginProps> = ({ ...props }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [login] = useLoginMutation();

  const { isOpen, onClose, headerImageUrl } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={0} boxShadow="md">
        <ModalHeader
          display="flex"
          height="12vh"
          maxHeight="12vh"
          minHeight="12vh"
          px={0}
          borderBottom="1px solid #E2E8F0"
          backgroundColor="black"
          backgroundImage={
            headerImageUrl ? headerImageUrl : "/default-login-header.png"
          }
          backgroundPosition="center"
          backgroundSize="cover"
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            backgroundColor="rgba(0, 0, 0, 0.2)"
            padding={2}
            width="100%"
            justifyContent="center"
          >
            <Heading
              as="em"
              fontSize="4vw"
              bgGradient="linear(to-b, #ffffff, #ffffff)"
              backgroundClip="text"
            >
              {SITE_TITLE}
            </Heading>
          </Flex>
        </ModalHeader>
        <ModalBody
          // my={5}
          px={20}
          paddingBottom={10}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
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
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={0}
          pt={0}
        >
          <Text fontSize="xs">Don't have an account? Register now</Text>
          <Text fontSize="xs">Forgot your password? Click here</Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Login;

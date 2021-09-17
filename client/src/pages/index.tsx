import { Container } from "../components/Container";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import React, { useState } from "react";

const Index: React.FC<{}> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    // <Container height="100vh">
    <Container>
      <Flex my={5} minWidth="768px" justifyContent="center" alignItems="center">
        <Formik
          initialValues={{
            login: "",
            password: "",
          }}
          onSubmit={async (values) => {
            console.log(values);
            setIsSubmitting(true);
          }}
        >
          <Form>
            <Field name="login">
              {({ field, form }) => (
                <FormControl id="login" isRequired py={3} minWidth="270px">
                  <FormLabel mb={0} fontSize="xs">
                    Username or email
                  </FormLabel>
                  <Input
                    {...field}
                    type="login"
                    placeholder="Enter a username or email address"
                    size="sm"
                  />
                  <FormHelperText fontSize="xx-small">
                    We'll never share your email with anyone.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }) => (
                <FormControl id="password" isRequired py={3} minWidth="270px">
                  <FormLabel mb={0} fontSize="xs">
                    Password
                  </FormLabel>
                  <Input
                    {...field}
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    size="sm"
                  />
                </FormControl>
              )}
            </Field>
            <Flex>
              <Button
                size="sm"
                colorScheme="blue"
                type="submit"
                ml="auto"
                borderRadius={0}
                // isLoading={isSubmitting}
              >
                Login
              </Button>
            </Flex>
          </Form>
        </Formik>
      </Flex>
    </Container>
    // </Container>
  );
};

export default Index;

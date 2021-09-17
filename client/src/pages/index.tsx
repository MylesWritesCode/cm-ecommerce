import { Container } from "../components/Container";
import {
  Button,
  Flex,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { ChakraInput } from "../components/ChakraInput";

const Index: React.FC<{}> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    // <Container height="100vh">
    <Container>
      <Flex my={5} width={[768]} justifyContent="center" alignItems="center">
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
            <ChakraInput
              name="login"
              label="Login"
              placeholder="Enter a username or password"
              helperText="We'll never share your email with anyone."
            />
            <ChakraInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
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

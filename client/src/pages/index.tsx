/*
 * File: /src/pages/index.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Sunday September 12th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Sunday September 12th 2021 10:22:49 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { NextPage } from "next";
import {
  Flex,
  Heading,
  Text,
  List,
  ListIcon,
  Link as ChakraLink,
  Icon,
  useColorMode,
  chakra,
  ListItem,
} from "@chakra-ui/react";
import { VH } from "@constants";

import { FaTwitter } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

const Link = chakra(ChakraLink, {
  baseStyle: {
    _hover: {
      textDecoration: "none",
      boxShadow: "0px 2px",
    },
  },
});

const Index: NextPage<{}> = ({}) => {
  // Color mode for bg
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.50", dark: "gray.900" };

  return (
    <>
      <Flex
        minHeight={VH}
        width="100vw"
        background={bgColor[colorMode]}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Flex padding="2em" flexDirection="column">
          <Heading>So, what is this project 🤔</Heading>
          <Text>
            This is a little playground that I'm using to learn more about web
            development. It's just a test-box that will eventually be
            implemented in other projects. If something is broken, it's broken
            because I'm figuring it out. If you have any suggestions, feel free
            to DM me on Twitter{" "}
            <Link
              href="https://www.twitter.com/mylescodesemoji"
              target="_blank"
              rel="noreferrer"
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
            >
              <Icon as={FaTwitter} />
              @mylescodesemoji
            </Link>
            {". "}
          </Text>
          <Flex margin="2em 0em" flexDirection="column">
            <Heading>What does this project use?</Heading>
            <Text>
              The technology that I chose for this stack largely depends on what
              I want to learn or mess around with. This is a fullstack project,
              leveraging PostgreSQL for the backend, though this could be
              changed to any other DB as needed.
            </Text>
            <Heading marginTop="1em" fontSize="2xl">
              Frontend
            </Heading>
            <Text>
              Lorem ipsum random content text. I should write something here
              eventually. Like the word placeholder. Plethora. Thanks, that
              means a lot.
            </Text>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                React with Typescript
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Next.js
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                ChakraUI
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Formik
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Yup
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Framer Motion
              </ListItem>
            </List>
            <Heading marginTop="1em" fontSize="2xl">
              Backend
            </Heading>
            <Text>
              Lorem ipsum random content text. I should write something here
              eventually. Like the word placeholder. Plethora. Thanks, that
              means a lot.
            </Text>
            <List spacing={2}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Express with Typescript
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Apollo
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                TypeORM
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                GraphQL
              </ListItem>
            </List>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Index;

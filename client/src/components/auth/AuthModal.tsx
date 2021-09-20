/*
 * File: /src/components/auth/AuthModal.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Sunday September 19th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Sunday September 19th 2021 11:53:15 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useState } from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Heading,
  ModalFooter,
} from "@chakra-ui/react";
import { Login } from "./Login";
import { AuthFooter } from "./AuthFooter";
import { SITE_TITLE } from "../../constants";
import Register from "./Register";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: "login" | "forgot-password" | "register";
  headerImageUrl?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ ...props }) => {
  
  const { isOpen, onClose, headerImageUrl } = props;
  const [variant, setVariant] = useState(props.variant);

  const changeVariant = (value: "login" | "forgot-password" | "register") => {
    setVariant(value);
  };

  let component = <Login />;
  if (variant === "register") component = <Register />;
  const footer = <AuthFooter onLinkClick={changeVariant} variant={variant}/>;

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
              size="xl"
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
          {component}
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={0}
          pt={0}
        >
          {footer}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;

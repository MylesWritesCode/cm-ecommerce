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
import React from "react";
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
import { Login, Register, AuthFooter } from "./";
import { NavbarConfig } from "@constants";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: "register" | "login" | "forgot-password";
  headerImageUrl?: string;
  changeVariantCallback: (
    variant: "register" | "login" | "forgot-password"
  ) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ ...props }) => {
  const { isOpen, onClose, headerImageUrl, changeVariantCallback } = props;

  // Set component and footer that will change the contents of the modal.
  let component: React.ReactElement;
  let footer: React.ReactElement;

  if (props.variant === "register") {
    component = <Register closeModal={onClose} />;
  } else if (props.variant === "forgot-password") {
    component = <Register closeModal={onClose} />;
  } else {
    component = <Login closeModal={onClose} />;
  }

  // The footer will always be the same - the only change is the variant
  footer = (
    <AuthFooter
      changeVariantCallback={(variant: typeof props.variant) => {
        changeVariantCallback(variant);
      }}
      variant={props.variant}
    />
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      returnFocusOnClose={false}
    >
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
              {NavbarConfig.brand}
            </Heading>
          </Flex>
        </ModalHeader>
        <ModalBody
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

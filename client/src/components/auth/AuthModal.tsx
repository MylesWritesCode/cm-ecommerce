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
import { Register } from "./Register";
import { AuthFooter } from "./AuthFooter";
import { SITE_TITLE } from "../../constants";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: "login" | "forgot-password" | "register";
  headerImageUrl?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ ...props }) => {
  const { isOpen, onClose, headerImageUrl } = props;
  
  // Hooks
  const [variant, setVariant] = useState(props.variant);

  const changeVariant = (value: "login" | "forgot-password" | "register") => {
    setVariant(value);
  };

  // Set component and footer that will change the contents of the modal.
  let component: React.ReactElement; 
  let footer: React.ReactElement;

  switch(variant) {
    case "register":
      component = <Register closeModalCallback={onClose} />;
      break;
    case "forgot-password":
      component = <Register closeModalCallback={onClose} />
      break;
    default:
      // component = <Register closeModalCallback={onClose} />
      component = <Login closeModalCallback={onClose} />
      break;
  }

  // The footer will always be the same - the only thing that changes is variant
  footer = <AuthFooter onLinkClick={changeVariant} variant={variant} />;

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

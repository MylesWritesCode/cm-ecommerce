/*
 * File: /src/components/auth/AuthFooter.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Sunday September 19th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Sunday September 19th 2021 12:06:07 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { Link, Text } from "@chakra-ui/react";

interface AuthFooterProps {
  variant: string;
  onLinkClick: any;
}

function testLinkClick(value: string) {
  console.log("for some reason this is being clicked");
}

export const AuthFooter: React.FC<AuthFooterProps> = ({ ...props }) => {
  const { variant, onLinkClick } = props;
  return (
    <>
      {variant === "login" ? (
        <Text fontSize="xs">
          Don't have an account?{" "}
          <Link onClick={() => onLinkClick("register")}>Register now</Link>
        </Text>
      ) : (
        <Text fontSize="xs">
          Already have an account?{" "}
          <Link onClick={() => onLinkClick("login")}>Log in now</Link>
        </Text>
      )}
      <Text fontSize="xs">Forgot your password? Click here</Text>
    </>
  );
};

export default AuthFooter;

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
  variant: "register" | "login" | "forgot-password";
  changeVariantCallback: (
    variant: "register" | "login" | "forgot-password"
  ) => void;
}

export const AuthFooter: React.FC<AuthFooterProps> = ({ ...props }) => {
  const { variant, changeVariantCallback } = props;
  return (
    <>
      {variant === "login" ? (
        <Text fontSize="xs">
          Don't have an account?{" "}
          <Link onClick={() => changeVariantCallback("register")}>
            Register now
          </Link>
        </Text>
      ) : (
        <Text fontSize="xs">
          Already have an account?{" "}
          <Link onClick={() => changeVariantCallback("login")}>Log in now</Link>
        </Text>
      )}
      <Text fontSize="xs">Forgot your password? Click here</Text>
    </>
  );
};

export default AuthFooter;

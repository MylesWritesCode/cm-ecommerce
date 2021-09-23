/*
 * File: /src/components/ConditionalLink.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Thursday September 23rd 2021
 * Author: Myles Berueda
 * Note: I need a helper class that conditionally surrounds a block of code in
 *       a link, because NextLink *requires* an href and can't be null or 
 *       undefined.
 * -----
 * Last Modified: Thursday September 23rd 2021 7:05:04 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React from "react";
import { Link } from "@chakra-ui/react"
import NextLink from "next/link";

interface ConditionalNextLink {
  to: string;
  condition?: string | boolean;
}

export const ConditionalNextLink: React.FC<ConditionalNextLink> = ({
  children,
  to,
  condition,
}) => {
  // If there's no condition, we're just going to assume that passing a link to
  // the `to` property is the dev saying "Hey give me a link...conditionally".
  if (!condition) condition = to;

  if (!!condition && to) {
    return <Link as={NextLink} href={to}>{children}</Link>;
  } else {
    return <>{children}</>;
  }
};

export default ConditionalNextLink;

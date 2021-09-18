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
import React, { useState } from "react";
import { Container } from "../components/Container";

// Components
import { Login } from "../components/Login";

const Index: React.FC<{}> = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    // <Container height="100vh">
    <Container>
      <Login />
    </Container>
    // </Container>
  );
};

export default Index;

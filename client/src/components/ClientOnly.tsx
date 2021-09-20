/*
 * File: /src/components/ClientOnly.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Monday September 20th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Monday September 20th 2021 2:49:31 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { useEffect, useState } from "react";

interface ClientOnlyProps {}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
};

export default ClientOnly;
/*
 * File: /src/components/Navbar.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Saturday September 18th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Saturday September 18th 2021 11:01:29 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { useRef } from "react";
import { Flex, FlexProps, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { motion, useCycle } from "framer-motion";

import { MenuDrawer } from "./MenuDrawer";
import { MenuToggle } from "./MenuToggle";
import { NavbarAuthInfo } from "./NavbarAuthInfo";

import { NavbarConfig } from "../../constants";
import ClientOnly from "../ClientOnly";
import { useDimensions } from "./useDimensions";

interface NavbarProps {}

export const MotionFlex = motion<FlexProps>(Flex);

export const Navbar: React.FC<NavbarProps> = () => {
  // const [isMenuOpen, toggleMenu] = useCycle(false, true);
  const [isMenuOpen, toggleMenu_] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  
  const toggleMenu = () => {
    console.log("i am toggled");
    toggleMenu_()
  }
  
  console.log(isMenuOpen);

  const sidebarAnimation = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        duration: "0.2",
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: `circle(0px at 30px -60px)`,
      transition: {
        delay: 0.125,
        type: "spring",
        stiffness: 50,
      },
    },
  };

  return (
    <Flex
      backgroundColor="#2a2c37"
      width="100%"
      height={NavbarConfig.height}
      px={3}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex id="brand-and-menu" justifyContent="center" alignItems="center">
        <Flex justifyContent="center" alignItems="center" userSelect="none">
          <MotionFlex
            initial={false}
            animate={isMenuOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
          >
            {/* This is the background */}
            <MotionFlex
              position="absolute"
              top="60px"
              left="0"
              bottom="0"
              width={NavbarConfig.drawer.width}
              backgroundColor="#323338"
              variants={sidebarAnimation}
            />
            <MenuDrawer toggle={() => toggleMenu()}/>
            <MenuToggle mr={3} toggle={() => toggleMenu()} />
          </MotionFlex>
          <Link as={NextLink} href="/">
            <Heading
              as="em"
              size="xl"
              bgGradient="linear(to-b, #ffffff, #ffffff)"
              backgroundClip="text"
              cursor="pointer"
            >
              {NavbarConfig.brand}
            </Heading>
          </Link>
        </Flex>
      </Flex>
      <ClientOnly>
        <Flex id="info-box">
          <NavbarAuthInfo />
        </Flex>
      </ClientOnly>
    </Flex>
  );
};

export default Navbar;

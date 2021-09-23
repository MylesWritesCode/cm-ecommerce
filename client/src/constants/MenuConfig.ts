/*
 * File: /src/constants/MenuConfig.ts
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Wednesday September 22nd 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Wednesday September 22nd 2021 2:59:05 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */

// Menu items should match this shape. If something is a header, mark the type
// as header and add children to be shown within their group. Icon can come
// from either ChakraUI or react-icons, but we'll use Chakra's Icon class to
// render them.
import { ComponentWithAs } from "@chakra-ui/react";
import { AddIcon, IconProps } from "@chakra-ui/icons";
import { IconType } from "react-icons/lib";
import { MdSettings } from "react-icons/md";

export interface MenuConfigItem {
  name: string;
  link?: string;
  icon?: IconType | ComponentWithAs<"svg", IconProps>;
  type?: "header" | "item" | null;
  children?: MenuConfigItem[];
}

export const MENU_CONFIG: MenuConfigItem[] = [
  {
    name: "The header",
    type: "header",
    children: [
      {
        name: "the first child item",
        link: "first-child-href",
      },
      {
        name: "the second child item",
        link: "second-child-href",
      },
      {
        name: "the third child item",
        link: "third-child-href",
      },
    ],
  },
  {
    name: "The header, part 2",
    type: "header",
    children: [
      {
        name: "the first child item",
        link: "first-child-href",
      },
      {
        name: "the second child item",
        link: "second-child-href",
      },
      {
        name: "the third child item",
        link: "third-child-href",
      },
    ],
  },
];

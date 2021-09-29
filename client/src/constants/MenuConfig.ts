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
import {
  AddIcon,
  AtSignIcon,
  CopyIcon,
  EditIcon,
  IconProps,
  RepeatClockIcon,
} from "@chakra-ui/icons";
import { IconType } from "react-icons/lib";
import { MdSettings } from "react-icons/md";

export interface MenuConfigItem {
  name: string;
  link?: string;
  icon?: IconType | ComponentWithAs<"svg", IconProps>;
  type?: "header" | "item" | null;
  children?: MenuConfigItem[];
}

export const MenuConfig: MenuConfigItem[] = [
  {
    name: "Products",
    type: "header",
    children: [
      {
        name: "Add a product",
        link: "/products/edit",
        icon: AddIcon,
      },
      {
        name: "react-beautiful-dnd",
        link: "/react-beautiful-dnd",
        icon: MdSettings,
      },
      {
        name: "the third child item",
        link: "third-child-href",
        icon: AtSignIcon,
      },
    ],
  },
  {
    name: "Orders",
    type: "header",
    children: [
      {
        name: "the first child item",
        link: "first-child-href",
        icon: CopyIcon,
      },
      {
        name: "the second child item",
        link: "second-child-href",
        icon: EditIcon,
      },
      {
        name: "Review all orders",
        link: "third-child-href",
        icon: RepeatClockIcon,
      },
    ],
  },
];

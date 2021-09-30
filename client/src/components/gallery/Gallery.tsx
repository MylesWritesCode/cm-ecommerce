/*
 * File: /src/components/gallery/Gallery.tsx
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Tuesday September 28th 2021
 * Author: Myles Berueda
 * Note: This is responsible for instantiating the columns.
 * -----
 * Last Modified: Tuesday September 28th 2021 2:33:57 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import React, { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import {
  Box,
  BoxProps,
  Image,
  ImageProps,
  Heading,
  UnorderedList,
  ListItem,
  Button,
  Icon,
  ButtonProps,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  closestCenter,
  DragOverlay,
  DragCancelEvent,
  MeasuringConfiguration,
  MeasuringStrategy,
  useDndContext,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import dynamic from "next/dynamic";

import { Draggable, Droppable } from "@components/dnd";
import Sortable from "../dnd/Sortable";
import { DeleteIcon } from "@chakra-ui/icons";
import { CSS } from "@dnd-kit/utilities";
import { ChakraInputProps } from "../ChakraInput";

interface GalleryProps {
  src: string[];
}

const measuring: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

type Props = GalleryProps & BoxProps;
export const Gallery: React.FC<Props> = ({ ...props }) => {
  const { src, sx } = props;
  const [images, setImages] = useState(src);
  const [isWindowReady, setIsWindowReady] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const activeIndex = activeId ? images.indexOf(activeId) : -1;

  // This will run once on mount.
  useEffect(() => {
    setIsWindowReady(true);
  }, []);

  // If there's no images, just return a simple box.
  if (!src) return <Box></Box>;

  const onDragStart = (ev: DragStartEvent) => {
    const { active } = ev;
    setActiveId(active.id);
  };

  const onDragCancel = (ev: DragCancelEvent) => {
    setActiveId(null);
  };

  const onDragEnd = (ev: DragEndEvent) => {
    const { active, over } = ev;
    if (active.id !== over.id) {
      setImages((images) => {
        const oldIndex = images.indexOf(active.id);
        const newIndex = images.indexOf(over.id);

        return arrayMove(images, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const sortableComp = (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
      sensors={sensors}
      collisionDetection={closestCenter}
      measuring={measuring}
    >
      <SortableContext items={images}>
        <Box sx={sx}>
          {images.map((image, index) => (
            <SortableItem
              key={image}
              id={image}
              index={index + 1}
              sx={{
                backgroundImage: image,
              }}
              activeIndex={activeIndex}
              onRemove={() => {
                setImages((images) => images.filter((i) => i !== image));
              }}
            />
          ))}
        </Box>
      </SortableContext>
      <DragOverlay>
        {activeId ? <ItemOverlay id={activeId} items={images} /> : null}
      </DragOverlay>
    </DndContext>
  );

  // Need to wait for the window to be ready before loading everything,
  // otherwise the drag handles aren't going to load correctly.
  return isWindowReady ? sortableComp : null;
};

export default Gallery;

interface ItemOverlayProps extends Omit<ItemProps, "index"> {
  items: string[];
}

const ItemOverlay: React.FC<ItemOverlayProps> = ({ ...props }) => {
  const { id, items } = props;
  const { activatorEvent, over } = useDndContext();
  const activeIndex = items.indexOf(id);
  const overIndex = over?.id ? items.indexOf(over?.id) : -1;

  return <Item id={id} {...props} clone />;
};

interface SortableItemProps extends ItemProps {
  activeIndex: number;
}

const SortableItem: React.FC<SortableItemProps> = ({ ...props }) => {
  const { id, activeIndex } = props;
  const {
    attributes,
    listeners,
    index,
    isDragging,
    isSorting,
    over,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id, animateLayoutChanges: () => true });

  return (
    <Item
      ref={setNodeRef}
      id={id}
      active={isDragging}
      style={{
        transition,
        transform: isSorting ? undefined : CSS.Translate.toString(transform),
      }}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

interface ItemProps extends ImageProps {
  active?: boolean;
  clone?: boolean;
  id: string;
  index?: number;
  onRemove?: () => void;
}

const Item = React.forwardRef<HTMLImageElement, ItemProps>(function Item(
  { id, index, active, clone, onRemove, ...props },
  ref
) {
  return (
    <Box position="relative" mb="8px">
        <Image
          width="100%"
          height="100%"
          backgroundSize="cover"
          outline="none"
          appearance="none"
          cursor="grab"
          borderRadius="0"
          _hover={{ background: "" }}
          _active={{ background: "" }}
          ref={ref}
          src={id}
          {...props}
        />
      {!active && onRemove ? (
          <DeleteIcon 
            position="absolute"
            top="10px"
            right="10px"
            onClick={onRemove} 
          />
      ) : null}
    </Box>
  );
});

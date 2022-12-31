import React from 'react';
import {
  DndContext,
  DndContextProps,
  closestCenter,
  PointerSensor,
  useSensors,
  useSensor,
} from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';

const DndWrapper: React.FC<DndContextProps> = ({ children, onDragEnd }) => {
  const sensors = useSensors(useSensor(PointerSensor));
  //
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      {children}
    </DndContext>
  );
};

export default DndWrapper;

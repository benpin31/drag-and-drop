import React, { PropsWithChildren } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { ReactComponent as DraggableIcon } from '../img/draggable.svg';
import clsx from 'clsx';
import { Question } from './models';

type SortableItemProps = PropsWithChildren<{
   item: Question;
   categoryId: number;
}>;

export const SortableItem = ({ item, categoryId }: SortableItemProps) => {
   const { listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({
         id: item.id,
         data: { categoryId },
         transition: null,
      });

   return (
      <div ref={setNodeRef} className="flex gap-4 items-center justify-start">
         <DraggableIcon
            className={clsx(
               'h-4 w-4',
               { 'cursor-grab': !isDragging },
               { 'cursor-grabbing': isDragging }
            )}
            {...listeners}
         />
         {item.label}
      </div>
   );
};

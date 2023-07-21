import React, { PropsWithChildren } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { ReactComponent as DraggableIcon } from '../img/draggable.svg';
import clsx from 'clsx';
import { Category, ItemType, Question } from './models';

type SortableItemProps = PropsWithChildren<{
   item: Question;
   categoryId?: string;
   itemType?: ItemType;
}>;

export const SortableItem = ({
   item,
   categoryId,
   itemType,
}: SortableItemProps) => {
   const { listeners, setNodeRef, isDragging, transform, transition } =
      useSortable({
         id: item.id,
         data: { categoryId, itemType },
      });

   return (
      <div
         ref={setNodeRef}
         className="flex gap-4 items-center justify-start bg-white"
      >
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

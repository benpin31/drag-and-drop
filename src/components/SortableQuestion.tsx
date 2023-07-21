import React, { PropsWithChildren } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { ReactComponent as DraggableIcon } from '../img/draggable.svg';
import clsx from 'clsx';
import { Question } from './models';

type SortableItemProps = PropsWithChildren<{
   question: Question;
}>;

export const SortableQuestion = ({ question }: SortableItemProps) => {
   const { listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({
         id: question.id,
      });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   return (
      <div
         ref={setNodeRef}
         style={style}
         className="flex gap-4 items-center justify-start"
      >
         <DraggableIcon
            className={clsx(
               'h-4 w-4',
               { 'cursor-grab': !isDragging },
               { 'cursor-grabbing': isDragging }
            )}
            {...listeners}
         />
         {question.label}
      </div>
   );
};

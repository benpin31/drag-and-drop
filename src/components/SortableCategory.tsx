import React, { PropsWithChildren } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { ReactComponent as DraggableIcon } from '../img/draggable.svg';
import clsx from 'clsx';
import { Category, ItemType, Question } from './models';
import { SortableItem } from './sortableItem';

type SortableItemProps = PropsWithChildren<{
   category: Category;
   questions: Question[];
   categoryId?: string;
   itemType?: ItemType;
}>;

export const SortableCategory = ({
   category,
   categoryId,
   itemType,
   questions,
}: SortableItemProps) => {
   const { listeners, setNodeRef, isDragging, transform, transition } =
      useSortable({
         id: category.id,
         data: { categoryId, itemType },
      });

   return (
      <div
         ref={setNodeRef}
         className="flex flex-col border-solid border-2 w-80 m-3"
      >
         <div className="flex gap-4 items-center justify-start bg-white">
            <DraggableIcon
               className={clsx(
                  'h-4 w-4',
                  { 'cursor-grab': !isDragging },
                  { 'cursor-grabbing': isDragging }
               )}
               {...listeners}
            />
            {category.label}
         </div>
         {questions
            .filter((question) => question.categoryId === category.id)
            .map((question) => (
               <SortableItem
                  item={question}
                  categoryId={category.id}
                  itemType={ItemType.QUESTION}
               />
            ))}
      </div>
   );
};

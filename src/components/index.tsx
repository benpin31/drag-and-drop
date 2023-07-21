import React, { useCallback, useEffect, useState } from 'react';
import {
   closestCorners,
   DndContext,
   DragEndEvent,
   DragOverlay,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Category, ItemType, Question } from './models';
import { SortableItem } from './sortableItem';
import { Item } from './item';
import { SortableCategory } from './SortableCategory';

export const SortableQuiz = () => {
   const [categories, setCategories] = useState<Category[]>([
      {
         id: 'c1',
         label: 'categorie 1',
         type: ItemType.CATEGORIE,
      },
      {
         id: 'c2',
         label: 'categorie 2',
         type: ItemType.CATEGORIE,
      },
      {
         id: 'c3',
         label: 'categorie 3',
         type: ItemType.CATEGORIE,
      },
      {
         id: 'c4',
         label: 'categorie 4',
         type: ItemType.CATEGORIE,
      },
   ]);

   const [questions, setQuestions] = useState<Question[]>([
      {
         id: 'q1',
         label: 'question 1',
         type: ItemType.QUESTION,
         categoryId: 'c1',
      },
      {
         id: 'q2',
         label: 'question 2',
         type: ItemType.QUESTION,
         categoryId: 'c1',
      },
      {
         id: 'q3',
         label: 'question 3',
         type: ItemType.QUESTION,
         categoryId: 'c2',
      },
      {
         id: 'q4',
         label: 'question 4',
         type: ItemType.QUESTION,
         categoryId: 'c2',
      },
      {
         id: 'q5',
         label: 'question 5',
         type: ItemType.QUESTION,
         categoryId: 'c3',
      },
      {
         id: 'q6',
         label: 'question 6',
         type: ItemType.QUESTION,
         categoryId: 'c3',
      },
      {
         id: 'q7',
         label: 'question 7',
         type: ItemType.QUESTION,
         categoryId: 'c4',
      },
      {
         id: 'q8',
         label: 'question 8',
         type: ItemType.QUESTION,
         categoryId: 'c4',
      },
   ]);
   const [activeId, setActiveId] = useState<{
      id: string;
      itemType: ItemType;
   } | null>(null);

   const handleDragStart = useCallback((event: DragEndEvent) => {
      const { active } = event;
      const { id } = active;

      console.log(active);
      setActiveId({
         id: id as string,
         itemType: active.data.current?.itemType,
      });
   }, []);

   const handleDragEnd = useCallback((event: DragEndEvent) => {
      const { active, over } = event;

      if (
         active.data.current &&
         active.data.current.itemType === ItemType.CATEGORIE &&
         over?.data.current?.categoryId
      ) {
         setCategories((currentCategory) => {
            const oldIndex = currentCategory.findIndex(
               (item) => item.id === active.id
            );
            const newIndex = currentCategory.findIndex(
               (item) => item.id === over?.data.current?.categoryId
            );

            return arrayMove(currentCategory, oldIndex, newIndex);
         });
      } else {
         if (over?.id && active.id !== over?.id) {
            setQuestions((currentQuestions) => {
               const oldIndex = currentQuestions.findIndex(
                  (item) => item.id === active.id
               );
               const newIndex = currentQuestions.findIndex(
                  (item) => item.id === over.id
               );
               const newCategoryId = currentQuestions.find(
                  (item) => item.id === over.id
               )?.categoryId;

               if (newCategoryId) {
                  const newOrder = arrayMove(
                     currentQuestions,
                     oldIndex,
                     newIndex
                  );
                  newOrder[newIndex].categoryId = newCategoryId;
                  return newOrder;
               }

               return currentQuestions;
            });
         }
         setActiveId(null);
      }
   }, []);

   return (
      <DndContext
         onDragEnd={handleDragEnd}
         onDragStart={handleDragStart}
         collisionDetection={closestCorners}
      >
         <SortableContext items={questions}>
            <SortableContext items={categories}>
               {categories.map((category) => (
                  <SortableCategory
                     category={category}
                     categoryId={category.id}
                     itemType={ItemType.CATEGORIE}
                     questions={questions}
                  />
               ))}
            </SortableContext>
         </SortableContext>

         <DragOverlay>
            {activeId?.id ? (
               activeId.itemType === ItemType.QUESTION ? (
                  <SortableItem
                     item={questions.find((q) => q.id === activeId.id)!}
                  />
               ) : (
                  <SortableCategory
                     category={categories.find((q) => q.id === activeId.id)!}
                     questions={questions}
                  />
               )
            ) : null}
         </DragOverlay>
      </DndContext>
   );
};

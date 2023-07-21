import React, { useCallback, useState } from 'react';
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

export const SortableQuiz = () => {
   const [categories, setCategories] = useState<Category[]>([
      {
         id: 1,
         label: 'categorie 1',
         type: ItemType.CATEGORIE,
      },
      {
         id: 2,
         label: 'categorie 2',
         type: ItemType.CATEGORIE,
      },
      {
         id: 3,
         label: 'categorie 3',
         type: ItemType.CATEGORIE,
      },
      {
         id: 4,
         label: 'categorie 4',
         type: ItemType.CATEGORIE,
      },
   ]);

   const [questions, setQuestions] = useState<Question[]>([
      { id: 1, label: 'question 1', type: ItemType.QUESTION, categoryId: 1 },
      { id: 2, label: 'question 2', type: ItemType.QUESTION, categoryId: 1 },
      { id: 3, label: 'question 3', type: ItemType.QUESTION, categoryId: 2 },
      { id: 4, label: 'question 4', type: ItemType.QUESTION, categoryId: 2 },
      { id: 5, label: 'question 5', type: ItemType.QUESTION, categoryId: 3 },
      { id: 6, label: 'question 6', type: ItemType.QUESTION, categoryId: 3 },
      { id: 7, label: 'question 7', type: ItemType.QUESTION, categoryId: 4 },
      { id: 8, label: 'question 8', type: ItemType.QUESTION, categoryId: 4 },
   ]);
   const [activeId, setActiveId] = useState<number | string | null>(null);

   const handleDragStart = useCallback((event: DragEndEvent) => {
      const { active } = event;
      const { id } = active;

      setActiveId(id);
   }, []);

   const handleDragEnd = useCallback((event: DragEndEvent) => {
      const { active, over } = event;

      console.log(active, over);

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
               const newOrder = arrayMove(currentQuestions, oldIndex, newIndex);
               newOrder[newIndex].categoryId = newCategoryId;
               return newOrder;
            }

            return currentQuestions;
         });
         setActiveId(null);
      }
   }, []);

   return (
      <DndContext
         onDragEnd={handleDragEnd}
         onDragStart={handleDragStart}
         collisionDetection={closestCorners}
      >
         {categories.map((category) => (
            <SortableContext items={questions}>
               <div className="flex flex-col border-solid border-2 w-80 m-3">
                  {category.label}
                  {questions
                     .filter((question) => question.categoryId === category.id)
                     .map((question) => (
                        <SortableItem
                           item={question}
                           categoryId={category.id}
                        />
                     ))}
               </div>
            </SortableContext>
         ))}
         <DragOverlay>
            {activeId ? (
               <Item
                  label={questions.find((q) => q.id === activeId)?.label ?? ''}
               />
            ) : null}
         </DragOverlay>
      </DndContext>
   );
};

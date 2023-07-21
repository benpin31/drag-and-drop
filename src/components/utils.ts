import { Category, Question } from './models';

export const getItemId = (item: Category | Question): string => {
   return `${item.type}-${item.id}`;
};

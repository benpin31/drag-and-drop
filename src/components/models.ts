export enum ItemType {
   CATEGORIE = 'categorie',
   QUESTION = 'question',
}

export interface Question {
   id: number;
   label: string;
   type: ItemType.QUESTION;
   categoryId: number;
}

export interface Category {
   id: number;
   label: string;
   type: ItemType.CATEGORIE;
}

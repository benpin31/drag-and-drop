export enum ItemType {
   CATEGORIE = 'categorie',
   QUESTION = 'question',
}

export interface Question {
   id: string;
   label: string;
   type: ItemType.QUESTION;
   categoryId: string;
}

export interface Category {
   id: string;
   label: string;
   type: ItemType.CATEGORIE;
}

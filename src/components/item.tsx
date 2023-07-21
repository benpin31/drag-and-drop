import clsx from 'clsx';
import React from 'react';
import { ReactComponent as DraggableIcon } from '../img/draggable.svg';

export const Item = ({ label }: { label: string }) => {
   return (
      <div className="flex gap-4 items-center justify-start">
         <DraggableIcon className={clsx('h-4 w-4')} />
         {label}
      </div>
   );
};

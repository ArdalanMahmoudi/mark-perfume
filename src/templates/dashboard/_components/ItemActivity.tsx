import React from 'react';

const ItemActivity = ({title,desc,icon,date}) => {
    return (
        <div className='flex gap-1.5'>
            <div className="h-fit text-lg bg-white border border-grey220 p-2 text-primary rounded-full ">{icon}</div>
            <div className="text-sm flex flex-col ">
                <p className='font-bold '>{title}</p>
                <p className='text-sm leading-8'>{desc}</p>
                <p className='text-grey100 text-[10px]'>{date}</p>
            </div>
        </div>
    );
}

export default ItemActivity;

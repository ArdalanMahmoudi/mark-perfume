import React from 'react';

const IconBox = ({title, icon}:{title:string, icon:React.ReactNode}) => {
    return (
        <div className='flex gap-1 items-center text-gray-500 lg:text-sm text-xs'>
            {icon}
            <span>{title}</span>
        </div>
    );
}

export default IconBox;

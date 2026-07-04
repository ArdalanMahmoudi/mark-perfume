import React from 'react';

const Container = ({children}:{children:React.ReactNode}) => {
    return (
        <div className='px-5  m-auto'>
            {children}
        </div>
    );
}

export default Container;

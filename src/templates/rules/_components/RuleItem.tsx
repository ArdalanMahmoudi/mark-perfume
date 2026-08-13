import React from 'react';

const RuleItem = ({id,title, descs}) => {
    return (
        <div className="lg:p-8 p-4 col-span-2 lg:col-span-1 rounded-lg bg-white gap-3 border border-r-grey220  flex flex-col ">
            <p className="text-primary font-bold text-center"><b>{id}.</b>{title}</p>
            <ul className="flex text-xs lg:text-sm flex-col gap-2.5 list-disc pr-2!">

              {descs.map(txt => (
                <li>{txt}</li>
              ))}
            </ul>
          </div>
    );
}

export default RuleItem;

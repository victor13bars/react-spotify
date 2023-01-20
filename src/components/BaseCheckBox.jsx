import React from 'react';

const BaseCheckBox = ({id, children: label}) => {
    return (
        <div className='inline-flex items-center gap-2'>
            <input type="checkbox"
                   id={id}
                   className="text-[#1bd760] bg-transparent rounded-sm border-neutral-500 hover:border=[#1bd760] !ring-0 !ring-offset-0 checked:bg-checkbox"
            />
            {label && <label htmlFor={id} className='text-sm text-neutral-400'>{label}</label>}
        </div>
    );
};

export default BaseCheckBox;
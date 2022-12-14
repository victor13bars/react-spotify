import React from 'react';

const BaseButton = ({primary, children: label, classes, onClick: handleClick}) => {

    const typeClasses = primary ? 'bg-white hover:bg-gray-100 text-[#2e2e2e]' : 'text-white'

    return (
        <button
            onClick={handleClick}
            className={`font-semibold leading-5 py-[9px] px-[17px]
             sm:px-[38px] rounded-full hover:scale-105 ${typeClasses} ${classes}`}
        >
            {label}
        </button>
    )
        ;
};

export default BaseButton;
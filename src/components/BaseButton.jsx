import React from 'react';

const BaseButton = ({
                        primary,
                        children: label,
                        classes,
                        onClick: handleClick,
                        accent
                    }) => {

    let typeClasses = null
    if (primary) {
        typeClasses = 'bg-white hover:bg-gray-100 text-[#2e2e2e] leading-5 py-[14px] px-[17px] sm:px-[38px]'
    } else if (accent) {
        typeClasses = 'bg-[#1bd760] hover:bg-[1cdf63] text-black py-1 px-4 uppercase leading-normal'
    } else {
        typeClasses = 'text-white leading-5 py-[14px] px-[17px] sm:px-[38px]'
    }

    return (
        <button
            onClick={handleClick}
            className={`font-semibold rounded-full hover:scale-105 ${typeClasses} ${classes}`}
        >
            {label}
        </button>
    )
        ;
};

export default BaseButton;
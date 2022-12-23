import React from 'react';

const PlayListContextMenuItem = ({
                                     children: label,
                                     onMouseEnter: closePreviousSubmenuIfOpen,
                                     classes
                                 }) => {

    return (
        <li onMouseEnter={() => closePreviousSubmenuIfOpen()}>
            <button
                className={`w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default ${classes}`}
            >
                {label}
            </button>
        </li>
    );
};

export default PlayListContextMenuItem;
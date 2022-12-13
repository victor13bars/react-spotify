import React from 'react';
import PlayListContextSubmenu from "./PlayListContextSubmenu";
import PlayListContextItem from "./PlayListContextItem";

const menuItems = [
    {
        label: 'to Your Library'
    },
    {
        label: 'Share'
    },
    {
        label: 'About recommendations'
    },
    {
        label: 'Open in Desktop app'
    }
]

const PlayListContextMenu = () => {
    return (
        <ul className="absolute top-9 left-9 bg-[#282828] text-[#eaeaea] text-sm divide-y divide-[#3e3e3e] p-1 rounded shadow-xl cursor-default whitespace-nowrap z-10 hidden group-hover:block">
            {/*<li className="relative">*/}
            {/*    <button*/}
            {/*        className="w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default flex justify-between items-center">*/}
            {/*        Share*/}
            {/*        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"*/}
            {/*             fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
            {/*            <path strokeLinecap="round" strokeLinejoin="round"*/}
            {/*                  strokeWidth="2" d="M9 5l7 7-7 7"/>*/}
            {/*        </svg>*/}
            {/*    </button>*/}
            {/*    <PlayListContextSubmenu/>*/}
            {/*</li>*/}
            {menuItems.map(({label}) =>
                <PlayListContextItem key={label}>
                    {label}
                </PlayListContextItem>
            )}
        </ul>
    );
};

export default PlayListContextMenu;
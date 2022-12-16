import React from 'react';
import {ChevronRightIcon} from '@heroicons/react/24/outline'
import PlayListContextMenu from "./PlayListContextMenu";

const PlayListContextMenuItem = ({children: label, subMenuItems}) => {

    return (
        subMenuItems
            ?

            <li className="relative">
                <button
                    className="w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default flex justify-between items-center">
                    {label} <ChevronRightIcon className="h-4 w-4"/>
                </button>
                <PlayListContextMenu
                    menuItems={subMenuItems}
                    classes="absolute top-0 left-full bg-[#282828] text-[#eaeaea] text-sm p-1 rounded shadow-xl cursor-default"
                />
            </li>

            :

            <li>
                <button
                    className="w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default">
                    {label}
                </button>
            </li>
    )
};

export default PlayListContextMenuItem;
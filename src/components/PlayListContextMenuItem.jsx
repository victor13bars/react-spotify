import React from 'react';
import PlayListContextSubmenu from "./PlayListContextSubmenu";
import {ChevronRightIcon} from '@heroicons/react/24/outline'

const PlayListContextMenuItem = ({children: label, subMenuItems}) => {

    let classes = '';
    let btnClasses = "w-full p-3 text-left hover:text-white hover:bg-[#3e3e3e] cursor-default";
    let icon = null;
    let submenu = null

    if (subMenuItems) {
        classes = "relative";
        btnClasses = `${btnClasses} flex justify-between items-center`
        icon = <ChevronRightIcon className="h-4 w-4"/>
        submenu = <PlayListContextSubmenu menuItems={subMenuItems}/>
    }

    return (
        <li className={classes}>
            <button
                className={btnClasses}>
                {label} {icon}
            </button>
            {submenu}
        </li>
    );
};

export default PlayListContextMenuItem;
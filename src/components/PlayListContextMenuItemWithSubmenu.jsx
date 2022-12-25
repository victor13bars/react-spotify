import React, {useEffect, useRef, useState} from 'react';
import {ChevronRightIcon} from '@heroicons/react/24/outline'
import PlayListContextMenu from "./PlayListContextMenu";
import useSubmenu from "../hooks/useContextSubmenu";

const PlayListContextMenuItemWithSubmenu = ({
                                                children: label,
                                                subMenuItems,
                                                onMouseEnter: closePreviousSubmenuIfOpen
                                            }) => {

    const ref = useRef(null)
    const submenu = useSubmenu(subMenuItems, closePreviousSubmenuIfOpen, ref)
    const bgClass = submenu.isOpen ? 'bg-[#3e3e3e]' : 'hover:bg-[#3e3e3e]'

    return (
        <li
            className="relative"
            onMouseEnter={submenu.open}
            ref={ref}
        >
            <button
                className={`w-full p-3 text-left hover:text-white cursor-default flex justify-between items-center ${bgClass}`}>
                {label} <ChevronRightIcon className="h-4 w-4"/>
            </button>
            {submenu.isOpen && (
                <PlayListContextMenu
                    menuItems={submenu.items}
                    classes={`absolute ${submenu.positionClasses}`}
                />
            )}
        </li>
    )
};

export default PlayListContextMenuItemWithSubmenu;
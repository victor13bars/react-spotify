import React, {useEffect, useRef, useState} from 'react';
import {ChevronRightIcon} from '@heroicons/react/24/outline'
import PlayListContextMenu from "./PlayListContextMenu";

const PlayListContextMenuItemWithSubmenu = ({
                                                children: label,
                                                subMenuItems,
                                                onMouseEnter: closePreviousSubmenuIfOpen
                                            }) => {

    const [menuState, setMenuState] = useState({
        isOpen: false,
        positionClasses: ''
    })
    const bgClass = menuState.isOpen ? 'bg-[#3e3e3e]' : 'hover:bg-[#3e3e3e]'
    const menuItemRef = useRef(null)
    const closeMenuTimer = useRef(null)

    const getMenuPositionClasses = () => {
        return `${getMenuPositionYClass()} ${getMenuPositionXClass()}`
    }

    const getMenuPositionXClass = () => {
        const menuItem = menuItemRef.current
        const menuItemWidth = menuItem.offsetWidth
        const windowWidth = window.innerWidth
        const menuItemRightCoordX = menuItem.getBoundingClientRect().right
        const shouldMoveMenuLeft = menuItemWidth > windowWidth - menuItemRightCoordX

        return shouldMoveMenuLeft ? 'right-full' : 'left-full'
    }

    const getMenuPositionYClass = () => {
        const windowHeight = window.innerHeight
        const menuItem = menuItemRef.current
        const menuHeight = menuItem.offsetHeight * subMenuItems.length
        const menuItemBottomCoordY = menuItem.getBoundingClientRect().bottom
        const shouldMoveMenuUp = menuHeight > windowHeight - menuItemBottomCoordY

        return shouldMoveMenuUp ? 'bottom-0' : 'top-0'
    }

    const openMenu = () => {

        closePreviousSubmenuIfOpen(startCloseMenuTimer)

        setMenuState({
            isOpen: true,
            positionClasses: getMenuPositionClasses()
        })
    }

    const closeMenu = () => {
        setMenuState({
            isOpen: false,
            positionClasses: ''
        })
    }

    const startCloseMenuTimer = () => {
        closeMenuTimer.current = setTimeout(closeMenu, 100)
    }

    const stopCloseMenuTimer = () => {
        clearTimeout(closeMenuTimer.current)
    }

    useEffect(() => {
        return () => stopCloseMenuTimer()
    })

    return (
        <li
            className="relative"
            onMouseEnter={openMenu}
            ref={menuItemRef}
        >
            <button
                className={`w-full p-3 text-left hover:text-white cursor-default flex justify-between items-center ${bgClass}`}>
                {label} <ChevronRightIcon className="h-4 w-4"/>
            </button>
            {menuState.isOpen && (
                <PlayListContextMenu
                    menuItems={subMenuItems}
                    classes={`absolute ${menuState.positionClasses}`}
                />
            )}
        </li>
    )
};

export default PlayListContextMenuItemWithSubmenu;
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import PlayListContextMenu from "./PlayListContextMenu";
import PlayListCover from "./PlayListCover";
import PlayListButtonPlay from "./PlayListButtonPlay";
import PlayListTitle from "./PlayListTitle";
import PlayListDescription from "./PlayListDescription";
import useContextMenu from "../hooks/useContextMenu";

const generateMenuItems = (isAlternate = false) => {
    return [
        {
            label: 'to Your Library'
        },
        {
            label: 'Share',
            subMenuItems: [
                {
                    label: isAlternate ? 'Copy Spotify URI' : 'Copy link to playlist',
                    classes: 'min-w-[150px]'
                },
                {
                    label: 'Embed playlist'
                }
            ]
        },
        {
            label: 'About recommendations'
        },
        {
            label: 'Open in Desktop app'
        }
    ]
}

const PlayList = ({coverUrl, title, description, classes, toggleScrolling}) => {

    const {
        openContextMenu: openMenu,
        isContextMenuOpen: isMenuOpen,
        contextMenuRef: menuRef,
    } = useContextMenu()
    const bgClasses = isMenuOpen
        ? 'bg-[#272727]'
        : 'bg-[#181818] hover:bg-[#272727]'
    const [menuItems, setMenuItems] = useState(generateMenuItems())

    useLayoutEffect(() => {
        toggleScrolling(!isMenuOpen)
    })
    useEffect(() => {

        if (!isMenuOpen) return

        const handleAltKeydown = ({key}) => {
            if (key === 'Alt') setMenuItems(generateMenuItems(true))
        }

        const handleAltKeyup = ({key}) => {
            if (key === 'Alt') setMenuItems(generateMenuItems(false))
        }

        document.addEventListener('keydown', handleAltKeydown)
        document.addEventListener('keyup', handleAltKeyup)

        return () => {

            document.removeEventListener('keydown', handleAltKeydown)
            document.removeEventListener('keyup', handleAltKeyup)
        }
    })

    return (
        <a
            href="/"
            className={`relative p-4 rounded-md duration-200 group ${classes} ${bgClasses}`}
            onContextMenu={openMenu}
            onClick={event => event.preventDefault()}
        >
            <div className="relative">
                <PlayListCover url={coverUrl}/>
                <PlayListButtonPlay/>
            </div>
            <PlayListTitle title={title}/>
            <PlayListDescription description={description}/>
            {
                isMenuOpen
                &&
                <PlayListContextMenu
                    ref={menuRef}
                    menuItems={menuItems}
                    classes="fixed divide-y divide-[#3e3e3e]"
                />
            }
        </a>
    );
};

export default PlayList;
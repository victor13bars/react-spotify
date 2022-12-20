import React, {useLayoutEffect, useRef, useState} from 'react';
import PlayListContextMenu from "./PlayListContextMenu";
import PlayListCover from "./PlayListCover";
import PlayListButtonPlay from "./PlayListButtonPlay";
import PlayListTitle from "./PlayListTitle";
import PlayListDescription from "./PlayListDescription";

const menuItems = [
    {
        label: 'to Your Library'
    },
    {
        label: 'Share',
        subMenuItems: [
            {
                label: 'Copy link to playlist'
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
const clickPosition = {x: null, y: null}

const PlayList = ({coverUrl, title, description, classes, toggleScrolling}) => {

    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
    const contextMenuRef = useRef(null)
    const bgClasses = isContextMenuOpen
        ? 'bg-[#272727]'
        : 'bg-[#181818] hover:bg-[#272727]'
    const openContextMenu = (event) => {
        event.preventDefault()
        clickPosition.x = event.clientX
        clickPosition.y = event.clientY
        setIsContextMenuOpen(true)
    }
    const closeContextMenu = () => {
        setIsContextMenuOpen(false)
    }
    const updateContextMenuPosition = () => {
        contextMenuRef.current.style.top = `${clickPosition.y}px`
        contextMenuRef.current.style.left = `${clickPosition.x}px`
    }

    useLayoutEffect(() => {

        toggleScrolling(!isContextMenuOpen)

        if (isContextMenuOpen) {
            updateContextMenuPosition()
        }
    })

    return (
        <a
            href="/"
            className={`relative p-4 rounded-md duration-200 group ${classes} ${bgClasses}`}
            onContextMenu={openContextMenu}
            onClick={event => event.preventDefault()}
        >
            <div className="relative">
                <PlayListCover url={coverUrl}/>
                <PlayListButtonPlay/>
            </div>
            <PlayListTitle title={title}/>
            <PlayListDescription description={description}/>
            {
                isContextMenuOpen
                &&
                <PlayListContextMenu
                    ref={contextMenuRef}
                    menuItems={menuItems}
                    classes="fixed bg-[#282828] text-[#eaeaea] text-sm divide-y divide-[#3e3e3e] p-1 rounded shadow-xl cursor-default whitespace-nowrap z-10"
                    onClose={closeContextMenu}
                />
            }
        </a>
    );
};

export default PlayList;
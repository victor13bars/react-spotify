import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import PlayListContextMenu from "./PlayListContextMenu";
import PlayListCover from "./PlayListCover";
import PlayListButtonPlay from "./PlayListButtonPlay";
import PlayListTitle from "./PlayListTitle";
import PlayListDescription from "./PlayListDescription";
import useMenu from "../hooks/useContextMenu";
import {logDOM} from "@testing-library/react";
import BaseToast from "./BaseToast";

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
                    classes: 'min-w-[150px]',
                    action: () => console.log('Hi')
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

    const [menuItems, setMenuItems] = useState(generateMenuItems)
    const menu = useMenu(menuItems)
    const bgClasses = menu.isOpen
        ? 'bg-[#272727]'
        : 'bg-[#181818] hover:bg-[#272727]'

    useLayoutEffect(() => {
        toggleScrolling(!menu.isOpen)
    })
    useEffect(() => {

        if (!menu.isOpen) return

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
        <>
            <a
                href="/"
                className={`relative p-4 rounded-md duration-200 group ${classes} ${bgClasses}`}
                onContextMenu={menu.open}
                onClick={event => event.preventDefault()}
            >
                <div className="relative">
                    <PlayListCover url={coverUrl}/>
                    <PlayListButtonPlay/>
                </div>
                <PlayListTitle title={title}/>
                <PlayListDescription description={description}/>
                {
                    menu.isOpen
                    &&
                    <PlayListContextMenu
                        ref={menu.ref}
                        menuItems={menu.items}
                        classes="fixed divide-y divide-[#3e3e3e]"
                    />
                }
            </a>
            <BaseToast/>
        </>
    );
};

export default PlayList;
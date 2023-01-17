import React, {useLayoutEffect, useState} from 'react';
import useMenu from "../hooks/useContextMenu";
import PlayListContextMenu from "./PlayListContextMenu";
import PlayListCover from "./PlayListCover";
import PlayListButtonPlay from "./PlayListButtonPlay";
import PlayListTitle from "./PlayListTitle";
import PlayListDescription from "./PlayListDescription";
import useEvent from "../hooks/useEvent";
import BaseModal from "./BaseModal";

const PlayList = ({
                      coverUrl,
                      title,
                      description,
                      classes,
                      toggleScrolling,
                      showToast,
                  }) => {

    const generateMenuItems = (isAlternate = false) => {
        return [
            {
                label: 'to Your Library',
                action: () => {
                    menu.close()
                    document.querySelector('nav a:nth-child(4)').click()
                }
            },
            {
                label: 'Share',
                subMenuItems: [
                    {
                        label: isAlternate ? 'Copy Spotify URI' : 'Copy link to playlist',
                        classes: 'min-w-[150px]',
                        action: () => {
                            navigator.clipboard.writeText(title).then(() => {
                                showToast('Link copied to clipboard')
                                menu.close()
                            })
                        }
                    },
                    {
                        label: 'Embed playlist'
                    }
                ]
            },
            {
                label: 'About recommendations',
                action: () => {
                    menu.close()
                    openModal()
                }
            },
            {
                label: 'Open in Desktop app'
            }
        ]
    }

    const [isModalOpen, setIsModalOpen] = useState()
    const [menuItems, setMenuItems] = useState(generateMenuItems)
    const menu = useMenu(menuItems)
    const bgClasses = menu.isOpen
        ? 'bg-[#272727]'
        : 'bg-[#181818] hover:bg-[#272727]'

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleAltKeydown = ({key}) => {
        if (key === 'Alt') setMenuItems(generateMenuItems(true))
    }

    const handleAltKeyup = ({key}) => {
        if (key === 'Alt') setMenuItems(generateMenuItems(false))
    }

    useLayoutEffect(() => {
        toggleScrolling(!menu.isOpen)
    })

    useEvent('keydown', handleAltKeydown, menu.isOpen)
    useEvent('keyup', handleAltKeyup, menu.isOpen)

    return (
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

            {isModalOpen && <BaseModal onClose={closeModal}/>}
        </a>
    );
};

export default PlayList;